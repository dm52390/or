import express from 'express';
import data from '../meta/dataset.metadata.json';

export const getMetadata = async (req: express.Request, res: express.Response) => {
    try {
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};