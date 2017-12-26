<template>
	<div>
		<canvas id="canvas"></canvas>
		<div>
			<ul class="nav-right">
				<li @click="goTime">Know time</li>
				<li>Know me</li>
			</ul>
		</div>
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
			this.$route.push('/myTime');
		}
	}
}
</script>
<style type="scss">

body {

	padding: 0;

	margin: 0;

	overflow: hidden;

	background: #fff;

	font-family: Courier;

}
canvas {

	background-color: #000;

	cursor: pointer;

}
.nav-right {
	position: fixed;
    top: 100px;
    right: 0px;
    width: 128px;
    color: #fff;
    list-style-type: none;
    li {
    	height: 28px;
    }
}
</style>