<template>
	<div class="">
		<!-- <iframe src="http://172.18.13.75:8070/#/attendance" class="my-iframe"></iframe> -->
        <!-- <iframe src="http://172.16.129.123:7070/attendance/index.html#/attendance" class="my-iframe"></iframe> -->
        <!-- <iframe v-bind:src="myPath + '/attendance/index.html#/attendance'" class="my-iframe"></iframe> -->
	</div>
</template>
<script>
export default {
    data: function () {
        return {
            myPath: process.env.IP_PORT
        }
    },
	created: function () {
		// this.getPermission();
	},
	methods: {
		getPermission  () {
			var self = this;
            self.$api.get(self.url.myPermission, {}, function(r) {
                if (r.code === 'ACK') {
                    self.menuList = r.data;
                    var hasAuth = false;
                    for (var i = 0; i < self.menuList.length; i++) {
                       if (self.menuList[i].code === 'attendance') {
                       	  hasAuth = true;
                       }
                    }
                    if (!hasAuth) {
                    	self.$router.push('/');
                    } else {
                        self.$router.push('/attendance');
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