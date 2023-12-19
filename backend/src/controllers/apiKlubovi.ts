import express from "express";
import { selectKlub, selectKlubAdresa, selectKlubAll } from "../db/quarry";
import { enricheKlub } from "../helpers/hateoas";
import { NotFoundError } from "../errors/errorTypes";

export const getKlubovi = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const data = await selectKlubAll();

        if (data.length === 0)
            return res.status(404).json({
                status: "Not Found",
                message: "Nije pronađen niti jedan klub",
                reponse: null,
            });

        let linkData = data.map((klub) => enricheKlub(klub));

        return res.status(200).json({
            status: "OK",
            message: "Dohvatio sve klubove",
            reponse: linkData,
        });
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
};

export const getKluboviId = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const data = await selectKlub(req.params["klubId"]);

        if (data == undefined)
            return res.status(404).json({
                status: "Not Found",
                message: "Nije pronađen klub pod traženim id-em",
                reponse: null,
            });

        let linkData = enricheKlub(data);

        return res.status(200).json({
            status: "OK",
            message: "Dohvatio klub",
            reponse: linkData,
        });
    } catch (e) {
        if (e instanceof NotFoundError) {
            return res.status(404).json({
                status: "Not Found",
                message: "Nije pronađen klub pod traženim id-em",
                reponse: null,
            });
        }
        console.log(e);
        return res.sendStatus(500);
    }
};

export const getKluboviIdAdresa = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const data = await selectKlubAdresa(
            req.params["klubId"]
        );

        if (data.length === 0)
            return res.status(404).json({
                status: "Not Found",
                message: "Nije pronađen klub pod traženim id-em",
                reponse: null,
            });

        return res.status(200).json({
            status: "OK",
            message: "Dohvatio adrese kluba",
            reponse: {
                ...data[0],
                links: [
                    {
                        rel: "parent",
                        href: "/api/klubovi/" + req.params["klubId"],
                        type: "GET",
                    },
                ],
            },
        });
    } catch (e) {
        if (e instanceof NotFoundError) {
            return res.status(404).json({
                status: "Not Found",
                message: "Nije pronađen klub pod traženim id-em",
                reponse: null,
            });
        }
        console.log(e);
        return res.sendStatus(500);
    }
};