<template>
	<div class="reimburse">
		<div class="form-title">
			<div class="split-line"></div><div class="title"><router-link :to="{path:'/freimburseHistory'}">员工报销信息列表</router-link>&nbsp;&gt;&nbsp;员工报销待导出列表</div>
		</div>
		<div class="hr-container">
			<el-table :data="dataList" style="width: 100%" @select="handleCheck" ref="multipleTable" @select-all="handleAllCheck">
				<el-table-column type="selection" width="55">
				</el-table-column>
	            <el-table-column prop="id" label="报销ID">
	            </el-table-column>
	            <el-table-column prop="applyDate" label="报销日期" :formatter="handleDate">
	            </el-table-column>
	            <el-table-column prop="operateStaff" label="填单人">
	            </el-table-column>
	            <el-table-column prop="applyStaff" label="申请人">
	            </el-table-column>
	            <el-table-column prop="applyOffice" label="报销部门">
	            </el-table-column>
	            <!-- <el-table-column prop="endDate" label="报销类型">
	            </el-table-column> -->
	            <el-table-column prop="applyMoney" label="报销金额">
	            </el-table-column>
	            <el-table-column prop="companyEntity" label="公司实体">
	            </el-table-column>
	            <!-- <el-table-column prop="leaveType" label="支付日期">
	            </el-table-column> -->
	            <el-table-column label="操作" width="120">
	                <template scope="scope">
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
						    			</ul>
						    		</div>
						    	</div>
						    </div>
						</el-popover>
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
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next, total, jumper" :total="pageInfo1.totalCount" :current-page="condition.pageNum" id="page1">
                </el-pagination>
            </div>
		</div>
		<div class="btn-container">
			<template>
				<el-button class="my-primary-button" @click="handleExport(true)">导&nbsp;出&nbsp;网&nbsp;银</el-button>
			</template>
       		
       	</div>
	</div>
</template>
<script type="text/javascript">
export default {
	data: function () {
		return {
			detail: {
				reason: [],
				status: []
			},
			condition: {
				pageNum: 1,
				pageSize: 10
			},
			pageInfo1: {
				totalCount: 0,
				pageCount: 0
			},
			labelPosition: 'left',
			formLine: true,
			dataList: [],
			multipleSelection: [],
			selectRows: [],
		}

	},
	created: function () {
		this.initTable();
	},
	mounted: function () {
		this.initPage(1);
	},
	methods: {
		handleDate: function (row, column, cellValue) {
			if (cellValue) {
				return (new Date(cellValue)).format('yyyy-MM-dd');
			};
			return '';
		},
		formatterDate: function (myDate,myFormatter){
	      return (new Date(myDate)).format(myFormatter);
	    },
		openEdit: function () {
			this.dialogVisible = true;
		},
		printview: function (index, row) {
			this.$router.push('/reimbursePrintview?id=' + row.id);
		},
		triggerClick: function () {
			document.getElementById('f-first').click();
		},
		handleExport: function (param) {
			var self = this;
			let itemList = self.selectRows;
			if (itemList.length == 0) {
				self.$message('请先选中要导出的项');
				return;
			}
			let idArray = [];
			for (var i = 0; i < itemList.length; i++) {
				let item = itemList[i];
				idArray.push(item.id);
			}
			// console.log('idArray ' + idArray);
			self.$api.post(self.url.exportWangYing, { "listId": idArray, "type": "1"}, function(r) {
                // console.log(r);
                if (r.code === 'ACK') {
                	self.$message.success(r.message);
                	self.search();
                	setTimeout(function () {
                		let path = r.data;
                		window.location.href = path; 
                	},1000);
                } else {
                	self.$message.error(r.message);
                }
            }, function(r) {
                self.$message.error(r.message);
            }, self.url.MOCK, '', true);
		},
    	toggleSelection() {
    		//获取当页已经选中的项
    		var self = this;
    		var selection = self.util.getCurrentPageSelect(this.selectRows, this.dataList);
	        if (selection.length != 0) {
	        	selection.forEach(row => {
	            	this.$refs.multipleTable.toggleRowSelection(row, true);
	            });
	        }
	    },
	    handleAllCheck: function (val) {
	    	var self = this;
	    	self.selectRows = self.util.getAllSelectedRows(self.selectRows, self.dataList, val);
	    },
		handleCheck: function (val, row) {
			var self = this;
			self.selectRows = self.util.getAllSelectedRows(self.selectRows, self.dataList, val, row);
		},
		handleDetail (index, row) {
	    	let self = this;
	    	self.$api.post(self.url.financeApplicationDetailQuery, {"financeApplicationId": row.id}, function(r) {
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
		handleCurrentChange (val) {
			this.condition.pageNum = val;
			this.initTable();
		},
		initTable () {
	    	var self = this;
			self.$api.post(self.url.notApplyList + '1/3/list', self.condition, function(r) {
                // console.log(r);
                if (r.code === 'ACK') {
                	self.dataList = r.data.list;
                	self.condition.pageNum = r.data.pageNum;
                	self.pageInfo1.totalCount = r.data.total;
                	self.pageInfo1.pageCount = r.data.pages;
                	self.initPage(1);
                	self.$nextTick(function(){
			            self.toggleSelection();//每次更新了数据，触发这个函数即可。
			        });
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
	    	var str = this.pageInfo1.pageCount;
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
	}
}
</script>
<style type="text/css">
.reimburse .hr-container {
	padding: 0 20px;
}
.reimburse .hr-container .my-button {
	padding: 0 10px 0 35px;
    height: 38px;
    line-height: 38px;
    color: #5e85e0;
    border-color: #5e85e0;
}
.reimburse .hr-container .my-icon {
	position: absolute;
    margin-top: 9px;
    left: 10px;
}
.reimburse .hr-container .el-button:focus, .el-button:hover {
	color: #5e85e0;
    border-color: #5e85e0;
}
.width-dialog .el-dialog--small{
	width: 596px;
}
.my-cancel-btn {
    width: 21px;
    padding: 1px 0;
    border-radius: 0;
    border: 2px solid #999;
    vertical-align: middle;
}
.my-cancel-btn > .el-icon-minus, .my-cancel-btn > .el-icon-edit {
	color: #999;
}
.my-cancel-btn:hover, .my-cancel-btn:focus {
	color: #173f9a !important;
    border-color: #173f9a !important;
}
.my-cancel-btn:hover > .el-icon-minus , .my-cancel-btn:focus > .el-icon-minus, .my-cancel-btn:hover > .el-icon-edit , .my-cancel-btn:focus > .el-icon-edit  {
	color: #173f9a !important;
}
.my-dialog .file-box{
	display: flex;
	flex-direction: row;
}
.my-dialog .attachment{
	width: 90px !important;
	height: 90px !important;
	margin-right: 20px;
	border-width: 1px;
	border-style: solid;
	border-color: #dde2e4;
	position: relative;
}

.my-dialog .show .content-img{
	width: 90px !important;
	height: 90px !important;
}
.my-dialog .show .delete-img{
	width: 19px ;
	height: 19px;
	position: absolute;
	top:0%;
	margin-top: -9.5px;
	right:0%;
	margin-right: -9.5px;

}
.my-dialog .upload img{
	position: absolute;
	width:29px;
	height:29px;
	top:50%;
	margin-top: -14.5px;
	left:50%;
	margin-left: -14.5px;

}

.my-dialog .file{
	opacity: 0;
	z-index: 20;
	background-color: red;
	width: 90px !important;
	height: 90px !important;

}
.my-detail-container {
	position: relative;
    width: 25px;
    height: 20px;
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
}
.my-detail-container i.handler {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
}
</style>