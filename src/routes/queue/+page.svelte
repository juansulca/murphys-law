<script lang="ts">
	import { PUBLIC_STORAGE_BASE_URL } from '$env/static/public';

	const left = `${PUBLIC_STORAGE_BASE_URL}/videos/left.mp4`;
	const right = `${PUBLIC_STORAGE_BASE_URL}/videos/right.mp4`;

	let leftVideo: HTMLVideoElement | null = null;
	let rightVideo: HTMLVideoElement | null = null;

	let isInLeft = $state(false);
	let isInRight = $state(false);

	function leftMouseEnter() {
		isInLeft = true;
		if (leftVideo) leftVideo.playbackRate = 1;
	}

	function leftMouseLeave() {
		isInLeft = false;
		if (leftVideo) leftVideo.playbackRate = 2.5;
	}

	function rightMouseEnter() {
		isInRight = true;
		if (rightVideo) rightVideo.playbackRate = 1;
	}

	function rightMouseLeave() {
		isInRight = false;
		if (rightVideo) rightVideo.playbackRate = 2.5;
	}
</script>

<main class="w-screen h-screen flex flex-row relative">
	<h1 class="absolute text-6xl font-bold z-10 top-20 left-12">Pick a Queue, any queue!</h1>
	<div
		class="relative w-full bg-white flex justify-center"
		role="presentation"
		onmouseenter={leftMouseEnter}
		onmouseleave={leftMouseLeave}
	>
		{#if isInRight}<h3 class="font-marker absolute top-48 z-20 text-4xl">Better</h3>{/if}
		<h2 class="w-full text-4xl font-bold absolute top-56 z-10 text-center">Queue</h2>
		<video src={left} autoplay muted loop playsinline bind:this={leftVideo}></video>
	</div>
	<div
		class="relative w-full bg-white flex justify-center"
		role="presentation"
		onmouseenter={rightMouseEnter}
		onmouseleave={rightMouseLeave}
	>
		{#if isInLeft}<h3 class="font-marker absolute top-48 z-20 text-4xl">Better</h3>{/if}
		<h2 class="w-full text-4xl font-bold absolute top-56 z-10 text-center">Queue</h2>
		<video src={right} autoplay muted loop playsinline bind:this={rightVideo}></video>
	</div>
	<div class="absolute right-8 top-1/2 text-4xl animate-bounce">
		<a href="/crash">➡️</a>
	</div>
</main>
