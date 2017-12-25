<template>
	<div class="content">
        <div class="main">
    		<!-- <iframe src="http://172.18.13.75:8050/record" class="my-iframe"></iframe> -->
            <!-- <iframe v-bind:src="myPath + 'record/index.html#/record'" class="my-iframe"></iframe> -->
            <!-- <iframe src="http://10.100.1.214:7070/record/index.html#/record" class="my-iframe"></iframe> -->
        </div>
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
                       if (self.menuList[i].code === 'record') {
                       	  hasAuth = true;
                       }
                    }
                    if (!hasAuth) {
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