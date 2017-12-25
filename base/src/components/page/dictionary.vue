<template>
	<div class="content">
		<div class="main dictionary">
			<div class="title">业务字段类型</div>
			<div class="table-container">
				<div class="left-list">
					<ul>
						<template  v-for='info in attrData'>
							<li @click="handleDicType(info)" v-bind:class="{'active': info.active}">{{info.typeName}}</li>
						</template>
					</ul>
				</div>
				<div class="right-list">
					<div class="center"><i class="double"></i></div>
					<div class="mytable">
						<el-table :data="tableData" style="width: 100%" class="my-table">
	    					<el-table-column  prop="label" label="属性名">
	    						<template scope="scope">
                                    <el-input v-if="scope.row.active" v-model="scope.row.label"  class="my-input" placeholder="输入属性名">
                                    	<template slot="prepend">|</template>
                                    </el-input>
                                    <span v-if="!scope.row.active">{{scope.row.label}}</span>
                                </template>
	    					</el-table-column>
	    					<el-table-column  prop="value" label="属性值">
	    						<template scope="scope">
	    							<template>
	                                    <el-input v-if="scope.row.active" v-model="scope.row.value" class="my-input" placeholder="输入属性值">
	                                    	<template slot="prepend">|</template>
	                                    </el-input>
	                                    <template v-else>
	                                    	<span>{{scope.row.value}}</span>
	                                    </template>
	                                    <div class="icon-div">
	                                    	<img v-if="scope.row.active" src="../../../static/img/right.png" @click="addAttr(scope.row)"/>
	                                    	<img v-if="!scope.row.active" src="../../../static/img/dic-edit.png" @click="editAttr(scope.row)"/>
	                                    	<img class="margin-left20" src="../../../static/img/wrong.png" @click="deleAttr(scope.$index, scope.row)"/>
	                                    </div>
                                    </template>
                                </template>
	    					</el-table-column>
	  					</el-table>
	  					<div class="add-btn" @click="addRow"><img src="../../../static/img/dic-add.png" class="add-icon"/>新增属性值名称</div>
					</div>
				</div>
			</div>
			<!-- <div class="footer">
				<el-button class="my-primary">POSTED</el-button>
				<el-button class="my-default">RESET</el-button>
			</div> -->
		</div>
	</div>
</template>
<script>
import Vue from 'vue';
export default {
	data: function () {
		return{
			tableData:[],
			hasAdd: true,
			attrData:[],
			hasNoAdd: false,
			currentTypeCode:''
		}
	},
	created() {
		this.getPermission();
        this.getDicType();
    },
	methods:{
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
		addRow () {
			if (this.hasNoAdd) {
				this.$message({
                  type: 'warning',
                  message: "请先保存已输入的字典值"
              	});
			} else {
				if (this.currentTypeCode) {
					var newRow = {'id': '', 'value':'', 'typeCode': this.currentTypeCode, 'active': true};
					this.tableData.push(newRow);
					this.hasNoAdd = true;
				} else {
					this.$message({
	                  type: 'warning',
	                  message: "请选择字典类型"
	              	});
				}
			}
		},
		handleDicType (info) {
			let self = this;
			var flag = !info.active;
			self.$nextTick(function () {
                self.attrData.forEach(function (info) {
                    if (info) {
                        Vue.set(info, 'active', false);
                    }
                })
                Vue.set(info, 'active', flag);
            })
            if (!flag) {
            	self.currentTypeCode = '';
            	self.tableData = [];
            } else {
            	self.currentTypeCode = info.typeCode;
            	self.initTable(info.typeCode);
            }
		},
		initTable (typeCode) {
			let self = this;
			self.$api.post(self.url.dicAttrList, { typeCode: typeCode }, function(r) {
	            if (r.code === 'ACK') {
	            	r.data.forEach(function(value, index, array) {
					    value.active = false;
					});
					self.tableData = r.data;
	            } else {
	            	self.$message.error(r.message);
	            }
	        },function(){},self.url.MOCK);
		},
		addAttr (info) {
			var self = this;
			var param = { 'id': info.id, 'value': info.value, 'typeCode': info.typeCode, 'label': info.label }
			self.$api.post(self.url.addAttr, param, function(r) {
	            if (r.code === 'ACK') {
	            	self.$message({
	                  type: 'success',
	                  message: r.message
	              	});
	              	self.initTable (info.typeCode);
	            } else {
	            	self.$message.error(r.message);
	            }
	        },function(){},self.url.MOCK);
			this.hasNoAdd = false;
			Vue.set(info, 'active', false);
		},
		editAttr (info) {
			this.hasNoAdd = true;
			var flag = !info.active;
			this.$nextTick(function () {
                this.tableData.forEach(function (info) {
                    if (info) {
                        Vue.set(info, 'active', false);
                    }
                })
                Vue.set(info, 'active', flag);
            })
		},
		deleAttr (index, info) {
			var self = this;
			if (info.id) {
				var param = { 'id': info.id, 'value': info.value, 'typeCode': info.typeCode, 'label': info.label }
				self.$api.post(self.url.deleteAttr, param, function(r) {
		            if (r.code === 'ACK') {
		            	self.$message({
		                  type: 'success',
		                  message: r.message
		              	});
		              	self.tableData.splice(index);
		            } else {
		            	self.$message.error(r.message);
		            }
		        },function(){},self.url.MOCK);
			} else {
				self.tableData.splice(index);
				self.hasNoAdd = false;
			}
			
		},
		getDicType () {
			let self = this;
	        self.$api.post(self.url.dicTypeList, {pageSize: 100}, function(r) {
	            if (r.code === 'ACK') {
	            	r.data.list.forEach(function(value, index, array) {
					    value.active = false;
					});
					self.attrData = r.data.list;
	            } else {
	            	self.$message.error(r.message);
	            }
	        },function(){},self.url.MOCK);
		}
 	}
}
</script>
<style>
.dictionary{
	padding: 38px;
	font-size: 16px;
    color: #474646;
    background-color:#fff;
    overflow-y: hidden;
    height: auto;
}
.dictionary .title {
	margin-bottom:10px;
}
.dictionary .left-list {
	border: 1px solid #ccc;
	height: 742px;
	float:left;
}
.dictionary .mytable {
	overflow: hidden;
    height: 742px;
    border: 1px solid #ccc;
}
.mytable .my-table{
	height:678px;
}
.right-list .add-btn{
	height:64px;
	line-height:64px;
	text-align: center;
    color: #5e85e0;
    border-top: 1px solid #dde2e4;
}
.add-btn .add-icon{
	height:17px;
	width:16px;
	margin-right: 10px;
}
.dictionary .left-list ul {
	overflow: auto;
    list-style-type: none;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    width: 244px;
}
.left-list ul li {
	height: 62px;
    width: 244px;
    border-bottom: 1px solid #dde2e4;
    line-height: 62px;
    padding-left: 32px;
    cursor: pointer;
}
.dictionary .left-list li.active {
	background-color:#e0e9ff;
}
.my-primary{
	background: #5e85e0;
	margin-right:36px;
}
.my-primary span{
	color:#fff;
	font-size:15px;
	font-family:Roboto-Medium;
}
.my-default{
	color:#667o7f;
	font-size:15px;
	font-family:Roboto-Medium;
	border:1px solid #dde2e4;
}
.dictionary .table-container .right-list {
	overflow: hidden;
}
.table-container .center{
	margin-left: 32px;
    margin-right: 32px;
    height: 744px;
    width: 24px;
    float: left;
}
.dictionary .el-input__inner:focus {
	border:1px solid #dde2e4 !important;
	border-left: none !important;
}
.my-table .el-input__inner {
	width:188px;
	height:36px;
	font-size:14px;
	border-left: none !important;
    padding-left: 0;
    border-color: #dde2e4;
    border-radius: 0;
}
.double{
	background:url(../../../static/img/double-arrow.png);
	height:24px;
	width:25px;
	position: absolute;
    top: 452px;
}
.dictionary .el-table__header-wrapper thead div, .dictionary .el-table th {
	background-color: #f2f3f5 !important;
}
.dictionary .footer{
	clear:both;
}
.dictionary .el-table tr {
    height: 62px;
    line-height: 62px;
}
.dictionary .icon-div {
	width: 80px;
    display: inline-block;
    position: absolute;
    right: 0;
    top: 21px;
}
.dictionary .icon-div img {
	cursor: pointer;
}
.dictionary .my-input {
	width: auto;
}
.dictionary .margin-left20{
	margin-left:20px;
}
.dictionary .my-input .el-input-group__prepend {
	color: #5e85e0;
    border-color: #dde2e4;
    border-radius: 0;
}
.dictionary .el-table tr:hover,.dictionary .el-table--enable-row-hover .el-table__body tr:hover>td {
	background: #e0e9ff;
}
.dictionary .el-table .cell {
	padding-left:16px;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #cccccc !important; 
    opacity:1; 
}

::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #cccccc !important;
    opacity:1;
}

input:-ms-input-placeholder{
    color: #cccccc !important;
    opacity:1;
}
input::-webkit-input-placeholder{
    color: #cccccc !important;
    opacity:1;
}
.dictionary .el-table__body-wrapper {
	height:616px;
	overflow-x: hidden;
}
@media screen and (max-width:1280px){
	.my-table .el-input__inner {
		width: 158px;
	}
}
@media screen and (min-width:1281px){
	.my-table .el-input__inner {
		width: 188px;
	}
}
</style>