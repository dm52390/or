docker exec -u postgres mojaBazaSpremnik psql -d ORbaza -c "COPY (SELECT array_to_json(array_agg(obj))
	FROM (
		SELECT naziv, tip, duzina_staze, broj_staza,
			broj_skakalista_dalj, broj_skakalista_vis,
			broj_skakalista_motka, broj_bacalista_koplje,
			broj_bacalista_kugla, broj_bacalista_duga_krug,
			dozvoljeno_bacanje, kapacitet_tribine, povrsina_kompleksa,
			(
				SELECT row_to_json(adr) adresa
					FROM (
						SELECT drzava, grad, ulica, broj
							FROM adrese
							WHERE stadioni.adresa_id = adrese.adresa_id
					) adr
			),
			(
				SELECT row_to_json(lok) geo_lokacija
					FROM (
						SELECT geo_sirina, geo_duzina, nadmorska_visina
							FROM lokacije
							WHERE stadioni.lokacija_id = lokacije.lokacija_id
					) lok
			),
			(
				SELECT array_to_json(array_agg(klub)) klubovi
					FROM (
						SELECT klub_id as kratica, naziv, telefon, email, web_stranica,
							(
								SELECT row_to_json(adr) adresa
									FROM (
										SELECT drzava, grad, ulica, broj
											FROM adrese
											WHERE klubovi.adresa_id = adrese.adresa_id
									) adr
							)
							FROM koristi
								NATURAL JOIN klubovi
								NATURAL JOIN adrese
							WHERE stadioni.stadion_id = koristi.stadion_id
					) klub
			)
			FROM stadioni
	) obj) TO STDOUT" > novi_json.json