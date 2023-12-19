export default function convert(data: {[key: string]: any}[]): {[key: string]: any}[] {
    
    data = data.map(d => {

        const obj = {
            stadion_id: d.stadion_id,
            naziv: d.naziv,
            tip: d.tip,
            duzina_staze: d.duzina_staze,
            broj_staza: d.broj_staza,
            broj_skakalista_dalj: d.broj_skakalista_dalj,
            broj_skakalista_vis: d.broj_skakalista_vis,
            broj_skakalista_motka: d.broj_skakalista_motka,
            broj_bacalista_koplje: d.broj_bacalista_koplje,
            broj_bacalista_kugla: d.broj_bacalista_kugla,
            broj_bacalista_duga_krug: d.broj_bacalista_duga_krug,
            dozvoljeno_bacanje: d.dozvoljeno_bacanje,
            kapacitet_tribine: d.kapacitet_tribine,
            povrsina_kompleksa: d.povrsina_kompleksa,
            adresa: {
                drzava: d.drzava,
                grad: d.grad,
                ulica: d.ulica,
                broj: d.broj
            },
            geo_lokacija: {
                geo_sirina: parseFloat(d.geo_sirina),
                geo_duzina: parseFloat(d.geo_duzina),
                nadmorska_visina: parseInt(d.nadmorska_visina)
            }
        }
        if(d.kratica)
            (obj as any).klubovi = [{
                kratica: d.kratica,
                klub_naziv: d.klub_naziv,
                telefon: d.telefon,
                email: d.email,
                web_stranica: d.web_stranica,
                adresa: {
                    klub_drzava: d.klub_drzava,
                    klub_grad: d.klub_grad,
                    klub_ulica: d.klub_ulica,
                    klub_broj: d.klub_broj
                }
            }
        ]
        return obj
    })

    const temp = new Map();

    for(let d of data) {
        if(temp.get(d.naziv)) {
            if(temp.get(d.naziv).klubovi)
                temp.get(d.naziv).klubovi.push(...d.klubovi)
        } else {
            temp.set(d.naziv, d)
            if(!temp.get(d.naziv).klubovi)
                temp.get(d.naziv).klubovi = null;
        }
    }

    const output = [...temp.values()];

    return output;
}