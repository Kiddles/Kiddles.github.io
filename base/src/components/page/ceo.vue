<template>
<div><router-view></router-view></div>
</template>
<script type="text/javascript">
export default {
	data: function () {
		return {
		}
	},
	created: function () {
		// this.getPermission();
	},
	methods: {
		getPermission () {
			var self = this;
	    	self.$api.post(self.url.getPermission, {}, function(r) {
				if (r.code === 'ACK') {
					var isTeam = r.data.isTeam;
					var isCEO = r.data.isCEO;
					if (!isCEO) {
						self.$router.push('/');
					}
				} else {
					self.$message.error(r.message);
				}
			}, function(r) {
				self.$message.error(r.message);
			}, self.url.MOCK, '', true);
	    }
	}
}
</script>