<template>

<input id="myINP" type="text"/>

</template>
<script>
	
export default {
	name: "my-input"
}

</script>
<style>

#myINP {
	padding: 6px;
	font-size: 14pt;
	margin-bottom: 6px;
	border: 2px solid #999999;
	border-radius: 5px;
}

#myINP:focus {border: 2px solid var(--blue-clr);}

</style>