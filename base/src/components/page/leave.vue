<template>
	<div class="">
		<!-- <iframe src="http://172.18.13.75:8010/leave" class="my-iframe"></iframe> -->
        <iframe v-bind:src="myPath + 'dayoff/index.html#/leave'" class="my-iframe"></iframe>
       <!--  <iframe src="http://10.100.1.214:7070/leave/index.html#/leave" class="my-iframe"></iframe> -->
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
		/*getPermission  () {
			var self = this;
            self.$api.get(self.url.myPermission, {}, function(r) {
                if (r.code === 'ACK') {
                    self.menuList = r.data;
                    var hasAuth = false;
                    for (var i = 0; i < self.menuList.length; i++) {
                       if (self.menuList[i].code === 'leave') {
                       	  hasAuth = true;
                       }
                    }
                    if (!hasAuth) {
                    	self.$router.push('/');
                    } else {
                        self.$router.push('/leave');
                    }
                } else {
                    self.$message.error(r.message);
                }
            }, function(r) {
                self.$message.error(r.message);
            }, self.url.MOCK, '', true);
		}*/
	}
}
</script>