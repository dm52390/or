import express from "express";
import {
    deleteKoristi,
    deleteStadion,
    getAllJSON,
    getFilteredJSON,
    insertStadioni,
    replaceStadion,
    replaceStadionAdresa,
    replaceStadionKlubovi,
    replaceStadionLokacija,
    selectStadionAdresa,
    selectStadionExpanded,
    selectStadionExpandedAll,
    selectStadionKlubovi,
    selectStadionLokacija,
} from "../db/quarry";
import { enricheKlub, enricheStadion } from "../helpers/hateoas";
import { MissingFieldsError, NotFoundError } from "../errors/errorTypes";

// ---------- GET ----------
export const getStadioni = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const data = Object.values(await selectStadionExpandedAll());

        if (data.length === 0)
            return res.status(404).json({
                status: "Not Found",
                message: "Nije pronađen niti jedan stadion",
                reponse: null,
            });

        let linkData = data.map((stadion) => enricheStadion(stadion));

        return res.status(200).json({
            status: "OK",
            message: "Dohvatio sve stadione",
            reponse: linkData,
        });
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
};

export const getStadioniId = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const data = Object.values(
            await selectStadionExpanded(parseInt(req.params["stadionId"]))
        );

        if (data.length === 0)
            return res.status(404).json({
                status: "Not Found",
                message: "Nije pronađen stadion pod traženim id-em",
                reponse: null,
            });

        let linkData = enricheStadion(data[0]);

        return res.status(200).json({
            status: "OK",
            message: "Dohvatio stadion",
            reponse: linkData,
        });
    } catch (e) {
        if (e instanceof NotFoundError) {
            return res.status(404).json({
                status: "Not Found",
                message: "Nije pronađen stadion pod traženim id-em",
                reponse: null,
            });
        }
        console.log(e);
        return res.sendStatus(500);
    }
};

export const getStadioniIdAdresa = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const data = await selectStadionAdresa(
            parseInt(req.params["stadionId"])
        );

        if (data == undefined)
            return res.status(404).json({
                status: "Not Found",
                message: "Nije pronađen stadion pod traženim id-em",
                reponse: null,
            });

        return res.status(200).json({
            status: "OK",
            message: "Dohvatio adresu stadiona",
            reponse: {
                ...data,
                links: [
                    {
                        rel: "parent",
                        href: "/api/stadioni/" + req.params["stadionId"],
                        type: "GET",
                    },
                ],
            },
        });
    } catch (e) {
        if (e instanceof NotFoundError) {
            return res.status(404).json({
                status: "Not Found",
                message: "Nije pronađen stadion pod traženim id-em",
                reponse: null,
            });
        }
        console.log(e);
        return res.sendStatus(500);
    }
};

export const getStadioniIdLokacija = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const data = await selectStadionLokacija(
            parseInt(req.params["stadionId"])
        );

        if (data == undefined)
            return res.status(404).json({
                status: "Not Found",
                message: "Nije pronađen stadion pod traženim id-em",
                reponse: null,
            });

        return res.status(200).json({
            status: "OK",
            message: "Dohvatio lokaciju stadiona",
            reponse: {
                ...data,
                links: [
                    {
                        rel: "parent",
                        href: "/api/stadioni/" + req.params["stadionId"],
                        type: "GET",
                    },
                ],
            },
        });
    } catch (e) {
        if (e instanceof NotFoundError) {
            return res.status(404).json({
                status: "Not Found",
                message: "Nije pronađen stadion pod traženim id-em",
                reponse: null,
            });
        }
        console.log(e);
        return res.sendStatus(500);
    }
};

export const getStadioniIdKlubovi = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const data = Object.values(
            await selectStadionKlubovi(parseInt(req.params["stadionId"]))
        );

        if (data.length === 0)
            return res.status(404).json({
                status: "Not Found",
                message:
                    "Nije pronađen stadion pod traženim id-em ili stadion nema niti jedan klub",
                reponse: null,
            });

        let linkData = data.map((klub: {}) => enricheKlub(klub));

        return res.status(200).json({
            status: "OK",
            message: "Dohvatio lokaciju stadiona",
            reponse: linkData,
        });
    } catch (e) {
        if (e instanceof NotFoundError) {
            return res.status(404).json({
                status: "Not Found",
                message: "Nije pronađen stadion pod traženim id-em",
                reponse: null,
            });
        }
        console.log(e);
        return res.sendStatus(500);
    }
};

export const getStadioniIdKluboId = async (
    req: express.Request,
    res: express.Response
) => {
    res.redirect("/klubovi/" + req.params["klubId"]);
};

// ---------- POST ----------
export const postStadioni = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const data = req.body;
        const stadion = await insertStadioni(data);
        const linkData = enricheStadion(stadion[0]);

        return res
            .status(201)
            .location("/api/stadioni/" + stadion[0].stadion_id)
            .json({
                status: "Created",
                message: "Stvoren novi stadion",
                reponse: linkData,
            });
    } catch (e) {
        console.log(e);
        if (e instanceof MissingFieldsError) {
            return res.status(400).json({
                status: "Bad Request",
                message: "Nedostaju polja",
                reponse: null,
            });
        }
        return res.sendStatus(500);
    }
};

// ---------- DELETE ----------
export const deleteStadioniId = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const id = parseInt(req.params["stadionId"]);
        const stadion = await deleteStadion(id);

        return res.status(200).json({
            status: "OK",
            message: "Stadion izbrisan",
            reponse: {
                stadion_id: id,
                deleted: true,
                links: [
                    {
                        rel: "back",
                        href: "/api/stadioni",
                        type: "GET",
                    },
                ],
            },
        });
    } catch (e) {
        console.log(e);
        if (e instanceof NotFoundError) {
            return res.status(404).json({
                status: "Not Found",
                message: "Nije pronađen stadion pod traženim id-em",
                reponse: null,
            });
        }
        return res.sendStatus(500);
    }
};

export const deleteStadioniIdKluboId = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const stadionid = parseInt(req.params["stadionId"]);
        const klubid = req.params["klubId"];
        const stadion = await deleteKoristi(stadionid, klubid);

        return res.status(200).json({
            status: "OK",
            message: "Klub izbrisan iz liste",
            reponse: {
                stadion_id: stadionid,
                klub_id: klubid,
                deleted: true,
                links: [
                    {
                        rel: "self",
                        href: "/api/stadioni/" + stadionid + "/klubovi",
                        type: "GET",
                    },
                ],
            },
        });
    } catch (e) {
        console.log(e);
        if (e instanceof NotFoundError) {
            return res.status(404).json({
                status: "Not Found",
                message: "Nije pronađen stadion ili klub pod traženim id-em",
                reponse: null,
            });
        }
        return res.sendStatus(500);
    }
};

// ---------- PUT ----------
export const putStadioniId = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const data = req.body;
        const stadion = await replaceStadion(
            parseInt(req.params["stadionId"]),
            data
        );
        const linkData = enricheStadion(stadion[0]);

        return res.status(200).json({
            status: "OK",
            message: "Stadion ažuriran",
            reponse: linkData,
        });
    } catch (e) {
        console.log(e);
        if (e instanceof MissingFieldsError) {
            return res.status(400).json({
                status: "Bad Request",
                message: "Nedostaju polja",
                reponse: null,
            });
        }
        if (e instanceof NotFoundError) {
            return res.status(404).json({
                status: "Not Found",
                message: "Nije pronađen stadion pod traženim id-em",
                reponse: null,
            });
        }
        return res.sendStatus(500);
    }
};

export const putStadioniIdAdresa = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const data = req.body;
        const adresa = await replaceStadionAdresa(
            parseInt(req.params["stadionId"]),
            data
        );

        return res.status(200).json({
            status: "OK",
            message: "Adresa stadiona ažuriran",
            reponse: {
                ...data,
                links: [
                    {
                        rel: "parent",
                        href: "/api/stadioni/" + req.params["stadionId"],
                        type: "GET",
                    },
                ],
            },
        });
    } catch (e) {
        console.log(e);
        if (e instanceof MissingFieldsError) {
            return res.status(400).json({
                status: "Bad Request",
                message: "Nedostaju polja",
                reponse: null,
            });
        }
        if (e instanceof NotFoundError) {
            return res.status(404).json({
                status: "Not Found",
                message: "Nije pronađen stadion pod traženim id-em",
                reponse: null,
            });
        }
        return res.sendStatus(500);
    }
};

export const putStadioniIdLokacija = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const data = req.body;
        const lokacija = await replaceStadionLokacija(
            parseInt(req.params["stadionId"]),
            data
        );

        return res.status(200).json({
            status: "OK",
            message: "Lokacija stadiona ažuriran",
            reponse: {
                ...data,
                links: [
                    {
                        rel: "parent",
                        href: "/api/stadioni/" + req.params["stadionId"],
                        type: "GET",
                    },
                ],
            },
        });
    } catch (e) {
        console.log(e);
        if (e instanceof MissingFieldsError) {
            return res.status(400).json({
                status: "Bad Request",
                message: "Nedostaju polja",
                reponse: null,
            });
        }
        if (e instanceof NotFoundError) {
            return res.status(404).json({
                status: "Not Found",
                message: "Nije pronađen stadion pod traženim id-em",
                reponse: null,
            });
        }
        return res.sendStatus(500);
    }
};

export const putStadioniIdKlubovi = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const data = req.body;
        const klubovi = Object.values(await replaceStadionKlubovi(
            parseInt(req.params["stadionId"]),
            data
        ));

        const linkData = klubovi.map((klub: {}) => enricheKlub(klub));

        return res.status(200).json({
            status: "OK",
            message: "Klubovi stadiona ažurirani",
            reponse: {
                ...linkData,
                links: [
                    {
                        rel: "parent",
                        href: "/api/stadioni/" + req.params["stadionId"],
                        type: "GET",
                    },
                ],
            },
        });
    } catch (e) {
        console.log(e);
        if (e instanceof MissingFieldsError) {
            return res.status(400).json({
                status: "Bad Request",
                message: "Nedostaju polja",
                reponse: null,
            });
        }
        if (e instanceof NotFoundError) {
            return res.status(404).json({
                status: "Not Found",
                message: "Nije pronađen stadion ili klub pod traženim id-em",
                reponse: null,
            });
        }
        return res.sendStatus(500);
    }
};