<script lang="ts">
	const { rainColor = 'rgba(255, 255, 255, 0.6)' } = $props();

	let raindrops: { id: number; left: string; animationDuration: string }[] = $state([]);

	function createRaindrop() {
		const drop = {
			id: Date.now(),
			left: `${Math.random() * 100}vw`,
			animationDuration: `${Math.random() * 2 + 1}s`
		};

		raindrops = [...raindrops, drop];

		setTimeout(() => {
			raindrops = raindrops.filter((d) => d.id !== drop.id);
		}, 3000);
	}

	setInterval(createRaindrop, 100);
</script>

<div class="rain" style="--rain-color: {rainColor};">
	{#each raindrops as drop (drop.id)}
		<div
			class="drop"
			style="left: {drop.left}; animation-duration: {drop.animationDuration};"
		></div>
	{/each}
</div>

<style>
	.rain {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		pointer-events: none;
		overflow: hidden;
		z-index: 1000;
	}

	.drop {
		position: absolute;
		bottom: 100%;
		width: 2px;
		height: 10px;
		background: var(--rain-color);
		animation: fall linear infinite;
	}

	@keyframes fall {
		to {
			transform: translateY(100vh);
		}
	}
</style>
