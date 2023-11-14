<script lang="ts">
    export let csv: String;

    const data = csv.split("\n").map(c => c.split(","));
    const color = ["#d4d4d4", "#3f9cd6", "#dcdcaa", "#6a9955", "#ce9178", "#9cdcfe", "#b5cea8", "#4ec9b0", "#f44747"];
</script>

<div class="cssView flex flex-col flex-nowrap break whitespace-nowrap">
    {#each data as d}
        <div class="row">
            {#each d as e, i}
                <span style="color: {color[i % color.length]};">{e}</span><!--  
                -->{#if i !== d.length - 1}<!--  
                    --><span style="color: {color[i % color.length]};">,</span>
                {/if}
            {/each}
        </div>
    {/each}
</div>

