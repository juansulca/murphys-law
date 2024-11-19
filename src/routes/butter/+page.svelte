<script>
	import Toast from '$lib/components/toast.svelte';
	import { score } from '$lib/score.svelte';

	let incremented = $state(false);

	function onClickYes() {
		if (!incremented) {
			score.life++;
			incremented = true;
		}
	}

	function onClickNo() {
		if (!incremented) {
			score.you++;
			incremented = true;
		}
	}
</script>

<main class="w-screen h-screen p-8 flex flex-col gap-7 justify-center bg-gray-50">
	<Toast />
	<h2 class="text-4xl font-bold z-10">Does your toast always land butter side down?</h2>
	<div>
		<button
			onclick={onClickYes}
			class="p-2 border border-slate-950 mr-4 hover:bg-slate-950 hover:text-slate-50">Yes!</button
		>
		<button
			onclick={onClickNo}
			class="p-2 border border-slate-950 hover:bg-slate-950 hover:text-slate-50"
			>I have steady hands</button
		>
	</div>
	<div class="flex justify-end items-end h-1/4">
		<div class="w-32 p-2 grid grid-cols-2 text-slate-950 border border-slate-950">
			<div class="font-bold">LIFE</div>
			<div class="text-right">{score.life.toString().padStart(2, '0')}</div>
			<div class="font-bold">YOU</div>
			<div class="text-right">{score.you.toString().padStart(2, '0')}</div>
		</div>
		{#if incremented}
			<div class="absolute right-8 top-1/2 text-4xl animate-bounce">
				<a href="/queue">➡️</a>
			</div>
		{/if}
	</div>
</main>
