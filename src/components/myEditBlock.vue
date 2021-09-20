<template>

<div class="dialog" v-if="show" @click.stop="hideDialog">
	<div @click.stop class="dialog-content">
		<slot></slot>
	</div>
</div>

</template>
<script>
	
export default {
	name: "my-edit-block",
	props: {
		show: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		hideDialog() {this.$emit("update:show", false);}
	}
}

</script>
<style>

.dialog {
	top: 0px;
	bottom: 0px;
	left: 0px;
	right: 0px;
	position: fixed;
	display: flex;
	background: rgba(50, 50, 50, 0.7);
	z-index: 1;
}

.dialog-content {
	margin: auto;
	background: white;
	border: 2px solid white;
	border-radius: var(--radius-int);
	padding: 12px;
	width: 500px;
	box-shadow: var(--blocks-shadow);

	display: flex;
	flex-direction: column;
	justify-content: flex-start;
}
.dialog-content div {
	font-size: 17pt;
	padding: 12px;
	font-weight: bold;
}


</style>