<script lang="ts">
    import { columns } from "../lib/helper";
  
    const backendAddres = "http://localhost:8080/";
    let data: { [key: string]: any }[] = [];
    let hiddenColumns: string[] = [];
  
    let rerender = true;
  
    let searchValue: string = "";
    let searchAtributValue: string = "all";
    let searchCase = false;
  
    let jsonLink = "";
    let csvLink = "";
  
    function getFilterString() {
      return `${searchAtributValue}=${searchValue}${searchCase ? "&case=true" : ""}`
    }
  
    async function handleSearch() {
      data = await (
        await fetch(
          `${backendAddres}search?${getFilterString()}`
        )
      ).json();
    }
  
    handleSearch();
  
    $: jsonLink = `${backendAddres}download/json?${searchAtributValue}=${searchValue}${searchCase ? "&case=true" : ""}`
    $: csvLink = `${backendAddres}download/csv?${searchAtributValue}=${searchValue}${searchCase ? "&case=true" : ""}`
  </script>
  
  <div class="page h-[100vh] overflow-hidden flex flex-col">
    <main>
      <form class="search-form w-[40%] mx-auto mt-8 min-w-[400px]">
        <div class="flex flex-row">
          <select
            id="atribut"
            bind:value={searchAtributValue}
            class="max-w-[150px] flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
          >
            <option value="all" selected>Svi atributi</option>
            {#each Object.entries(columns) as [key, value]}
              <option value={key}>{key}</option><!-- value.display -->
            {/each}
          </select>
          <input
            type="search"
            id="pretraga"
            bind:value={searchValue}
            class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 border-s-gray-50 border-s-2 border border-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100"
            placeholder="Pretraži po atributima"
          />
          <button
            on:click|preventDefault={handleSearch}
            id="gumb"
            class="p-2.5 text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>
        <div class="flex items-center mb-4 justify-center mt-1">
          <label for="casesensitive" class="me-2 text-sm font-medium text-gray-700">Pazi na velika slova</label>
          <input type="checkbox" name="case" id="casesensitive" bind:checked={searchCase} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
        </div>
        <div class="flex items-center mb-4 justify-center mt-1">
          <a href="{csvLink}" class="p-2 me-1 bg-green-500 rounded-md text-white hover:bg-green-600">Preuzmi kao CSV</a>
          <a href="{jsonLink}" class="p-2 ms-1 bg-green-500 rounded-md text-white hover:bg-green-600">Preuzmi kao JSON</a>
        </div>
      </form>
    </main>
    {#key rerender}
      <div class="max-w-[80vw] overflow-auto mx-auto mt-5 flex-1 scroll px-2 pt-5">
        <table id="tablica" class="block shadow-lg border-separate border-spacing-0">
          <thead class="shadow-md sticky top-[-1.25rem] bg-white">
            <tr>
              {#each Object.entries(columns) as [key, value]}
                <th
                  id={key}
                  class="border p-3 border-b border-b-gray-400 bg-white relative"
                  class:hidden={hiddenColumns.includes(key)}
                >
                  {key}<!-- {value.display} -->
                  <button
                    class="absolute top-2 right-2"
                    on:click={() => {
                      hiddenColumns.push(key);
                      rerender = !rerender;
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 640 512"
                    >
                      <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                      <path
                        d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z"
                      />
                    </svg>
                  </button>
                </th>
                {#if hiddenColumns.includes(key)}
                  <div
                    class="w-[20px] h-[20px] absolute top-[-20px] table-cell translate-x-[-10px]"
                  >
                    <div
                      class="absolute top-0 bg-gray-400 w-[1px] h-[20px] translate-x-[9.5px]"
                    />
                    <div
                      class="absolute flex justify-center items-center top-0 bg-white border border-gray-400 w-[17px] h-[17px] translate-x-[1.75px] rounded-full"
                    >
                      <button
                        on:click|preventDefault={() => {
                          hiddenColumns.splice(hiddenColumns.indexOf(key), 1);
                          rerender = !rerender;
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="0.625em"
                          viewBox="0 0 576 512"
                        >
                          <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                          <path
                            d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                {/if}
              {/each}
            </tr>
          </thead>
          <tbody class="bg-white">
            {#each data as d}
              <tr>
                {#each Object.entries(columns) as [key, value]}
                  <td
                    class="{key} border p-3"
                    class:hidden={hiddenColumns.includes(key)}
                  >
                    {d[key]}
                  </td>
                  {#if hiddenColumns.includes(key)}
                    <div />
                  {/if}
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/key}
  </div>
  
  <style>
    .scroll::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
  
    .scroll::-webkit-scrollbar-track {
      background-color: #8a8a8a80;
      border-radius: 10px;
    }
  
    .scroll::-webkit-scrollbar-thumb {
      background-color: #d7d7d780;
      border-radius: 4px;
    }
  
    th > button {
      display: none;
    }
  
    th:hover > button {
      display: block;
    }
  </style>
  