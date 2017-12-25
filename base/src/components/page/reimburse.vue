<template>
	<div class="content">
		<div class="leave-index">
			<div class="leave-main">
				<div class="my-menu">
					<!-- <div @click="handleClick1('first')" v-bind:class="{active:activeName==='first'}">ME</div>
					<div @click="handleClick1('second')" v-bind:class="{active:activeName==='second'}" v-if="permission.isTeam">TEAM</div> -->
					<div @click="handleClick1('third')" v-bind:class="{active:activeName==='third'}" v-if="permission.isHR">FINANCE</div>
					<!-- <div @click="handleClick1('four')" v-bind:class="{active:activeName==='four'}">CEO</div> -->
				</div>
				<div class="my-tab-content"><router-view></router-view></div>
			</div>
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
			activeName: 'third',
			permission: {
				isTeam: true,
				isHR: true,
				isCEO: true
			}
		}
	},
	components: {
		/*Emp,
		Team,
		HrMng*/
	},
	created: function () {
		// this.getPermission();
	},
	methods:{
		/*listenToMyBoy (memo) {
            this.activeName = memo;
        },*/
	    handleClick1(name) {
	        if (name==='first') {
	        	this.activeName = 'first';
	        	this.$router.push('/me');
	        } else if (name === 'second') {
	        	this.activeName = 'second';
	        	this.$router.push('/team');
	        } else if (name === 'third'){
	        	this.activeName = 'third';
	        	this.$router.push('/freimburseHistory');
	        } else if (name === 'four'){
	        	this.activeName = 'four';
	        	this.$router.push('/creimburseHistory');
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
.leave-index {
	position: absolute;
    width: 100%;
    background-color: #eef1f6;
}
.leave-main{
	padding: 20px;
}
.leave-index .el-tabs__nav {
	float: right;
}
.leave-index .el-tabs__header {
	border-bottom: none;
}
.leave-index .el-tabs__item.is-active {
	color: #5e85e0;
    border-bottom: 3px solid #5e85e0;
}
.leave-index .el-tabs__active-bar {
	display: none;
}
.leave-index .el-tabs__item {
	height: 27px;
	line-height: 27px;
	color: rgba(102, 112, 127, 0.68);
	font-size: 18px;
	padding:0;
	margin: 0 16px;
}
.leave-index .el-tabs__content {
	background-color: #fff;
	-webkit-box-shadow:0 0 3px rgba(1, 41, 137, 0.36);
    -moz-box-shadow:0 0 3px rgba(1, 41, 137, 0.36);  
    box-shadow:0 0 3px rgba(1, 41, 137, 0.36);
}
.leave-index .my-search {
	height: 40px;
    width: 40px;
    background-color: #5785e0;
    padding: 0;
    border-radius: 4px;
    border: 0;
}
.leave-index .my-menu {
	float: right;
	margin-bottom: 20px;
}
.leave-index .my-menu > div.active {
	color: #66707f;
    border-bottom: 3px solid #5e85e0;
}
.leave-index .my-menu > div {
	display: inline-block;
	height: 27px;
	line-height: 27px;
	color: rgba(102, 112, 127, 0.68);
	font-size: 18px;
	padding:0;
	margin: 0 16px;
	cursor: pointer;
}
.leave-index .my-tab-content{
	clear: both;
	background-color: #fff;
	-webkit-box-shadow:0 0 3px rgba(1, 41, 137, 0.36);
    -moz-box-shadow:0 0 3px rgba(1, 41, 137, 0.36);  
    box-shadow:0 0 3px rgba(1, 41, 137, 0.36);
}
/*日历样式开始*/
.el-date-table td.today {
	color: #5e85e0;
}
.el-date-table td.current:not(.disabled), .el-date-table td.end-date, .el-date-table td.start-date {
    background-color: #5e85e0 !important;
}
.el-date-table td.today:before {
	border-top-color: #5e85e0 !important;
}
.el-date-picker__header-label.active, .el-date-picker__header-label:hover, .el-picker-panel__icon-btn:hover {
	color: #5e85e0 !important;
}
/*日历样式结束*/
</style>