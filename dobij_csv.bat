docker exec -u postgres mojaBazaSpremnik psql -d ORbaza -c "COPY (SELECT stadioni.naziv, tip, duzina_staze, broj_staza,
	broj_skakalista_dalj, broj_skakalista_vis,
	broj_skakalista_motka, broj_bacalista_koplje,
	broj_bacalista_kugla, broj_bacalista_duga_krug,
	dozvoljeno_bacanje, kapacitet_tribine, povrsina_kompleksa,
	adrese.drzava, adrese.grad, adrese.ulica, adrese.broj,
	lokacije.geo_sirina, lokacije.geo_duzina, lokacije.nadmorska_visina,
	klub.klub_id as kratica, klub.naziv, klub.telefon,
	klub.email, klub.web_stranica, klub.drzava as klub_drzava, klub.grad as klub_grad,
	klub.ulica as klub_ulica, klub.broj as klub_broj
	FROM stadioni
		NATURAL LEFT JOIN adrese
		NATURAL LEFT JOIN lokacije
		LEFT JOIN (
			SELECT *
				FROM koristi
					NATURAL JOIN klubovi
					NATURAL JOIN adrese
		) as klub ON klub.stadion_id = stadioni.stadion_id) TO STDOUT CSV HEADER" > novi_csv.csv