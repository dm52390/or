import express from 'express';
import { getAll, getFiltered } from '../db/quarry';

export const getAllData = async (req: express.Request, res: express.Response) => {
    try {
        const data = await getAll();

        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};

export const getFilteredData = async (req: express.Request, res: express.Response) => {
    const querry = req.query;
    try {
        const data = await getFiltered(querry as any);

        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};