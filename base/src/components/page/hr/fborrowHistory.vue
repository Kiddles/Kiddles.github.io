<template>
	<div class="heart">
		<div class="hr-container">
			<el-form :inline="formLine" :label-position="labelPosition">
				<el-form-item label="">
					<template v-if="isCashier">
						<router-link :to="{path:'/fborrowExport'}">
				            <el-button class="my-button"><img src="../../../../static/img/waitHY.png" class="my-icon"/>员工借款待导出列表</el-button>
				        </router-link>
				        <router-link :to="{path:'/fborrowPayout'}">
				            <el-button class="my-button"><img src="../../../../static/img/waitHY.png" class="my-icon"/>员工借款待支付列表</el-button>
				        </router-link>
				    </template>
			    	<router-link :to="{path:'/fborrow'}">
			            <el-button class="my-button"><img src="../../../../static/img/waitHY.png" class="my-icon"/>员工借款待审核列表</el-button>
			        </router-link>
			    </el-form-item>
			</el-form>
			<el-form :inline="formLine" :label-position="labelPosition" :model="condition">
				<el-form-item >
					<el-date-picker @change="setApplyDate" v-model="applyDate" type="daterange" placeholder="选择申请日期范围"  range-separator="至">
					</el-date-picker>
				</el-form-item>
				<el-form-item >
					<el-date-picker v-model="payDate" @change="setPayDate" type="daterange" placeholder="选择支付日期范围"  range-separator="至">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="">
			    	<el-input v-model="condition.id" placeholder="借款ID" @keyup.enter.native="search"></el-input>
			    </el-form-item>
			    <el-form-item label="">
			    	<el-input v-model="condition.id" placeholder="填单人" @keyup.enter.native="search"></el-input>
			    </el-form-item>
			    <el-form-item label="">
			    	<el-input v-model="condition.id" placeholder="申请人" @keyup.enter.native="search"></el-input>
			    </el-form-item>
			    <el-form-item label="">
			    	<el-select v-model="condition.company" placeholder="公司实体">
			    		<el-option value="全部" label="全部"></el-option>
			    		<template v-for="item in companys">
			    			<el-option :value="item.leaveTypeName" :label="item.leaveTypeName">{{item.leaveTypeName}}</el-option>
			    		</template>
				    </el-select>
			    </el-form-item>
			    <el-form-item label="">
					<el-input v-model="filterText"  @focus="openOrg" @blur="closeOrg" placeholder="部门"></el-input>
					<el-tree :data="orgs" :props="defaultProps" @node-click="handleNodeClick" :expand-on-click-node="true" 
					:filter-node-method="filterNode"
					v-show="isOrgShow" accordion ref="tree2" class="my-tree">
					</el-tree>
			    </el-form-item>
			    <el-form-item label="">
			    	<el-select v-model="condition.status" placeholder="状态">
			    		<el-option value="全部" label="全部"></el-option>
			    		<!-- <el-option value="未审核" label="未审核"></el-option> -->
			    		<el-option value="审核中" label="审核中"></el-option>
			    		<el-option value="已拒绝" label="已拒绝"></el-option>
			    		<el-option value="已支付" label="已支付"></el-option>
			    		<el-option value="已还款" label="已还款"></el-option>
				    </el-select>
			    </el-form-item>
			    <el-form-item>
			    	<el-input placeholder="500" v-model="condition.minMoney" @keyup.native="checkNum(1, $event)">
					    <template slot="prepend">金额</template>
					</el-input>
				</el-form-item>
				<el-form-item>
			    	<span style="color:#dde2e4;">-</span>
				</el-form-item>
				<el-form-item>
			    	<el-input placeholder="5000" v-model="condition.maxMoney" @keyup.native="checkNum(2, $event)">
					    <template slot="prepend">金额</template>
					</el-input>
				</el-form-item>
			    <el-form-item label="">
			    	<el-button class="my-search" @click="search"><img src="../../../../static/img/orgsearch.png"/></el-button>
			    </el-form-item>
			</el-form>
			<el-table :data="dataList" style="width: 100%">
				<!-- <el-table-column type="selection" width="55">
    			</el-table-column> -->
	            <el-table-column prop="staffId" label="借款ID">
	            </el-table-column>
	            <el-table-column prop="name" label="申请借款日期">
	            </el-table-column>
	            <el-table-column prop="staffType" label="填单人">
	            </el-table-column>
	            <el-table-column prop="officeName" label="借款人">
	            </el-table-column>
	            <el-table-column prop="startDate" label="借款部门">
	            </el-table-column>
	            <el-table-column prop="endDate" label="金额">
	            </el-table-column>
	            <el-table-column prop="leaveDays" label="已还款金额">
	            </el-table-column>
	            <el-table-column prop="leaveType" label="最新还款日期">
	            </el-table-column>
	            <el-table-column prop="leaveType" label="公司实体">
	            </el-table-column>
	            <el-table-column prop="leaveStatus" label="状态">
	            </el-table-column>
	            <el-table-column label="操作">
	               <template scope="scope">
		                <!-- <i class="handler upload"></i> -->
		                <el-popover ref="popover4" placement="bottom-end" width="683" height="292" trigger="click" @show="handleDetail(scope.$index, scope.row)">
						    <div class="my-pop">
						    	<div class="prop-left">
						    		<div class="title">请假原因</div>
						    		<div class="memo">
						    			<p class="my-reason">{{detail.reason}}</p>
						    			<div  class="my-cert">
						    				<div><img src="../../../../static/img/my-certi.png"/><div class="my-magnify" @click="handleMangnify('../../../../static/img/my-certi.png')"></div></div>
						    				<!-- <template v-for="item in detail.listAttachmentUrl">
							    				<div><img v-bind:src="item.attachmentUrl"/><div class="my-magnify" @click="handleMangnify(item.attachmentUrl)"></div></div>
							    			</template> -->
						    			</div>
						    			<img class="resizeIcon" src="../../../../static/img/resizeIcon.png"/>
						    		</div>
						    	</div>
						    	<div class="prop-right">
						    		<div class="title">状态变迁</div>
						    		<div class="status-dream">
						    			<ul>
						    				<template v-for="item in detail.status">
						    					<li><div class="time"></div><div class="responser"><p>{{item.operatorName}}</p><p style="color:#777;">{{item.operation}}</p></div><div>{{item.operateTime}}</div></li>
						    				</template>
						    				<!-- <li><div class="time"></div><div  class="responser"><p>张晓明</p><p>审批通过</p></div><div>2017/08/09 08:36</div></li>
						    				<li><div class="time"></div><div  class="responser"><p>张晓月</p><p>审批成功</p></div><div>2017/08/09 08:36</div></li> -->
						    			</ul>
						    		</div>
						    	</div>
						    </div>
						</el-popover>
	                    <!-- <i class="handler detail" v-popover:popover4></i> -->
	                    <img v-popover:popover4 src="../../../../static/img/detailIcon.png">
	                   	<el-tooltip content="预览" placement="top" effect="light">
	                   		<img src="../../../../static/img/printview.png" @click="printview(scope.$index, scope.row)">
	                   	</el-tooltip>
	                	<el-tooltip content="还款" placement="top" effect="light">
		                	<img src="../../../../static/img/cash.png" @click="openCash(scope.$index, scope.row)">
		               	</el-tooltip>
	                </template>
	            </el-table-column>
	        </el-table>
	        <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next, total, jumper" :total="pageInfo.totalCount" :current-page="condition.pageNum">
                </el-pagination>
            </div>
		</div>
		<!-- <div class="btn-container">
       		<el-button class="my-primary-button" @click="handleApply(true)">批&nbsp;&nbsp;准</el-button>
       		<el-button class="my-default-button" @click="handleApply(false)">拒&nbsp;&nbsp;绝</el-button>
       	</div> -->

		<el-dialog title="现金还款" :visible.sync="dialogVisible" class="my-dialog cash-dialog" @close="closeHandle" :close-on-click-modal="false">
			<div class="dialog-title">现金还款</div>
			<el-form :model="dto" label-width="88px" :inline="false" ref="addForm" id="addForm">
				<el-form-item label="还款金额">
			        <el-input v-model="dto.id" auto-complete="off" class="my-money"></el-input>
			        <div class="my-tips">
			        	<img class="left-leave-img" src="../../../../static/img/leave/leftday-info.png"><span class="reback-money">剩余还款金额￥4500.00元</span>
			        </div>
			    </el-form-item>
			    <el-form-item label="备注" prop="description" class="my-larger-item">
			        <el-input type="textarea" v-model="dto.description" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="添加附件">
					<div class="file-box">
						<div class="attachment show" v-for="attUrl in attachments">
							<img class="content-img" :src="attUrl" alt="">
							<img class="delete-img" src="../../../../static/img/leave/delete-attachment.png" @click="deleteImage(attUrl)" alt="">

						</div>
						<div v-if="isAddButtonShow" class="upload attachment">
							<img  src="../../../../static/img/leave/upload_img.png" alt="">
							<input type="file"  class="file" id="fileField" accept="image/png,image/jpeg,image/png"  @change="selectFile" />

						</div>
						
					</div>
				</el-form-item>
			</el-form>
			<div class="line"></div>
			<div class="dialog-title">还款明细</div>
			<div class="dialog-table">
				<el-table :data="tableData" style="width: 100%" @select="handleCheck" ref="multipleTablee" @select-all="handleCheck">
					<!-- <el-table-column type="selection" width="55">
	    			</el-table-column> -->
		            <el-table-column prop="staffId" label="借款ID">
		            </el-table-column>
		            <el-table-column prop="name" label="还款金额">
		            </el-table-column>
		            <el-table-column prop="staffType" label="已还金额">
		            </el-table-column>
		            <el-table-column prop="officeName" label="还款日期">
		            </el-table-column>
		        </el-table>
			</div>
			<div slot="footer" class="dialog-footer">
			    <el-button type="primary" @click="submit('addForm')"  :loading="saveing">{{savetext}}</el-button>
			</div>
		</el-dialog>

		<el-dialog title="" :visible.sync="imgDialogVisible" class="my-img-dialog">
		  <img v-bind:src="largeImg"/>
		</el-dialog>
	</div>
</template>
<script type="text/javascript">
export default {
	data: function () {
		return {
			isCashier: true,
			companys:[],
			dto: {
				id: '',
				description: ''
			},
			attachments: [],
			filterText: '',
			orgs: [],
			isOrgShow: false,
			defaultProps: {
				children: 'childTree',
				label: 'name'
			},
			dialogVisible: false,
			detail: {
				reason: '',
				status: [],
				listAttachmentUrl: []
			},
			applyDate: '',
			payDate: '',
			condition: {
				/*applyStartDate: '',
				applyEndDate: '',
				payStartDate: '',
				payEndDate: '',
				id: '',
				status: '',
				company: '',
				officeId: '',
				minMoney: '',
				maxMoney: '',*/
				pageNum: 1,
				pageSize: 10
			},
			pageInfo: {
				totalCount: 0,
				pageCount: 0
			},
			formLine: true,
			labelPosition: 'left',
			saveing: false,
			savetext: '保存',
			isAddButtonShow: true,
			dataList: [],
			tableData: [{'staffId': 10112, 'name': '250.00', 'staffType': '0.00 / 5000', 'officeName': '2017-01-10'},{'staffId': 10112, 'name': '250.00', 'staffType': '250.00 / 5000', 'officeName': '2017-01-11'},{'staffId': 10112, 'name': '250.00', 'staffType': '0.00 / 5000', 'officeName': '2017-01-10'}],
			multipleSelection: [],
			imgDialogVisible: false,
			largeImg: '',
		}

	},
	created: function () {
		this.getApproverRole();
		this.getOrgTree();
		this.initTable();
	},
	mounted: function () {
		this.triggerClick();
	},
	methods: {
		handleMangnify (path) {
			this.imgDialogVisible = true;
			this.largeImg = path;
		},
		checkNum: function (type, e) {
			// console.log('@@@@@@@@@@@@@@@@@@@@@@@@cdcdvdd:' + e.target.value);
			if (type===1) {
				this.condition.minMoney = e.target.value.replace(/[^0-9]/ig,"");
			} else {
				this.condition.maxMoney = e.target.value.replace(/[^0-9]/ig,"");
			}
		},
		getApproverRole: function () {
	    	var self = this;
			self.$api.post(self.url.isCashier, {}, function(r) {
                if (r.code === 'ACK') {
                	self.isCashier = r.data;
                } else {
                	self.$message.error(r.message);
                }
            }, function(r) {
                self.$message.error(r.message);
            }, self.url.MOCK, '', true);
	    },
		triggerClick: function () {
			document.getElementById('f-second').click();
		},
		printview: function (index, row) {
			this.$router.push('/reimbursePrintview?id=' + 333);
		},
		openCash:  function () {
			this.dialogVisible = true;
		},
		selectFile(e){
			// if(this.attachments.length >= 3){
			// 	this.$message("最多只能上传三张附件");
			// 	return;
			// }
			console.log(e);
			console.log("self.attachments.length--");
			if (self.attachments) {
				console.log(self.attachments.length);

			}

			console.log(e.target.files[0]);
			let file = e.target.files[0];
			if (file) {
				const formData = new FormData();
				formData.append('multipartFile', file);

				let self = this;
				let urlString = self.url.addimgPic;
				self.$api.post(urlString,formData, function(r) {
					console.log(r);
					self.attachments.push(r.data);
					console.log(self.attachments.length);
					if(self.attachments.length >= 3){
						self.isAddButtonShow = false;
						return;
					}
				},function(r) {
					self.$message.error("附件上传失败");
					console.log(r);
				}, self.url.MOCK, '', false);

			}
		},
		deleteImage(attUrl){
			var pos = this.attachments.indexOf(attUrl);
			this.attachments.splice(pos,1);
			if(this.attachments.length < 3){
				this.isAddButtonShow = true;
				return;
			}

		},
		getOrgTree () {
			var self = this;
			self.$api.get(self.url.getOrgTree, {}, function(r) {
				if (r.code === 'ACK') {
					self.orgs = r.data;
				} else {
					self.$message.error(r.message);
				}
			}, function(r) {
				debugger;
				self.$message.error(r.message);
			}, self.url.MOCK, '', true);
		},
		filterNode(value, data) {
			if (!value) return true;
			return data.name.indexOf(value) !== -1;
		},
		handleNodeClick (data) {
    		this.filterText = data.name;
    		this.condition.officeId = data.id;
    		this.isOrgShow = false;
    	},
		openOrg() {
    		this.isOrgShow = true;
    	},
    	closeOrg() {
    		this.isOrgShow = true;
    	},
		setApplyDate(val){
			this.condition.applyDate = val;
		},
		setPayDate(val){
			this.condition.payDate = val;
		},
		handleApply (param) {
			var self = this;
			var postData = [];
			debugger;
			if (self.multipleSelection.length > 0) {
				for (var i=0; i < self.multipleSelection.length; i++) {
					var obj = new Object();
					obj.leaveApplicationId = self.multipleSelection[i].leaveApplicationId;
					obj.processId =  self.multipleSelection[i].processId;
					obj.isApproved = param;
					postData.push(obj);
				}
				self.$api.post(self.url.leaveApplicationOperate, {'listapplicationOperate': postData}, function(r) {
					if (r.code === 'ACK') {
						self.$message.success(r.message);
						self.multipleSelection = [];
						self.search();
					} else {
						self.$message.error(r.message);
					}
				}, function(r) {
					self.$message.error(r.message);
				}, self.url.MOCK, '', true);
				
			} else {
				self.$message.warning('请选择审批的请假单');
			}
		},
		handleCheck (val, row) {
			this.multipleSelection = val;
		},
		closeHandle () {
			this.$refs['addForm'].resetFields();
		},
		handleDetail (index, row) {
	    	let self = this;
	    	self.$api.get(self.url.leaveDetail + row.leaveApplicationId, {}, function(r) {
                if (r.code==="ACK"){
                    self.detail = {
						reason: r.data.leaveReason,
						status: r.data.listProcessApprove,
						listAttachmentUrl: r.data.listAttachmentUrl
					}
                }else{
                    self.$message.error(r.message);
                }
            },function(){},self.url.MOCK);
	    },
		search () {
			this.condition.pageNum = 1;
			this.initTable();
		},
		handleCurrentChange (data) {
			this.condition.pageNum = data;
			this.initTable();
		},
		initTable () {
	    	var self = this;
	    	self.condition.leaveType = self.condition.leaveType=='全部' ? '':self.condition.leaveType;
			self.$api.post('http://172.16.129.123:9090/leave/web/hr/leaveApplication/list', {pageNum: 1,pageSize: 10}, function(r) {
                console.log(r);
                if (r.code === 'ACK') {
                	self.dataList = r.data.list;
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
<style type="text/css">
.hr-container {
	padding:20px;
}
.hr-container .my-button {
	padding: 0 10px 0 35px;
    height: 38px;
    line-height: 38px;
    color: #5e85e0;
    border-color: #5e85e0;
    position: relative;
}
.hr-container .my-icon {
	position: absolute;
    margin-top: 9px;
    left: 10px;
}
.hr-container .el-button:focus, .el-button:hover {
	color: #5e85e0;
    border-color: #5e85e0;
}
.heart .btn-container{
	background-color: #eef1f6;
    height: 66px;
    line-height: 66px;
    padding-left: 38px;
}
/*.my-pop .my-cert {
	height: 89px;
    text-align: center;
}*/
.my-pop .my-magnify {
    background: url(../../../../static/img/magnify.png) no-repeat;
    height: 22px;
    width: 22px;
    display: inline-block;
    margin-left: -26px;
    margin-bottom: 4px;
    cursor: pointer;
}
.el-input-group__prepend{
	    border-color: #dde2e4 !important;
}
/*.el-input-group--prepend .el-input__inner {
	border-left: 0 !important;
}*/
.cash-dialog .el-dialog__body {
	padding: 34px 0;
	color: #333333;
}
.cash-dialog .dialog-title {
	font-size: 14px;
    border-left: 4px solid #5e85e0;
    padding-left: 10px;
    margin: 0 70px 30px;
}
.cash-dialog .el-dialog--small {
	width: 732px;
}
.cash-dialog  .el-form {
	margin: 0 70px;
}
.cash-dialog  .el-form .el-form-item__label {
	text-align: left;
}
.cash-dialog .el-table__body-wrapper {
	overflow-y:auto;
	min-height: 120px !important; 
	max-height: 162px;
}
.cash-dialog .el-table__empty-block {
	height: 120px !important; 
}
.dialog-table {
	margin:0 70px;
}
.dialog-table .el-table {
	border: 1px solid #dfe6ec !important;
}
.cash-dialog .line {
	border-top: 1px solid #dde2e4;
    height: 32px;
}
.cash-dialog .my-money {
	width: 50%;
}
.cash-dialog .reback-money {
	color:#ffa91f;
}
/*图片上传样式开始*/
.cash-dialog .file-box{
	display: flex;
	flex-direction: row;
}
.cash-dialog .attachment{
	width: 90px !important;
	height: 90px !important;
	margin-right: 20px;
	border-width: 1px;
	border-style: solid;
	border-color: #dde2e4;
	position: relative;
}

.cash-dialog  .show .content-img{
	width: 90px !important;
	height: 90px !important;
}
.cash-dialog .show .delete-img{
	width: 19px ;
	height: 19px;
	position: absolute;
	top:0%;
	margin-top: -9.5px;
	right:0%;
	margin-right: -9.5px;

}
.cash-dialog .upload img{
	position: absolute;
	width:29px;
	height:29px;
	top:50%;
	margin-top: -14.5px;
	left:50%;
	margin-left: -14.5px;

}
.cash-dialog .file{
	opacity: 0;
	/*float: left;*/
	z-index: 20;
	background-color: red;
	width: 90px !important;
	height: 90px !important;

}
/*图片上传样式结束*/
.my-tips {
	display: inline-block;

}
.my-tips .left-leave-img {
	vertical-align: middle;
	padding: 0 5px;
}
/*日历样式开始*/
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