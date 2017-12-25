<template>
<div class="content">
	<div class="main">
		<div class="person">
			<div>
				<div class="form-title">
					<el-row>
					  <el-col :span="20"><div class="split-line"></div><div class="title">基本信息</div></el-col>
					  <el-col :span="4" style="text-align:center;"><div class="edit-container"><i class="icon-edit" v-bind:class="{active:isEditStatus}" @click="handleEdit"></i></div></el-col>
					</el-row>
				</div>
				<div class="form-content" style="border-bottom:1px solid #dde2e4;">
					<el-form :inline="formLine" :label-position="labelPosition" label-width="220px" :model="formLabelAlign" :rules="rules" ref="ruleForm">
					  <el-form-item label="中文名：">
					    <el-input v-model="formLabelAlign.baseRealname"  :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  </el-form-item>
					  <el-form-item label="拼音：">
					    <el-input v-model="formLabelAlign.basePinyin" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  </el-form-item>
					  <el-form-item label="英文名：">
					    <el-input v-model="formLabelAlign.baseEnglishname" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  </el-form-item>
					  <el-form-item label="性别：">
					    <el-select v-model="formLabelAlign.baseSex" placeholder="请选择" :disabled="myAuth.isEmp || !isEditStatus">
					    	<template v-for='info in dictionaryList'>
							    <el-option :label="info.label" :value="info.value" v-if="info.typeCode=='baseSex'">{{info.label}}</el-option>
							</template>
					    </el-select>
					  </el-form-item>
					  <el-form-item label="民族：">
					    <!-- <el-select v-model="formLabelAlign.baseNationminzhu" placeholder="请选择" :disabled="myAuth.isEmp || !isEditStatus">
					      	<template v-for='info in dictionaryList'>
							    <el-option :label="info.label" :value="info.value" v-if="info.typeCode=='baseNationminzhu'">{{info.label}}</el-option>
							</template>
					    </el-select> -->
					    <el-input v-model="formLabelAlign.baseNationminzhu" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  </el-form-item>
					  <el-form-item label="籍贯：">
					    <el-input v-model="formLabelAlign.baseNativeplace" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  </el-form-item>
					  <el-form-item label="国籍：">
					    <!-- <el-select v-model="formLabelAlign.baseNationality" placeholder="请选择" :disabled="myAuth.isEmp || !isEditStatus">
					      <el-option label="中国" value="0"></el-option>
					      <el-option label="地球" value="1"></el-option>
					    </el-select> -->
					    <el-input v-model="formLabelAlign.baseNationality" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  </el-form-item>
					  <el-form-item label="身份证号：">
					    <el-input v-model="formLabelAlign.baseIdcardcode" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  </el-form-item>
					  <el-form-item label="出生日期：">
					    <el-date-picker v-model="formLabelAlign.baseBirthdate" type="date" placeholder="选择日期" :picker-options="pickerOptions0"  :disabled="myAuth.isEmp || !isEditStatus"></el-date-picker>
					  </el-form-item>
					  <el-form-item label="出生月份：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    <el-input v-model="formLabelAlign.baseBirthmonth" :disabled="true"></el-input>
					  </el-form-item>
					  <el-form-item label="生日：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    <el-input v-model="formLabelAlign.baseBirthday" :disabled="true"></el-input>
					  </el-form-item>
					  <el-form-item label="年龄：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    <el-input v-model="formLabelAlign.baseAge" :disabled="true"></el-input>
					  </el-form-item>
					  <el-form-item label="婚姻状况：">
					    <el-select v-model="formLabelAlign.baseMaritalStatus" placeholder="请选择" :disabled="myAuth.isHR || !isEditStatus">
					      	<template v-for='info in dictionaryList'>
							    <el-option :label="info.label" :value="info.value" v-if="info.typeCode=='baseMaritalStatus'">{{info.label}}</el-option>
							</template>
					    </el-select>
					  </el-form-item>
					  <el-form-item label="孕育情况：">
					  		<el-select v-model="formLabelAlign.baseFertilityStatus" placeholder="请选择" :disabled="myAuth.isHR || !isEditStatus">
						      	<template v-for='info in dictionaryList'>
								    <el-option :label="info.label" :value="info.value" v-if="info.typeCode=='baseFertilityStatus'">{{info.label}}</el-option>
								</template>
						    </el-select>
					  </el-form-item>
					  <el-form-item label="政治面貌：">
					    <el-select v-model="formLabelAlign.basePoliticStatus" placeholder="请选择" :disabled="myAuth.isEmp || !isEditStatus">
					      	<template v-for='info in dictionaryList'>
							    <el-option :label="info.label" :value="info.value" v-if="info.typeCode=='basePoliticStatus'">{{info.label}}</el-option>
							</template>
					    </el-select>
					  </el-form-item>
					  <el-form-item label="是否残疾人：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    <el-select v-model="formLabelAlign.baseDisabledStatus" placeholder="请选择" :disabled="!isEditStatus">
					      <template v-for='info in dictionaryList'>
							    <el-option :label="info.label" :value="info.value" v-if="info.typeCode=='baseDisabledStatus'">{{info.label}}</el-option>
							</template>
					    </el-select>
					  </el-form-item>
					  <el-form-item label="个人电话：" prop="basePersonalphone">
					    <el-input v-model="formLabelAlign.basePersonalphone" :disabled="myAuth.isHR  || !isEditStatus"></el-input>
					  </el-form-item>
					  <el-form-item label="个人邮箱：" prop="basePersonalemail">
					    <el-input v-model="formLabelAlign.basePersonalemail" :disabled="myAuth.isHR || !isEditStatus"></el-input>
					  </el-form-item>
					  <el-form-item label="个人IM：" prop="basePersonalIm">
					    <el-input v-model="formLabelAlign.basePersonalIm" :disabled="myAuth.isHR || !isEditStatus"></el-input>
					  </el-form-item>
					</el-form>
				</div>
				<div class="contact margin-bottom80">
					<el-form :inline="formLine" :label-position="labelPosition" label-width="220px" :model="formLabelAlign" :rules="rules">
					  <el-form-item label="现住地址：" class="large-form-item" prop="baseNowaddress">
					    <el-input v-model="formLabelAlign.baseNowaddress" :disabled="myAuth.isHR || !isEditStatus"></el-input>
					  </el-form-item>
					  <el-form-item label="家庭住址：" class="large-form-item" prop="baseHomeaddress">
					    <el-input v-model="formLabelAlign.baseHomeaddress" :disabled="myAuth.isHR || !isEditStatus"></el-input>
					  </el-form-item>
					  <el-form-item label="户口地址：" class="large-form-item">
					    <el-input v-model="formLabelAlign.baseHukouaddress" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  </el-form-item>
					  <el-form-item label="紧急联系人：" prop="baseEmergencyperson">
					    <el-input v-model="formLabelAlign.baseEmergencyperson" :disabled="myAuth.isHR || !isEditStatus"></el-input>
					  </el-form-item>
					  <el-form-item label="紧急联系电话：" prop="baseEmergencyphone">
					    <el-input v-model="formLabelAlign.baseEmergencyphone" :disabled="myAuth.isHR || !isEditStatus"></el-input>
					  </el-form-item>
					  <el-form-item label="员工备注：" prop="baseRemark">
					    <el-input v-model="formLabelAlign.baseRemark" :disabled="myAuth.isHR || !isEditStatus"></el-input>
					  </el-form-item>
					  <el-form-item label="职称：">
					    <el-select v-model="formLabelAlign.socialZhicheng" placeholder="请选择"  :disabled="myAuth.isEmp || !isEditStatus">
					        <template v-for='info in dictionaryList'>
							    <el-option :label="info.label" :value="info.value" v-if="info.typeCode=='socialZhicheng'">{{info.label}}</el-option>
							</template>
					    </el-select>
					  </el-form-item>
					  <el-form-item label="社会工龄：">
					    <el-input v-model="formLabelAlign.socialAge" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  </el-form-item>
					</el-form>
				</div>
				<div class="form-title">
					<el-row>
					  <el-col :span="24"><div class="split-line"></div><div class="title">教育经历</div></el-col>
					</el-row>
				</div>
				<div class="form-content margin-bottom80">
					<el-form :inline="formLine" :label-position="labelPosition" label-width="220px" :model="educationInfo">
					  	<el-form-item label="毕业学校：">
					    	<el-input v-model="educationInfo.schoolname" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="所学专业：">
					    	<el-input v-model="educationInfo.major" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="所获学位：">
					    	<el-select v-model="educationInfo.degree" placeholder="请选择" :disabled="myAuth.isEmp || !isEditStatus">
					      		<template v-for='info in dictionaryList'>
								    <el-option :label="info.label" :value="info.value" v-if="info.typeCode=='degree'">{{info.label}}</el-option>
								</template>
					    	</el-select>
					    </el-form-item>
					</el-form>
				</div>
				<div class="form-title">
					<el-row>
					  <el-col :span="24"><div class="split-line"></div><div class="title">企业信息</div></el-col>
					</el-row>
				</div>
				<div class="form-content margin-bottom80">
					<el-form :inline="formLine" :label-position="labelPosition" label-width="220px" :model="formLabelAlign" :rules="rules">
						<el-form-item label="部门：">
					    	<el-input v-model="accountInfo.name" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="负责人：">
					    	<el-input v-model="accountInfo.primaryPersonName" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="入职时间：">
					    	<el-date-picker v-model="formLabelAlign.epriseEnrolldate" type="date" placeholder="选择日期" :picker-options="pickerOptions0"  :disabled="myAuth.isEmp || !isEditStatus"></el-date-picker>
					  	</el-form-item>
					  	<el-form-item label="实习入职时间：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-date-picker v-model="formLabelAlign.eprisePracticedate" type="date" placeholder="选择日期" :picker-options="pickerOptions0"  :disabled="!isEditStatus"></el-date-picker>
					  	</el-form-item>
					  	<el-form-item label="实习生类型：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-select v-model="formLabelAlign.eprisePracticetype" placeholder="请选择" :disabled="!isEditStatus">
					      		<template v-for='info in dictionaryList'>
								    <el-option :label="info.label" :value="info.value" v-if="info.typeCode=='eprisePracticetype'">{{info.label}}</el-option>
								</template>
					    	</el-select>
					    </el-form-item>
					    <el-form-item label="员工类型：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-select v-model="formLabelAlign.epriseStafftype" placeholder="请选择" :disabled="!isEditStatus">
						      	<template v-for='info in dictionaryList'>
								    <el-option :label="info.label" :value="info.value" v-if="info.typeCode=='epriseStafftype'">{{info.label}}</el-option>
								</template>
					    	</el-select>
					    </el-form-item>
					    <el-form-item label="试用期状态：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-select v-model="formLabelAlign.epriseProbationStatus" placeholder="请选择" :disabled="!isEditStatus">
					    	</el-select>
					    </el-form-item>
					    <el-form-item label="拟转正时间：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-date-picker v-model="formLabelAlign.eprisePreProbationdate" type="date" placeholder="选择日期"  :disabled="!isEditStatus"></el-date-picker>
					  	</el-form-item>
					  	<el-form-item label="转正日期：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-date-picker v-model="formLabelAlign.epriseProbationdate" type="date" placeholder="选择日期"  :disabled="!isEditStatus"></el-date-picker>
					  	</el-form-item>
					  	<el-form-item label="岗位/角色：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-input v-model="formLabelAlign.epriseRole" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="职级：">
					    	<el-select v-model="formLabelAlign.epriseJobband" placeholder="请选择" :disabled="myAuth.isEmp || !isEditStatus">
					      	<template v-for='info in dictionaryList'>
							    <el-option :label="info.label" :value="info.value" v-if="info.typeCode=='epriseJobband'">{{info.label}}</el-option>
							</template>
					    </el-select>
					  	</el-form-item>
					  	<el-form-item label="头衔：">
					  		<el-select v-model="formLabelAlign.epriseTitle" placeholder="请选择" :disabled="myAuth.isEmp || !isEditStatus">
						      	<template v-for='info in dictionaryList'>
								    <el-option :label="info.label" :value="info.value" v-if="info.typeCode=='epriseTitle'">{{info.label}}</el-option>
								</template>
							</el-select>
					  	</el-form-item>
					  	<el-form-item label="职位：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-input v-model="formLabelAlign.epriseResponsibility" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="招聘HR：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-input v-model="formLabelAlign.epriseHrowner" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="招聘渠道：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-input v-model="formLabelAlign.epriseHrchannel" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="推荐人：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-input v-model="formLabelAlign.epriseHrrefer" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="奖励额度：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-input v-model="formLabelAlign.epriseHrreferbonus" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="发放时间：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-date-picker v-model="formLabelAlign.epriseHrbonusdate" type="date" placeholder="选择日期"  :disabled="!isEditStatus"></el-date-picker>
					  	</el-form-item>
					  	<el-form-item label="HR Partner：">
					    	<el-input v-model="formLabelAlign.hrPartner" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="良师益友：">
					    	<el-input v-model="formLabelAlign.mentor" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="背景调查：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					  		<el-select v-model="formLabelAlign.epriseBgseachStatus" placeholder="请选择" :disabled="!isEditStatus">
					    	</el-select>
					  	</el-form-item>
					  	<el-form-item label="主要办公地点：" prop="epriseWorkaddress">
					    	<el-input v-model="formLabelAlign.epriseWorkaddress" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="办公电话：" prop="epriseWorkphone">
					    	<el-input v-model="formLabelAlign.epriseWorkphone" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="司龄：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-input v-model="formLabelAlign.epriseWorkage"  :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="司龄(含实习)：">
					    	<el-input v-model="formLabelAlign.epriseExtendworkage" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="公司邮箱：" prop="epriseEmail">
					    	<el-input v-model="formLabelAlign.epriseEmail" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="Client Mail：" prop="epriseClientMail">
					    	<el-input v-model="formLabelAlign.epriseClientmail" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="ClientId：" prop="epriseClientId">
					    	<el-input v-model="formLabelAlign.epriseClientid" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="五险一金缴纳地址：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-input v-model="formLabelAlign.epriseInsuranceaddress" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="五险一金缴纳日期：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					  		<el-date-picker v-model="formLabelAlign.epriseInsurancedate" type="date" placeholder="选择日期"  :disabled="!isEditStatus"></el-date-picker>
					  	</el-form-item>
					  	<el-form-item label="工资卡银行：">
					  		<el-select v-model="formLabelAlign.bankname" placeholder="请选择" :disabled="myAuth.isEmp || !isEditStatus">
						      	<template v-for='info in dictionaryList'>
								    <el-option :label="info.label" :value="info.value" v-if="info.typeCode=='bankname'">{{info.label}}</el-option>
								</template>
							</el-select>
					  	</el-form-item>
					  	<el-form-item label="工资卡账号：">
					    	<el-input v-model="formLabelAlign.bankaccount" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="转身份：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-input v-model="formLabelAlign.epriseTransferType" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="转身份日期：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					  	<el-date-picker v-model="formLabelAlign.epriseTransferDate" type="date" placeholder="选择日期"  :disabled="!isEditStatus"></el-date-picker>
					  	</el-form-item>
					  	<el-form-item label="转公司：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-input v-model="formLabelAlign.epriseTransferCompanyType" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="转公司日期：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					  	<el-date-picker v-model="formLabelAlign.epriseTransferCompanyDate" type="date" placeholder="选择日期"  :disabled="!isEditStatus"></el-date-picker>
					  	</el-form-item>
					  	<el-form-item label="在职状态：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-input v-model="formLabelAlign.epriseDutyStatus" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="离职日期：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					  	<el-date-picker v-model="formLabelAlign.epriseResigndate" type="date" placeholder="选择日期"  :disabled="!isEditStatus"></el-date-picker>
					  	</el-form-item>
					  	<el-form-item label="离职原因：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-input v-model="formLabelAlign.epriseResignreason" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="离职去向：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-input v-model="formLabelAlign.epriseResignplan" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="HR备注：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-input v-model="formLabelAlign.epriseHRRemark" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					</el-form>
				</div>
				<div class="form-title">
					<el-row>
					  <el-col :span="24"><div class="split-line"></div><div class="title">合同信息</div></el-col>
					</el-row>
				</div>
				<div class="form-content margin-bottom80">
					<el-form :inline="formLine" :label-position="labelPosition" label-width="220px" :model="formLabelAlign">
					    <el-form-item label="合同时间范围：">
					    	<el-input v-model="contract.contractTime" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="年限：">
					    	<el-input v-model="contract.contractYear" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="类型：">
						    <el-select v-model="contract.contractType" placeholder="请选择" :disabled="myAuth.isEmp || !isEditStatus">
						        <template v-for='info in dictionaryList'>
								    <el-option :label="info.label" :value="info.value" v-if="info.typeCode=='contractType'">{{info.label}}</el-option>
								</template>
						    </el-select>
					  	</el-form-item>
					  	<el-form-item label="续签次数：">
					    	<el-input v-model="contract.contractContactcount" :disabled="true"></el-input>
					  	</el-form-item>
					</el-form>
				</div>
				<div class="form-title">
					<el-row>
					  <el-col :span="24"><div class="split-line"></div><div class="title">附件区</div></el-col>
					</el-row>
				</div>
				<div class="form-content attachbg">
					<template v-for="imgInfo in imgList">
						<div class="img-div">
							<span>{{imgInfo.certificatename}}：</span>
							<div class="show-img">
								<img v-bind:src="imgInfo.certificateurl" class="brand-photo img-common"/>
	                        </div>
						</div>
					</template>
					<div class="img-div button-div">
						<div class="my-button-container" v-if="isEditStatus">
							<el-button class="my-primary" @click="update">保存</el-button>
							<el-button class="my-default" @click="isEditStatus=false">取消</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	data: function () {
		return {
			formLine: true,
			labelPosition: 'top',
			pickerOptions0: {
	          disabledDate(time) {
	            return time.getTime() > Date.now();
	          }
	        },
	        isEditStatus:false,
	        myAuth:{
	        	isEmp: true,
	        	isHR: false
	        },
			isActive: true,
			formLabelAlign: {
	            baseRealname: '',
	            basePinyin: '',
	            baseEglishname: '',
	            baseSex: '',
	            baseNationminzhu: '',
	            baseNativeplace: '',
	            baseNationality: '',
	            baseIdcardcode: '',
	            baseBirthdate: '',
	            baseBirthmonth: '',
	            baseBirthday: '',
	            baseAge: '',
	            baseMaritalStatus: '',
	            baseFertilityStatus: '',
	            basePoliticStatus: '',
	            baseDisabledStatus:'',
	            basePersonalphone: '',
	            basePersonalemail: '',
	            basePersonalIm: '',
	            baseNowaddress: '',
	            baseHomeaddress: '',
	            baseHukouaddress: '',
	            baseEmergencyperson: '',
	            baseEmergencyphone: '',
	            baseRemark: '',
	            socialZhicheng: '',
	            socialAge: '',
	            epriseOrigination:'',
	        	epriseLeader:'',
	        	epriseEnrolldate: '',
	        	eprisePracticedate: '',
	        	eprisePracticetype: '',
	        	epriseStafftype: '',
	        	epriseProbationStatus: '',
	        	eprisePreProbationdate: '',
	        	epriseProbationdate: '',
	        	epriseRole: '',
	        	epriseJobband:'',
	        	epriseTitle:'',
	        	epriseResponsibility: '',
	        	epriseHrowner: '',
	        	epriseHrchannel: '',
	        	epriseHrrefer: '',
	        	epriseHrreferbonus: '',
	        	epriseHrbonusdate: '',
	        	epriseHRParner: '',
	        	epriseMentor: '',
	        	epriseBgseachStatus: '',
	        	epriseWorkaddress: '',
	        	epriseWorkphone: '',
	        	epriseWorkage: '',
	        	epriseExtendworkage: '',
	        	epriseEmail: '',
	        	epriseClientMail: '',
	        	epriseClientId: '',
	        	epriseInsuranceaddress: '',
	        	epriseInsurancedate: '',
	        	epriseBankname: '',
	        	epriseBankaccount: '',
	        	epriseTransferType: '',
	        	epriseTransferDate: '',
	        	epriseTransferCompanyType: '',
	        	epriseTransferCompanyDate: '',
	        	epriseDutyStatus: '',
	        	epriseResigndate: '',
	        	epriseResignreason: '',
	        	epriseResignplan: '',
	        	epriseHRRemark: ''
	        },
	        edu:{
	          eduSchool: '',
	          eduMajor:'',
	          eduDegree: '',
	          eduBackground: '',
	          eduType:'',
	          eduStarttime:'',
	          eduEndtime:'',
	          eduBgcertificate:'',
	          eduTopdegree: '',
	          eduBasedegree: ''
	        },
	        edutime:'',
	        formLabelAlign:{
	        	
	        },
	        contract:{
	        	contractYear: '',
	        	contractType: '',
	        	contractContactcount:'',
	        	contractTime: ''
	        },
	        dictionaryList: [],
	        imgList: [],
	        accountInfo: {},
	        educationInfo: {},
	        rules: {
              	basePersonalIm:[
            		{ min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur' }
          		],
          		basePersonalemail:[
	                {type:'email', message:'邮箱书写格式错误', trigger:'blur'}
	            ],
                basePersonalphone:[
                	{type:'string', message:'手机号码书写格式错误',pattern: /^1[0-9]{10}$/,trigger:'blur'}
                ],
                baseHomeaddress:[
            		{ min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' }
          		],
          		baseNowaddress:[
            		{ min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' }
          		],
          		baseEmergencyperson:[
            		{ min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
          		],
          		basePersonalphone:[
                	{type:'string', message:'手机号码书写格式错误',pattern: /^1[0-9]{10}$/,trigger:'blur'}
                ],
                epriseWorkaddress:[
            		{ min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' }
          		],
          		epriseWorkphone:[
            		{ min: 7, max: 20, message: '长度在 7 到 20 个字符', trigger: 'blur' }
          		],
          		epriseEmail:[
            		{type:'email', message:'邮箱书写格式错误', trigger:'blur'}
          		],
          		epriseClientMail:[
            		{type:'email', message:'邮箱书写格式错误', trigger:'blur'}
          		],
          		epriseClientId:[
            		{ min: 0, max: 30, message: '长度在 0 到 30 个字符', trigger: 'blur' }
          		]
			}
		}
	},
	created () {
		this.initDictionary();
		this.init();
	},
	methods: {
		init () {
			this.getInfo();
		},
		initDictionary () {
			var self = this;
			self.$api.post(self.url.dictionaryList + '?t=' + new Date(), {}, function(r) {
                // console.log(r);
                if (r.code === 'ACK') {
                	self.dictionaryList = r.data;
                } else {
                	self.$message.error(r.message);
                }
            }, function(r) {
                self.$message.error(r.message);
            }, self.url.MOCK, '', true);
		},
		handleEdit () {
			if (!this.isEditStatus) {
				this.isEditStatus = true;
			}
		},
		update () {
			var self = this;
			self.$api.post(self.url.saveMyInfo + '?t=' + new Date(), self.formLabelAlign, function(r) {
                // console.log(r);
                if (r.code === 'ACK') {
                	self.isEditStatus = false;
                	self.$message.success(r.message);
                } else {
                	self.$message.error(r.message);
                }
            }, function(r) {
                self.$message.error(r.message);
            }, self.url.MOCK, '', true);
		},
		getInfo () {
			var self = this;
			// var staffId = localStorage.getItem('staffId');
			self.$api.get(self.url.myInfo + '?t=' + new Date(), {}, function(r) {
                // console.log(r);
                if (r.code === 'ACK') {
                	self.formLabelAlign = r.data.adminUserDetail;
                	self.imgList = r.data.certificateDetailList;
                	self.educationInfo = r.data.educateDetailList[0];
                	if ( r.data.educateDetailList.length === 0) {
                		self.educationInfo = {};
                	}
                	if (r.data.adminOfficeDetail) {
                		self.accountInfo = r.data.adminOfficeDetail;
                	}
                	var lastContract = r.data.adminContractList[0];
                	if (lastContract) {
                		self.contract.contractYear = lastContract.contractYear;
		        		self.contract.contractType = lastContract.contractType;
		        		self.contract.contractContactcount = r.data.adminContractList.length - 1;
		        		self.contract.contractTime = new Date(lastContract.contractStarttime).format('yyyy-MM-dd') + ' 至 ' + new Date(lastContract.contractEndtime).format('yyyy-MM-dd');
                	}
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
@media screen and (min-width:1280px){
    .person .el-input__inner, .person .el-date-editor.el-input {
   		width:214px;
    }
    .person .contact .large-form-item .el-input__inner, .person .contact .large-form-item .el-date-editor.el-input {
		width: 459px;
	}
	.person .img-common {
		width: 214px;
	}
}
@media screen and (min-width:1366px){
	.person .el-input__inner, .person .el-date-editor.el-input {
		width: 233px;
	}
	.person .contact .large-form-item .el-input__inner, .person .contact .large-form-item .el-date-editor.el-input {
		width: 497px;
	}
	.person .img-common {
		width: 233px;
	}
}
@media screen and (min-width:1600px){
	.person .el-input__inner, .person .el-date-editor.el-input {
		width: 233px;
	}
	.person .contact .large-form-item .el-input__inner, .person .contact .large-form-item .el-date-editor.el-input {
		width: 497px;
	}
	.person .img-common {
		width: 233px;
	}
}
@media screen and (min-width:1920px){
	.person .el-input__inner, .person .el-date-editor.el-input {
		width: 228px;
	}
	.person .contact .large-form-item .el-input__inner, .person .contact .large-form-item .el-date-editor.el-input {
		width: 488px;
	}
	.person .img-common {
		width: 228px;
	}
}
.person .form-content .el-input__inner, .person .form-content .el-date-editor.el-input {
		border-radius: 0;
	    height: 38px;	
	}
.myheight{
	height:2028px;
}
.myheight .main {
	height:1980px;
}
.person{
	color:#475055;
	font-family:"MicrosoftYaHei", arial, STHeiTi, sans-serif;
}
.person .form-title{
	height: 20px;
	line-height: 20px;
	padding: 20px 0 40px;
}
.person .title{
	font-size: 17px;
    display: inline-block;
    float: left;
    margin-left: 20px;
}
.person .edit-container{
	display: inline-block;
}
.person .icon-edit{
	width:20px;
	height:20px;
	background:url(../../../static/img/canedit.png) no-repeat;
	position:absolute;

}
.person .icon-edit.active{
	background:url(../../../static/img/edit.png) no-repeat;
}
.person .form-content {
	padding-left: 26px;
	padding-bottom: 37px;
}
.person .el-form--label-top .el-form-item__label {
	color: #a3abaf !important;
}
.person .el-form--inline .el-form-item{
	margin-right:32px;
}
.person .contact{
	margin-top:37px;
	padding-left: 26px;
}
.person .contact .el-input__inner, .person .contact .el-date-editor.el-input {
	border-radius: 0;
    height: 38px;	
}
.margin-bottom80 {
	margin-bottom:80px;
}
.margin-bottom234 {
	margin-bottom:234px;
}
.person .el-input__inner:focus {
	border-color: #5e85e0 !important;
}
.person .img-div{
	height: 168px;
	margin-right:32px;
	display:inline-block;
	float:left;
}
.person .img-common{
    height: 118px;
    display: block;
    margin-bottom: 20px;
    cursor: pointer;
}
.show-img:hover .ifshow{
    display: block;
}
.img-div span {
	color:#a3abaf;
	font-size:14px;
}
.forbanner span {
	color:#475055;
	cursor: pointer;
}
.show-img{
	margin-top: 6px;
}
.person .attachbg{
	background:url(../../../static/img/bg.png) no-repeat;
	height: 532px;
    background-position-y: bottom;
}
.button-div{
	float: right !important;
    margin-right: 132px !important;
}
.my-button-container{
	margin-top: 128px;
}
.my-button-container button{
	width: 98px;
    height: 40px;
}
.my-primary{
	background: #5e85e0;
	margin-right:36px;
	border: 0;
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
.my-hidden{
	display:none !important;
}
.person .upload-icon{
	display: block;
    margin: 28px auto 12px;
}
</style>