<script lang="ts">
    import "./app.css";
    import { Router, Link, Route, navigate } from "svelte-routing";
    import Index from "./routes/index.svelte";
    import Datatable from "./routes/datatable.svelte";
    import { loginWithPopup, logout, createClient } from "./lib/auth";
    import { onMount } from "svelte";
    import type { Auth0Client } from "@auth0/auth0-spa-js";
    import {
        isAuthenticated,
        localJsonData,
        localCsvData,
        user,
    } from "./store";
    import User from "./routes/user.svelte";

    export let url = "";

    const backendAddres = "http://localhost:8080/";
    let auth0Client: Auth0Client;

    onMount(async () => {
        auth0Client = await createClient();

        isAuthenticated.set(await auth0Client.isAuthenticated());
        user.set(await auth0Client.getUser());
    });

    function refreshData() {
        fetch(`${backendAddres}download/json?all=`)
            .then((res) => res.json())
            .then((res: {}) => ($localJsonData = res));
        fetch(`${backendAddres}download/csv?all=`)
            .then((res) => res.text())
            .then((res: string) => ($localCsvData = res));
        console.log($localJsonData);
        console.log($localCsvData);

        var dataJSON =
            "data:text/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify($localJsonData));
        var dataCSV =
            "data:text/plain;charset=utf-8," +
            encodeURIComponent($localCsvData || "");
        var downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", dataJSON);
        downloadAnchorNode.setAttribute("download", "atletski_stadioni.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        
        downloadAnchorNode.setAttribute("href", dataCSV);
        downloadAnchorNode.setAttribute("download", "atletski_stadioni.csv");
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
</script>

<svelte:head>
    <title>Atletski stadioni u hrvatskoj</title>
    <meta charset="UTF-8" />
    <meta name="Autor" content="Domagoj Mutić" />
    <meta name="Verzija skupa" content="1.1" />
    <meta name="Naziv skupa" content="Atletski stadioni u hrvatskoj" />
    <meta name="Jezik skupa" content="hrvatski" />
    <meta name="Datum objave" content="2023-10-31" />
    <meta name="Geografsko područje" content="Hrvatska" />
    <meta name="Tema" content="Sportski objekti, Atletski stadioni" />
</svelte:head>

<header>
    <h1 class="text-center text-3xl font-black">Atletski stadioni</h1>
</header>
<Router {url}>
    <nav class="text-center mt-2">
        <Link
            to="/"
            class="p-1 border border-solid border-gray-800 rounded-md m-2 hover:bg-gray-200 text-lg"
            >Početna</Link
        >
        <Link
            to="/datatable"
            class="p-1 border border-solid border-gray-800 rounded-md m-2 hover:bg-gray-200 text-lg"
            >Tablica</Link
        >
    </nav>

    <div class="absolute top-2 right-2 flex flex-col">
        {#if $isAuthenticated}
            <Link
                to="/user"
                class="px-2 py-1 rounded-md text-green-500 bg-white bg-opacity-95 border hover:text-white hover:bg-green-500 transition-colors"
                >Korisnički profil</Link
            >
            <button
                class="px-2 py-1 mt-1 rounded-md text-blue-500 bg-white bg-opacity-95 border hover:text-white hover:bg-blue-500 transition-colors"
                on:click={() => {
                    refreshData();
                }}>Osvježi preslike</button
            >
            <button
                class="px-2 py-1 mt-1 rounded-md text-red-500 bg-white bg-opacity-95 border hover:text-white hover:bg-red-500 transition-colors"
                on:click={() => {
                    logout(auth0Client, {
                        logoutParams: { returnTo: "http://localhost:80/" },
                    });
                }}>Odjava</button
            >
        {:else}
            <button
                class="px-2 py-1 rounded-md text-green-500 border hover:text-white hover:bg-green-500 transition-colors"
                on:click={() => {
                    loginWithPopup(auth0Client);
                }}>Prijava</button
            >
        {/if}
    </div>

    <div>
        <Route path="/datatable" component={Datatable} />
        <Route path="/user" component={User} />
        <Route path="/" component={Index} />
    </div>
</Router>

<style>
</style>
