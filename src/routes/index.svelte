<script>
 import Counters from "../components/Counters.svelte";
</script>

<svelte:head>
	<title>RxSapper project template</title>
</svelte:head>

<div class="container">
	<h1>Great success!</h1>
	<h2>Counters</h2>
	<Counters />
</div>

<style>
 .container {
	 display: flex;
	 flex-direction: column;
	 align-items: center;
 }

 h1 {
	 font-size: 2.8em;
	 text-transform: uppercase;
	 font-weight: 700;
	 margin: 0 0 0.5em 0;
 }
</style>

