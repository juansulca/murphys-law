<script>
	import tape from '$lib/assets/tape_1.png';
	const { text = 'worst possible moment' } = $props();
</script>

<div class="relative w-full overflow-hidden rotate-[30deg]">
	<img src={tape} alt="tape piece" class="absolute inset-0 w-full h-full object-cover z-0" />
	<div class="relative z-10 text-white p-4 text-center font-marker text-4xl">{text}</div>
</div>
