export function checkStadion(stadion: {}) {
    const checkCol = [
        "naziv",
        "tip",
        "duzina_staze",
        "broj_staza",
        "broj_skakalista_dalj",
        "broj_skakalista_vis",
        "broj_skakalista_motka",
        "broj_bacalista_koplje",
        "broj_bacalista_kugla",
        "dozvoljeno_bacanje",
        "broj_bacalista_duga_krug",
        "adresa",
        "geo_lokacija",
    ];
    const stadionCol = Object.keys(stadion);
    if (!checkCol.every((cc) => stadionCol.includes(cc))) return false;
    return true;
}

export function checkAdresa(adresa: {}) {
    const checkCol = ["grad", "drzava", "ulica"];
    const adresaCol = Object.keys(adresa);

    if (!checkCol.every((cc) => adresaCol.includes(cc))) return false;
    return true;
}

export function checkLokacija(lokacija: {}) {
    const checkCol = ["geo_sirina", "geo_duzina"];
    const lokacijaCol = Object.keys(lokacija);

    if (!checkCol.every((cc) => lokacijaCol.includes(cc))) return false;
    return true;
}

export function checkKlub(klub: {}) {
    const checkCol = ["naziv", "adresa"];
    const klubCol = Object.keys(klub);

    if (!checkCol.every((cc) => klubCol.includes(cc))) return false;
    return true;
}

export function filterStadion(stadion: { [key: string]: any }) {
    const filtered: { [key: string]: any } = {};
    if (stadion.naziv !== undefined) filtered.naziv = stadion.naziv;
    if (stadion.tip !== undefined) filtered.tip = stadion.tip;
    if (stadion.duzina_staze !== undefined) filtered.duzina_staze = stadion.duzina_staze;
    if (stadion.broj_staza !== undefined) filtered.broj_staza = stadion.broj_staza;
    if (stadion.broj_skakalista_dalj !== undefined)
        filtered.broj_skakalista_dalj = stadion.broj_skakalista_dalj;
    if (stadion.broj_skakalista_vis !== undefined)
        filtered.broj_skakalista_vis = stadion.broj_skakalista_vis;
    if (stadion.broj_skakalista_motka !== undefined)
        filtered.broj_skakalista_motka = stadion.broj_skakalista_motka;
    if (stadion.broj_bacalista_koplje !== undefined)
        filtered.broj_bacalista_koplje = stadion.broj_bacalista_koplje;
    if (stadion.broj_bacalista_kugla !== undefined)
        filtered.broj_bacalista_kugla = stadion.broj_bacalista_kugla;
    if (stadion.kapacitet_tribine !== undefined)
        filtered.kapacitet_tribine = stadion.kapacitet_tribine;
    if (stadion.povrsina_kompleksa !== undefined)
        filtered.povrsina_kompleksa = stadion.povrsina_kompleksa;
    if (stadion.dozvoljeno_bacanje !== undefined)
        filtered.dozvoljeno_bacanje = stadion.dozvoljeno_bacanje;
    if (stadion.broj_bacalista_duga_krug !== undefined)
        filtered.broj_bacalista_duga_krug = stadion.broj_bacalista_duga_krug;
    return filtered;
}

export function filterKlub(klub: { [key: string]: any }) {
    const filtered: { [key: string]: any } = {};
    if (klub.naziv !== undefined) filtered.naziv = klub.naziv;
    if (klub.telefon !== undefined) filtered.telefon = klub.telefon;
    if (klub.email !== undefined) filtered.email = klub.email;
    if (klub.web_stranica !== undefined) filtered.web_stranica = klub.web_stranica;
    return filtered;
}

export function filterAdresa(adresa: { [key: string]: any }) {
    const filtered: { [key: string]: any } = {};
    if (adresa.drzava !== undefined) filtered.drzava = adresa.drzava;
    if (adresa.grad !== undefined) filtered.grad = adresa.grad;
    if (adresa.ulica !== undefined) filtered.ulica = adresa.ulica;
    if (adresa.broj !== undefined) filtered.broj = adresa.broj;
    return filtered;
}

export function filterLokacija(lokacija: { [key: string]: any }) {
    const filtered: { [key: string]: any } = {};
    if (lokacija.geo_sirina !== undefined) filtered.geo_sirina = lokacija.geo_sirina;
    if (lokacija.geo_duzina !== undefined) filtered.geo_duzina = lokacija.geo_duzina;
    if (lokacija.nadmorska_visina !== undefined)
        filtered.nadmorska_visina = lokacija.nadmorska_visina;
    return filtered;
}
