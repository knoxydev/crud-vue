<template>

<input id="myINP" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"/>

</template>
<script>
	
export default {
	name: "my-input",
	props: ['modelValue'],
	emits: ['update:modelValue'],
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

#myINP:focus {border: 2px solid var(--main-bg-clr);}

</style>
