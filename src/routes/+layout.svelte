<style>
    @import '/styles/styles.css';
    @import '/fonts/fonts.css';
</style>
<script>
    import { onNavigate } from '$app/navigation';

    onNavigate((navigation) => {
        // @ts-ignore
        if (!document.startViewTransition) return;

        return new Promise((resolve) => {
            // @ts-ignore
            document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });
        });
    });
</script>

<nav class="navWrapper">
	<a class="navOption" href="/">
        <strong>
            Home
        </strong>
    </a>
	<a class="navOption" href="/9to5">
        <strong>
            Nine-to-Five
        </strong>
    </a>
	<a class="navOption" href="/5to9">
        <strong>
            Five-to-Nine
        </strong>
    </a>
</nav>

<slot></slot>