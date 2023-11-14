import express from 'express';
import { getAll, getAllJSON, getFiltered, getFilteredJSON } from '../db/quarry';
import Papa from 'papaparse';
import * as fs from 'fs-extra'
import path from 'path';

export const downloadAllDataCSV = async (req: express.Request, res: express.Response) => {
    try {
        const data = await getAll();
        const csv = Papa.unparse(data);
        const fileName = path.join(__dirname, `../../tmp/${new Date().getTime()}.csv`);
        
        await fs.outputFile(fileName, csv, {encoding: 'utf-8', flag: 'w'})

        return res.download(fileName);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};

export const downloadFilteredDataCSV = async (req: express.Request, res: express.Response) => {
    const querry = req.query;
    try {
        const data = await getFiltered(querry as any);
        const csv = Papa.unparse(data);
        const fileName = path.join(__dirname, `../../tmp/${new Date().getTime()}.csv`);
        
        await fs.outputFile(fileName, csv, {encoding: 'utf-8', flag: 'w'})

        return res.download(fileName);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};

export const downloadAllDataJSON = async (req: express.Request, res: express.Response) => {
    try {
        const data = await getAllJSON();
        const fileName = path.join(__dirname, `../../tmp/${new Date().getTime()}.json`);
        
        await fs.writeJson(fileName, data, {encoding: 'utf-8', flag: 'w'})

        return res.download(fileName);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};

export const downloadFilteredDataJSON = async (req: express.Request, res: express.Response) => {
    const querry = req.query;
    try {
        const data = await getFilteredJSON(querry as any);
        const fileName = path.join(__dirname, `../../tmp/${new Date().getTime()}.json`);
        
        await fs.writeJson(fileName, data, {encoding: 'utf-8', flag: 'w'})

        return res.download(fileName);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};