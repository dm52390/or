import {
    Auth0Client,
    createAuth0Client,
    type LogoutOptions,
    type PopupLoginOptions,
    type RedirectLoginOptions,
} from "@auth0/auth0-spa-js";
import { user, isAuthenticated, popupOpen } from "../store";
import config from "./auth_config";

async function createClient() {
    let auth0Client = await createAuth0Client({
        domain: config.domain,
        clientId: config.clientId,
    });

    return auth0Client;
}

async function loginWithPopup(
    client: Auth0Client,
    options?: PopupLoginOptions
) {
    popupOpen.set(true);
    try {
        await client.loginWithPopup(options);

        user.set(await client.getUser());
        isAuthenticated.set(true);
    } catch (e) {
        console.error(e);
    } finally {
        popupOpen.set(false);
    }
}

async function login(client: Auth0Client, options?: RedirectLoginOptions) {
    popupOpen.set(true);
    try {
        await client.loginWithRedirect(options);

        user.set(await client.getUser());
        isAuthenticated.set(true);
    } catch (e) {
        console.error(e);
    } finally {
        popupOpen.set(false);
    }
}

function logout(client: Auth0Client, options?: LogoutOptions) {
    user.set(undefined);
    isAuthenticated.set(false);
    // return client.logout(options);
}

function auth0Logout(client: Auth0Client, options?: LogoutOptions) {
    logout(client, options);
    return client.logout(options);
}

export  {
    createClient,
    loginWithPopup,
    login,
    logout,
    auth0Logout,
};

