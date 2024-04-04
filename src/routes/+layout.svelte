<style>
    @import '/styles/styles.css';
    @import '/fonts/fonts.css';
</style>
<script>
    import { onNavigate } from '$app/navigation';

    onNavigate((navigation) => {
        if (!document.startViewTransition) return;

        return new Promise((resolve) => {
            document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });
        });
    });
</script>

<nav>
	<a class="navOption" href="/">Home</a>
	<a class="navOption" href="/about">About</a>
</nav>

<slot></slot>