<script lang="ts">
	import { map } from '$lib/math';
	import { WaveTank } from '$lib/misc/wave-tank';
	import { onDestroy, onMount } from 'svelte';

	const { level } = $props<{ level: number }>();
	let h = $state(0);
	$effect(() => {
		h = map(level, 0, 90, 0, 100);
	});

	// function easeInCirc(x: number) {
	// 	return 1 - Math.sqrt(1 - Math.pow(x, 2));
	// }

	function randomInt(x: number, y: number) {
		return Math.floor(Math.random() * (y - x + 1)) + x;
	}

	const waveTank = new WaveTank();

	const SVG_WIDTH = 100;
	// let counter = $state(0);
	// let dropY = $state(60);
	let width = $state(SVG_WIDTH);
	let widthValue = SVG_WIDTH;
	let springs = $state(waveTank.springs);
	let requestId: number | undefined;
	const grid = SVG_WIDTH / waveTank.waveLength;
	let points: number[][] = [];
	let springsPath = $state('');

	// function updateJuice(timestamp: number) {
	// 	const amp = 40;
	// 	const x = timestamp / 2000;
	// 	const saw = x - Math.floor(x);
	// 	if (saw < 0.6) {
	// 		counter = easeInCirc(saw) * amp;
	// 		dropY = -100;
	// 	} else {
	// 		counter = easeInCirc(1 - saw) * amp * 0.1;
	// 		dropY = 70 + Math.pow(saw - 0.6, 2) * 10000;
	// 	}
	// }

	function update(timestamp: number) {
		// updateJuice(timestamp);
		waveTank.update(waveTank.springs);
		springs = [...waveTank.springs];

		const offset = 300;
		const saw = (timestamp + offset) / 2000 - Math.floor((timestamp + offset) / 2000);
		if (saw < 0.01) {
			drop();
		}
		requestId = requestAnimationFrame(update);
	}

	function resize() {
		width = document.body.clientWidth;
	}

	function drop() {
		let dropPosition = 50;
		dropPosition = randomInt(0, waveTank.springs.length);
		waveTank.springs[dropPosition].p = -15;
	}

	$effect(() => {
		points = [
			[0, 100],
			[0, 0],
			...springs.map((x, i) => [i * grid, x.p]),
			[widthValue, 0],
			[widthValue, 100]
		];
		springsPath = `${points.map((x) => x.join(',')).join(' ')}`;
	});

	$effect(() => {
		widthValue = width;
	});

	onMount(() => {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		if (mediaQuery.matches) {
			return;
		}

		requestId = requestAnimationFrame(update);
		window.addEventListener('resize', resize);
		resize();

		return () => {
			window.removeEventListener('resize', resize);
			if (requestId !== undefined) {
				cancelAnimationFrame(requestId);
			}
		};
	});

	onDestroy(() => {
		window.removeEventListener('resize', resize);
		if (requestId !== undefined) {
			cancelAnimationFrame(requestId);
		}
	});
</script>

<div class="water">
	<svg
		aria-hidden="true"
		width="100%"
		height="100px"
		viewBox="0 0 100 100"
		preserveAspectRatio="none"
		style="margin-top: -60px"
	>
		<polygon points={springsPath} fill="#f9fafb" transform="translate(0, 50)" />
	</svg>
	<div style={`height: ${h}%`} class="bg-gray-50"></div>
</div>

<style>
	.water {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		z-index: -1;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
</style>
