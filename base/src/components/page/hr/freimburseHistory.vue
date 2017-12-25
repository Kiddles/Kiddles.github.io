<template>
	<div class="heart">
		<div class="hr-container" @click="shouOffice($event)">
			<el-form :inline="formLine" :label-position="labelPosition">
				<el-form-item label="">
					<template v-if="permission.isFinancePay">
						<router-link :to="{path:'/freimburseExport'}">
				            <el-button class="my-button"><img src="../../../../static/img/waitHY.png" class="my-icon"/>员工报销待导出列表</el-button>
				        </router-link>
				        <router-link :to="{path:'/freimbursePayout'}">
				            <el-button class="my-button"><img src="../../../../static/img/waitHY.png" class="my-icon"/>员工报销待支付列表</el-button>
				        </router-link>
				    </template>
			    	<router-link :to="{path:'/freimburse'}" v-else>
			            <el-button class="my-button"><img src="../../../../static/img/waitHY.png" class="my-icon"/>员工报销待审核列表</el-button>
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
			    	<el-input v-model="condition.financeApplicationId" placeholder="报销ID" @keyup.enter.native="search"></el-input>
			    </el-form-item>
			    <el-form-item label="">
			    	<el-input v-model="condition.operatorName" placeholder="填单人" @keyup.enter.native="search"></el-input>
			    </el-form-item>
			    <el-form-item label="">
			    	<el-input v-model="condition.staffName" placeholder="申请人" @keyup.enter.native="search"></el-input>
			    </el-form-item>
			    <el-form-item label="">
			    	<el-select v-model="condition.companyName" placeholder="公司实体">
			    		<el-option value="全部" label="全部"></el-option>
			    		<template v-for="item in companyList">
			    			<el-option :value="item.name" :label="item.name"></el-option>
			    		</template>
				    </el-select>
			    </el-form-item>
			    <el-form-item label="" id="officeEle">
					<el-input v-model="filterText"  @focus="openOrg" @blur="closeOrg" placeholder="部门" icon="close" :on-icon-click="clearOffice"></el-input>
					<el-tree :data="orgs" :props="defaultProps" @node-click="handleNodeClick" :expand-on-click-node="true" 
					:filter-node-method="filterNode"
					v-show="isOrgShow" accordion ref="tree2" class="my-tree">
					</el-tree>
			    </el-form-item>
			    <el-form-item label="">
			    	<el-select v-model="condition.financeStatus" placeholder="状态">
			    		<el-option value="全部" label="全部"></el-option>
			    		<el-option value="未审批" label="未审批"></el-option>
			    		<el-option value="审批中" label="审批中"></el-option>
			    		<el-option value="已拒绝" label="已拒绝"></el-option>
			    		<el-option value="已支付" label="已支付"></el-option>
				    </el-select>
			    </el-form-item>
			    <el-form-item>
			    	<el-input placeholder="500" v-model="condition.applicationTotalmoneyMin"  @keyup.enter.native="search" @keyup.native="checkNum(1, $event)">
					    <template slot="prepend">金额</template>
					</el-input>
				</el-form-item>
				<el-form-item>
			    	<span style="color:#dde2e4;">-</span>
				</el-form-item>
				<el-form-item>
			    	<el-input placeholder="5000" v-model="condition.applicationTotalmoneyMax" @keyup.enter.native="search" @keyup.native="checkNum(2, $event)">
					    <template slot="prepend">金额</template>
					</el-input>
				</el-form-item>
			    <el-form-item label="">
			    	<el-button class="my-search" @click="search"><img src="../../../../static/img/orgsearch.png"/></el-button>
			    </el-form-item>
			</el-form>
			<el-table :data="dataList" style="width: 100%" @select="handleCheck" ref="multipleTablee" @select-all="handleCheck">
				<!-- <el-table-column type="selection" width="55">
    			</el-table-column> -->
	            <el-table-column prop="financeApplicationId" label="报销ID">
	            </el-table-column>
	            <el-table-column prop="applyDate" label="申请日期" :formatter="handleDate">
	            </el-table-column>
	            <el-table-column prop="operatorName" label="填单人">
	            </el-table-column>
	            <el-table-column prop="staffName" label="申请人">
	            </el-table-column>
	            <el-table-column prop="officeName" label="报销部门">
	            </el-table-column>
	            <!-- <el-table-column prop="endDate" label="报销类型">
	            </el-table-column> -->
	            <el-table-column prop="applicationTotalmoney" label="报销金额">
	            </el-table-column>
	            <el-table-column prop="companyName" label="公司实体">
	            </el-table-column>
	            <el-table-column prop="payDate" label="支付日期" :formatter="handleDate">
	            </el-table-column>
	            <el-table-column prop="financeStatus" label="状态">
	            </el-table-column>
	            <el-table-column label="操作">
	               <template scope="scope">
		                <!-- <i class="handler upload"></i> -->
		                <el-popover ref="popover4" placement="bottom-end" width="683" height="292" trigger="click" @show="handleDetail(scope.$index, scope.row)">
						    <div class="my-pop">
						    	<div class="prop-left">
						    		<div class="title">报销原因</div>
						    		<div class="memo">
						    			<p class="my-reason" v-for="item in detail.listFinanceApplicationItem">{{item.itemContext}}</p>
						    			<img class="resizeIcon" src="../../../../static/img/resizeIcon.png"/>
						    		</div>
						    	</div>
						    	<div class="prop-right">
						    		<div class="title">状态变迁</div>
						    		<div class="status-dream">
						    			<ul>
						    				<template v-for="item in detail.listStatusLog">
						    					<li><div class="time"></div><div class="responser"><p>{{item.operatorName}}</p><p style="color:#777;">{{item.operation}}</p></div><div>{{formatterDate(item.operateTime,"yyyy-MM-dd hh:mm")}}</div></li>
						    				</template>
						    				<!-- <li><div class="time"></div><div  class="responser"><p>张晓明</p><p>审批通过</p></div><div>2017/08/09 08:36</div></li>
						    				<li><div class="time"></div><div  class="responser"><p>张晓月</p><p>审批成功</p></div><div>2017/08/09 08:36</div></li> -->
						    			</ul>
						    		</div>
						    	</div>
						    </div>
						</el-popover>
	                    <!-- <i class="handler detail" v-popover:popover4></i> -->
	                    <div>
		                	<!-- <div class="my-detail-container">
		                    	<i class="handler detail" v-popover:popover4></i>
		                    </div> -->
		                    <img v-popover:popover4 src="../../../../static/img/detailIcon.png">
		                	<el-tooltip content="预览" placement="top" effect="light">
		                   		<img src="../../../../static/img/printview.png" @click="printview(scope.$index, scope.row)">
		                   	</el-tooltip>
		                </div>
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

		<!-- <el-dialog title="" :visible.sync="dialogVisible" class="my-img-dialog">
		  <img v-bind:src="largeImg"/>
		</el-dialog> -->
	</div>
</template>
<script type="text/javascript">
export default {
	data: function () {
		return {
			isCashier: true,
			filterText: '',
			orgs: [],
			isOrgShow: false,
			defaultProps: {
				children: 'childTree',
				label: 'name'
			},
			dialogVisible: false,
			detail: {
				financeApplication: '',
				listFinanceApplicationItem: [],
				listStatusLog: []
			},
			applyDate: '',
			payDate: '',
			condition: {
				applyDateStart: '',
				applyDateEnd: '',
				payDateStart: '',
				payDateEnd: '',
				financeApplicationId: '',
				financeStatus: '',
				companyName: '',
				officeId: '',
				applicationTotalmoneyMin: '',
				applicationTotalmoneyMax: '',
				staffName: '',
				operatorName: '',
				pageNum: 1,
				pageSize: 10
			},
			pageInfo: {
				totalCount: 0,
				pageCount: 0
			},
			labelPosition: 'left',
			formLine: true,
			dataList: [],
			multipleSelection: [],
			path: '',
			companyList: [],
			permission: {
				isFinance:false,
				isFinancePay:false,
				isCeo:false,
				isLeader:false
			}
		}

	},
	created: function () {
		this.getPermission();
		// this.getApproverRole();
		this.getCompanyList();
		this.getOrgTree();
		this.initTable();
	},
	mounted: function () {
		this.triggerClick();
	},
	methods: {
		shouOffice: function (e) {
			var e = e || window.event; //浏览器兼容性   
            var elem = e.target || e.srcElement;  
            while (elem) { //循环判断至跟节点，防止点击的是div子元素   
                if (elem.id && elem.id == 'officeEle') {  
                    return;  
                }  
                elem = elem.parentNode;  
            }
            this.isOrgShow = false;
		},
		getPermission: function () {
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
	    },
		getCompanyList: function () {
			var self = this;
			self.$api.post(self.url.getCompanyLis, {}, function(r) {
                if (r.code === 'ACK') {
                	self.companyList = r.data;
                } else {
                	self.$message.error(r.message);
                }
            }, function(r) {
                self.$message.error(r.message);
            }, self.url.MOCK, '', true);
		},
		formatterDate: function (myDate,myFormatter){
	      return (new Date(myDate)).format(myFormatter);
	    },
		handleDate: function (row, column, cellValue) {
			if (cellValue) {
				return (new Date(cellValue)).format('yyyy-MM-dd');
			};
			return '';
		},
		checkNum: function (type, e) {
			// console.log('@@@@@@@@@@@@@@@@@@@@@@@@cdcdvdd:' + e.target.value);
			if (type===1) {
				this.condition.applicationTotalmoneyMin = e.target.value.replace(/[^0-9]/ig,"");
			} else {
				this.condition.applicationTotalmoneyMax = e.target.value.replace(/[^0-9]/ig,"");
			}
		},
		triggerClick: function () {
			document.getElementById('f-first').click();
		},
		printview: function (index, row) {
			this.$router.push('/reimbursePrintview?id=' + row.financeApplicationId);
		},
		getId: function () {
			 var url = window.location.href;
            var s = window.location.href.indexOf('?');
            // console.log('###########:' + url.substr(s).split('=')[1]);
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
    	clearOffice: function () {
    		this.filterText = '';
    		this.condition.officeId = '';
    	},
		openOrg() {
    		this.isOrgShow = true;
    	},
    	closeOrg() {
    		this.isOrgShow = true;
    	},
		setApplyDate(val){
			var arr = val.split('至');
			this.condition.applyDateStart = arr[0];
			this.condition.applyDateEnd = arr[1];
		},
		setPayDate(val){
			var arr = val.split('至');
			this.condition.payDateStart = arr[0];
			this.condition.payDateEnd = arr[1];
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
			this.$refs['ruleForm'].resetFields();
		},
		handleDetail (index, row) {
	    	let self = this;
	    	self.$api.post(self.url.financeApplicationDetailQuery, {"financeApplicationId": row.financeApplicationId}, function(r) {
		        // console.log(r);
		        if (r.code === 'ACK') {
		          self.detail = r.data;
		        } else {
		          self.$message.error(r.message);
		        }
		    }, function(r) {
		        self.$message.error(r.message);
		    }, self.url.MOCK, '', true);
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
	    	self.condition.companyName = self.condition.companyName=='全部' ? '':self.condition.companyName;
	    	self.condition.financeStatus = self.condition.financeStatus=='全部' ? '':self.condition.financeStatus;
			self.$api.post(self.url.ffinanceHistoryList, self.condition, function(r) {
                // console.log(r);
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