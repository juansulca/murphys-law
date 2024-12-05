<script>
	import { score } from '$lib/score.svelte';

	let ch = $state(0);
	let y = $state(0);
	let shouldShow = $state(false);
	let showDialog = $state(false);

	function toggleDialog() {
		showDialog = !showDialog;
	}

	let title = $state('Well, these are classical examples of');

	if (score.you >= 2) {
		title = 'Then you are lucky, you have not encountered';
	}

	let typing = $state(true);
	let displayedText = $state('');
	let initialText = 'Life su';
	let typingSpeed = 150;
	let correctedText = "Murphy's Law!";

	$effect(() => {
		if (!shouldShow && y > ch * 0.8) {
			shouldShow = true;
			typeText();
		}
	});

	async function typeText() {
		typing = true;
		await new Promise((resolve) => setTimeout(resolve, 600));
		for (let i = 0; i < initialText.length; i++) {
			displayedText += initialText[i];
			await new Promise((resolve) => setTimeout(resolve, typingSpeed));
		}

		await new Promise((resolve) => setTimeout(resolve, 500));

		for (let x = 0; x < initialText.length; x++) {
			displayedText = displayedText.slice(0, -1);
			await new Promise((resolve) => setTimeout(resolve, 300));
		}

		for (let j = 0; j < correctedText.length; j++) {
			displayedText += correctedText[j];
			await new Promise((resolve) => setTimeout(resolve, typingSpeed));
		}
		typing = false;
	}
</script>

<svelte:window bind:scrollY={y} />

<main class="w-screen h-[600vh] text-slate-50 p-8" bind:clientHeight={ch}>
	<h2 class="text-4xl mb-8">{title} :</h2>
	<div class="h-[500vh] w-screen"></div>
	{#if shouldShow}
		<div class="w-screen h-[80vh] flex flex-col justify-center items-center gap-10">
			<h1 class="part-2 text-8xl" class:writing={shouldShow}>
				{displayedText}
				<b class:typing>&nbsp;</b>
			</h1>

			<button onclick={toggleDialog} class="text-6xl text-center part-3">What is that?</button>
		</div>
	{/if}
	<dialog
		open={showDialog && shouldShow}
		class="w-1/2 h-1/3 border-solid border p-4 border-slate-500 rounded-lg flex flex-col justify-between"
	>
		<p class="mb-4">
			Murphy's Law is a popular adage that captures the inevitability of failure or complications.
			It humorously suggests that...
		</p>
		<div class="flex flex-row justify-end animate-pulse">
			<a class="underline" href="/law">Tell me more!</a>
		</div>
	</dialog>
</main>

<style>
	.part-2 {
		animation-delay: 0.5s;
	}

	.part-3 {
		animation: fade-in 1s ease-in-out;
		animation-delay: 8s;
		opacity: 0;
		animation-fill-mode: forwards;
	}

	.writing {
		/* border-right: 0.8rem solid transparent; */
		padding: 0.6rem;
	}

	.typing {
		border-right: 0.8rem solid transparent;
		animation: blink-caret 1.1s step-end infinite;
	}

	@keyframes blink-caret {
		0%,
		100% {
			border-color: transparent;
		}

		50% {
			border-color: #f8fafc;
		}
	}

	@keyframes fade-in {
		from {
			transform: rotate(-720deg) scale(0.1);
			opacity: 1;
		}
		to {
			transform: rotate(-20deg) scale(1);
			opacity: 1;
		}
	}
</style>
