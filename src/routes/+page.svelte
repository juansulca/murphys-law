<script>
	import { fly } from 'svelte/transition';
	import Rain from '$lib/components/rain.svelte';
	import { map } from '$lib/math';
	import { score } from '$lib/score.svelte';
	import f1 from '$lib/assets/White1.png';
	import f2 from '$lib/assets/White2.png';
	import f3 from '$lib/assets/White3.png';
	import f1p from '$lib/assets/Black1.png';
	import f2p from '$lib/assets/Black2.png';
	import f3p from '$lib/assets/Black3.png';
	import Water from '$lib/components/water.svelte';

	let ch = $state(0);
	let y = $state(0);
	let x = $state(0);
	let reached = $state(false);
	let i = $state(0);
	let imgs = $state([f1, f2, f3]);

	setInterval(() => {
		i = (i + 1) % 3;
	}, 142);

	// TODO: update the max value (1000) to match the height of the screen
	$effect(() => {
		x = map(y, 0, ch * 0.6, 0, 90);
		if (x > 25) {
			reached = false;
			imgs = [f1p, f2p, f3p];
		} else {
			reached = false;
			imgs = [f1, f2, f3];
		}

		if (x > 80) {
			reached = true;
		}
	});

	const onClickYes = () => {
		score.life++;
		score.you = 0;
	};

	const onClickNo = () => {
		score.you++;
		score.life = 0;
	};
</script>

<svelte:window bind:scrollY={y} bind:outerHeight={ch} />

<main class="h-[200vh] hide-scroll">
	<div
		class="sticky top-0 w-screen h-screen p-8 flex flex-col gap-7 justify-center"
		class:bg-gray-50={reached}
	>
		{#if x > 1}
			<Rain rainColor={reached ? 'rgba(20, 20, 20, 0.6)' : 'rgba(255, 255, 255, 0.6)'} />
			<Water level={x} />
		{/if}
		<div class="w-full text-slate-100" class:text-slate-950={x > 70}>
			<h2 class="text-2xl font-semibold">Have you ever encountered a situation where</h2>
			<h1 class="text-4xl font-bold">The one day you forget to carry your umbrella it rains?</h1>
			<div class="mt-4 h-12">
				{#if reached}
					<button
						in:fly={{ y: -300, duration: 1000 }}
						onclick={onClickYes}
						class="p-2 border border-slate-950 mr-4 bg-slate-50 hover:bg-slate-950 hover:text-slate-50"
						>Story of my life</button
					>
					<button
						in:fly={{ y: -300, duration: 1000 }}
						onclick={onClickNo}
						class="p-2 border border-slate-950 bg-slate-50 hover:bg-slate-950 hover:text-slate-50"
						>Dude, never</button
					>
				{/if}
			</div>
		</div>
		<div class="flex justify-between items-end w-full h-1/2">
			<div class="w-[50vw]">
				<div
					style="transform: translateX({x}%);"
					class="fill-gray-50"
					class:fill-gray-950={reached}
				>
					<!-- <svg><rect width="60" height="200" x="10" y="10" /></svg> -->
					<img alt="" src={imgs[i]} height="200" width="200" />
				</div>
			</div>

			<div class="flex items-end mb-8 mr-8">
				<div
					class="w-32 p-2 grid grid-cols-2 text-slate-100 border"
					class:text-slate-950={x > 25}
					class:border-slate-950={x > 25}
				>
					<div class="font-bold">LIFE</div>
					<div class="text-right">{score.life.toString().padStart(2, '0')}</div>
					<div class="font-bold">YOU</div>
					<div class="text-right">{score.you.toString().padStart(2, '0')}</div>
				</div>
			</div>

			{#if score.life > 0 || score.you > 0}
				<div class="absolute right-8 top-1/2 text-4xl animate-pulse">
					<a href="/butter">➡️</a>
				</div>
			{/if}
		</div>
	</div>
</main>
