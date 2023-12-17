import { pgTable, varchar, serial, foreignKey, integer, boolean, numeric, primaryKey } from "drizzle-orm/pg-core"
import { relations } from 'drizzle-orm';


export const adrese = pgTable("adrese", {
	grad: varchar("grad", { length: 50 }).notNull(),
	drzava: varchar("drzava", { length: 50 }).notNull(),
	ulica: varchar("ulica", { length: 100 }).notNull(),
	broj: varchar("broj", { length: 15 }),
	adresaId: serial("adresa_id").primaryKey().notNull(),
});

export const stadioni = pgTable("stadioni", {
	naziv: varchar("naziv", { length: 100 }).notNull(),
	tip: varchar("tip", { length: 50 }).notNull(),
	duzinaStaze: integer("duzina_staze").notNull(),
	brojStaza: integer("broj_staza").notNull(),
	brojSkakalistaDalj: integer("broj_skakalista_dalj").notNull(),
	brojSkakalistaVis: integer("broj_skakalista_vis").notNull(),
	brojSkakalistaMotka: integer("broj_skakalista_motka").notNull(),
	brojBacalistaKoplje: integer("broj_bacalista_koplje").notNull(),
	brojBacalistaKugla: integer("broj_bacalista_kugla").notNull(),
	stadionId: serial("stadion_id").primaryKey().notNull(),
	kapacitetTribine: integer("kapacitet_tribine"),
	povrsinaKompleksa: integer("povrsina_kompleksa"),
	dozvoljenoBacanje: boolean("dozvoljeno_bacanje").notNull(),
	brojBacalistaDugaKrug: integer("broj_bacalista_duga_krug").notNull(),
	adresaId: serial("adresa_id").notNull().references(() => adrese.adresaId),
	lokacijaId: serial("lokacija_id").notNull().references(() => lokacije.lokacijaId),
});

export const lokacije = pgTable("lokacije", {
	geoSirina: numeric("geo_sirina").notNull(),
	geoDuzina: numeric("geo_duzina").notNull(),
	nadmorskaVisina: numeric("nadmorska_visina"),
	lokacijaId: serial("lokacija_id").primaryKey().notNull(),
});

export const klubovi = pgTable("klubovi", {
	klubId: varchar("klub_id", { length: 8 }).primaryKey().notNull(),
	naziv: varchar("naziv", { length: 100 }).notNull(),
	telefon: varchar("telefon", { length: 15 }),
	email: varchar("email", { length: 50 }),
	webStranica: varchar("web_stranica", { length: 200 }),
	adresaId: serial("adresa_id").notNull().references(() => adrese.adresaId),
});

export const koristi = pgTable("koristi", {
	stadionId: serial("stadion_id").notNull().references(() => stadioni.stadionId),
	klubId: varchar("klub_id", { length: 8 }).notNull().references(() => klubovi.klubId),
},
(table) => {
	return {
		koristiPkey: primaryKey({ columns: [table.stadionId, table.klubId], name: "koristi_pkey"})
	}
});

export const klubovi_adrese = relations(klubovi, ({ one }) => ({
	adresa: one(adrese, {
		fields: [klubovi.adresaId],
		references: [adrese.adresaId]
	}),
}));

export const adrese_klubovi = relations(adrese, ({ many }) => ({
	klubovi: many(klubovi),
}));

export const stadioni_adrese = relations(stadioni, ({ one }) => ({
	adresa: one(adrese, {
		fields: [stadioni.adresaId],
		references: [adrese.adresaId]
	}),
}));

export const stadioni_lokacije = relations(stadioni, ({ one }) => ({
	geo_lokacija: one(lokacije, {
		fields: [stadioni.lokacijaId],
		references: [lokacije.lokacijaId]
	}),
}));

export const stadioni_koristi = relations(stadioni, ({ many }) => ({
	klubovi: many(koristi),
}));

export const klubovi_koristi = relations(klubovi, ({ many }) => ({
	klubovi: many(koristi),
}));

export const koristi_veza = relations(koristi, ({ one }) => ({
	stadioni: one(stadioni, {
		fields: [koristi.stadionId],
		references: [stadioni.stadionId]
	}),
	klubovi: one(klubovi, {
		fields: [koristi.klubId],
		references: [klubovi.klubId]
	}),
}));