--
-- PostgreSQL database dump
--

-- Dumped from database version 15.0
-- Dumped by pg_dump version 15.0

-- Started on 2023-10-30 23:23:30

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 34265)
-- Name: adrese; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.adrese (
    grad character varying(50) NOT NULL,
    drzava character varying(50) NOT NULL,
    ulica character varying(100) NOT NULL,
    broj character varying(15),
    adresa_id integer NOT NULL
);


ALTER TABLE public.adrese OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 34264)
-- Name: adrese_adresa_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.adrese_adresa_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.adrese_adresa_id_seq OWNER TO postgres;

--
-- TOC entry 3376 (class 0 OID 0)
-- Dependencies: 214
-- Name: adrese_adresa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.adrese_adresa_id_seq OWNED BY public.adrese.adresa_id;


--
-- TOC entry 223 (class 1259 OID 34302)
-- Name: klubovi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.klubovi (
    klub_id character varying(8) NOT NULL,
    naziv character varying(100) NOT NULL,
    telefon character varying(15),
    email character varying(50),
    web_stranica character varying(200),
    adresa_id integer NOT NULL
);


ALTER TABLE public.klubovi OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 34301)
-- Name: klubovi_adresa_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.klubovi_adresa_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.klubovi_adresa_id_seq OWNER TO postgres;

--
-- TOC entry 3377 (class 0 OID 0)
-- Dependencies: 222
-- Name: klubovi_adresa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.klubovi_adresa_id_seq OWNED BY public.klubovi.adresa_id;


--
-- TOC entry 225 (class 1259 OID 34314)
-- Name: koristi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.koristi (
    stadion_id integer NOT NULL,
    klub_id character varying(8) NOT NULL
);


ALTER TABLE public.koristi OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 34313)
-- Name: koristi_stadion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.koristi_stadion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.koristi_stadion_id_seq OWNER TO postgres;

--
-- TOC entry 3378 (class 0 OID 0)
-- Dependencies: 224
-- Name: koristi_stadion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.koristi_stadion_id_seq OWNED BY public.koristi.stadion_id;


--
-- TOC entry 217 (class 1259 OID 34272)
-- Name: lokacije; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lokacije (
    geo_sirina numeric NOT NULL,
    geo_duzina numeric NOT NULL,
    nadmorska_visina numeric,
    lokacija_id integer NOT NULL
);


ALTER TABLE public.lokacije OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 34271)
-- Name: lokacije_lokacija_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lokacije_lokacija_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lokacije_lokacija_id_seq OWNER TO postgres;

--
-- TOC entry 3379 (class 0 OID 0)
-- Dependencies: 216
-- Name: lokacije_lokacija_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lokacije_lokacija_id_seq OWNED BY public.lokacije.lokacija_id;


--
-- TOC entry 221 (class 1259 OID 34283)
-- Name: stadioni; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stadioni (
    naziv character varying(100) NOT NULL,
    tip character varying(50) NOT NULL,
    duzina_staze integer NOT NULL,
    broj_staza integer NOT NULL,
    broj_skakalista_dalj integer NOT NULL,
    broj_skakalista_vis integer NOT NULL,
    broj_skakalista_motka integer NOT NULL,
    broj_bacalista_koplje integer NOT NULL,
    broj_bacalista_kugla integer NOT NULL,
    stadion_id integer NOT NULL,
    kapacitet_tribine integer,
    povrsina_kompleksa integer,
    dozvoljeno_bacanje boolean NOT NULL,
    broj_bacalista_duga_krug integer NOT NULL,
    adresa_id integer NOT NULL,
    lokacija_id integer NOT NULL
);


ALTER TABLE public.stadioni OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 34281)
-- Name: stadioni_adresa_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stadioni_adresa_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stadioni_adresa_id_seq OWNER TO postgres;

--
-- TOC entry 3380 (class 0 OID 0)
-- Dependencies: 219
-- Name: stadioni_adresa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.stadioni_adresa_id_seq OWNED BY public.stadioni.adresa_id;


--
-- TOC entry 220 (class 1259 OID 34282)
-- Name: stadioni_lokacija_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stadioni_lokacija_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stadioni_lokacija_id_seq OWNER TO postgres;

--
-- TOC entry 3381 (class 0 OID 0)
-- Dependencies: 220
-- Name: stadioni_lokacija_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.stadioni_lokacija_id_seq OWNED BY public.stadioni.lokacija_id;


--
-- TOC entry 218 (class 1259 OID 34280)
-- Name: stadioni_stadion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stadioni_stadion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stadioni_stadion_id_seq OWNER TO postgres;

--
-- TOC entry 3382 (class 0 OID 0)
-- Dependencies: 218
-- Name: stadioni_stadion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.stadioni_stadion_id_seq OWNED BY public.stadioni.stadion_id;


--
-- TOC entry 3195 (class 2604 OID 34268)
-- Name: adrese adresa_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adrese ALTER COLUMN adresa_id SET DEFAULT nextval('public.adrese_adresa_id_seq'::regclass);


--
-- TOC entry 3200 (class 2604 OID 34305)
-- Name: klubovi adresa_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.klubovi ALTER COLUMN adresa_id SET DEFAULT nextval('public.klubovi_adresa_id_seq'::regclass);


--
-- TOC entry 3201 (class 2604 OID 34317)
-- Name: koristi stadion_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.koristi ALTER COLUMN stadion_id SET DEFAULT nextval('public.koristi_stadion_id_seq'::regclass);


--
-- TOC entry 3196 (class 2604 OID 34275)
-- Name: lokacije lokacija_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lokacije ALTER COLUMN lokacija_id SET DEFAULT nextval('public.lokacije_lokacija_id_seq'::regclass);


--
-- TOC entry 3197 (class 2604 OID 34286)
-- Name: stadioni stadion_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stadioni ALTER COLUMN stadion_id SET DEFAULT nextval('public.stadioni_stadion_id_seq'::regclass);


--
-- TOC entry 3198 (class 2604 OID 34287)
-- Name: stadioni adresa_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stadioni ALTER COLUMN adresa_id SET DEFAULT nextval('public.stadioni_adresa_id_seq'::regclass);


--
-- TOC entry 3199 (class 2604 OID 34288)
-- Name: stadioni lokacija_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stadioni ALTER COLUMN lokacija_id SET DEFAULT nextval('public.stadioni_lokacija_id_seq'::regclass);


--
-- TOC entry 3360 (class 0 OID 34265)
-- Dependencies: 215
-- Data for Name: adrese; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.adrese (grad, drzava, ulica, broj, adresa_id) FROM stdin;
Zagreb	Hrvatska	Jarunska	1b	1
Čakovec	Hrvatska	Športska ulica	2	2
Varaždin	Hrvatska	Ulica Ognjena Price	34	3
Zagreb	Hrvatska	Svetice	bb	4
Zadar	Hrvatska	Splitska ulica	3	5
Split	Hrvatska	Ulica Hrvatske Mornarice	10	6
Makarska	Hrvatska	Franjevački put	2	7
Križevci	Hrvatska	Šetalište Dragutina Novaka	\N	8
Mrkopalj	Hrvatska	Školska ulica	2	9
Osijek	Hrvatska	Ulica Woodrowa Wilsona	2	10
Rijeka	Hrvatska	Pulska ulica	30	11
Vukovar	Hrvatska	Ulica 204. vukovarske brigade	73	12
Zagreb	Hrvatska	Zagrebački velesajam	paviljon 1	13
Rijeka	Hrvatska	Istarska ulica	\N	14
Knin	Hrvatska	Grabovčeva ulica	\N	15
Karlovac	Hrvatska	Ulica 13. Srpnja	\N	16
Osijek	Hrvatska	Ulica Kneza Trpimira	23	17
Pula	Hrvatska	Ulica Velog Jože	14	18
Kutina	Hrvatska	Ulica Hrvatskih branitelja	8a	19
Vinkovci	Hrvatska	Ulica Hansa Dietricha Genschera	10B	20
Rijeka	Hrvatska	Slavka Krautzeka	84	21
Zagreb	Hrvatska	Aleja Antuna Augustinčića	8	22
Zagreb	Hrvatska	Maksimirska	128	23
Zadar	Hrvatska	Edvina Androvića	2	24
Zadar	Hrvatska	Vinkovačka	34f	25
Zadar	Hrvatska	Andrije Hebranga	9	26
Križevci	Hrvatska	Strossmayerov Trg	28	27
Osijek	Hrvatska	Martina Divalta	4	28
Rijeka	Hrvatska	Portić	1	29
Knin	Hrvatska	Vukovarska	22	30
Knin	Hrvatska	Zvonimirova	4	31
Karlovac	Hrvatska	Foginovo kupalište	bb	32
Pula	Hrvatska	Ulica Velog Jože	13	33
Kutina	Hrvatska	Batina	10	34
Vukovar	Hrvatska	Trg Dražena Petrovića	2	35
\.


--
-- TOC entry 3368 (class 0 OID 34302)
-- Dependencies: 223
-- Data for Name: klubovi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.klubovi (klub_id, naziv, telefon, email, web_stranica, adresa_id) FROM stdin;
MZ	HAAK Mladost	01 3025 912	mz@haak-mladost.hr	https://www.haak-mladost.com	1
MČ	AK Međimurje	040 328 210	akm@ck.t-com.hr	\N	2
MAKVŽ	MAK	091 5414 319	maliatletskiklub@gmail.com	\N	3
VVŽ	AK Varaždin	097 6980 749	lackovic@ak-varazdin.hr	https://www.ak-varazdin.hr	3
SV	AK Sloboda	095 9159 001	tajnistvo@ak-sloboda.hr	https://www.ak-sloboda.hr	3
ZAG	AK Zagreb	01 2442 940	akzagreb@akzagreb.com	https://akzagreb.com/	22
DZ	AK Dinamo-Zrinjevac	01 2311 125	dinamo-zrinjevac@zg.t-com.hr	https://www.ak-dinamo.hr	23
ZAD	ASK Zadar	023 301 691	zad@has.hr	https://www.ask-zadar.hr	24
ASZ	AK Alojzije Stepinac	023 326 109	asz@has.hr	\N	25
FORZD	AK Fortius	098 1912 700	edistipic@gmail.com	\N	26
ASK	ASK	021 382 948	ask.split@st.t-com.hr	https://www.ask-split.hr	6
SVM	AK Sveti Marko	021 610 121	josip.paunovic@email.t-com.hr	https://www.ak-svetimarko.hr	7
KŽ	AK Križevci	048 682 963	kz@has.hr	\N	27
SO	AK Slavonija-Žito	031 570 019	so@has.hr	https://www.akslavonija-zito.hr	28
KR	AK Kvarner	051 261 110	akkvarner@akkvarner.hr	https://www.akkvarner.hr	29
KN	AK Knin	099 5910 777	info@akknin.hr	\N	30
SVA	AK Sveti Ante, Knin	022 660 730	sva@has.hr	\N	31
KK	AK Karlovac	047 655 803	ak.karlovac1@gmail.com	\N	32
IP	AK Istra	052 223 538	ip@has.hr	src-uljanik@uljanik-standard.hr	33
MK	AK Moslavina	044 681 851	akmoslavina1@gmail.com	https://akmoslavina538.blog.hr	34
CV	AK Cibalia	032 334 678	info@ak-cibalia.hr	\N	20
AGR	AK Agram	01 30 14 885	agram@atletskiklubagram.hr	https://www.atletskiklubagram.hr/	1
VUK	AK Vukovar	099 435 3937	akvukovar2018@gmail.com	\N	35
\.


--
-- TOC entry 3370 (class 0 OID 34314)
-- Dependencies: 225
-- Data for Name: koristi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.koristi (stadion_id, klub_id) FROM stdin;
1	MZ
1	AGR
2	MČ
3	MAKVŽ
3	VVŽ
3	SV
4	ZAG
4	DZ
5	ASZ
5	ZAD
5	FORZD
6	ASK
7	SVM
8	KŽ
10	SO
11	KR
12	VUK
13	MZ
13	AGR
13	ZAG
13	DZ
14	KR
15	KN
15	SVA
16	KK
17	SO
18	IP
19	MK
20	CV
\.


--
-- TOC entry 3362 (class 0 OID 34272)
-- Dependencies: 217
-- Data for Name: lokacije; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lokacije (geo_sirina, geo_duzina, nadmorska_visina, lokacija_id) FROM stdin;
45.782639	15.943050	114	1
46.391512	16.422361	162	2
46.313435	16.341840	168	3
45.817315	16.014751	114	4
44.119973	15.242189	21	5
43.519131	16.444130	18	6
43.290428	17.022280	5	7
46.027072	16.549240	130	8
45.312854	14.850748	822	9
45.544982	18.695565	87	10
45.339183	14.380921	1	11
45.354988	18.990651	85	12
45.778987	15.967512	\N	13
45.339794	14.378829	\N	14
44.033640	16.197946	217	15
45.484515	15.563979	108	16
45.544200	18.693366	\N	17
44.858386	13.834158	12	18
45.487862	16.782646	107	19
45.283757	18.797307	81	20
45.325856	14.467127	108	21
\.


--
-- TOC entry 3366 (class 0 OID 34283)
-- Dependencies: 221
-- Data for Name: stadioni; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stadioni (naziv, tip, duzina_staze, broj_staza, broj_skakalista_dalj, broj_skakalista_vis, broj_skakalista_motka, broj_bacalista_koplje, broj_bacalista_kugla, stadion_id, kapacitet_tribine, povrsina_kompleksa, dozvoljeno_bacanje, broj_bacalista_duga_krug, adresa_id, lokacija_id) FROM stdin;
Sportski park Mladost	Specijalistički stadioni	400	8	5	1	1	1	3	1	1726	151793	t	5	1	1
Mladost	Integrirani stadioni	400	8	2	1	1	2	1	2	5000	87328	t	4	2	2
Sloboda	Integrirani stadioni	400	8	4	1	1	2	1	3	6000	31223	t	5	3	3
Svetice	Integrirani stadioni	400	8	3	1	1	1	1	4	\N	86535	t	3	4	4
Višnjik	Integrirani stadioni	400	6	2	1	0	1	1	5	\N	191138	f	3	5	5
Park Mladeži	Integrirani stadioni	400	6	4	1	1	3	1	6	4075	69029	t	6	6	6
Gradski sportski centar Makarska	Integrirani stadioni	400	6	1	0	0	2	1	7	2500	50000	t	1	7	7
Gradski stadion Križevci	Integrirani stadioni	400	6	2	0	0	2	1	8	440	34594	t	2	8	8
OŠ Mrkopalj	Školsko igralište	300	4	1	0	0	0	1	9	0	17662	t	0	9	9
Gradski vrt	Integrirani stadioni	400	8	2	1	1	0	0	10	18856	42484	f	3	10	10
Kantrida	Integrirani stadioni	400	6	1	1	1	1	1	11	10275	42024	t	1	11	11
Gradski stadion Vukovar	Integrirani stadioni	400	6	2	0	0	2	1	12	186	27207	t	1	12	12
Dvorana Velesajam	Specijalistička dvorana	200	4	1	1	1	0	1	13	300	9000	t	0	13	13
Dvorana Kantrida	Integrirana dvorana	60	8	1	1	1	0	1	14	330	1352	t	0	14	14
Nogometno igralište Knin	Integrirana dvorana	400	4	2	0	0	1	1	15	\N	18886	f	1	15	15
Stadion Branko Čavlović-Čavlek	Integrirani stadioni	400	8	2	1	1	3	1	16	12000	115709	t	1	16	16
Dvorana Gradski vrt	Specijalistička dvorana	80	6	1	1	1	0	0	17	\N	1044	f	0	17	17
Veruda	Integrirani stadioni	400	8	2	1	1	2	2	18	2500	39421	f	1	18	18
Gradski stadion Kutina	Integrirani stadioni	400	6	1	0	0	0	1	19	1000	51988	t	0	19	19
Gradski stadion Vinkovci	Integrirani stadioni	400	6	1	1	0	0	1	20	8200	100080	f	1	20	20
Otvoreno igralište Kampus	Integrirani stadioni	400	4	1	0	0	0	1	21	\N	37566	t	0	21	21
\.


--
-- TOC entry 3383 (class 0 OID 0)
-- Dependencies: 214
-- Name: adrese_adresa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.adrese_adresa_id_seq', 35, true);


--
-- TOC entry 3384 (class 0 OID 0)
-- Dependencies: 222
-- Name: klubovi_adresa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.klubovi_adresa_id_seq', 1, false);


--
-- TOC entry 3385 (class 0 OID 0)
-- Dependencies: 224
-- Name: koristi_stadion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.koristi_stadion_id_seq', 1, false);


--
-- TOC entry 3386 (class 0 OID 0)
-- Dependencies: 216
-- Name: lokacije_lokacija_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lokacije_lokacija_id_seq', 21, true);


--
-- TOC entry 3387 (class 0 OID 0)
-- Dependencies: 219
-- Name: stadioni_adresa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.stadioni_adresa_id_seq', 1, false);


--
-- TOC entry 3388 (class 0 OID 0)
-- Dependencies: 220
-- Name: stadioni_lokacija_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.stadioni_lokacija_id_seq', 1, false);


--
-- TOC entry 3389 (class 0 OID 0)
-- Dependencies: 218
-- Name: stadioni_stadion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.stadioni_stadion_id_seq', 21, true);


--
-- TOC entry 3203 (class 2606 OID 34270)
-- Name: adrese adrese_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.adrese
    ADD CONSTRAINT adrese_pkey PRIMARY KEY (adresa_id);


--
-- TOC entry 3209 (class 2606 OID 34307)
-- Name: klubovi klubovi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.klubovi
    ADD CONSTRAINT klubovi_pkey PRIMARY KEY (klub_id);


--
-- TOC entry 3211 (class 2606 OID 34319)
-- Name: koristi koristi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.koristi
    ADD CONSTRAINT koristi_pkey PRIMARY KEY (stadion_id, klub_id);


--
-- TOC entry 3205 (class 2606 OID 34279)
-- Name: lokacije lokacije_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lokacije
    ADD CONSTRAINT lokacije_pkey PRIMARY KEY (lokacija_id);


--
-- TOC entry 3207 (class 2606 OID 34290)
-- Name: stadioni stadioni_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stadioni
    ADD CONSTRAINT stadioni_pkey PRIMARY KEY (stadion_id);


--
-- TOC entry 3214 (class 2606 OID 34308)
-- Name: klubovi klubovi_adresa_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.klubovi
    ADD CONSTRAINT klubovi_adresa_id_fkey FOREIGN KEY (adresa_id) REFERENCES public.adrese(adresa_id);


--
-- TOC entry 3215 (class 2606 OID 34325)
-- Name: koristi koristi_klub_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.koristi
    ADD CONSTRAINT koristi_klub_id_fkey FOREIGN KEY (klub_id) REFERENCES public.klubovi(klub_id);


--
-- TOC entry 3216 (class 2606 OID 34320)
-- Name: koristi koristi_stadion_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.koristi
    ADD CONSTRAINT koristi_stadion_id_fkey FOREIGN KEY (stadion_id) REFERENCES public.stadioni(stadion_id);


--
-- TOC entry 3212 (class 2606 OID 34291)
-- Name: stadioni stadioni_adresa_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stadioni
    ADD CONSTRAINT stadioni_adresa_id_fkey FOREIGN KEY (adresa_id) REFERENCES public.adrese(adresa_id);


--
-- TOC entry 3213 (class 2606 OID 34296)
-- Name: stadioni stadioni_lokacija_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stadioni
    ADD CONSTRAINT stadioni_lokacija_id_fkey FOREIGN KEY (lokacija_id) REFERENCES public.lokacije(lokacija_id);


-- Completed on 2023-10-30 23:23:30

--
-- PostgreSQL database dump complete
--

