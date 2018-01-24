<template>
	<div class="my-tree">
		<canvas id="canvas"></canvas>
	</div>
</template>
<script type="text/javascript">
import animateTree from '../../../static/js/animateTree.js';
export default {
	data: function () {
		return {

		}
	},
	mounted: function () {
		animateTree.init();
	},
	methods:{
		goTime: function () {
			this.$router.push('/myTime');
		}
	}
}
</script>
<style lang="scss">

.my-tree {
	padding: 0;
	margin: 0;
	overflow: auto;
	background: #fff;
	canvas {
		background-color: #000;
		cursor: pointer;
	}
}
</style>