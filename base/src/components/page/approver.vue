<template>
	<div class="content">
		<div class="main role-detail">
			<div class="form-title">
				<div class="split-line"></div><div class="title">审批人配置</div>
			</div>
			<div class="role-container">
				<el-form :inline="formLine" :label-position="labelPosition" label-width="70px" :model="dto" ref="ruleForm">
				    <el-form-item label="流程角色">
				    	<el-select v-model="dto.financeRoleId" placeholder="请选择" @change="handleChange">
				    		<template v-for="item in approverList">
				    			<el-option :label="item.financeRoleName" :value="item.financeRoleId"></el-option>
				    		</template>
					    </el-select>
				    </el-form-item>
				    <el-form-item label="">
				    	<!-- <el-button type="primary" class="my-primary" @click="submit('ruleForm')" :loading="updateing">{{updateBtnText}}</el-button>
				    	<el-button type="default" @click="backRole">返回</el-button> -->
				    </el-form-item>
				</el-form>
				<el-card class="box-card">
				    <div slot="header" class="clearfix">
				    	<span style="line-height: 36px;">已分配人员列表</span>
				    	<el-button type="default" style="float:right;" @click="deleteUser">移除用户</el-button>
				    	<el-button type="primary" class="my-primary"  style="float:right;margin-right:20px;" @click="addUser">添加用户</el-button>
				    </div>
				</el-card>
				<el-table :data="userList" style="width: 100%" @selection-change="handleRemoveSelectionChange">
					<el-table-column type="selection" width="55">
    				</el-table-column>
		            <el-table-column prop="staffId" label="工号">
		            </el-table-column>
		            <el-table-column prop="name" label="姓名">
		            </el-table-column>
		            <!-- <el-table-column prop="description" label="账号">
		            </el-table-column> -->
		        </el-table>
		        <div class="pagination">
	                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next, total, jumper" :total="pageInfo1.totalCount" :current-page="condition.pageNum" id="page1">
	                </el-pagination>
	            </div>
	            <el-dialog title="待分配人员列表" :visible.sync="dialogFormVisible" class="role-detail-dialog" @open="handleOpen">
					<el-form label-width="78px" :inline="true">
					    <el-form-item label="">
					        <el-input v-model="searchDto.searchTxt" placeholder="请输入搜索条件" @keyup.enter.native="searchRole"></el-input>
					        <el-input style="display:none;"></el-input>
					    </el-form-item>
					    <el-form-item label="">
					    	<el-button class="my-search" @click="searchRole"><img src="../../../static/img/orgsearch.png"/></el-button>
					    </el-form-item>
					</el-form>
					<el-table :data="noRoleUserList" style="width: 100%" @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55">
	    				</el-table-column>
			            <el-table-column prop="staffId" label="工号">
			            </el-table-column>
			            <el-table-column prop="name" label="姓名">
			            </el-table-column>
			            <!-- <el-table-column prop="userName" label="账号">
			            </el-table-column> -->
			        </el-table>
			        <div class="pagination">
		                <el-pagination @current-change="handleDialogCurrentChange" layout="prev, pager, next, total, jumper" :total="pageInfo2.totalCount" :current-page="searchDto.pageNum" id="page2">
		                </el-pagination>
		            </div>
					<div slot="footer" class="dialog-footer">
					    <el-button type="primary" @click="addUserRole('ruleForm')">确定</el-button>
					</div>
				</el-dialog>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data: function () {
		return {
			approverList: [],
			dto: {
				financeRoleId: '',
				financeRoleName: ''
			},
			condition: {
				pageNum: 1,
				pageSize: 10,
				searchTxt: '',
				financeRoleId: ''
			},
			searchDto: {
				searchTxt: '',
				pageNum: 1,
				pageSize: 10,
				financeRoleId: ''
			},
			updateBtnText: '更新',
			updateing: false,
			pageInfo1: {
				totalCount: 0,
				pageCount: 0
			},
			pageInfo2: {
				totalCount: 0,
				pageCount: 0
			},
			selectedUserIds: [],
			removeSelection: [],
			multipleSelection: [],
			labelPosition: 'left',
			formLine: true,
			userList: [],
			noRoleUserList: [],
			dialogFormVisible: false,
		}
	},
	created: function () {
		this.getPermission();
	},
	mounted: function () {
		this.getApproverList();
		// this.initPage(1);
	},
	methods: {
		getApproverList: function () {
			var self = this;
            self.$api.post(self.url.getApproverList, {pageNum:1, pageSize:100, searchTxt: ''}, function(r) {
                if (r.code === 'ACK') {
                    self.approverList = r.data.list;
                } else {
                    self.$message.error(r.message);
                }
            }, function(r) {
                self.$message.error(r.message);
            }, self.url.MOCK, '', true);
		},
		handleChange: function () {
			console.log('name:' + this.dto.financeRoleId);
			this.condition.financeRoleId = this.dto.financeRoleId;
			this.searchDto.financeRoleId = this.dto.financeRoleId;
			this.initTable();
		},
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
		backRole () {
			this.$router.push('/role');
		},
		handleOpen () {
			//this.initPage(2);
			this.initTable2();
		},
		addUser () {
			this.dialogFormVisible = true;
		},
		deleteUser () {
			var self = this;
			if (self.removeSelection.length === 0 ) {
				self.$message({
                type: 'info',
                message: '请选择要移除的用户'
              });
			} else {
				self.$confirm('确定移除用户吗?', '提示', {
	              confirmButtonText: '确定',
	              cancelButtonText: '取消',
	              type: 'warning'
	            }).then(() => {
	                self.$api.post(self.url.unassignApprover, {financeRoleId: self.condition.financeRoleId, listUserId: self.removeSelection},function(r) {
	                    if (r.code==="ACK") {
	                        self.$message.success(r.message);
	                		self.initTable();
	                    }else{
	                        self.$message.error(r.message);
	                    }
	                },function(r){
	                	self.$message.error(r.message);
	                },self.url.MOCK, '', true);
	            }).catch(() => {
	              self.$message({
	                type: 'info',
	                message: '已取消删除'
	              });          
	            });
			}
		},
		submit (formName) {
			let self = this;
            self.$refs[formName].validate((valid) => {
              if (valid) {
                self.updateing = true;
                self.updateBtnText="更新中";
                let roleAddDto = self.roleAddDto;
                self.$api.put(self.url.updateRole, roleAddDto, function(r) {
                    if (r.code==="ACK"){
                        self.$message({
                            type: 'success',
                            message: r.message
                        });
                    }else{
                        self.$message.error(r.message);
                    }
                    self.updateing = false;
                	self.updateBtnText="更新";
                },function(r){
                	self.$message.error(r.message);
                	self.updateing = false;
                	self.updateBtnText="更新";
                },self.url.MOCK, '', true);
              } else {
                console.log('error submit!!');
                return false;
              }
            });
		},
		handleSelectionChange (val) {
			this.multipleSelection = [];
			for (var item of val) {
				this.multipleSelection.push(item.staffId);
			}
			console.log(this.multipleSelection);
		},
		handleRemoveSelectionChange (val) {
			var self = this;
			self.removeSelection = [];
			for (var item of val) {
				self.removeSelection.push(item.staffId);
			}
			console.log(self.removeSelection);
		},
		addUserRole () {
			var self = this;
			if (!self.searchDto.financeRoleId) {
				self.$message({
	                type: 'info',
	                message: '请选择需分配的流程角色'
	            }); 
				return false;
			}
			if (self.multipleSelection.length === 0) {
				self.$message({
	                type: 'info',
	                message: '请选择需分配的人员'
	            }); 
			} else {
				self.$api.post(self.url.assignApprover, {financeRoleId: self.searchDto.financeRoleId, listUserId: self.multipleSelection}, function(r) {
	                if (r.code === 'ACK') {
	                	self.dialogFormVisible = false;
	                	self.$message.success(r.message);
	                	self.multipleSelection = [];
	                	self.initTable();
	                } else {
	                	self.$message.error(r.message);
	                }
	            }, function(r) {
	                self.$message.error(r.message);
	            }, self.url.MOCK, '', true);
			}
		},
		handleDel (index, row) {
	    	let self = this;
            self.$confirm('确定删除该角色吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                self.$api.delete(self.url.deleteRole + row.roleId, {},function(r) {
                    if (r.code==="ACK") {
                        self.$message({
                            type: 'success',
                            message: r.message
                        });
                        self.removeSelection = [];
                       self.initTable();
                    }else{
                        self.$message({
                            type: 'error',
                            message: r.message
                        });
                    }
                },function(){},self.url.MOCK);
            }).catch(() => {
              self.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
	    },
	    handleEdit (id) {
	    	this.$router.push('/home');
	    },
		showAdd () {
			this.dialogFormVisible = true;
		},
		searchRole () {
			this.searchDto.pageNum = 1;
			this.initTable2();
		},
		handleCurrentChange (data) {
			this.condition.pageNum = data;
			this.initTable();
		},
		handleDialogCurrentChange (data) {
			this.searchDto.pageNum = data;
			this.initTable2();
		},
		initTable2 () {
			var self = this;
			self.$api.post(self.url.getUnassaginApproverList, self.searchDto, function(r) {
                console.log(r);
                if (r.code === 'ACK') {
                	self.noRoleUserList = r.data.list;
                	self.searchDto.pageNum = r.data.pageNum;
                	self.pageInfo2.totalCount = r.data.total;
                	self.pageInfo2.pageCount = r.data.pages;
                	self.initPage(2);
                } else {
                	self.$message.error(r.message);
                }
            }, function(r) {
                self.$message.error(r.message);
            }, self.url.MOCK, '', true);
		},
		initTable () {
	    	var self = this;
			self.$api.post(self.url.getAssignApproverList, self.condition, function(r) {
                console.log(r);
                if (r.code === 'ACK') {
                	self.userList = r.data.list;
                	self.condition.pageNum = r.data.pageNum;
                	self.pageInfo1.totalCount = r.data.total;
                	self.pageInfo1.pageCount = r.data.pages;
                	self.initPage(1);
                } else {
                	self.$message.error(r.message);
                }
            }, function(r) {
                self.$message.error(r.message);
            }, self.url.MOCK, '', true);
	    },
	    initPage (num) {
	    	var self = this;
	    	if (document.getElementById("myPages"+num)) {
	    		document.getElementById("myPages"+num).parentNode.removeChild(document.getElementById("myPages"+num));
	    	}
	    	var str;
	    	if (num === 1) {
	    		str = self.pageInfo1.pageCount;
	    	} else {
	    		str = self.pageInfo2.pageCount;
	    	}
	    	var text = '数据，共' + str + '页，';
	    	var oDiv = document.createElement("span"); 
	    	oDiv.id='myPages' + num;
			var oDivText = document.createTextNode(text);
			oDiv.appendChild(oDivText);
			var parentDiv = document.getElementById("page"+num);
	    	var eles = parentDiv.lastChild;
	    	parentDiv.insertBefore(oDiv, eles);
	    }
	}
}
</script>
<style>
.role-detail .role-container {
	padding: 20px;
}
.role-detail .el-form--label-left .el-form-item__label {
	text-align: right;
}
.role-detail .el-card__header {
    padding: 10px 20px 10px 0;
    border-bottom: 0;
}
.role-detail .el-card {
	border: 0;
    border-radius: 0;
    box-shadow: none;
    font-weight: bold;
}
.role-detail .el-card__body {
	padding: 0;
}
.role-detail .edit, .role-detail .delete {
	width: 20px;
	height: 22px; 
	cursor: pointer;
}
.role-detail .edit {
	margin-right: 13px;
}
.role-detail .el-input__inner{
	width: 180px;
    height: 38px;
    line-height: 38px;
    color: #545358;
}
.role-detail .my-search {
	height: 40px;
    width: 40px;
    background-color: #5785e0;
    padding: 0;
    border-radius: 4px;
    border: 0;
}
.role-detail .form-title {
	height: 60px;
	line-height: 60px;
}
.role-detail .form-title .split-line {
	margin-top:20px;
}
.role-detail .form-title .title {
	color: #475055;
	font-size: 18px;
	margin-left: 18px;
}
.role-detail .add{
	position: absolute;
    top: 11px;
    left: 10px;
    height:18px;
    width:18px;
}
.role-detail .my-add {
	height: 40px;
    line-height: 40px;
    padding: 0;
    width: 104px;
    border: 1px solid #5484e0;
    color: #5484e0;
}
.role-detail-detail .my-add span {
	margin-left:10px
}
.role-detail-dialog .el-dialog__body{
	padding-left: 70px;
	padding-right: 70px;
}
.role-detail-dialog .el-form--inline .el-form-item.left-item {
	margin-right:49px;
}
.role-detail-dialog .el-form--inline .el-form-item.left-item {
	margin-right:49px;
}
.role-detail .my-larger .el-input__inner, .role-detail .my-larger .el-textarea__inner{
	width: 494px;
	height:38px !important;
}
.role-detail .el-input__inner:focus, .role-detail .el-textarea__inner{
	border-color: #5e85e0;
}
.role-dialog .el-dialog{
	width: 732px !important;
}
.role-detail .el-checkbox__inner:hover {
    border-color: #5e85e0;
}
.role-detail .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #5e85e0;
    border-color: #5e85e0;
}
</style>