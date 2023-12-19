import { and, eq, sql } from "drizzle-orm";
import { db } from "./index";
import convert from "../helpers/CSVtoJSON";
import {
    adrese,
    adreseKlub,
    klubovi,
    koristi,
    lokacije,
    stadioni,
} from "./schema";
import {
    checkAdresa,
    checkKlub,
    checkLokacija,
    checkStadion,
    filterAdresa,
    filterKlub,
    filterLokacija,
    filterStadion,
} from "../helpers/checkType";
import { MissingFieldsError, NotFoundError } from "../errors/errorTypes";

const getAllCSV = sql.join(
    [
        sql`SELECT * FROM(`,
        sql`SELECT stadioni.stadion_id, stadioni.naziv, tip, duzina_staze, broj_staza,`,
        sql`broj_skakalista_dalj, broj_skakalista_vis,`,
        sql`broj_skakalista_motka, broj_bacalista_koplje,`,
        sql`broj_bacalista_kugla, broj_bacalista_duga_krug,`,
        sql`dozvoljeno_bacanje, kapacitet_tribine, povrsina_kompleksa,`,
        sql`adrese.drzava, adrese.grad, adrese.ulica, adrese.broj,`,
        sql`lokacije.geo_sirina, lokacije.geo_duzina, lokacije.nadmorska_visina,`,
        sql`klub.klub_id as kratica, klub.naziv as klub_naziv, klub.telefon,`,
        sql`klub.email, klub.web_stranica, klub.drzava as klub_drzava, klub.grad as klub_grad,`,
        sql`klub.ulica as klub_ulica, klub.broj as klub_broj`,
        sql`FROM stadioni`,
        sql`NATURAL LEFT JOIN adrese`,
        sql`NATURAL LEFT JOIN lokacije`,
        sql`LEFT JOIN (`,
        sql`SELECT *`,
        sql`FROM koristi`,
        sql`NATURAL JOIN klubovi`,
        sql`NATURAL JOIN adrese`,
        sql`) as klub ON klub.stadion_id = stadioni.stadion_id`,
        sql`) as data`,
    ],
    sql` `
);

const columns = (async () =>
    (await db.execute(getAllCSV)).fields.map((f) => f.name))();

export const getAll = async () => (await db.execute(getAllCSV)).rows;

export const getAllFiltered = async (
    filterValue: string,
    caseSensitive: string
) => {
    const querry = sql.empty();
    const tableColumns = await columns;
    let flag = false;

    for (let c of tableColumns) {
        if (flag) querry.append(sql` OR `);
        else querry.append(sql`WHERE `);
        if (caseSensitive && caseSensitive === "true")
            querry.append(
                sql`CAST(${sql.raw(c)} as varchar) LIKE ${
                    "%" + filterValue + "%"
                }`
            );
        else
            querry.append(
                sql`LOWER(CAST(${sql.raw(c)} as varchar)) LIKE LOWER(${
                    "%" + filterValue + "%"
                })`
            );
        flag = true;
    }

    return (await db.execute(sql.join([getAllCSV, querry], sql` `))).rows;
};

export const getFiltered = async (filter?: { [field: string]: string }) => {
    if (!filter) return getAll();

    if (filter["all"]) {
        return getAllFiltered(filter["all"], filter["case"]);
    }

    const querry = sql.empty();
    const tableColumns = await columns;

    let flag = false;
    let caseSensitive = filter["case"];
    let exact = filter["exact"] || false;

    for (let field in filter) {
        if (tableColumns.includes(field)) {
            if (flag) querry.append(sql` AND `);
            else querry.append(sql`WHERE `);
            if (exact) {
                querry.append(sql`${sql.raw(field)} = ${filter[field]}`);
            } else if (caseSensitive && caseSensitive === "true")
                querry.append(
                    sql`CAST(${sql.raw(field)} as varchar) LIKE ${
                        "%" + filter[field] + "%"
                    }`
                );
            else
                querry.append(
                    sql`LOWER(CAST(${sql.raw(field)} as varchar)) LIKE LOWER(${
                        "%" + filter[field] + "%"
                    })`
                );
            flag = true;
        }
    }

    return (await db.execute(sql.join([getAllCSV, querry], sql` `))).rows;
};

export const getAllJSON = async () => {
    const data = await getAll();

    return convert(data);
};

export const getFilteredJSON = async (filter?: { [field: string]: string }) => {
    const data = await getFiltered(filter);

    return convert(data);
};

//----------------------------------------------------------------------------

export const selectKlub = async (id: string) => {
    const data = await db.select().from(klubovi).where(eq(klubovi.klub_id, id));
    return data[0];
};
export const selectKlubByAdresa = async (adresaId: number) => {
    if (!parseInt(`${adresaId}`)) throw new NotFoundError("Invalid ID");
    const data = await db
        .select()
        .from(klubovi)
        .where(eq(klubovi.adresa_id, adresaId));
    return data;
};
export const selectKlubAdresa = async (id: string) => {
    const data = await db
        .select({
            klub_drzava: adreseKlub.drzava,
            klub_grad: adreseKlub.grad,
            klub_ulica: adreseKlub.ulica,
            klub_broj: adreseKlub.broj,
        })
        .from(klubovi)
        .innerJoin(adreseKlub, eq(klubovi.adresa_id, adreseKlub.adresa_id))
        .where(eq(klubovi.klub_id, id));
    return data;
};
export const selectKlubAll = async () => {
    const data = await db.select().from(klubovi);
    return data;
};

export const selectStadion = async (id: number) => {
    if (!parseInt(`${id}`)) throw new NotFoundError("Invalid ID");
    const data = await db
        .select()
        .from(stadioni)
        .where(eq(stadioni.stadion_id, id));
    return data[0];
};
export const selectStadionByLokacija = async (lokacijaId: number) => {
    if (!parseInt(`${lokacijaId}`)) throw new NotFoundError("Invalid ID");
    const data = await db
        .select()
        .from(stadioni)
        .where(eq(stadioni.lokacija_id, lokacijaId));
    return data;
};
export const selectStadionByAdresa = async (adresaId: number) => {
    if (!parseInt(`${adresaId}`)) throw new NotFoundError("Invalid ID");
    const data = await db
        .select()
        .from(stadioni)
        .where(eq(stadioni.adresa_id, adresaId));
    return data;
};
export const selectStadionKlubovi = async (id: number) => {
    if (!parseInt(`${id}`)) throw new NotFoundError("Invalid ID");
    const data = await db
        .select({
            klub: klubovi,
            adresaKlub: adreseKlub,
        })
        .from(stadioni)
        .leftJoin(koristi, eq(stadioni.stadion_id, koristi.stadion_id))
        .innerJoin(klubovi, eq(koristi.klub_id, klubovi.klub_id))
        .innerJoin(adreseKlub, eq(klubovi.adresa_id, adreseKlub.adresa_id))
        .where(eq(stadioni.stadion_id, id));

    return data.reduce<
        Record<
            string,
            Omit<
                typeof klubovi.$inferSelect,
                "klub_id" | "naziv" | "adresa_id"
            > & {
                klub_naziv: string;
                kratica: string;
                adresa: {
                    klub_drzava: String;
                    klub_grad: String;
                    klub_ulica: String;
                    klub_broj: String | null | undefined;
                };
            }
        >
    >((acc, row) => {
        const klub = row.klub;
        const adresaKlub = row.adresaKlub;

        if (!acc[klub.klub_id]) {
            acc[klub.klub_id] = {
                kratica: klub.klub_id,
                klub_naziv: klub.naziv,
                telefon: klub.telefon,
                email: klub.email,
                web_stranica: klub.web_stranica,
                adresa: {
                    klub_drzava: adresaKlub?.drzava!,
                    klub_grad: adresaKlub?.grad!,
                    klub_ulica: adresaKlub?.ulica!,
                    klub_broj: adresaKlub?.broj,
                },
            };
        }
        return acc;
    }, {});
};
export const selectStadionAdresa = async (id: number) => {
    if (!parseInt(`${id}`)) throw new NotFoundError("Invalid ID");
    const data = await db
        .select({
            drzava: adrese.drzava,
            grad: adrese.grad,
            ulica: adrese.ulica,
            broj: adrese.broj,
        })
        .from(stadioni)
        .innerJoin(adrese, eq(stadioni.adresa_id, adrese.adresa_id))
        .where(eq(stadioni.stadion_id, id));
    return data[0];
};
export const selectStadionLokacija = async (id: number) => {
    if (!parseInt(`${id}`)) throw new NotFoundError("Invalid ID");
    const data = await db
        .select({
            geo_sirina: lokacije.geo_sirina,
            geo_duzina: lokacije.geo_duzina,
            nadmorska_visina: lokacije.nadmorska_visina,
        })
        .from(stadioni)
        .innerJoin(lokacije, eq(stadioni.lokacija_id, lokacije.lokacija_id))
        .where(eq(stadioni.stadion_id, id));
    return data[0];
};
export const selectStadionExpanded = async (id: number) => {
    if (!parseInt(`${id}`)) throw new NotFoundError("Invalid ID");
    const data = await db
        .select({
            stadion: stadioni,
            klub: klubovi,
            adresa: adrese,
            geo_lokacija: lokacije,
            adresaKlub: adreseKlub,
        })
        .from(stadioni)
        .leftJoin(lokacije, eq(stadioni.lokacija_id, lokacije.lokacija_id))
        .leftJoin(adrese, eq(stadioni.adresa_id, adrese.adresa_id))
        .leftJoin(koristi, eq(stadioni.stadion_id, koristi.stadion_id))
        .leftJoin(klubovi, eq(koristi.klub_id, klubovi.klub_id))
        .leftJoin(adreseKlub, eq(klubovi.adresa_id, adreseKlub.adresa_id))
        .where(eq(stadioni.stadion_id, id));

    return data.reduce<
        Record<
            number,
            Omit<typeof stadioni.$inferSelect, "lokacija_id" | "adresa_id"> & {
                adresa: Omit<typeof adrese.$inferSelect, "adresa_id"> | null;
                geo_lokacija: Omit<
                    typeof lokacije.$inferSelect,
                    "lokacija_id"
                > | null;
                klubovi: (Omit<
                    typeof klubovi.$inferSelect,
                    "klub_id" | "naziv" | "adresa_id"
                > & {
                    klub_naziv: String;
                    kratica: String;
                    adresa: {
                        klub_drzava: String;
                        klub_grad: String;
                        klub_ulica: String;
                        klub_broj: String | null | undefined;
                    };
                })[];
            }
        >
    >((acc, row) => {
        const stadion = row.stadion;
        const klub = row.klub;
        const adresa = row.adresa;
        const geo_lokacija = row.geo_lokacija;
        const adresaKlub = row.adresaKlub;

        // @ts-ignore
        delete stadion.adresa_id;
        // @ts-ignore
        delete stadion.lokacija_id;
        // @ts-ignore
        delete adresa?.adresa_id;
        // @ts-ignore
        delete geo_lokacija?.lokacija_id;
        // @ts-ignore
        delete adresaKlub?.adresa_id;

        if (!acc[stadion.stadion_id]) {
            acc[stadion.stadion_id] = {
                ...stadion,
                adresa,
                geo_lokacija,
                klubovi: [],
            };
        }
        if (klub) {
            acc[stadion.stadion_id].klubovi.push({
                kratica: klub.klub_id,
                klub_naziv: klub.naziv,
                telefon: klub.telefon,
                email: klub.email,
                web_stranica: klub.web_stranica,
                adresa: {
                    klub_drzava: adresaKlub?.drzava!,
                    klub_grad: adresaKlub?.grad!,
                    klub_ulica: adresaKlub?.ulica!,
                    klub_broj: adresaKlub?.broj,
                },
            });
        }
        return acc;
    }, {});
};
export const selectStadionExpandedAll = async () => {
    const data = await db
        .select({
            stadion: stadioni,
            klub: klubovi,
            adresa: adrese,
            geo_lokacija: lokacije,
            adresaKlub: adreseKlub,
        })
        .from(stadioni)
        .leftJoin(lokacije, eq(stadioni.lokacija_id, lokacije.lokacija_id))
        .leftJoin(adrese, eq(stadioni.adresa_id, adrese.adresa_id))
        .leftJoin(koristi, eq(stadioni.stadion_id, koristi.stadion_id))
        .leftJoin(klubovi, eq(koristi.klub_id, klubovi.klub_id))
        .leftJoin(adreseKlub, eq(klubovi.adresa_id, adreseKlub.adresa_id));

    return data.reduce<
        Record<
            number,
            Omit<typeof stadioni.$inferSelect, "lokacija_id" | "adresa_id"> & {
                adresa: Omit<typeof adrese.$inferSelect, "adresa_id"> | null;
                geo_lokacija: Omit<
                    typeof lokacije.$inferSelect,
                    "lokacija_id"
                > | null;
                klubovi: (Omit<
                    typeof klubovi.$inferSelect,
                    "klub_id" | "naziv" | "adresa_id"
                > & {
                    klub_naziv: String;
                    kratica: String;
                    adresa: {
                        klub_drzava: String;
                        klub_grad: String;
                        klub_ulica: String;
                        klub_broj: String | null | undefined;
                    };
                })[];
            }
        >
    >((acc, row) => {
        const stadion = row.stadion;
        const klub = row.klub;
        const adresa = row.adresa;
        const geo_lokacija = row.geo_lokacija;
        const adresaKlub = row.adresaKlub;

        // @ts-ignore
        delete stadion.adresa_id;
        // @ts-ignore
        delete stadion.lokacija_id;
        // @ts-ignore
        delete adresa?.adresa_id;
        // @ts-ignore
        delete geo_lokacija?.lokacija_id;
        // @ts-ignore
        delete adresaKlub?.adresa_id;

        if (!acc[stadion.stadion_id]) {
            acc[stadion.stadion_id] = {
                ...stadion,
                adresa,
                geo_lokacija,
                klubovi: [],
            };
        }
        if (klub) {
            acc[stadion.stadion_id].klubovi.push({
                kratica: klub.klub_id,
                klub_naziv: klub.naziv,
                telefon: klub.telefon,
                email: klub.email,
                web_stranica: klub.web_stranica,
                adresa: {
                    klub_drzava: adresaKlub?.drzava!,
                    klub_grad: adresaKlub?.grad!,
                    klub_ulica: adresaKlub?.ulica!,
                    klub_broj: adresaKlub?.broj,
                },
            });
        }
        return acc;
    }, {});
};

//----------------------------------------------------------------------------

export const insertKlub = async (klub: { [key: string]: any }) => {
    if (!checkKlub(klub)) throw new MissingFieldsError("Missing field in klub");

    const dbKlub = await db.transaction(async (tx) => {
        const adresa = await insertAdrese(klub["adresa"], tx);

        klub.adresa_id = adresa[0].insertedId;

        const dbKlub = await db
            .insert(klubovi)
            .values(klub as any)
            .returning();

        return dbKlub;
    });
    return dbKlub;
};

export const insertStadioni = async (stadion: { [key: string]: any }) => {
    if (!checkStadion(stadion))
        throw new MissingFieldsError("Missing field in stadion");

    const dbStadion = await db.transaction(async (tx) => {
        const adresa = await insertAdrese(stadion["adresa"], tx);
        const lokacija = await insertLokacije(stadion["geo_lokacija"], tx);

        stadion.adresa_id = adresa[0].insertedId;
        stadion.lokacija_id = lokacija[0].insertedId;

        const dbStadion = await db
            .insert(stadioni)
            .values(stadion as any)
            .returning();

        if (stadion.klubovi && stadion.klubovi.length > 0) {
            stadion.klubovi.forEach((klub_id: string) => {
                insertKoristi(dbStadion[0].stadion_id, klub_id, tx);
            });
        }
        return dbStadion;
    });
    return dbStadion;
};

export const insertAdrese = async (
    adresa: { [key: string]: any },
    tx?: any
) => {
    if (!checkAdresa(adresa))
        throw new MissingFieldsError("Missing field in adresa");
    const access = tx || db;
    return await access
        .insert(adrese)
        .values(adresa as any)
        .returning({ insertedId: adrese.adresa_id });
};

export const insertLokacije = async (
    lokacija: { [key: string]: any },
    tx?: any
) => {
    if (!checkLokacija(lokacija))
        throw new MissingFieldsError("Missing field in lokacija");
    const access = tx || db;
    return await access
        .insert(lokacije)
        .values(lokacija as any)
        .returning({ insertedId: lokacije.lokacija_id });
};

export const insertKoristi = async (
    stadionId: number,
    klubId: string,
    tx?: any
) => {
    const access = tx || db;

    const exists_koristi = await db
        .select()
        .from(koristi)
        .where(
            and(eq(koristi.klub_id, klubId), eq(koristi.stadion_id, stadionId))
        );
    if (exists_koristi.length > 0) return;

    const klubovi = await selectKlub(klubId);
    const stadioni = await selectStadion(stadionId);
    if (klubovi != undefined && stadioni != undefined)
        await access
            .insert(koristi)
            .values({ klub_id: klubId, stadion_id: stadionId });
    return;
};

//----------------------------------------------------------------------------------

export const deleteKlub = async (id: string) => {
    const klub = await selectKlub(id);
    if (klub == undefined) throw new NotFoundError("Not Found");

    await db.transaction(async (tx) => {
        await deleteKoristiByKlub(id, tx);
        await tx.delete(klubovi).where(eq(klubovi.klub_id, id));
        await deleteAdresa(klub.adresa_id, tx);
    });
};

export const deleteStadion = async (id: number) => {
    if (!parseInt(`${id}`)) throw new NotFoundError("Invalid ID");
    const stadion = await selectStadion(id);
    if (stadion == undefined) throw new NotFoundError("Not Found");

    await db.transaction(async (tx) => {
        await deleteKoristiByStadion(id, tx);
        await db.delete(stadioni).where(eq(stadioni.stadion_id, id));
        await deleteAdresa(stadion.adresa_id, tx);
        await deleteLokacija(stadion.lokacija_id, tx);
    });
};

export const deleteLokacija = async (id: number, tx?: any) => {
    if (!parseInt(`${id}`)) throw new NotFoundError("Invalid ID");
    const access = tx || db;
    const stadioni = await selectStadionByLokacija(id);
    if (stadioni.length === 0)
        await access.delete(lokacije).where(eq(lokacije.lokacija_id, id));
};

export const deleteAdresa = async (id: number, tx?: any) => {
    const access = tx || db;
    const klubovi = await selectKlubByAdresa(id);
    const stadioni = await selectStadionByAdresa(id);
    if (klubovi.length === 0 && stadioni.length === 0)
        await access.delete(adrese).where(eq(adrese.adresa_id, id));
};

export const deleteKoristiByKlub = async (id: string, tx?: any) => {
    const access = tx || db;
    await access.delete(koristi).where(eq(koristi.klub_id, id));
};

export const deleteKoristiByStadion = async (id: number, tx?: any) => {
    if (!parseInt(`${id}`)) throw new NotFoundError("Invalid ID");
    const access = tx || db;
    await access.delete(koristi).where(eq(koristi.stadion_id, id));
};

export const deleteKoristi = async (
    stadionId: number,
    klubId: string,
    tx?: any
) => {
    if (!parseInt(`${stadionId}`)) throw new NotFoundError("Invalid ID");
    const access = tx || db;
    await access
        .delete(koristi)
        .where(
            and(eq(koristi.klub_id, klubId), eq(koristi.stadion_id, stadionId))
        );
};

//------------------------------------------------------------------------------------

export const updateKlub = async (
    id: string,
    klub: { [key: string]: any },
    strict: boolean
) => {
    if ((await selectKlub(id)) == undefined) throw new NotFoundError("Klub");
    if (strict && !checkKlub(klub))
        throw new MissingFieldsError("Missing fields in klub");
    return await db.transaction(async (tx) => {
        const klb = await tx
            .update(klubovi)
            .set(filterKlub(klub))
            .where(eq(klubovi.klub_id, id))
            .returning();
        if (klub.adresa != undefined)
            updateAdresa(klb[0].adresa_id, klub.adresa, strict, tx);
        return klb;
    });
};

export const updateStadion = async (
    id: number,
    stadion: { [key: string]: any },
    strict: boolean
) => {
    if (!parseInt(`${id}`)) throw new NotFoundError("Invalid ID");
    if ((await selectStadion(id)) == undefined)
        throw new NotFoundError("Stadion");
    if (strict && !checkStadion(stadion))
        throw new MissingFieldsError("Missing fields in stadion");
    return await db.transaction(async (tx) => {
        const std = await tx
            .update(stadioni)
            .set(filterStadion(stadion))
            .where(eq(stadioni.stadion_id, id))
            .returning();
        if (stadion.adresa != undefined)
            updateAdresa(std[0].adresa_id, stadion.adresa, strict, tx);
        if (stadion.geo_lokacija != undefined)
            updateLokacija(
                std[0].lokacija_id,
                stadion.geo_lokacija,
                strict,
                tx
            );
        if (stadion.klubovi) {
            if (strict) {
                deleteKoristiByStadion(id, tx);
            }
            stadion.klubovi.forEach((klub_id: string) => {
                insertKoristi(id, klub_id, tx);
            });
        }
        return std;
    });
};

export const updateAdresa = async (
    id: number,
    adresa: { [key: string]: any },
    strict: boolean,
    tx?: any
) => {
    if (!parseInt(`${id}`)) throw new NotFoundError("Invalid ID");
    const access = tx || db;
    if (strict && !checkAdresa(adresa))
        throw new MissingFieldsError("Missing fields in adresa");
    return await access
        .update(adrese)
        .set(filterAdresa(adresa))
        .where(eq(adrese.adresa_id, id));
};

export const updateLokacija = async (
    id: number,
    lokacija: { [key: string]: any },
    strict: boolean,
    tx?: any
) => {
    if (!parseInt(`${id}`)) throw new NotFoundError("Invalid ID");
    const access = tx || db;
    if (strict && !checkLokacija(lokacija))
        throw new MissingFieldsError("Missing fields in lokacija");
    return await access
        .update(lokacije)
        .set(filterLokacija(lokacija))
        .where(eq(lokacije.lokacija_id, id));
};

//------------------------------------------------------------------------------------

export const replaceStadion = async (
    id: number,
    stadion: { [key: string]: any }
) => {
    if (!parseInt(`${id}`)) throw new NotFoundError("Invalid ID");
    const defaultStadion = {
        kapacitet_tribine: null,
        povrsina_kompleksa: null,
        klubovi: [],
    };
    return updateStadion(id, { ...defaultStadion, ...stadion }, true);
};

export const replaceStadionAdresa = async (
    stadionId: number,
    adresa: { [key: string]: any }
) => {
    if (!parseInt(`${stadionId}`)) throw new NotFoundError("Invalid ID");
    const defaultAdresa = {
        broj: null,
    };

    return updateAdresa(
        (await selectStadion(stadionId))?.adresa_id,
        { ...defaultAdresa, ...adresa },
        true
    );
};

export const replaceStadionLokacija = async (
    stadionId: number,
    lokacija: { [key: string]: any }
) => {
    if (!parseInt(`${stadionId}`)) throw new NotFoundError("Invalid ID");
    const defaultLokacija = {
        nadmorska_visina: null,
    };

    return updateLokacija(
        (await selectStadion(stadionId))?.lokacija_id,
        { ...defaultLokacija, ...lokacija },
        true
    );
};

export const replaceStadionKlubovi = async (
    stadionId: number,
    kluboviId: string[]
) => {
    if (!parseInt(`${stadionId}`)) throw new NotFoundError("Invalid ID");

    await db.transaction(async (tx) => {
        await deleteKoristiByStadion(stadionId, tx);
        let p: Promise<void>[] = []
        kluboviId.forEach(async (klub_id: string) => {
            p.push(insertKoristi(stadionId, klub_id, tx));
        });
        await Promise.all(p);
    });
    
    return await selectStadionKlubovi(stadionId);
};
