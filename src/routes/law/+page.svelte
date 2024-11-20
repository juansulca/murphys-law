<script>
	import { fade } from 'svelte/transition';
	import Tape from '$lib/components/tape.svelte';

	let tilt = $state(false);

	setTimeout(() => {
		tilt = true;
	}, 3000);
</script>

<main class="w-screen h-screen p-8 flex justify-between bg-gray-50">
	<div class="flex flex-col gap-7 justify-center">
		<h1 class="title tilt part-3 text-8xl font-bold" style="--rotation-angle: 5deg;" class:tilt>
			Everything
		</h1>
		<h1 class="title part-2 text-8xl font-bold" style="--rotation-angle: -2deg;" class:tilt>
			That can go wrong
		</h1>
		<h1 class="title text-8xl font-bold" style="--rotation-angle: 3deg;" class:tilt>
			Will go wrong
		</h1>
	</div>

	{#if tilt}
		<div class="h-screen flex justify-center items-center" in:fade>
			<Tape text="At the worst possible moment" />
		</div>
	{/if}
	<div class="absolute right-8 top-1/2 text-4xl animate-bounce">
		<a href="/info">➡️</a>
	</div>
</main>

<style>
	.title {
		animation: fall 2s ease-in forwards;
		opacity: 0;
	}

	.part-2 {
		animation-delay: 0.3s;
	}

	.part-3 {
		animation-delay: 0.6s;
	}

	.tilt {
		opacity: 1;
		transform: translateY(8px) rotate(var(--rotation-angle));
		animation: transform 3s ease-in-out;
	}

	@keyframes fall {
		from {
			transform: translateY(-100vh);
			opacity: 1;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}
</style>
