# Kolegij Otvoreno računarstvo
Repozitorij za laboratorijske vježbe
## Autor
Domagoj Mutić
## Verzija skupa
1.1
## Naziv skupa
Atletski stadioni u hrvatskoj
## Jezik skupa
hrvatski
## Datum objave
2023-10-31
## Opis podataka
| Atribut | Opis | Tip podatka | Mjerna jedinica | Standard |
|---|---|---|---|---|
| **naziv** | ime atletskog stadiona | string |  |  | 
| **tip** | tip atletskog stadiona. Može biti 'Specijalistički' (namijenjen prvenstveno i jedino atletici) ili 'Integrirani'. Uz to može biti 'dvorana' ili 'stadion'. Posebna kategorija je 'Školsko igralište'. | string |  |  | 
| **duzina_staze** | dužina atletske staze. Mjerna jedinica je metar. Predstavlja dužinu kruga kod kružnih staza (200m i više) ili dužinu ravnine staze. | int | m |  | 
| **broj_staza** | broj atletskih staza | int |  |  | 
| **broj_skakalista_dalj** | broj jama za skok u dalj (+ pripadajuće zaletište) | int |  |  | 
| **broj_skakalista_vis** | broj strunjača za skok u vis (+ pripadajuće zaletište) | int |  |  | 
| **broj_skakalista_motka** | broj strunjača za skok s motkom (+ pripadajuće zaletište) | int |  |  | 
| **broj_bacalista_koplje** | broj ravnina (zaletišta) za bacanje koplja | int |  |  | 
| **broj_bacalista_kugla** | broj krugova za bacanje kugle | int |  |  | 
| **broj_bacalista_duga_krug** | broj krugova za bacanje diska i/ili kladiva (bez obzira imaju li pripadajuću mrežu) | int |  |  | 
| **dozvoljeno_bacanje** | oznaka true (t) ili false (f) koja označava dopuštenje za korištenje bacališta. Bacanje na bacalištima za kuglu je uglavnom dopušteno bez obzira na oznaku. | boolean |  |  | 
| **kapacitet_tribine** | broj sjedećih mjesta na tribini. Ne uključuje privremeno montirane tribine. (može biti nedefiniran) | int |  |  | 
| **povrsina_kompleksa** | površina stadiona, tribina i ostalih okolnih objekata. Može uključivati i bazene, teniske terene... koji pripadaju istom kompleksu | int | m² |  | 
| **drzava** | država u kojoj se atletski stadion nalazi | string |  |  | 
| **grad** | grad u kojem se atletski stadion nalazi | string |  |  | 
| **ulica** | ulica u kojoj se atletski stadion nalazi | string |  |  | 
| **broj** | kućni broj na kojem se atletski stadion nalazi (nije uvijek primjenjivo tj. može biti nedefiniran) | string |  |  | 
| **geo_sirina** | geografska širina na kojoj se nalazi središte atletskog stadiona | float | N | WGS84 | 
| **geo_duzina** | geografska dužina na kojoj se nalazi središte atletskog stadiona | float | E | WGS84 | 
| **nadmorska_visina** | nadmorska visina na kojoj se nalazi središte atletskog stadiona u metrima. | int | m |  | 
| **kratica** | identifikator kluba koji koristi atletski stadion | string |  |  | 
| **klub_naziv** | ime kluba koji koristi atletski stadion | string |  |  | 
| **telefon** | telefonski broj kluba koji koristi atletski stadion (može biti nedefinirano) | string |  |  | 
| **email** | email adresa kluba koji koristi atletski stadion (može biti nedefinirano) | string |  |  | 
| **web_stranica** | web stranica kluba koji koristi atletski stadion (može biti nedefinirano) | string |  |  | 
| **klub_drzava** | država u kojoj klub djeluje | string |  |  | 
| **klub_grad** | grad u kojem klub djeluje | string |  |  | 
| **klub_ulica** | ulica na kojoj je klub registriran | string |  |  | 
| **klub_broj** | kućni broj na kojem je klub registriran | string |  |  |
## Format lokacije
WGS84
## Mjerna jedinica udaljenosti i visine
metar (m)
## Mjerna jedinica površine
metar kvadratni (m²)
## Geografsko područje
Hrvatska
## Tema
Sportski objekti, Atletski stadioni
## Licencija
This work is licensed under CC BY 4.0 
