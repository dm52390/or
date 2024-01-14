<script lang="ts">
    import { auth0Logout, createClient } from "../lib/auth";
    import { isAuthenticated, user } from "../store";
    import Error from "../lib/Error.svelte";
    import type { Auth0Client } from "@auth0/auth0-spa-js";
    import { onMount } from "svelte";
    
    let auth0Client: Auth0Client;

    onMount(async () => {
        auth0Client = await createClient();
    });
</script>

<div class="page min-h-screen m-auto max-w-[80vw]">
    {#if $isAuthenticated && $user}
        <div class="flex flex-row flex-nowrap mt-3">
            <div class="user-image me-2">
                <img
                    src={$user.picture}
                    alt={$user.name}
                    class="aspect-square rounded-full border border-black"
                />
            </div>
            <div class="user-detail flex flex-col ms-2">
                {#each Object.entries($user) as [key, value]}
                    <div>
                        <span class="capitalize font-semibold">{key}: </span>
                        <span>{value}</span>
                    </div>
                {/each}
                <button
                    class="p-2 mt-2 bg-red-500 rounded-md text-white hover:bg-red-600"
                    on:click={() => auth0Logout(auth0Client)}
                    >Odjava iz Auth0</button
                >
            </div>
        </div>
    {:else}
        <Error
            errorCode={401}
            errorCodeText="Unauthorized"
            errorAdditionalText="Although the HTTP standard specifies 'unauthorized', semantically this response means 'unauthenticated'. That is, the client must authenticate itself to get the requested response."
        />
    {/if}
</div>

<style>
</style>
