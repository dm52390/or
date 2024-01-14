export function enricheStadion(stadion: { [key: string]: any }) {
    let enrichedStadion: { [key: string]: any } = {
        "@context": {
			"@vocab": "http://schema.org/",
            "adresa": "address",
            "drzava": "addressCountry",
            "grad": "addressRegion",
            "naziv": "legalName",
            "ulica": "streetAddress",
            "broj": "streetAddress",
            "geo_lokacija": "geo",
            "geo_sirina": "latitude",
            "geo_duzina": "longitude",
            "nadmorska_visina": "elevation",
            "klubovi": "member",
            "kapacitet_tribine": "maximumAttendeeCapacity",
            "stadion_id": "identifier",
            "povrsina_kompleksa": "area",
            "broj_staza": "description",
            "broj_skakalista_dalj": "description",
            "broj_skakalista_motka": "description",
            "broj_skakalista_vis": "description",
            "broj_bacalista_koplje": "description",
            "broj_bacalista_kugla": "description",
            "broj_bacalista_duga_krug": "description",
            "dozvoljeno_bacanje": "description",
            "duzina_staze": "description",
            "tip": "description",
            "links": "potentialAction",
            "href": "target",
            "rel": "name",
            "type": "description"
        },
		"@type": "StadiumOrArena",
        ...stadion,
        links: [
            {
                href: "/api/stadioni/" + stadion["stadion_id"],
                rel: "self",
                type: "GET",
            },
            // {
            //     href: "/api/stadioni/" + stadion["stadion_id"],
            //     rel: "delete",
            //     type: "DELETE",
            // },
            // {
            //     href: "/api/stadioni/" + stadion["stadion_id"],
            //     rel: "replace",
            //     type: "PUT",
            // },
        ],
    };

    if (enrichedStadion["geo_lokacija"] != undefined) {
        enrichedStadion["geo_lokacija"]["@type"] = "GeoCoordinates";
        enrichedStadion.links.push({
            href: "/api/stadioni/" + stadion["stadion_id"] + "/lokacija",
            rel: "lokacija",
            type: "GET",
        });
    }

    if (enrichedStadion["adresa"] != undefined) {
        enrichedStadion.links.push({
            href: "/api/stadioni/" + stadion["stadion_id"] + "/adresa",
            rel: "adresa",
            type: "GET",
        });
    }

    if (enrichedStadion["klubovi"] != undefined && enrichedStadion["klubovi"].length > 0) {
        enrichedStadion["klubovi"] = enrichedStadion["klubovi"].map(
            (klub: { [key: string]: any }) => enricheKlub(klub)
        );
        enrichedStadion.links.push({
            href: "/api/stadioni/" + stadion["stadion_id"] + "/klubovi",
            rel: "klubovi",
            type: "GET",
        });
    }

    return enrichedStadion;
}

export function enricheKlub(klub: { [key: string]: any }) {
    let enrichedKlub: { [key: string]: any } = {
        "@context": {
			"@vocab": "http://schema.org/",
            "klub_naziv": "legalName",
            "kratica": "identifier",
            "telefon": "telephone",
            "web_stranica": "keywords",
            "adresa": "address",
            "klub_drzava": "addressCountry",
            "klub_grad": "addressRegion",
            "klub_ulica": "streetAddress",
            "klub_broj": "streetAddress",
            "drzava": "addressCountry",
            "grad": "addressRegion",
            "naziv": "legalName",
            "ulica": "streetAddress",
            "broj": "streetAddress",
            "links": "potentialAction",
            "href": "target",
            "rel": "name",
            "type": "description"
        },
		"@type": "SportsClub",
        ...klub,
        links: [
            {
                href: "/api/klubovi/" + (klub["kratica"] || klub["klub_id"]),
                rel: "self",
                type: "GET",
            },
        ],
    };

    if (enrichedKlub["adresa"] != undefined) {
        enrichedKlub.links.push({
            href: "/api/klubovi/" + klub["kratica"] + "/adresa",
            rel: "adresa",
            type: "GET",
        });
    }

    return enrichedKlub;
}
