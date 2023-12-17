<script lang="ts">
  import "./app.css";
  import jsonData from "./assets/atletski_stadioni.json";
  import { JsonView } from "@zerodevx/svelte-json-view";
  import CssView from "./lib/CssView.svelte";

  let csvData = "";
  fetch("/atletski_stadioni.csv").then(async (d) => (csvData = await d.text()));
</script>

<svelte:head>
  <title>Atletski stadioni u hrvatskoj</title>
  <meta charset="UTF-8">
  <meta name="Autor" content="Domagoj Mutić">
  <meta name="Verzija skupa" content="1.1">
  <meta name="Naziv skupa" content="Atletski stadioni u hrvatskoj">
  <meta name="Jezik skupa" content="hrvatski">
  <meta name="Datum objave" content="2023-10-31">
  <meta name="Geografsko područje" content="Hrvatska">
  <meta name="Tema" content="Sportski objekti, Atletski stadioni">
</svelte:head>

<header>
  <h1 class="text-center text-3xl font-black">Atletski stadioni</h1>
</header>
<nav class="text-center mt-2">
  <a
    href="/index.html"
    class="p-1 border border-solid border-gray-800 rounded-md m-2 bg-gray-100 hover:bg-gray-200 text-lg"
    >Početna</a
  >
  <a
    href="/datatable.html"
    class="p-1 border border-solid border-gray-800 rounded-md m-2 hover:bg-gray-200 text-lg"
    >Tablica</a
  >
</nav>
<main class="flex flex-row justify-around align-middle ms-5 me-5">
  <section class="csvPart">
    <h2 class="text-center text-lg">CSV</h2>
    <div
      class="viewer csv border border-solid border-black rounded-md pt-3 pb-3 ps-5 pe-5 shadow-xl"
    >
      {#if csvData !== ""}
        <CssView csv={csvData} />
      {/if}
    </div>
    <div class="controls mt-2 text-center">
      <a href="/atletski_stadioni.csv" download=""
        class="download-button p-2 bg-green-500 rounded-md text-white hover:bg-green-600"
          >Preuzmi</a
      >
      <a href="./atletski_stadioni.csv.txt"
        class="open-button p-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"
          >Otvori</a
      >
    </div>
  </section>
  <section class="jsonPart">
    <h2 class="text-center text-lg">JSON</h2>
    <div
      class="viewer json border border-solid border-black rounded-md pt-3 pb-3 ps-5 pe-5 shadow-xl"
    >
      <JsonView json={jsonData} />
    </div>
    <div class="controls mt-2 text-center">
      <a href="/atletski_stadioni.json" download=""
        class="download-button p-2 bg-green-500 rounded-md text-white hover:bg-green-600"
          >Preuzmi</a
      >
      <a href="./atletski_stadioni.json"
        class="open-button p-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"
          >Otvori</a
      >
    </div>
  </section>
</main>

<div class="w-[50%] mx-auto mt-8 text-center">
  <h1 class="text-3xl font-medium">Metapodaci</h1>
  <h1 id="kolegij-otvoreno-racunarstvo" class="text-2xl mt-2 font-semibold">Kolegij Otvoreno računarstvo</h1>
  <p>Repozitorij za laboratorijske vježbe</p>
  <h2 id="autor" class="text-xl mt-2 font-semibold">Autor</h2>
  <p>Domagoj Mutić</p>
  <h2 id="verzija-skupa" class="text-xl mt-2 font-semibold">Verzija skupa</h2>
  <p>1.1</p>
  <h2 id="naziv-skupa" class="text-xl mt-2 font-semibold">Naziv skupa</h2>
  <p>Atletski stadioni u hrvatskoj</p>
  <h2 id="jezik-skupa" class="text-xl mt-2 font-semibold">Jezik skupa</h2>
  <p>hrvatski</p>
  <h2 id="datum-objave" class="text-xl mt-2 font-semibold">Datum objave</h2>
  <p>2023-10-31</p>
  <h2 id="opis-podataka" class="text-xl mt-2 font-semibold">Opis podataka</h2>
  <table>
    <thead>
      <tr>
        <th class="border">Atribut</th>
        <th class="border">Opis</th>
        <th class="border">Tip podatka</th>
        <th class="border">Mjerna jedinica</th>
        <th class="border">Standard</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border"><strong>naziv</strong></td>
        <td class="border text-left">ime atletskog stadiona</td>
        <td class="border">string</td>
        <td class="border" />
        <td class="border" />
      </tr>
      <tr>
        <td class="border"><strong>tip</strong></td>
        <td class="border text-left"
          >tip atletskog stadiona. Može biti &#39;Specijalistički&#39;
          (namijenjen prvenstveno i jedino atletici) ili &#39;Integrirani&#39;.
          Uz to može biti &#39;dvorana&#39; ili &#39;stadion&#39;. Posebna
          kategorija je &#39;Školsko igralište&#39;.</td
        >
        <td class="border">string</td>
        <td class="border" />
        <td class="border" />
      </tr>
      <tr>
        <td class="border"><strong>duzina_staze</strong></td>
        <td class="border text-left"
          >dužina atletske staze. Mjerna jedinica je metar. Predstavlja dužinu
          kruga kod kružnih staza (200m i više) ili dužinu ravnine staze.</td
        >
        <td class="border">int</td>
        <td class="border">m</td>
        <td class="border" />
      </tr>
      <tr>
        <td class="border"><strong>broj_staza</strong></td>
        <td class="border text-left">broj atletskih staza</td>
        <td class="border">int</td>
        <td class="border" />
        <td class="border" />
      </tr>
      <tr>
        <td class="border"><strong>broj_skakalista_dalj</strong></td>
        <td class="border text-left">broj jama za skok u dalj (+ pripadajuće zaletište)</td>
        <td class="border">int</td>
        <td class="border" />
        <td class="border" />
      </tr>
      <tr>
        <td class="border"><strong>broj_skakalista_vis</strong></td>
        <td class="border text-left">broj strunjača za skok u vis (+ pripadajuće zaletište)</td>
        <td class="border">int</td>
        <td class="border" />
        <td class="border" />
      </tr>
      <tr>
        <td class="border"><strong>broj_skakalista_motka</strong></td>
        <td class="border text-left">broj strunjača za skok s motkom (+ pripadajuće zaletište)</td>
        <td class="border">int</td>
        <td class="border" />
        <td class="border" />
      </tr>
      <tr>
        <td class="border"><strong>broj_bacalista_koplje</strong></td>
        <td class="border text-left">broj ravnina (zaletišta) za bacanje koplja</td>
        <td class="border">int</td>
        <td class="border" />
        <td class="border" />
      </tr>
      <tr>
        <td class="border"><strong>broj_bacalista_kugla</strong></td>
        <td class="border text-left">broj krugova za bacanje kugle</td>
        <td class="border">int</td>
        <td class="border" />
        <td class="border" />
      </tr>
      <tr>
        <td class="border"><strong>broj_bacalista_duga_krug</strong></td>
        <td class="border text-left"
          >broj krugova za bacanje diska i/ili kladiva (bez obzira imaju li
          pripadajuću mrežu)</td
        >
        <td class="border">int</td>
        <td class="border" />
        <td class="border" />
      </tr>
      <tr>
        <td class="border"><strong>dozvoljeno_bacanje</strong></td>
        <td class="border text-left"
          >oznaka true (t) ili false (f) koja označava dopuštenje za korištenje
          bacališta. Bacanje na bacalištima za kuglu je uglavnom dopušteno bez
          obzira na oznaku.</td
        >
        <td class="border">boolean</td>
        <td class="border" />
        <td class="border" />
      </tr>
      <tr>
        <td class="border"><strong>kapacitet_tribine</strong></td>
        <td class="border text-left"
          >broj sjedećih mjesta na tribini. Ne uključuje privremeno montirane
          tribine. (može biti nedefiniran)</td
        >
        <td class="border">int</td>
        <td class="border" />
        <td class="border" />
      </tr>
      <tr>
        <td class="border"><strong>povrsina_kompleksa</strong></td>
        <td class="border text-left"
          >površina stadiona, tribina i ostalih okolnih objekata. Može
          uključivati i bazene, teniske terene... koji pripadaju istom kompleksu</td
        >
        <td class="border">int</td>
        <td class="border">m²</td>
        <td class="border" />
      </tr>
      <tr>
        <td class="border"><strong>drzava</strong></td>
        <td class="border text-left">država u kojoj se atletski stadion nalazi</td>
        <td class="border">string</td>
        <td class="border" />
        <td class="border" />
      </tr>
      <tr>
        <td class="border"><strong>grad</strong></td>
        <td class="border text-left">grad u kojem se atletski stadion nalazi</td>
        <td class="border">string</td>
        <td class="border" />
        <td class="border" />
      </tr>
      <tr>
        <td class="border"><strong>ulica</strong></td>
        <td class="border text-left">ulica u kojoj se atletski stadion nalazi</td>
        <td class="border">string</td>
        <td class="border" />
        <td class="border" />
      </tr>
      <tr>
        <td class="border"><strong>broj</strong></td>
        <td class="border text-left"
          >kućni broj na kojem se atletski stadion nalazi (nije uvijek
          primjenjivo tj. može biti nedefiniran)</td
        >
        <td class="border">string</td>
        <td class="border" />
        <td class="border" />
      </tr>
      <tr>
        <td class="border"><strong>geo_sirina</strong></td>
        <td class="border text-left">geografska širina na kojoj se nalazi središte atletskog stadiona</td
        >
        <td class="border">float</td>
        <td class="border">N</td>
        <td class="border">WGS84</td>
      </tr>
      <tr>
        <td class="border"><strong>geo_duzina</strong></td>
        <td class="border text-left">geografska dužina na kojoj se nalazi središte atletskog stadiona</td
        >
        <td class="border">float</td>
        <td class="border">E</td>
        <td class="border">WGS84</td>
      </tr>
      <tr>
        <td class="border"><strong>nadmorska_visina</strong></td>
        <td class="border text-left"
          >nadmorska visina na kojoj se nalazi središte atletskog stadiona u
          metrima.</td
        >
        <td class="border">int</td>
        <td class="border">m</td>
        <td class="border" />
      </tr>
      <tr>
        <td class="border"><strong>kratica</strong></td>
        <td class="border text-left">identifikator kluba koji koristi atletski stadion</td>
        <td class="border">string</td>
        <td class="border" />
        <td class="border" />
      </tr>
      <tr>
        <td class="border"><strong>klub_naziv</strong></td>
        <td class="border text-left">ime kluba koji koristi atletski stadion</td>
        <td class="border">string</td>
        <td class="border" />
        <td class="border" />
      </tr>
      <tr>
        <td class="border"><strong>telefon</strong></td>
        <td class="border text-left"
          >telefonski broj kluba koji koristi atletski stadion (može biti
          nedefinirano)</td
        >
        <td class="border">string</td>
        <td class="border" />
        <td class="border" />
      </tr>
      <tr>
        <td class="border"><strong>email</strong></td>
        <td class="border text-left"
          >email adresa kluba koji koristi atletski stadion (može biti
          nedefinirano)</td
        >
        <td class="border">string</td>
        <td class="border" />
        <td class="border" />
      </tr>
      <tr>
        <td class="border"><strong>web_stranica</strong></td>
        <td class="border text-left"
          >web stranica kluba koji koristi atletski stadion (može biti
          nedefinirano)</td
        >
        <td class="border">string</td>
        <td class="border" />
        <td class="border" />
      </tr>
      <tr>
        <td class="border"><strong>klub_drzava</strong></td>
        <td class="border text-left">država u kojoj klub djeluje</td>
        <td class="border">string</td>
        <td class="border" />
        <td class="border" />
      </tr>
      <tr>
        <td class="border"><strong>klub_grad</strong></td>
        <td class="border text-left">grad u kojem klub djeluje</td>
        <td class="border">string</td>
        <td class="border" />
        <td class="border" />
      </tr>
      <tr>
        <td class="border"><strong>klub_ulica</strong></td>
        <td class="border text-left">ulica na kojoj je klub registriran</td>
        <td class="border">string</td>
        <td class="border" />
        <td class="border" />
      </tr>
      <tr>
        <td class="border"><strong>klub_broj</strong></td>
        <td class="border text-left">kućni broj na kojem je klub registriran</td>
        <td class="border">string</td>
        <td class="border" />
        <td class="border" />
      </tr>
    </tbody>
  </table>
  <h2 id="format-lokacije" class="text-xl mt-2 font-semibold"
>Format lokacije</h2>
  <p>WGS84</p>
  <h2 id="mjerna-jedinica-udaljenosti-i-visine" class="text-xl mt-2 font-semibold"
>
    Mjerna jedinica udaljenosti i visine
  </h2>
  <p>metar (m)</p>
  <h2 id="mjerna-jedinica-povrsine" class="text-xl mt-2 font-semibold"
>Mjerna jedinica površine</h2>
  <p>metar kvadratni (m²)</p>
  <h2 id="geografsko-podrucje" class="text-xl mt-2 font-semibold"
>Geografsko područje</h2>
  <p>Hrvatska</p>
  <h2 id="tema" class="text-xl mt-2 font-semibold"
>Tema</h2>
  <p>Sportski objekti, Atletski stadioni</p>
  <h2 id="licencija" class="text-xl mt-2 font-semibold"
>Licencija</h2>
  <p>This work is licensed under CC BY 4.0</p>
</div>

<style>
  section {
    width: 40%;
  }

  .viewer {
    height: 10lh;
    overflow-y: auto;

    background-color: #1e1e1e;
    background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(30, 30, 30, 0) 2%,
        rgba(30, 30, 30, 0) 98%,
        rgba(0, 0, 0, 1) 100%
      ),
      linear-gradient(
        0deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(30, 30, 30, 1) 2%,
        rgba(30, 30, 30, 1) 98%,
        rgba(0, 0, 0, 1) 100%
      );

    scrollbar-color: #666666 #262626;
    scrollbar-width: thin;
  }

  .viewer::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .viewer::-webkit-scrollbar-track {
    background-color: #26262680;
    border-radius: 10px;
  }

  .viewer::-webkit-scrollbar-corner {
    background-color: #26262680;
  }

  .viewer::-webkit-scrollbar-thumb {
    background-color: #66666680;
    border-radius: 4px;
  }

  .viewer.json {
    --jsonPaddingLeft: 1rem;
    --jsonBorderLeft: 1px dotted #707070;
    --jsonBracketColor: #179fff;
    --jsonBracketHoverBackground: #282828;
    --jsonSeparatorColor: #d4d4d4;
    --jsonKeyColor: #9cdcfe;
    --jsonValColor: #9ca3af;
    --jsonValStringColor: #ce9178;
    --jsonValNumberColor: #b5cea8;
    --jsonValBooleanColor: #569cd6;
  }
</style>
