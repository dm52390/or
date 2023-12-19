import { pgTable, varchar, serial, foreignKey, integer, boolean, numeric, primaryKey, alias } from "drizzle-orm/pg-core"
import { relations } from 'drizzle-orm';


export const adrese = pgTable("adrese", {
	grad: varchar("grad", { length: 50 }).notNull(),
	drzava: varchar("drzava", { length: 50 }).notNull(),
	ulica: varchar("ulica", { length: 100 }).notNull(),
	broj: varchar("broj", { length: 15 }),
	adresa_id: serial("adresa_id").primaryKey().notNull(),
});

export const adreseKlub = alias(adrese, "adreseKlub")

export const stadioni = pgTable("stadioni", {
	naziv: varchar("naziv", { length: 100 }).notNull(),
	tip: varchar("tip", { length: 50 }).notNull(),
	duzina_staze: integer("duzina_staze").notNull(),
	broj_staza: integer("broj_staza").notNull(),
	broj_skakalista_dalj: integer("broj_skakalista_dalj").notNull(),
	broj_skakalista_vis: integer("broj_skakalista_vis").notNull(),
	broj_skakalista_motka: integer("broj_skakalista_motka").notNull(),
	broj_bacalista_koplje: integer("broj_bacalista_koplje").notNull(),
	broj_bacalista_kugla: integer("broj_bacalista_kugla").notNull(),
	stadion_id: serial("stadion_id").primaryKey().notNull(),
	kapacitet_tribine: integer("kapacitet_tribine"),
	povrsina_kompleksa: integer("povrsina_kompleksa"),
	dozvoljeno_bacanje: boolean("dozvoljeno_bacanje").notNull(),
	broj_bacalista_duga_krug: integer("broj_bacalista_duga_krug").notNull(),
	adresa_id: serial("adresa_id").notNull().references(() => adrese.adresa_id),
	lokacija_id: serial("lokacija_id").notNull().references(() => lokacije.lokacija_id),
});

export const lokacije = pgTable("lokacije", {
	geo_sirina: numeric("geo_sirina").notNull(),
	geo_duzina: numeric("geo_duzina").notNull(),
	nadmorska_visina: numeric("nadmorska_visina"),
	lokacija_id: serial("lokacija_id").primaryKey().notNull(),
});

export const klubovi = pgTable("klubovi", {
	klub_id: varchar("klub_id", { length: 8 }).primaryKey().notNull(),
	naziv: varchar("naziv", { length: 100 }).notNull(),
	telefon: varchar("telefon", { length: 15 }),
	email: varchar("email", { length: 50 }),
	web_stranica: varchar("web_stranica", { length: 200 }),
	adresa_id: serial("adresa_id").notNull().references(() => adrese.adresa_id),
});

export const koristi = pgTable("koristi", {
	stadion_id: serial("stadion_id").notNull().references(() => stadioni.stadion_id),
	klub_id: varchar("klub_id", { length: 8 }).notNull().references(() => klubovi.klub_id),
},
(table) => {
	return {
		koristiPkey: primaryKey({ columns: [table.stadion_id, table.klub_id], name: "koristi_pkey"})
	}
});

export const klubovi_adrese = relations(klubovi, ({ one }) => ({
	adresa: one(adrese, {
		fields: [klubovi.adresa_id],
		references: [adrese.adresa_id]
	}),
}));

export const adrese_klubovi = relations(adrese, ({ many }) => ({
	klubovi: many(klubovi),
}));

export const stadioni_adrese = relations(stadioni, ({ one }) => ({
	adresa: one(adrese, {
		fields: [stadioni.adresa_id],
		references: [adrese.adresa_id]
	}),
}));

export const stadioni_lokacije = relations(stadioni, ({ one }) => ({
	geo_lokacija: one(lokacije, {
		fields: [stadioni.lokacija_id],
		references: [lokacije.lokacija_id]
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
		fields: [koristi.stadion_id],
		references: [stadioni.stadion_id]
	}),
	klubovi: one(klubovi, {
		fields: [koristi.klub_id],
		references: [klubovi.klub_id]
	}),
}));