<template>
	<div class="content">
		<div class="main auth">
			<div class="form-title">
				<div class="split-line"></div><div class="title">权限管理</div>
			</div>
			<div class="auth-container">
				<div class="auth-left">
					<template  v-for='info in roleList'>
						<div class="auth-item" v-bind:class="{active: info.active}" @click="getAuthByRoleId(info)">{{info.name}}</div>
					</template>
				</div>
				<div class="auth-right">
					<div class="right-content">
						<!-- <div class="auth-type" style="display:none;">
							<el-checkbox-group v-model="authList">
							</el-checkbox-group>
						</div> -->
						<div class="auth-type-value">
							<el-checkbox :indeterminate="menuIsIndeterminate" v-model="menuCheckAll"  @change="handleCheckAllChange1">{{menuName}}</el-checkbox>
							<el-checkbox-group v-model="menuPermission"  @change="handleCheckedChange1">
								<template v-for='city in menuList'>
						    		<el-checkbox :label="city.id" :key="city.id">{{city.name}}</el-checkbox>
						    	</template>
							</el-checkbox-group>
							<template v-if="userName">
								<el-checkbox :indeterminate="userIsIndeterminate" v-model="userCheckAll"  @change="handleCheckAllChange2">{{userName}}</el-checkbox>
								<el-checkbox-group v-model="userPermission"  @change="handleCheckedChange2">
									<template v-for='city1 in userList'>
							    		<el-checkbox :label="city1.id" :key="city1.id">{{city1.name}}</el-checkbox>
							    	</template>
								</el-checkbox-group>
							</template>
						</div>
					</div>
					<div class="right-footer">
						<el-button type="primary" class="my-primary" @click="saveAuth">提交</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue';
export default {
	data: function () {
		return {
			currentRoleId: '',
			roleList: [],
			/*authList: ['人员管理', '权限管理'],*/
			auth:[],
			menuIsIndeterminate: false,
			menuCheckAll: false,
			menuName: '',
			menuPermission: [],
			menuList: [],
			userIsIndeterminate: false,
			userCheckAll: false,
			userName: '',
			userPermission: [],
			userList: [],
		}
	},
	created: function () {
		this.getPermission();
		this.getRoleList();
		this.getAuthList();
	},
	methods: {
		getPermission  () {
			var self = this;
            self.$api.get(self.url.myPermission, {}, function(r) {
                if (r.code === 'ACK') {
                    self.menuList = r.data;
                    var hasAuth = false;
                    for (var i = 0; i < self.menuList.length; i++) {
                       if (self.menuList[i].code === 'auth') {
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
		},
		saveAuth () {
			var self = this;
			if (self.currentRoleId) {
				var checkIds = self.menuPermission.concat(self.userPermission);
				self.$api.post(self.url.saveRoleAuth, {roleId: self.currentRoleId, listPermissionIds: checkIds}, function(r) {
	                if (r.code === 'ACK') {
	                	self.$message.success(r.message);
	                } else {
	                	self.$message.error(r.message);
	                }
	            }, function(r) {
	                self.$message.error(r.message);
	            }, self.url.MOCK, '', true);
			} else {
				self.$message.warning('请选择要分配角色');
			}
		},
		getIdS (data) {
			var arr = [];
			for (var item of data) {
				arr.push(item.id);
			}
			return arr;
		},
		handleCheckAllChange1 (event) {
			var self = this;
			var ids = self.getIdS(self.auth[0].listChild);
			console.log(ids);
			self.menuPermission = event.target.checked ? ids : [];
        	self.menuIsIndeterminate = false;
		},
		handleCheckedChange1 (value) {
			let checkedCount = value.length;
	        this.menuCheckAll = checkedCount === this.auth[0].listChild.length;
	        this.menuIsIndeterminate = checkedCount > 0 && checkedCount < this.auth[0].listChild.length;
		},
		handleCheckAllChange2 (event) {
			var self = this;
			var ids = self.getIdS(self.auth[1].listChild);
			self.userPermission = event.target.checked ? ids : [];
        	self.userIsIndeterminate = false;
		},
		handleCheckedChange2 (value) {
			let checkedCount = value.length;
	        this.userCheckAll = checkedCount === this.auth[1].listChild.length;
	        this.userIsIndeterminate = checkedCount > 0 && checkedCount < this.auth[1].listChild.length;
		},
		handleTreeList () {
			var self = this;
			for (var i = 0; i < self.auth.length; i++) {
				if (i === 0) {
					self.menuName = self.auth[i].name;
					self.menuPermission = self.auth[i].hasPermission;
					self.menuList = self.auth[i].listChild;
					self.menuCheckAll = self.auth[i].hasPermission.length === self.auth[i].listChild.length;
					self.menuIsIndeterminate = self.auth[i].hasPermission.length > 0 && self.auth[i].hasPermission.length < self.auth[i].listChild.length;
				} else {
					self.userName = self.auth[i].name;
					self.userPermission = self.auth[i].hasPermission;
					self.userList = self.auth[i].listChild;
					self.userCheckAll = self.auth[i].hasPermission.length === self.auth[i].listChild.length;
					self.userIsIndeterminate = self.auth[i].hasPermission.length > 0 && self.auth[i].hasPermission.length < self.auth[i].listChild.length;
				}
				
			}
		},
		getAuthList () {
			var self = this;
			self.$api.get(self.url.getAuthByRoleId + '0', {}, function(r) {
                if (r.code === 'ACK') {
                	self.auth = r.data;
                	self.handleTreeList();
                } else {
                	self.$message.error(r.message);
                }
            }, function(r) {
                self.$message.error(r.message);
            }, self.url.MOCK, '', true);
		},
		getAuthByRoleId (info) {
			var self = this;
            self.$api.get(self.url.getAuthByRoleId + info.name, {}, function(r) {
                console.log(r);
                if (r.code === 'ACK') {
                	self.auth = r.data;
                	self.handleTreeList();
                	var flag = !info.active;
		            self.$nextTick(function () {
		                self.roleList.forEach(function (item) {
		                    Vue.set(item, 'active', false);
		                })
		                Vue.set(info, 'active', true);
		            })
		            self.currentRoleId = info.name;
                } else {
                	self.$message.error(r.message);
                }
            }, function(r) {
                self.$message.error(r.message);
            }, self.url.MOCK, '', true);
		},
		getRoleList () {
			var self = this;
			self.$api.get(self.url.getRoleList, {}, function(r) {
                if (r.code === 'ACK') {
                	self.roleList = r.data.list;
                	self.roleList.forEach(function (item) {
                        Vue.set(item, 'active', false);
                	})
                } else {
                	self.$message.error(r.message);
                }
            }, function(r) {
                self.$message.error(r.message);
            }, self.url.MOCK, '', true);
		},
	}
}
</script>
<style>
.auth .form-title {
	height: 60px;
	line-height: 60px;
	border-bottom:1px solid #dde2d4;
}
.auth .form-title .split-line {
	margin-top:20px;
}
.auth .form-title .title {
	color: #475055;
	font-size: 18px;
	margin-left: 18px;
}
.auth .auth-container{
	height:725px;
}
.auth-container .auth-left {
	width:220px;
	height:100%;
	display:inline-block;
	background-color: #f2f2f2;
	border-right:1px solid #dde2e4;
	float: left;
	overflow-y: auto;
}
.auth-container .auth-left .auth-item {
	height: 50px;
	line-height: 50px;
	text-align: center;
    font-size: 14px;
}
.auth-container .auth-left .auth-item.active {
	background-color: #fff;
	border-bottom: 1px solid #dde2e4;
	color: #5e85e0;
}
.auth-container .auth-right {
	overflow: auto;
	height:100%;
}
.auth-container .auth-right .right-content {
	height: 646px;
}
.auth-container .auth-right .right-footer {
	height: 38px;
    line-height: 38px;
    padding: 20px 0;
    text-align: center;
    border-top: 1px solid #dde
}
.auth-container .auth-right .right-content .auth-type {
	width: 270px;
	float: left;
	height: 644px;
	border-right: 1px solid #dde2e4;
}
.auth-container .auth-right .right-content .auth-type-value {
	overflow: auto;
	height: 644px;
}
.right-content .auth-type .el-checkbox {
	display: block;
}
.right-content .auth-type .el-checkbox, .right-content .auth-type-value .el-checkbox-group .el-checkbox{
	height: 50px;
    line-height: 50px;
    margin-left: 20px;
}
.right-content .auth-type-value >.el-checkbox{
	height: 50px;
    line-height: 50px;
    margin-left: 20px;
    font-size: 16px;
    font-weight: bold;
}
.right-content .auth-type .el-checkbox-group {
	height: 100%;
}
.right-content .auth-type .el-checkbox-group {
}
.right-content .el-checkbox-group .el-checkbox__input {
	margin-right: 15px;
}
.right-content .el-checkbox__input.is-checked + span {
	color: #5e85e0;
}
.right-content .el-checkbox__input.is-checked .el-checkbox__inner {
	background-color: #5e85e0;
	border-color: #5e85e0;
}
.right-content .el-checkbox__inner:hover {
    border-color: #5e85e0;
}
.auth-type-value .el-checkbox-group {
	display: block;
    border-bottom: 1px dashed #dde2e4;
    padding: 0 0 20px;
}
.auth .my-primary {
	width: 96px;
    background-color: #5e85e0;
    color: #fff;
    border: 0;
    height: 38px;
}
.auth .my-default {
	width: 96px;
    border: 1px solid #dde2e4;;
    height: 38px;
}
.auth .el-checkbox__input.is-indeterminate .el-checkbox__inner {
	background-color: #5e85e0;
	border-color: #5e85e0;
}
</style>