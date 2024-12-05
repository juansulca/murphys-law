<script lang="ts">
	import { PUBLIC_STORAGE_BASE_URL } from '$env/static/public';

	const left = `${PUBLIC_STORAGE_BASE_URL}/videos/left.mp4`;
	const right = `${PUBLIC_STORAGE_BASE_URL}/videos/right.mp4`;

	let leftVideo: HTMLVideoElement | null = null;
	let rightVideo: HTMLVideoElement | null = null;

	let isInLeft = $state(false);
	let isInRight = $state(false);
	let moveCounter = $state(0);

	function leftMouseEnter() {
		isInLeft = true;
		if (leftVideo) leftVideo.playbackRate = 1;
		moveCounter++;
	}

	function leftMouseLeave() {
		isInLeft = false;
		if (leftVideo) leftVideo.playbackRate = 2.5;
	}

	function rightMouseEnter() {
		isInRight = true;
		if (rightVideo) rightVideo.playbackRate = 1;
		moveCounter++;
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
	<dialog
		open={moveCounter >= 6}
		class="w-1/3 h-1/3 border border-solid p-4 border-slate-900 rounded-lg z-30 mt-[30vh]"
	>
		<p class="mb-4">
			<b class="font-bold">Queues Moving Faster (But Not Yours):</b> In a supermarket, there’s only a
			one-in-three chance your chosen queue will move faster than those on either side, a simple consequence
			of probability theory.
		</p>
	</dialog>
</main>
