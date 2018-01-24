<template>
	<div class="content">
		<div class="nav">
			<ul class="nav-right">
				<li @click="goTime"><i class="fa fa-hand-o-right"></i>Know time</li>
				<li><i class="fa fa-hand-o-right"></i>Know me</li>
			</ul>
		</div>
		<div class="main"></div>
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
</style>