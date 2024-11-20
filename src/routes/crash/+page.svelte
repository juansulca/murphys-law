<script>
	import { onMount } from 'svelte';
	import computer from '$lib/assets/old_computer.jpg';
	import { fade } from 'svelte/transition';

	const fullText = 'Lorem ipsum finishing a really really really important deadline.';
	let displayedText = $state('');
	let finished = $state(false);

	async function typing() {
		await new Promise((resolve) => setTimeout(resolve, 600));
		for (let i = 0; i < fullText.length; i++) {
			displayedText += fullText[i];
			await new Promise((resolve) => setTimeout(resolve, 150));
		}
		finished = true;
	}

	onMount(() => {
		typing();
	});
</script>

<main class="w-screen h-screen">
	<div class="relative">
		<img src={computer} alt="old computer" class="w-auto h-full block mx-auto" />
		<p
			class="absolute top-1/4 left-[40vw] w-1/4 text-xl md:text-2xl font-mono text-slate-50 opacity-85"
		>
			{displayedText}
		</p>
		{#if finished}
			<a
				href="/crash-2"
				class="absolute lg:top-[48vh] top-[42vh] left-[55vw] bg-gray-300 rounded text-gray-800 px-4 py-2 opacity-85 animate-pulse"
				in:fade>Submit</a
			>
		{/if}
	</div>
</main>
