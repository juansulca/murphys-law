<script>
	import { score } from '$lib/score.svelte';
	import { onMount } from 'svelte';

	let title = $state('Well, these are classical examples of');

	if (score.you >= 2) {
		title = 'Then you are lucky, you have not encountered';
	}

	let typing = $state(true);
	let displayedText = $state('');
	let initialText = 'Life su';
	let typingSpeed = 150;
	let correctedText = "Murphy's Law!";

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

	onMount(() => {
		typeText();
	});
</script>

<main class="w-screen h-screen text-slate-50 flex flex-col justify-center p-8 gap-6">
	<h2 class="text-4xl mb-8">{title} :</h2>
	<h1 class="writing part-2 text-8xl">
		{displayedText}
		<b class:typing>&nbsp;</b>
	</h1>

	<a href="/law" class="text-6xl part-3 text-center">What is that?</a>
</main>

<style>
	.part-2 {
		animation-delay: 0.5s;
	}

	.part-3 {
		animation: fade-in 1s ease-in-out forwards;
		animation-delay: 6s;
		opacity: 0;
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
