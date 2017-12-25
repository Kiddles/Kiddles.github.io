<template>
	<div class="content">
		<div class="main org">
			<div class="form-title">
				<el-row style="height:20px;">
				  <el-col :span="20"><div class="split-line"></div><div class="title">机构信息</div></el-col>
				  <el-col :span="4" style="text-align:center;"></el-col>
				</el-row>
			</div>
			<div class="org-container">
				<div class="org-left">
					<div class="tree-container">
						<div class="left-title">组织机构</div>
						<el-tree :data="orgs" :props="defaultProps" @node-click="handleNodeClick" :expand-on-click-node="false" accordion></el-tree>
					</div>
				</div>
				<div class="org-right">
					<el-form :inline="formLine" :label-position="labelPosition" label-width="70px" :model="condition">
					    <el-form-item label="机构名称">
					    	<el-input v-model="condition.officeName" @keyup.enter.native="searchOrg"></el-input>
					    </el-form-item>
					    <el-form-item label="机构编号">
					    	<el-input v-model="condition.officeCode" @keyup.enter.native="searchOrg"></el-input>
					    </el-form-item>
					    <el-form-item label="上级机构">
					    	<el-input v-model="condition.parentOfficeName" @keyup.enter.native="searchOrg"></el-input>
					    </el-form-item>
					    <el-form-item label="">
					    	<el-button class="my-search" @click="searchOrg"><img src="../../../static/img/orgsearch.png"/></el-button>
					    </el-form-item>
					    <el-form-item label="" style="float:right;">
					    	<el-button class="my-add" @click="showAdd"><img class="add" src="../../../static/img/orgAdd.png"/><span>添加机构</span></el-button>
					    </el-form-item>
					</el-form>
					<el-table :data="orgList" style="width: 100%">
			            <el-table-column prop="name" label="机构名称">
			            </el-table-column>
			            <el-table-column prop="code" label="机构编号">
			            </el-table-column>
			            <el-table-column prop="parentName" label="上级机构">
			            </el-table-column>
			            <el-table-column prop="primaryPersonName" label="主负责人">
			            </el-table-column>
			            <el-table-column prop="phone" label="手机号码">
			            </el-table-column>
			            <el-table-column label="操作">
			                <template scope="scope">
			                    <el-tooltip content="编辑" placement="top" effect="light">
								  <img class="edit" src="../../../static/img/orgEdit.png" @click="handleEdit(scope.row.officeId)"/>
								</el-tooltip>
								<el-tooltip content="删除" placement="top" effect="light">
			                    	<img class="delete" src="../../../static/img/delete.png" @click="handleDel(scope.$index, scope.row)"/>
			                    </el-tooltip>
			                </template>
			            </el-table-column>
			        </el-table>
			        <div class="pagination">
                        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next, total, jumper" :total="pageInfo1.totalCount" :current-page="condition.pageNum" id="page1">
                        </el-pagination>
                    </div>
                    <el-dialog :title="dialogName" :visible.sync="dialogFormVisible" class="my-dialog width728 org-add-dialog" @close="openAddOrg">
						<el-form :model="orgAddDto" label-width="78px" :inline="formLine"  :rules="rules" ref="addOrgForm" id="addOrgForm">
							<el-form-item label="parentId" style="display:none">
						        <el-input v-model="orgAddDto.parentId" auto-complete="off"></el-input>
						    </el-form-item>
						    <el-form-item label="上级机构" prop="parentName" class="left-item">
						        <el-input v-model="orgAddDto.parentName" disabled icon="search" :on-icon-click="handleIconClick"></el-input>
						        <i class="show-delete el-icon-close" @click="handleDeletePer('parentName')"></i>
						    </el-form-item>
						    <el-form-item label="officeId" style="display:none">
						        <el-input v-model="orgAddDto.officeId" auto-complete="off"></el-input>
						    </el-form-item>
						    <el-form-item label="机构名称" prop="name">
						        <el-input v-model="orgAddDto.name" auto-complete="off"></el-input>
						    </el-form-item>
						    <el-form-item label="机构编码" prop="code" class="left-item">
						        <el-input v-model="orgAddDto.code" auto-complete="off"></el-input>
						    </el-form-item>
						    <el-form-item label="primaryPerson" style="display:none">
						        <el-input v-model="orgAddDto.primaryPersonId" auto-complete="off"></el-input>
						    </el-form-item>
						    <el-form-item label="主负责人" prop="primaryPerson">
						        <el-input v-model="orgAddDto.primaryPersonName" disabled icon="search" :on-icon-click="handlePrimaryIconClick"></el-input>
						        <i class="show-delete el-icon-close" @click="handleDeletePer('primaryPerson')"></i>
						    </el-form-item>
						    <el-form-item label="deputyPerson" style="display:none">
						        <el-input v-model="orgAddDto.deputyPersonId" auto-complete="off"></el-input>
						    </el-form-item>
						    <el-form-item label="副负责人" prop="deputyPerson" class="left-item">
						        <el-input v-model="orgAddDto.deputyPersonName" disabled icon="search" :on-icon-click="handleDeputyIconClick"></el-input>
						        <i class="show-delete el-icon-close" @click="handleDeletePer('deputyPerson')"></i>
						    </el-form-item>
						    <el-form-item label="person" style="display:none">
						        <el-input v-model="orgAddDto.masterId" auto-complete="off"></el-input>
						    </el-form-item>
						    <el-form-item label="负责人" prop="person">
						        <el-input v-model="orgAddDto.masterName" disabled icon="search" :on-icon-click="handlePersonIconClick"></el-input>
						        <i class="show-delete el-icon-close" @click="handleDeletePer('master')"></i>
						    </el-form-item>
						    <el-form-item label="邮箱" prop="email"  class="left-item">
						        <el-input v-model="orgAddDto.email" auto-complete="off"></el-input>
						    </el-form-item>
						    <el-form-item label="手机" prop="phone">
						        <el-input v-model="orgAddDto.phone" auto-complete="off"></el-input>
						    </el-form-item>
						    <el-form-item label="座机电话" prop="tel"  class="left-item">
						        <el-input v-model="orgAddDto.tel" auto-complete="off" class="my-middle">
						        </el-input>
						    </el-form-item>
						    <el-form-item label="传真" prop="fax">
						        <el-input v-model="orgAddDto.fax" auto-complete="off" class="my-middle">
						        </el-input>
						    </el-form-item>
						    <el-form-item label="地址" prop="address" class="my-larger">
						        <el-input v-model="orgAddDto.address" auto-complete="off"></el-input>
						    </el-form-item>
						    <el-form-item label="备注" prop="remark" class="my-larger">
						        <el-input type="textarea" v-model="orgAddDto.remarks" :rows="2" resize="none">
								</el-input>
						    </el-form-item>
						</el-form>
						<div slot="footer" class="dialog-footer">
						    <el-button type="primary" @click="submit('addOrgForm')"  :loading="saveing">{{savetext}}</el-button>
						</div>
					</el-dialog>
					<el-dialog title="选择上级机构" :visible.sync="dialogMainFormVisible" size="small" class="org-dialog my-dialog overflowy-scroll" :close-on-click-modal="false">
			          <el-form label-width="80px">
			            <el-form-item label="">
			                <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
			                <el-input style="display:none;"></el-input>
			                <el-tree class="filter-tree" :data="orgs1" :props="defaultProps1" check-strictly :expand-on-click-node="true" :filter-node-method="filterNode" ref="tree2" accordion @node-click="handleOrgSure"></el-tree>
			            </el-form-item>
			          </el-form>
			          <div slot="footer" class="dialog-footer">
			            <el-button @click="dialogMainFormVisible = false">取 消</el-button>
			          </div>
			        </el-dialog>
			        <el-dialog title="选择主负责人" :visible.sync="dialogPrimaryFormVisible" size="small"  class="my-dialog overflowy-scroll" @open="handleOpen(2)">
			            <el-row :gutter="20">
			                <el-col :span="12">
			                    <el-input v-model="main.searchTxt" placeholder="请输入内容" @keyup.enter.native="handleMainSearch"></el-input>
			                </el-col>
			                <el-col :span="12">
			                    <el-button type="primary" icon="search" @click="handleMainSearch">搜索</el-button>
			                </el-col>
			            </el-row>
			            <el-table :data="tableMainData" border style="width: 100%" highlight-current-row @current-change="handleMainCurrentRowChange">
			                <el-table-column prop="name" label="姓名">
			                </el-table-column>
			                <el-table-column prop="userName" label="工号">
			                </el-table-column>
			            </el-table>
			            <div class="pagination">
			                <el-pagination @current-change="handleMainCurrentChange" layout="prev, pager, next, total, jumper" :total="pageInfo2.totalCount" :current-page="main.pageNum" id="page2">
			                </el-pagination>
			            </div>
			          <div slot="footer" class="dialog-footer">
			            <el-button @click="handleMainSure" type="primary">确定</el-button>
			          </div>
			        </el-dialog>
			        <el-dialog title="选择副负责人" :visible.sync="dialogSubFormVisible" size="small" :close-on-click-modal="false" class="my-dialog overflowy-scroll" @open="handleOpen(3)">
			            <el-row :gutter="20">
			                <el-col :span="12">
			                    <el-input v-model="sub.searchTxt" placeholder="请输入内容"  @keyup.enter.native="handleSubSearch"></el-input>
			                </el-col>
			                <el-col :span="12">
			                    <el-button type="primary" icon="search" @click="handleSubSearch">搜索</el-button>
			                </el-col>
			            </el-row>
			            <el-table :data="tableSubData" border style="width: 100%" highlight-current-row @current-change="handleSubCurrentRowChange">
			                <el-table-column prop="name" label="姓名">
			                </el-table-column>
			                <el-table-column prop="userName" label="工号">
			                </el-table-column>
			            </el-table>
			            <div class="pagination">
			                <el-pagination @current-change="handleSubCurrentChange" layout="prev, pager, next, total, jumper" :total="pageInfo3.totalCount" :current-page="sub.pageNum" id="page3">
			                </el-pagination>
			            </div>
			          <div slot="footer" class="dialog-footer">
			            <el-button @click="handleSubSure" type="primary">确定</el-button>
			          </div>
			        </el-dialog>
			        <el-dialog title="选择负责人" :visible.sync="dialogPersonFormVisible" size="small" :close-on-click-modal="false" class="my-dialog overflowy-scroll" @open="handleOpen(4)">
			            <el-row :gutter="20">
			                <el-col :span="12">
			                    <el-input v-model="person.searchTxt" placeholder="请输入内容"  @keyup.enter.native="handlePersonSearch"></el-input>
			                </el-col>
			                <el-col :span="12">
			                    <el-button type="primary" icon="search" @click="handlePersonSearch">搜索</el-button>
			                </el-col>
			            </el-row>
			            <el-table :data="tablePersonData" border style="width: 100%" highlight-current-row @current-change="handlePersonCurrentRowChange">
			                <el-table-column prop="name" label="姓名">
			                </el-table-column>
			                <el-table-column prop="userName" label="工号">
			                </el-table-column>
			            </el-table>
			            <div class="pagination">
			                <el-pagination @current-change="handlePersonCurrentChange" layout="prev, pager, next, total, jumper" :total="pageInfo4.totalCount" :current-page="person.pageNum" id="page4">
			                </el-pagination>
			            </div>
			          <div slot="footer" class="dialog-footer">
			            <el-button @click="handlePersonSure" type="primary">确定</el-button>
			          </div>
			        </el-dialog>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data: function () {
		var validatePerson = (rule, value, callback) => {
			if (value == '') {
				callback(new Error('请选择'));
			} else {
				callback();
			}
		};
		return {
			main:{
                searchTxt:'',
                pageSize:10,
                pageNum:1
            },
            sub:{
                searchTxt:'',
                pageSize:10,
                pageNum:1
            },
            person:{
                searchTxt:'',
                pageSize:10,
                pageNum:1
            },
            pageInfo1: {
				totalCount: 0,
				pageCount: 0
			},
			pageInfo2: {
				totalCount: 0,
				pageCount: 0
			},
			pageInfo3: {
				totalCount: 0,
				pageCount: 0
			},
			pageInfo4: {
				totalCount: 0,
				pageCount: 0
			},
            currentMainRow:'',
            currentSubRow :'',
            currentPersonRow :'',
            tableMainData:[],
            tableSubData:[],
            tablePersonData:[],
            dialogPrimaryFormVisible:false,
            dialogSubFormVisible:false,
            dialogPersonFormVisible:false,
			dialogMainFormVisible: false,
			dialogName: '添加机构',
			savetext: '保存',
			filterText: '',
			dialogFormVisible: false,
			orgAddDto: {
				parentId: '',
			    parentName: '',
			    officeId: '',
			    name: '',
			    code: '',
			    primaryPersonId: '',
			    primaryPersonName: '',
			    deputyPersonId: '',
			    deputyPersonName: '',
			    masterName: '',
			    masterId: '',
			    email: '',
			    phone: '',
			    tel: '',
			    fax: '',
			    address: '',
			    remarks: ''
			},
			saveing : false,
			checkedOrgIds: [0],
			rules: {
              name:[
                {required: true, message: '请输入名称', trigger: 'blur'},
                { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
              ],
              code:[
                { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
              ],
              email:[
                {type:'email', message:'邮箱书写格式错误', trigger:'blur'}
              ],
              phone:[
                {type:'string', message:'手机号码书写格式错误',pattern: /^1[0-9]{10}$/,trigger:'blur'}
              ],
              tel:[
                { min: 7, max: 20, message: '长度在 7 到 20 个字符', trigger: 'blur' }
              ],
              fax:[
                { min: 7, max: 20, message: '长度在 7 到 20 个字符', trigger: 'blur' }
              ],
              address:[
                { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
              ],
              remarks:[
                { min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }
              ]
            },
			defaultProps: {
	        	children: 'childTree',
	        	label: 'name'
	        },
	        defaultProps1: {
	        	children: 'childTree',
	        	label: 'name'
	        },
	        orgs1: [],
	        orgs: [],
	        formLine: true,
			labelPosition: 'left',
			condition: {
				officeName: '',
				officeCode: '',
				parentOfficeName: '',
				listOfficeId: [0],
				pageNum: 1,
				pageSize: 10
			},
			orgList: []
		}
	},
	created: function () {
		this.getPermission();
		this.getOrgTree();
		this.initTable();
	},
	watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
	mounted: function () {
		this.initPage(1);
	},
	methods: {
		handleDeletePer (delePerson) {
			var self = this;
			if (delePerson == 'primaryPerson') {
				self.orgAddDto.primaryPersonId = '';
				self.orgAddDto.primaryPersonName = '';
			} else if (delePerson == 'deputyPerson') {
				self.orgAddDto.deputyPersonId = '';
				self.orgAddDto.deputyPersonName = '';
			} else if (delePerson == 'master'){
				self.orgAddDto.masterId = '';
				self.orgAddDto.masterName = '';
			}else {
				self.orgAddDto.parentName = '';
            	self.orgAddDto.parentId = '';
			}
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
		openAddOrg () {
			this.orgAddDto = {
				parentId: '',
			    parentName: '',
			    officeId: '',
			    name: '',
			    code: '',
			    primaryPersonId: '',
			    primaryPersonName: '',
			    deputyPersonId: '',
			    deputyPersonName: '',
			    email: '',
			    phone: '',
			    tel: '',
			    fax: '',
			    address: '',
			    remarks: ''
			};
			this.$refs['addOrgForm'].resetFields();
			this.saveing = false;
            this.savetext="保存";
		},
		handleOpen (param) {
			this.initPage(param);
			if (param === 2) {
				this.getMainData();
			} else if (param === 3) {
				this.getSubData();
			} else {
				this.getPersonData();
			}
		},
		//获得主负责人选择列表
        getMainData() {
            let self = this;
            self.$api.post(self.url.responserSearch, self.main, function(r) {
                self.tableMainData = r.data.list;
                self.pageInfo2.totalCount = r.data.total;
                self.pageInfo2.pageCount = r.data.pages;
                self.initPage(2);
            }, function(r) {
            	self.$message.error(r.message);
        	}, self.url.MOCK, '', true);
        },
        //获得副负责人选择列表
        getSubData() {
            let self = this;
            self.$api.post(self.url.responserSearch, self.sub, function(r) {
                self.tableSubData = r.data.list;
                self.pageInfo3.totalCount = r.data.total;
                self.pageInfo3.pageCount = r.data.pages;
                self.initPage(3);
            }, function(r) {
            	self.$message.error(r.message);
        	}, self.url.MOCK, '', true);
        },
        //获得负责人选择列表
        getPersonData() {
            let self = this;
            self.$api.post(self.url.responserSearch, self.person, function(r) {
                self.tablePersonData = r.data.list;
                self.pageInfo4.totalCount = r.data.total;
                self.pageInfo4.pageCount = r.data.pages;
                self.initPage(4);
            }, function(r) {
            	self.$message.error(r.message);
        	}, self.url.MOCK, '', true);
        },
        //主负责人搜索
        handleMainSearch(){
            this.main.pageNum = 1;
            this.getMainData();
        },
        //副负责人搜索
        handleSubSearch(){
            this.sub.pageNum = 1;
            this.getSubData();
        },
         //负责人搜索
        handlePersonSearch(){
            this.person.pageNum = 1;
            this.getPersonData();
        },
        //主负责人列表选择
        handleMainCurrentRowChange(val){
            // console.log(val);
            this.currentMainRow = val;
        },
        //副负责人列表选择
        handleSubCurrentRowChange(val){
            // console.log(val);
            this.currentSubRow = val;
        },
        //副负责人列表选择
        handlePersonCurrentRowChange(val){
            // console.log(val);
            this.currentPersonRow = val;
        },
        //主负责人列表选择确认
        handleMainSure(){
        	if (this.currentMainRow) {
        		this.orgAddDto.primaryPersonName=this.currentMainRow.name;
	            this.orgAddDto.primaryPersonId=this.currentMainRow.userId;
	            this.dialogPrimaryFormVisible=false;
        	}
        },
        //副负责人列表选择确认
        handleSubSure(){
        	if (this.currentSubRow) {
        		this.orgAddDto.deputyPersonName=this.currentSubRow.name;
	            this.orgAddDto.deputyPersonId=this.currentSubRow.userId;
	            this.dialogSubFormVisible=false;
        	}
            
        },
        //负责人列表选择确认
        handlePersonSure(){
        	if (this.currentPersonRow) {
        		this.orgAddDto.masterName=this.currentPersonRow.name;
	            this.orgAddDto.masterId=this.currentPersonRow.userId;
	            this.dialogPersonFormVisible=false;
        	}
            
        },
        handleMainCurrentChange(val) {
            this.main.pageNum = val;
            this.getMainData();
        },
        handleSubCurrentChange(val) {
            this.sub.pageNum = val;
            this.getSubData();
        },
        handlePersonCurrentChange(val) {
            this.person.pageNum = val;
            this.getPersonData();
        },
        searchOrg () {
        	this.condition.pageNum = 1;
        	this.initTable();
        },
		showAdd () {
			this.dialogFormVisible = true;
			this.dialogName = '添加机构';
		},
		handleIconClick () {
			this.dialogMainFormVisible = true;
		},
		handlePrimaryIconClick () {
			this.dialogPrimaryFormVisible = true;
		},
		handleDeputyIconClick () {
			this.dialogSubFormVisible = true;
		},
		handlePersonIconClick () {
			this.dialogPersonFormVisible = true;
		},
		handleOrgSure (data) {
			// console.log(data);
			this.orgAddDto.parentName = data.name;
            this.orgAddDto.parentId = data.id;
            this.dialogMainFormVisible=false;
		},
		filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
		submit (formName) {
			let self = this;
			if (!self.orgAddDto.primaryPersonId) {
				self.$message.error('主负责人不可为空');
				return false;
			}
			if (self.orgAddDto.primaryPersonId == self.orgAddDto.deputyPersonId || self.orgAddDto.primaryPersonId == self.orgAddDto.masterId) {
				self.$message.error('职位冲突');
				return false;
			}
			if ((self.orgAddDto.deputyPersonId  && self.orgAddDto.deputyPersonId == self.orgAddDto.masterId) || (self.orgAddDto.masterId  && self.orgAddDto.deputyPersonId == self.orgAddDto.masterId)) {
				self.$message.error('职位冲突');
				return false;
			}
            self.$refs[formName].validate((valid) => {
              if (valid) {
                self.saveing = true;
                self.savetext="保存中";
                let orgAddDto = self.orgAddDto;
                let url;
                delete orgAddDto.parentName;
                delete orgAddDto.primaryPersonName;
                delete orgAddDto.deputyPersonName;
                delete orgAddDto.masterName;
                if(orgAddDto.officeId){
                    url = self.url.updateOrg;
                }else{
                	url = self.url.saveOrg;
                }
                self.$api.post(url, orgAddDto, function(r) {
                    if (r.code==="ACK"){
                        self.$message({
                            type: 'success',
                            message: r.message
                        });
                        self.dialogFormVisible = false;
                        self.getOrgTree();
						self.searchOrg();
                    }else{
                        self.$message.error(r.message);
                    }
                    self.saveing = false;
                	self.savetext="保存";
                }, function(r) {
	            	self.$message.error(r.message);
	            	self.saveing = false;
                	self.savetext="保存";
	        	}, self.url.MOCK, '', true);
              } else {
              	self.saveing = false;
                self.savetext="保存";
                console.log('error submit!!');
                return false;
              }
            });
		},
 		handleNodeClick (data) {
			let checkNodeIds = [];
            checkNodeIds.push(data.id);
            this.condition.listOfficeId = checkNodeIds;
            this.condition.pageNum = 1;
            this.initTable();
	    },
	    handleDel (index, row) {
	    	let self = this;
            self.$confirm('确定删除该机构吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                self.$api.delete(self.url.deleteOrg + row.officeId, {},function(r) {
                    if (r.code==="ACK") {
                        self.$message({
                            type: 'success',
                            message: r.message
                        });
                        self.getOrgTree();
						self.searchOrg();
                    }else{
                        self.$message({
                            type: 'error',
                            message: r.message
                        });
                    }
                }, function(r) {
	            	self.$message.error(r.message);
	        	}, self.url.MOCK, '', true);
            }).catch(() => {
              self.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
	    },
	    handleEdit (id) {
	    	var self = this;
			self.$api.get(self.url.getOrg + id, {}, function(r) {
                // console.log(r);
                if (r.code === 'ACK') {
                	self.dialogFormVisible = true;
                	self.orgAddDto = r.data;
                	self.dialogName = '编辑机构';
                } else {
                	self.$message.error(r.message);
                }
            }, function(r) {
                self.$message.error(r.message);
            }, self.url.MOCK, '', true);
	    },
	    initTable () {
	    	var self = this;
	    	if (self.condition.listOfficeId.length === 0) {
	    		self.listOfficeId = [0];
	    	}
			self.$api.post(self.url.getOrgList, JSON.stringify(self.condition), function(r) {
                // console.log(r);
                if (r.code === 'ACK') {
                	self.orgList = r.data.list;
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
	    	if (document.getElementById("myPages"+num)) {
	    		document.getElementById("myPages"+num).parentNode.removeChild(document.getElementById("myPages"+num));
	    	}
	    	var str;
	    	if (num === 1) {
	    		str = this.pageInfo1.pageCount;
	    	} else if (num === 2) {
	    		str = this.pageInfo2.pageCount;
	    	} else if (num === 3) {
	    		str = this.pageInfo3.pageCount;
	    	} else {
	    		str = this.pageInfo4.pageCount;
	    	}
	    	var text = '数据，共' + str + '页，';
	    	var oDiv = document.createElement("span"); 
	    	oDiv.id='myPages' + num;
			var oDivText = document.createTextNode(text);
			oDiv.appendChild(oDivText);
			var parentDiv = document.getElementById("page"+num);
			if (parentDiv) {
				var eles = parentDiv.lastChild;
	    		parentDiv.insertBefore(oDiv, eles);
			}
	    	
	    },
 	    handleCurrentChange(data) {
 	    	this.condition.pageNum = data;
	        this.initTable();
	    },
	    getOrgTree () {
	    	var self = this;
			self.$api.get(self.url.getOrgTree, {}, function(r) {
                // console.log(r);
                if (r.code === 'ACK') {
                	self.orgs = r.data;
                	self.orgs1 = r.data;
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
<style>
.org {
	font-size: 14px;
	color: #545358;
}
.org .org-container{
	min-height: 756px;
}
.org .form-title{
	height: 20px;
	line-height: 20px;
	padding: 20px 0 30px;
}
.org .title{
	font-size: 18px;
    margin-left: 18px;
    color: #475055;
    float: left;
}
.org .org-left {
	color: #545358;
	font-size: 14px;
	padding:0 16px 20px 22px;
	width: 264px;
    display: inline-block;
    float: left;
    height:auto;
}
.org .org-right {
	padding-bottom: 20px;
    overflow: auto;
    padding-right: 20px;
    height: auto;
}
.org .left-title {
	height: 50px;
    line-height: 50px;
    padding-left: 10px;
}
.org .tree-container {
	border: 1px solid #dde2e4;
}
.org .el-tree {
	border:none;
}
.org .el-tree-node__expand-icon {
	background: url(../../../static/img/treeAdd.png) no-repeat;
	height: 18px;
	width: 18px;
	border: none;
}
.org .el-tree-node__expand-icon.expanded, .el-tree-node__expand-icon.is-leaf {
	background: url(../../../static/img/treeDel.png) no-repeat;
	-ms-transform: rotate(0deg);
    transform: rotate(0deg);
}
.org .tree-container .el-tree-node.is-current .el-tree-node__expand-icon.expanded, .org .tree-container .el-tree-node.is-current .el-tree-node__expand-icon.is-leaf {
	background: url(../../../static/img/treeDelActive.png) no-repeat;
	-ms-transform: rotate(0deg);
    transform: rotate(0deg);
}
.org .my-dialog .el-tree-node.is-current > .el-tree-node__content .el-tree-node__expand-icon.expanded, .el-tree-node.is-current > .el-tree-node__content .el-tree-node__expand-icon.is-leaf {
	background: url(../../../static/img/treeDelActive.png) no-repeat;
	-ms-transform: rotate(0deg);
    transform: rotate(0deg);
}
.org .tree-container .el-tree-node.is-current {
	color: #5e85e0;
}
.org .my-dialog .el-tree-node.is-current > .el-tree-node__content{
	color: #5e85e0;
}
.org .el-tree__empty-block {
	height: 548px;
}
.org .el-input__inner{
	width: 180px;
    height: 38px;
    line-height: 38px;
    color: #545358;
}
.org .el-table__empty-block{
	height:468px;
}
.org .el-table__body-wrapper{
	min-height: 475px;
}
.org .my-search {
	height: 40px;
    width: 40px;
    background-color: #5785e0;
    padding: 0;
    border-radius: 4px;
    border: 0;
}
.org .add{
	position: absolute;
    top: 11px;
    left: 10px;
    height:18px;
    width:18px;
}
.org .my-add {
	height: 40px;
    line-height: 40px;
    padding: 0;
    width: 104px;
    border: 1px solid #5484e0;
    color: #5484e0;
}
.org .my-add span {
	margin-left:10px
}
.org .edit, .org .delete {
	width: 20px;
	height: 22px; 
	cursor: pointer;
}
.org .edit {
	margin-right: 13px;
}
.my-dialog.width728 .el-dialog{
	width: 732px !important;
}
.my-dialog .el-dialog__body{
	padding-left: 70px;
	padding-right: 70px;
}
.org .el-form-item__label{
	color: #333333;
	font-size: 14px;
}
.my-dialog .el-form--inline .el-form-item.left-item {
	margin-right:49px;
}
.org .my-larger .el-input__inner, .org .my-larger .el-textarea__inner{
	width: 494px;
	height:38px !important;
}
.org .el-table__body tr.current-row>td {
	background:#e0e9ff;
}
.org .el-input__inner:focus, .role  .el-textarea__inner{
	border-color: #5e85e0;
}
.my-dialog.overflowy-scroll .el-dialog__body {
	height: 480px;
	overflow-y: scroll;
}
.my-dialog.overflowy-scroll .el-dialog__body .el-input__inner {
	margin-bottom: 10px;
}
.org .show-delete {
	position: absolute;
    right: 0px;
    top: 0px;
    color: #bfcbd9;
    font-size: 11px;
    cursor: pointer;
    width: 35px;
    height: 38px;
    text-align: center;
    line-height: 38px;
    border-left: 1px #d1dbe5 solid;
}
.org-add-dialog .el-icon-search:before {
	font-size: 16px !important;
}
.org-add-dialog .el-input__icon {
	right: 35px !important;
}
.org-add-dialog .el-input__icon+.el-input__inner {
	padding-right: 70px !important;
}
.org .show-delete:hover {
	color: #ff4949;
}
@media screen and (min-width: 1600px) {
	.org .tree-container {
		height: 667px;
		overflow-y: auto;
	}

}
@media screen and (max-width: 1599px) {
	.org .tree-container {
		height: 726px;
		overflow-y: auto;
	}

}
</style>