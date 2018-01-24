<template>
	<div id="zzsc">
		<canvas id="timer"></canvas>
	</div>
</template>
<script type="text/javascript">
import createTimer from '../../../static/js/zzsc.js';
export default {
	data: function () {
		return {

		}
	},
	mounted: function () {
		this.initTimer();
	},
	methods: {
		initTimer: function () {
			createTimer.createTimer();
		}
	}
}
</script>
<style type="text/css" lang="scss">
	#zzsc {
		text-align: center;
	}
</style>