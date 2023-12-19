export function enricheStadion(stadion: { [key: string]: any }) {
    let enrichedStadion: { [key: string]: any } = {
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
