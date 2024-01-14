<script lang="ts">

    export let errorCode: number;
    export let errorCodeText: string;
    export let errorAdditionalText: string = "";

</script>

<div class="m-auto text-center mt-3 max-w-[50vw]">
    <h2 class="text-2xl font-bold">{errorCode}</h2>
    <h3 class="text-lg font-bold">{errorCodeText}</h3>
    <span class="text-left">{errorAdditionalText}</span>
</div>

<style></style>