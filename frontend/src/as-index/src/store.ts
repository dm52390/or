import { writable } from "svelte/store";
import { persisted } from 'svelte-persisted-store'

export const isAuthenticated = writable(false);
export const user = writable<
    | {
          email: string;
          email_verified: boolean;
          name: string;
          nickname: string;
          picture: string;
          sub: string;
          updated_at: string;
      }
    | undefined
>(undefined);
export const popupOpen = writable(false);
export const error = writable();

export const localJsonData = persisted<{} | undefined>("jsonData", undefined);
export const localCsvData = persisted<string | undefined>("csvData", undefined);
