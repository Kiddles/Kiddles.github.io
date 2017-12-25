<template>
	<div class="">
		<div class="reimburse-index">
			<div class="reimburse-menu">
				<div @click="handleClick1('first')" v-bind:class="{active:activeTab==='first'}" id="f-first">报销信息</div>
				<div @click="handleClick1('second')" v-bind:class="{active:activeTab==='second'}" v-if="permission.isTeam" id="f-second">借款信息&现金还款</div>
				<div @click="handleClick1('third')" v-bind:class="{active:activeTab==='third'}" v-if="permission.isHR"  id="f-third">对公请款信息</div>
				<!-- <div @click="handleClick1('four')" v-bind:class="{active:activeTab==='four'}" v-if="permission.isTeam"  id="f-four">Vendor信息</div>
				<div @click="handleClick1('five')" v-bind:class="{active:activeTab==='five'}" v-if="permission.isHR"  id="f-five">付款账号维护</div> -->
			</div>
			<div class="main-content"><router-view></router-view></div>
		</div>
	</div>
</template>
<script type="text/javascript">
/*import Emp from './emp';
import Team from './team';
import HrMng from './hr';*/
export default {
	data: function() {
		return {
			activeTab: 'first',
			permission: {
				isTeam: true,
				isHR: true
			}
		}
	},
	components: {
		/*Emp,
		Team,
		HrMng*/
	},
	created: function () {
		//this.getPermission();
	},
	methods:{
		/*listenToMyBoy (memo) {
            this.activeTab = memo;
        },*/
	    handleClick1(name) {
	        if (name==='first') {
	        	this.activeTab = 'first';
	        	this.$router.push('/freimburseHistory');
	        } else if (name === 'second') {
	        	this.activeTab = 'second';
	        	this.$router.push('/fborrowHistory');
	        } else if (name === 'third'){
	        	this.activeTab = 'third';
	        	this.$router.push('/fcashHistory');
	        } else if (name === 'four') {
	        	this.activeTab = 'four';
	        	this.$router.push('/fvendor');
	        }else if (name === 'five') {
	        	this.activeTab = 'five';
	        	this.$router.push('/fpayout');
	        }
	    },
	    getPermission () {
	    	var self = this;
	    	self.$api.post(self.url.getPermission, {}, function(r) {
				if (r.code === 'ACK') {
					self.permission = r.data;
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
<style type="text/css">
.reimburse-index {
	background: none repeat scroll 0 0 #ffffff;
    right: 0;
    bottom: 0;
    width: auto;
}
.reimburse-index .el-tabs__nav {
	float: right;
}
.reimburse-index .el-tabs__header {
	border-bottom: none;
}
.reimburse-index .el-tabs__item.is-active {
	color: #5e85e0;
    border-bottom: 3px solid #5e85e0;
}
.reimburse-index .el-tabs__active-bar {
	display: none;
}
.reimburse-index .el-tabs__item {
	height: 27px;
	line-height: 27px;
	color: rgba(102, 112, 127, 0.68);
	font-size: 18px;
	padding:0;
	margin: 0 16px;
}
.reimburse-index .el-tabs__content {
	background-color: #fff;
	-webkit-box-shadow:0 0 3px rgba(1, 41, 137, 0.36);
    -moz-box-shadow:0 0 3px rgba(1, 41, 137, 0.36);  
    box-shadow:0 0 3px rgba(1, 41, 137, 0.36);
}
.reimburse-index .my-search {
	height: 40px;
    width: 40px;
    background-color: #5785e0;
    padding: 0;
    border-radius: 4px;
    border: 0;
}
.reimburse-index .reimburse-menu {
	float: left;
	margin: 20px;
}
.reimburse-index .reimburse-menu > div.active {
	color: #66707f;
    border-bottom: 3px solid #5e85e0;
}
.reimburse-index .reimburse-menu > div {
	display: inline-block;
	height: 27px;
	line-height: 27px;
	color: rgba(102, 112, 127, 0.68);
	font-size: 16px;
	padding:0;
	margin-right: 50px;
	cursor: pointer;
}
.reimburse-index .main-content{
	clear: both;
	background-color: #fff;
}
</style>