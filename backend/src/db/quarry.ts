import { sql } from "drizzle-orm";
import { db } from "./index";
import { PgDialect } from 'drizzle-orm/pg-core';
import * as schema from './schema'
import convert from "../helpers/CSVtoJSON";

const getAllCSV = sql.join([
    sql`SELECT * FROM(`,
    sql`SELECT stadioni.naziv, tip, duzina_staze, broj_staza,`,
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
    sql`) as data`
], sql` `)

const columns = (async () => (await db.execute(getAllCSV)).fields.map(f => f.name))();

export const getAll = async () => (await db.execute(getAllCSV)).rows;

export const getAllFiltered = async (filterValue: string, caseSensitive: string) => {
    const querry = sql.empty();
    const tableColumns  = await columns;
    let flag = false;

    for(let c of tableColumns) {
        if(flag) 
            querry.append(sql` OR `);
        else
            querry.append(sql`WHERE `);
        if(caseSensitive && caseSensitive === 'true')
            querry.append(sql`CAST(${sql.raw(c)} as varchar) LIKE ${'%' + filterValue + '%'}`);
        else
            querry.append(sql`LOWER(CAST(${sql.raw(c)} as varchar)) LIKE LOWER(${'%' + filterValue + '%'})`);
        flag = true;
    }

    return (await db.execute(sql.join([getAllCSV, querry], sql` `))).rows;
}

export const getFiltered = async (filter?: {[field:string]: string}) => {
    if(!filter)
        return getAll();

    if(filter['all']) {
        return getAllFiltered(filter['all'], filter['case']);
    }

    const querry = sql.empty();
    const tableColumns  = await columns;

    let flag = false;
    let caseSensitive = filter['case'];

    for(let field in filter) {
        if(tableColumns.includes(field)) {
            if(flag) 
                querry.append(sql` AND `);
            else
                querry.append(sql`WHERE `);
            if(caseSensitive && caseSensitive === 'true')
                querry.append(sql`CAST(${sql.raw(field)} as varchar) LIKE ${'%' + filter[field] + '%'}`);
            else
                querry.append(sql`LOWER(CAST(${sql.raw(field)} as varchar)) LIKE LOWER(${'%' + filter[field] + '%'})`);
            flag = true;
        }
    }

    return (await db.execute(sql.join([getAllCSV, querry], sql` `))).rows;
};

export const getAllJSON = async () => {
    const data = await getAll();

    return convert(data);
}

export const getFilteredJSON = async (filter?: {[field:string]: string}) => {
    const data = await getFiltered(filter);

    return convert(data);
}