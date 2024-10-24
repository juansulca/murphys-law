<script>
	import toast from '$lib/assets/toast.svg';
</script>

<div class="container">
	<img src={toast} alt="Toasted bread" class="background-toast" />
	<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="background-butter">
		<path
			fill="#FFEF2E"
			d="M62.8,-14.3C71.3,5.8,61.3,38.1,42.7,49.4C24.2,60.7,-2.9,50.9,-20.3,36.3C-37.8,21.6,-45.7,2.1,-40.7,-13.1C-35.7,-28.4,-17.8,-39.3,4.6,-40.8C27.1,-42.4,54.3,-34.4,62.8,-14.3Z"
			transform="translate(100 100)"
		/>
	</svg>
</div>

<style>
	.container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		pointer-events: none;
		overflow: hidden;
		z-index: 0;
	}

	.background-toast {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%); /* Center the image */
		width: 50vw; /* Adjust the size of the toast image relative to viewport */
		height: auto;
		opacity: 0.6; /* Add some transparency if needed */
		object-fit: cover; /* Ensure it covers the background well */
	}

	.background-butter {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%); /* Center the image */
		width: 50vw; /* Adjust the size of the toast image relative to viewport */
		height: auto;
		opacity: 0.6; /* Add some transparency if needed */
		object-fit: cover;
	}
</style>
