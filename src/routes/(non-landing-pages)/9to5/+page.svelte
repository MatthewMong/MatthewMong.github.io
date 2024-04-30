
<script>
    import Synaptive from '$lib/synaptive/+page.svelte';
    import VGH from '$lib/vgh/+page.svelte';
    import Fatigue from '$lib/fatigue/+page.svelte';
</script>
<div class="content">
    <div class="item-wrapper">
        <Synaptive/>
    </div>
    <div class="item-wrapper">
        <Fatigue/>
    </div>
    <div class="item-wrapper">
        <VGH/>
    </div>
</div>
<style>
    .content  {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }

    .item-wrapper {
        padding: 2vw;
    }
</style>
