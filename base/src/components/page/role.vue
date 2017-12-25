<template>
	<div class="content">
		<div class="main role">
			<div class="form-title">
				<div class="split-line"></div><div class="title">角色管理</div>
			</div>
			<div class="role-container">
				<el-form :inline="formLine" :label-position="labelPosition" label-width="70px" :model="condition">
				    <el-form-item label="角色名称">
				    	<el-input v-model="condition.searchTxt"  @keyup.enter.native="searchRole"></el-input>
				    	<el-input style="display:none;"></el-input>
				    </el-form-item>
				    <el-form-item label="">
				    	<el-button class="my-search" @click="searchRole"><img src="../../../static/img/orgsearch.png"/></el-button>
				    </el-form-item>
				    <el-form-item label="" style="float:right;">
				    	<el-button class="my-add" @click="showAdd"><img class="add" src="../../../static/img/orgAdd.png"/><span>添加角色</span></el-button>
				    </el-form-item>
				</el-form>
				<el-table :data="roleList" style="width: 100%">
		            <el-table-column prop="name" label="角色名称">
		            </el-table-column>
		            <el-table-column prop="description" label="描述">
		            </el-table-column>
		            <el-table-column label="操作">
		                <template scope="scope">
		                    <el-tooltip content="编辑" placement="top" effect="light">
		                    	<router-link :to="{path:'/roleDetail',query:{id:scope.row.id}}">
			                        <img class="edit" src="../../../static/img/orgEdit.png"/>
			                    </router-link>
							</el-tooltip>
							<el-tooltip content="删除" placement="top" effect="light">
		                    	<img class="delete" src="../../../static/img/delete.png" @click="handleDel(scope.$index, scope.row)"/>
		                    </el-tooltip>
		                </template>
		            </el-table-column>
		        </el-table>
		        <div class="pagination">
	                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next, total, jumper" :total="pageInfo.totalCount" :current-page="condition.pageNum">
	                </el-pagination>
	            </div>
	            <el-dialog :title="dialogName" :visible.sync="dialogFormVisible" class="role-dialog" @close="closeHandle">
					<el-form :model="roleAddDto" label-width="78px" :inline="false"  :rules="rules" ref="ruleForm" id="addForm">
					    <el-form-item label="id" style="display:none">
					        <el-input v-model="roleAddDto.id"></el-input>
					    </el-form-item>
					    <el-form-item label="角色名称" prop="name">
					        <el-input v-model="roleAddDto.name" auto-complete="off"></el-input>
					    </el-form-item>
					    <el-form-item label="描述" prop="description" class="my-larger">
					        <el-input type="textarea" resize="none" v-model="roleAddDto.description">
							</el-input>
					    </el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
					    <el-button type="primary" @click="submitRole('ruleForm')"  :loading="saveing">{{savetext}}</el-button>
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
			condition: {
				searchTxt: '',
				pageNum: 1,
				pageSize: 10
			},
			pageInfo: {
				totalCount: 0,
				pageCount: 0
			},
			labelPosition: 'left',
			formLine: true,
			roleList: [],
			dialogFormVisible: false,
			dialogName: '添加角色',
			savetext: '保存',
			saveing: false,
			roleAddDto: {
				id: '0',
				name: '',
				description: ''
			},
			rules: {
				name:[
	                {required: true, message: '请输入名称', trigger: 'blur'},
	                { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
	              ],
              	description:[
            		{ min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }
          		]
			}
		}
	},
	created: function () {
		this.getPermission();
		this.initTable();
	},
	mounted: function () {
		this.initPage();
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
		closeHandle () {
			this.$refs['ruleForm'].resetFields();
		},
		submitRole (formName) {
			let self = this;
			debugger;
            self.$refs[formName].validate((valid) => {
              if (valid) {
                self.saveing = true;
                self.savetext="保存中";
                let roleAddDto = self.roleAddDto;
                self.$api.post(self.url.saveRole, roleAddDto, function(r) {
                	self.dialogFormVisible = false;
                	self.saveing = false;
                	self.savetext="保存";
                    if(r.code==="ACK"){
                        self.$message({
                            type: 'success',
                            message: r.message
                        });
                        document.getElementById('addForm').reset();
                        self.initTable();
                    }else{
                        self.$message.error(r.message);
                    }
                }, function(r) {
                	self.saveing = false;
                	self.savetext="保存";
                	self.$message.error(r.message);
            	}, self.url.MOCK, '', true);
              } else {
                console.log('error submit!!');
                return false;
              }
            });
		},
		handleDel (index, row) {
	    	let self = this;
            self.$confirm('确定删除该角色吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                self.$api.delete(self.url.deleteRole  + row.id, {},function(r) {
                    if (r.code==="ACK") {
                        self.$message({
                            type: 'success',
                            message: r.message
                        });
                       self.initTable();
                    }else{
                        self.$message({
                            type: 'error',
                            message: r.message
                        });
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
	    },
	    handleEdit (id) {
	    	this.$router.push('/home');
	    },
		showAdd () {
			this.dialogFormVisible = true;
		},
		searchRole () {
			this.condition.pageNum = 1;
			this.initTable();
		},
		handleCurrentChange (data) {
			this.condition.pageNum = data;
			this.initTable();
		},
		initTable () {
	    	var self = this;
			self.$api.post(self.url.roleList, self.condition, function(r) {
                console.log(r);
                if (r.code === 'ACK') {
                	self.roleList = r.data.list;
                	self.condition.pageNum = r.data.pageNum;
                	self.pageInfo.totalCount = r.data.total;
                	self.pageInfo.pageCount = r.data.pages;
                	self.initPage();
                } else {
                	self.$message.error(r.message);
                }
            }, function(r) {
                self.$message.error(r.message);
            }, self.url.MOCK, '', true);
	    },
	    initPage () {
	    	if (document.getElementById("myPages")) {
	    		document.getElementById("myPages").parentNode.removeChild(document.getElementById("myPages"));
	    	}
	    	var text = '数据，共' + this.pageInfo.pageCount + '页，';
	    	var oDiv = document.createElement("span"); 
	    	oDiv.id='myPages';
			var oDivText = document.createTextNode(text);
			oDiv.appendChild(oDivText);
	    	var eles = document.getElementsByClassName('el-pagination__total');
	    	eles[0].appendChild(oDiv);
	    },
	}
}
</script>
<style>
.role .role-container {
	padding: 20px;
}
.role .edit, .role .delete {
	width: 20px;
	height: 22px; 
	cursor: pointer;
}
.role .edit {
	margin-right: 13px;
}
.role .el-input__inner{
	width: 180px;
    height: 38px;
    line-height: 38px;
    color: #545358;
}
.role .my-search {
	height: 40px;
    width: 40px;
    background-color: #5785e0;
    padding: 0;
    border-radius: 4px;
    border: 0;
}
.role .form-title {
	height: 60px;
	line-height: 60px;
}
.role .form-title .split-line {
	margin-top:20px;
}
.role .form-title .title {
	color: #475055;
	font-size: 18px;
	margin-left: 18px;
}
.role .add{
	position: absolute;
    top: 11px;
    left: 10px;
    height:18px;
    width:18px;
}
.role .my-add {
	height: 40px;
    line-height: 40px;
    padding: 0;
    width: 104px;
    border: 1px solid #5484e0;
    color: #5484e0;
}
.role .my-add span {
	margin-left:10px
}
.role-dialog .el-dialog__body{
	padding-left: 70px;
	padding-right: 70px;
}
.role-dialog .el-form--inline .el-form-item.left-item {
	margin-right:49px;
}
.role-dialog .el-form--inline .el-form-item.left-item {
	margin-right:49px;
}
.role .my-larger .el-input__inner, .role .my-larger .el-textarea__inner{
	width: 494px;
	height:38px !important;
}
.role .el-input__inner:focus, .role .el-textarea__inner{
	border-color: #5e85e0;
}
.role-dialog .el-dialog{
	width: 732px !important;
}
</style>