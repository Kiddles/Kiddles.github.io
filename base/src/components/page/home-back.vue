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
				<div class="form-content">
					<el-form :inline="formLine" :label-position="labelPosition" label-width="220px" :model="formLabelAlign">
					  <el-form-item label="中文名：">
					    <el-input v-model="formLabelAlign.baseRealname"  :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  </el-form-item>
					  <el-form-item label="拼音：">
					    <el-input v-model="formLabelAlign.basePinyin" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  </el-form-item>
					  <el-form-item label="英文名：">
					    <el-input v-model="formLabelAlign.baseEglishname" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  </el-form-item>
					  <el-form-item label="性别：">
					    <el-select v-model="formLabelAlign.baseSex" placeholder="请选择" :disabled="myAuth.isEmp || !isEditStatus">
					      <el-option label="男" value="0"></el-option>
					      <el-option label="女" value="1"></el-option>
					    </el-select>
					  </el-form-item>
					  <el-form-item label="民族：">
					    <el-select v-model="formLabelAlign.baseNationminzhu" placeholder="请选择" :disabled="myAuth.isEmp || !isEditStatus">
					      <el-option label="汉" value="0"></el-option>
					      <el-option label="维吾尔族" value="1"></el-option>
					    </el-select>
					  </el-form-item>
					  <el-form-item label="籍贯：">
					    <el-input v-model="formLabelAlign.baseNativeplace" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  </el-form-item>
					  <el-form-item label="国籍：">
					    <el-select v-model="formLabelAlign.baseNationality" placeholder="请选择" :disabled="myAuth.isEmp || !isEditStatus">
					      <el-option label="中国" value="0"></el-option>
					      <el-option label="地球" value="1"></el-option>
					    </el-select>
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
					      <el-option label="已婚" value="0"></el-option>
					      <el-option label="未婚" value="1"></el-option>
					    </el-select>
					  </el-form-item>
					  <el-form-item label="孕育情况：">
					    <el-input v-model="formLabelAlign.baseFertilityStatus" :disabled="myAuth.isHR || !isEditStatus"></el-input>
					  </el-form-item>
					  <el-form-item label="政治面貌：">
					    <el-select v-model="formLabelAlign.basePoliticStatus" placeholder="请选择" :disabled="myAuth.isEmp || !isEditStatus">
					      <el-option label="男" value="0"></el-option>
					      <el-option label="女" value="1"></el-option>
					    </el-select>
					  </el-form-item>
					  <el-form-item label="是否残疾人：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    <el-select v-model="formLabelAlign.baseDisabledStatus" placeholder="请选择" :disabled="!isEditStatus">
					      <el-option label="男" value="0"></el-option>
					      <el-option label="女" value="1"></el-option>
					    </el-select>
					  </el-form-item>
					  <el-form-item label="个人电话：">
					    <el-input v-model="formLabelAlign.basePersonalphone" :disabled="myAuth.isHR  || !isEditStatus"></el-input>
					  </el-form-item>
					  <el-form-item label="个人邮箱：">
					    <el-input v-model="formLabelAlign.basePersonalemail" :disabled="myAuth.isHR || !isEditStatus"></el-input>
					  </el-form-item>
					  <el-form-item label="个人IM：">
					    <el-input v-model="formLabelAlign.basePersonalIm" :disabled="myAuth.isHR || !isEditStatus"></el-input>
					  </el-form-item>
					</el-form>
				</div>
				<div class="contact margin-bottom80">
					<el-form :inline="formLine" :label-position="labelPosition" label-width="220px" :model="formLabelAlign">
					  <el-form-item label="现住地址：" class="large-form-item">
					    <el-input v-model="formLabelAlign.baseNowaddress" :disabled="myAuth.isHR || !isEditStatus"></el-input>
					  </el-form-item>
					  <el-form-item label="家庭住址：" class="large-form-item">
					    <el-input v-model="formLabelAlign.baseHomeaddress" :disabled="myAuth.isHR || !isEditStatus"></el-input>
					  </el-form-item>
					  <el-form-item label="户口地址：" class="large-form-item">
					    <el-input v-model="formLabelAlign.baseHukouaddress" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  </el-form-item>
					  <el-form-item label="紧急联系人：">
					    <el-input v-model="formLabelAlign.baseEmergencyperson" :disabled="myAuth.isHR || !isEditStatus"></el-input>
					  </el-form-item>
					  <el-form-item label="紧急联系电话：">
					    <el-input v-model="formLabelAlign.baseEmergencyphone" :disabled="myAuth.isHR || !isEditStatus"></el-input>
					  </el-form-item>
					  <el-form-item label="员工备注：">
					    <el-input v-model="formLabelAlign.baseRemark" :disabled="myAuth.isHR || !isEditStatus"></el-input>
					  </el-form-item>
					  <el-form-item label="职称：">
					    <el-input v-model="formLabelAlign.socialZhicheng" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
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
					<el-form :inline="formLine" :label-position="labelPosition" label-width="220px" :model="formLabelAlign">
						<el-form-item label="学历："  v-bind:class="{'my-hidden': myAuth.isEmp}">
						    <el-select v-model="formLabelAlign.eduBackground" placeholder="请选择" :disabled="!isEditStatus">
						        <el-option label="专科" value="0"></el-option>
						        <el-option label="本科" value="1"></el-option>
						        <el-option label="硕士研究生" value="2"></el-option>
						        <el-option label="博士研究生" value="3"></el-option>
						    </el-select>
					  	</el-form-item>
					  	<el-form-item label="毕业学校：">
					    	<el-input v-model="formLabelAlign.eduSchool" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="所学专业：">
					    	<el-input v-model="formLabelAlign.eduMajor" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="所获学位：">
					    	<el-select v-model="formLabelAlign.eduDegree" placeholder="请选择" :disabled="myAuth.isEmp || !isEditStatus">
					      		<el-option label="学士" value="0"></el-option>
					      		<el-option label="硕士" value="1"></el-option>
					      	<el-option label="博士" value="2"></el-option>
					    	</el-select>
					    </el-form-item>
					    <el-form-item label="教育类型：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-select v-model="formLabelAlign.eduType" placeholder="请选择" :disabled="!isEditStatus">
					      		<el-option label="学士" value="0"></el-option>
					      		<el-option label="硕士" value="1"></el-option>
					      	<el-option label="博士" value="2"></el-option>
					    	</el-select>
					    </el-form-item>
					    <el-form-item label="时间范围：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-date-picker v-model="edutime" type="daterange" placeholder="选择日期范围" :disabled="!isEditStatus"></el-date-picker>
					  	</el-form-item>
					  	<el-form-item label="最高学历："  v-bind:class="{'my-hidden': myAuth.isEmp}">
						    <el-select v-model="formLabelAlign.eduTopdegree" placeholder="请选择" :disabled="true">
						        <el-option label="专科" value="0"></el-option>
						        <el-option label="本科" value="1"></el-option>
						        <el-option label="硕士研究生" value="2"></el-option>
						        <el-option label="博士研究生" value="3"></el-option>
						    </el-select>
					  	</el-form-item>
					  	<el-form-item label="基础学历："  v-bind:class="{'my-hidden': myAuth.isEmp}">
						    <el-select v-model="formLabelAlign.eduBasedegree" placeholder="请选择" :disabled="true">
						        <el-option label="专科" value="0"></el-option>
						        <el-option label="本科" value="1"></el-option>
						        <el-option label="硕士研究生" value="2"></el-option>
						        <el-option label="博士研究生" value="3"></el-option>
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
					<el-form :inline="formLine" :label-position="labelPosition" label-width="220px" :model="formLabelAlign">
						<el-form-item label="部门：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-input v-model="formLabelAlign.epriseOrigination" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="负责人：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-input v-model="formLabelAlign.epriseLeader" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="入职时间：">
					    	<el-date-picker v-model="formLabelAlign.epriseEnrolldate" type="date" placeholder="选择日期" :picker-options="pickerOptions0"  :disabled="myAuth.isEmp || !isEditStatus"></el-date-picker>
					  	</el-form-item>
					  	<el-form-item label="实习入职时间：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-date-picker v-model="formLabelAlign.eprisePracticedate" type="date" placeholder="选择日期" :picker-options="pickerOptions0"  :disabled="!isEditStatus"></el-date-picker>
					  	</el-form-item>
					  	<el-form-item label="实习生类型：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-select v-model="formLabelAlign.eprisePracticetype" placeholder="请选择" :disabled="!isEditStatus">
					      		<el-option label="学士" value="0"></el-option>
					      		<el-option label="硕士" value="1"></el-option>
					      		<el-option label="博士" value="2"></el-option>
					    	</el-select>
					    </el-form-item>
					    <el-form-item label="员工类型：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-select v-model="formLabelAlign.epriseStafftype" placeholder="请选择" :disabled="!isEditStatus">
					      		<el-option label="学士" value="0"></el-option>
					      		<el-option label="硕士" value="1"></el-option>
					      		<el-option label="博士" value="2"></el-option>
					    	</el-select>
					    </el-form-item>
					    <el-form-item label="试用期状态：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-select v-model="formLabelAlign.epriseProbationStatus" placeholder="请选择" :disabled="!isEditStatus">
					      		<el-option label="学士" value="0"></el-option>
					      		<el-option label="硕士" value="1"></el-option>
					      		<el-option label="博士" value="2"></el-option>
					    	</el-select>
					    </el-form-item>
					    <el-form-item label="拟转正时间：">
					    	<el-date-picker v-model="formLabelAlign.eprisePreProbationdate" type="date" placeholder="选择日期"  :disabled="!isEditStatus"></el-date-picker>
					  	</el-form-item>
					  	<el-form-item label="转正日期：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-date-picker v-model="formLabelAlign.epriseProbationdate" type="date" placeholder="选择日期"  :disabled="!isEditStatus"></el-date-picker>
					  	</el-form-item>
					  	<el-form-item label="岗位/角色：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-input v-model="formLabelAlign.epriseRole" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="职级：">
					    	<el-input v-model="formLabelAlign.epriseJobband" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="头衔：">
					    	<el-input v-model="formLabelAlign.epriseTitle" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
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
					    	<el-date-picker v-model="formLabelAlign.epriseHrbonusdate" type="date" placeholder="选择日期" :picker-options="pickerOptions0"  :disabled="!isEditStatus"></el-date-picker>
					  	</el-form-item>
					  	<el-form-item label="HR Parner：">
					    	<el-input v-model="formLabelAlign.epriseHRParner" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="良师益友：">
					    	<el-input v-model="formLabelAlign.epriseMentor" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="背景调查：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					  		<el-select v-model="formLabelAlign.epriseBgseachStatus" placeholder="请选择" :disabled="!isEditStatus">
					      		<el-option label="学士" value="0"></el-option>
					      		<el-option label="硕士" value="1"></el-option>
					    	</el-select>
					  	</el-form-item>
					  	<el-form-item label="主要办公地点：">
					    	<el-input v-model="formLabelAlign.epriseWorkaddress" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="办公电话：">
					    	<el-input v-model="formLabelAlign.epriseWorkphone" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="司龄：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-input v-model="formLabelAlign.epriseWorkage"  :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="司龄(含实习)：">
					    	<el-input v-model="formLabelAlign.epriseExtendworkage" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="公司邮箱：">
					    	<el-input v-model="formLabelAlign.epriseEmail" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="Client Mail：">
					    	<el-input v-model="formLabelAlign.epriseClientMail" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="ClientId：">
					    	<el-input v-model="formLabelAlign.epriseClientId" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="五险一金缴纳地址：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-input v-model="formLabelAlign.epriseInsuranceaddress" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="五险一金缴纳日期：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					  		<el-date-picker v-model="formLabelAlign.epriseInsurancedate" type="date" placeholder="选择日期" :picker-options="pickerOptions0"  :disabled="!isEditStatus"></el-date-picker>
					  	</el-form-item>
					  	<el-form-item label="工资卡银行：">
					    	<el-input v-model="formLabelAlign.epriseBankname" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="工资卡账号：">
					    	<el-input v-model="formLabelAlign.epriseBankaccount" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="转身份：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-input v-model="formLabelAlign.epriseTransferType" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="转身份日期：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					  	<el-date-picker v-model="formLabelAlign.epriseTransferDate" type="date" placeholder="选择日期" :picker-options="pickerOptions0"  :disabled="!isEditStatus"></el-date-picker>
					  	</el-form-item>
					  	<el-form-item label="转公司：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-input v-model="formLabelAlign.epriseTransferCompanyType" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="转公司日期：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					  	<el-date-picker v-model="formLabelAlign.epriseTransferCompanyDate" type="date" placeholder="选择日期" :picker-options="pickerOptions0"  :disabled="!isEditStatus"></el-date-picker>
					  	</el-form-item>
					  	<el-form-item label="在职状态：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					    	<el-input v-model="formLabelAlign.epriseDutyStatus" :disabled="!isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="离职日期：" v-bind:class="{'my-hidden': myAuth.isEmp}">
					  	<el-date-picker v-model="formLabelAlign.epriseResigndate" type="date" placeholder="选择日期" :picker-options="pickerOptions0"  :disabled="!isEditStatus"></el-date-picker>
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
					    	<el-date-picker v-model="contractTime" type="daterange" placeholder="选择日期范围" :disabled="myAuth.isEmp || !isEditStatus"></el-date-picker>
					  	</el-form-item>
					  	<el-form-item label="年限：">
					    	<el-input v-model="formLabelAlign.contractYear" :disabled="myAuth.isEmp || !isEditStatus"></el-input>
					  	</el-form-item>
					  	<el-form-item label="类型：">
						    <el-select v-model="formLabelAlign.contractType" placeholder="请选择" :disabled="myAuth.isEmp || !isEditStatus">
						        <el-option label="专科" value="0"></el-option>
						        <el-option label="本科" value="1"></el-option>
						        <el-option label="硕士研究生" value="2"></el-option>
						        <el-option label="博士研究生" value="3"></el-option>
						    </el-select>
					  	</el-form-item>
					  	<el-form-item label="续签次数：">
					    	<el-input v-model="formLabelAlign.contractContactcount" :disabled="true"></el-input>
					  	</el-form-item>
					</el-form>
				</div>
				<div class="form-title">
					<el-row>
					  <el-col :span="24"><div class="split-line"></div><div class="title">附件区</div></el-col>
					</el-row>
				</div>
				<div class="form-content attachbg">
					<div class="img-div">
						<span>学历证书：</span>
						<label for="bgcertificate" class="forbanner" v-show="myAuth.isHR && !formLabelAlign.bgcertificateVisible">
							<img src="../../../static/img/upload.png" class="upload-icon"/><span>上传图片</span>
						</label>
						<div class="show-img" v-show="formLabelAlign.bgcertificateVisible">
							<img v-bind:src="formLabelAlign.bgcertificateUrl" class="brand-photo img-common"/>
							<div class="ifshow">
	                            <span class="hoverShow"></span>
	                            <i class="el-icon-delete deleteIcon" @click="deleteImg('bgcertificate')"></i>
	                        </div>
                        </div>
						<form action="" id="bgcertificateForm" enctype="multipart/form-data">
	                        <input type="file" id="bgcertificate"  class="fileOpacity"   @change="onFileChange('bgcertificateForm')"/>
	                    </form>
					</div>
					<div class="img-div">
						<span>学位证书：</span>
						<label for="degreecertificate" class="forbanner" v-if="!formLabelAlign.degreecertificateVisible" v-show="myAuth.isHR">
							<img src="../../../static/img/upload.png" class="upload-icon"/><span>上传图片</span>
						</label>
						<div class="show-img" v-if="formLabelAlign.degreecertificateVisible">
							<img v-bind:src="formLabelAlign.degreecertificateUrl" class="brand-photo img-common"/>
							<div class="ifshow">
	                            <span class="hoverShow"></span>
	                            <i class="el-icon-delete deleteIcon" @click="deleteImg(formLabelAlign.degreecertificateUrl)"></i>
	                        </div>
                        </div>
						<form action="" id="degreecertificateForm" enctype="multipart/form-data">
	                        <input type="file" id="degreecertificate"  class="fileOpacity"  @change="onFileChange('degreecertificateForm')"/>
	                    </form>
					</div>
					<div class="img-div">
						<span>身份证：</span>
						<label for="idcard" class="forbanner" v-if="!formLabelAlign.idcardVisible" v-show="myAuth.isHR">
							<img src="../../../static/img/upload.png" class="upload-icon"/><span>上传图片</span>
						</label>
						<div class="show-img" v-if="formLabelAlign.idcardVisible">
							<img v-bind:src="formLabelAlign.idcardUrl" class="brand-photo img-common"/>
							<div class="ifshow">
	                            <span class="hoverShow"></span>
	                            <i class="el-icon-delete deleteIcon" @click="deleteImg(formLabelAlign.idcardUrl)"></i>
	                        </div>
                        </div>
						<form action="" id="idcardForm" enctype="multipart/form-data">
	                        <input type="file" id="idcard"  class="fileOpacity"  @change="onFileChange('idcardForm')"/>
	                    </form>
					</div>
					<div class="img-div">
						<span>职称证书：</span>
						<label for="zhicheng" class="forbanner" v-if="!formLabelAlign.zhichengVisible" v-show="myAuth.isHR">
							<img src="../../../static/img/upload.png" class="upload-icon"/><span>上传图片</span>
						</label>
						<div class="show-img" v-if="formLabelAlign.zhichengVisible">
							<img v-bind:src="formLabelAlign.zhichengUrl" class="brand-photo img-common"/>
							<div class="ifshow">
	                            <span class="hoverShow"></span>
	                            <i class="el-icon-delete deleteIcon" @click="deleteImg(formLabelAlign.zhichengUrl)"></i>
	                        </div>
                        </div>
						<form action="" id="zhichengForm" enctype="multipart/form-data">
	                        <input type="file" id="zhicheng"  class="fileOpacity"  @change="onFileChange('zhichengForm')"/>
	                    </form>
					</div>
					<div class="img-div">
						<span>照片：</span>
						<label for="photo" class="forbanner" v-if="!formLabelAlign.photoVisible" v-show="myAuth.isHR">
							<img src="../../../static/img/upload.png" class="upload-icon"/><span>上传图片</span>
						</label>
						<div class="show-img" v-if="formLabelAlign.photoVisible">
							<img v-bind:src="formLabelAlign.photoUrl" class="brand-photo img-common"/>
							<div class="ifshow">
	                            <span class="hoverShow"></span>
	                            <i class="el-icon-delete deleteIcon" @click="deleteImg(formLabelAlign.photoUrl)"></i>
	                        </div>
                        </div>
						<form action="" id="photoForm" enctype="multipart/form-data">
	                        <input type="file" id="photo"  class="fileOpacity"  @change="onFileChange('photoForm')"/>
	                    </form>
					</div>
					<div class="img-div">
						<span>结婚证：</span>
						<label for="marry" class="forbanner" v-if="!formLabelAlign.marryVisible" v-show="myAuth.isHR">
							<img src="../../../static/img/upload.png" class="upload-icon"/><span>上传图片</span>
						</label>
						<div class="show-img" v-if="formLabelAlign.marryVisible">
							<img v-bind:src="formLabelAlign.marryUrl" class="brand-photo img-common"/>
							<div class="ifshow">
	                            <span class="hoverShow"></span>
	                            <i class="el-icon-delete deleteIcon" @click="deleteImg(formLabelAlign.marryUrl)"></i>
	                        </div>
                        </div>
						<form action="" id="marryForm" enctype="multipart/form-data">
	                        <input type="file" id="marry"  class="fileOpacity"  @change="onFileChange('marryForm')"/>
	                    </form>
					</div>
					<div class="img-div">
						<span>准生证：</span>
						<label for="zhunsheng" class="forbanner" v-if="!formLabelAlign.zhunshengVisible" v-show="myAuth.isHR">
							<img src="../../../static/img/upload.png" class="upload-icon"/><span>上传图片</span>
						</label>
						<div class="show-img" v-if="formLabelAlign.zhunshengVisible">
							<img v-bind:src="formLabelAlign.zhunshengUrl" class="brand-photo img-common"/>
							<div class="ifshow">
	                            <span class="hoverShow"></span>
	                            <i class="el-icon-delete deleteIcon" @click="deleteImg(formLabelAlign.zhunshengUrl)"></i>
	                        </div>
                        </div>
						<form action="" id="zhunshengForm" enctype="multipart/form-data">
	                        <input type="file" id="zhunsheng"  class="fileOpacity"  @change="onFileChange('zhunshengForm')"/>
	                    </form>
					</div>
					<div class="img-div">
						<span>户口本：</span>
						<label for="hukou" class="forbanner" v-if="!formLabelAlign.hukouVisible" v-show="myAuth.isHR">
							<img src="../../../static/img/upload.png" class="upload-icon"/><span>上传图片</span>
						</label>
						<div class="show-img" v-if="formLabelAlign.hukouVisible">
							<img v-bind:src="formLabelAlign.hukouUrl" class="brand-photo img-common"/>
							<div class="ifshow">
	                            <span class="hoverShow"></span>
	                            <i class="el-icon-delete deleteIcon" @click="deleteImg(formLabelAlign.hukouUrl)"></i>
	                        </div>
                        </div>
						<form action="" id="hukouForm" enctype="multipart/form-data">
	                        <input type="file" id="hukou"  class="fileOpacity"  @change="onFileChange('hukouForm')"/>
	                    </form>
					</div>
					<div class="img-div">
						<span>简历：</span>
						<label for="resume" class="forbanner" v-if="!formLabelAlign.resumeVisible" v-show="myAuth.isHR">
							<img src="../../../static/img/upload.png" class="upload-icon"/><span>上传图片</span>
						</label>
						<div class="show-img" v-if="formLabelAlign.resumeVisible">
							<img v-bind:src="formLabelAlign.resumeUrl" class="brand-photo img-common"/>
							<div class="ifshow">
	                            <span class="hoverShow"></span>
	                            <i class="el-icon-delete deleteIcon" @click="deleteImg(formLabelAlign.resumeUrl)"></i>
	                        </div>
                        </div>
						<form action="" id="resumeForm" enctype="multipart/form-data">
	                        <input type="file" id="resume"  class="fileOpacity"  @change="onFileChange('resumeForm')"/>
	                    </form>
					</div>
					<div class="img-div button-div">
						<div class="my-button" v-if="isEditStatus">
							<el-button class="my-primary" @click="update">SUBMIT</el-button>
							<el-button class="my-default" @click="isEditStatus=false">CANCEL</el-button>
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
	        	isEmp: false,
	        	isHR: true
	        },
			isActive: true,
			formLabelAlign: {
	          baseRealname: '涂成红',
	          basePinyin: 'tuchenghong',
	          baseEglishname: 'tutu',
	          baseSex: '女',
	          baseNationminzhu: '汉',
	          baseNativeplace: '',
	          baseNationality: '',
	          baseIdcardcode: '',
	          baseBirthdate: '1989-12-07',
	          baseBirthmonth: '12',
	          baseBirthday: '12-07',
	          baseAge: '28',
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
	          socialAge: ''
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
	        formLabelAlign:{
	        	contractStarttime: '',
	        	contractEndtime: '',
	        	contractYear: '',
	        	contractType: '',
	        	contractContactcount:''
	        },
	        contractTime: '',
	        formLabelAlign:{
	        	bgcertificateVisible: false,
	        	bgcertificateUrl: '',
	        	degreecertificateVisible: false,
	        	degreecertificateUrl: '',
	        	idcardVisible: false,
	        	idcardUrl: '',
	        	zhichengVisible: false,
	        	zhichengUrl: '',
	        	photoVisible: false,
	        	photoUrl: '',
	        	marryVisible: false,
	        	marryUrl: '',
	        	zhunshengVisible: false,
	        	zhunshengUrl: '',
	        	hukouVisible: false,
	        	hukouUrl: '',
	        	resumeVisible: false,
	        	resumeUrl: ''
	        }
		}
	},
	created () {
		this.init();
	},
	methods: {
		init () {
			this.getInfo();
		},
		handleEdit () {
			if (!this.isEditStatus) {
				this.isEditStatus = true;
			}
		},
		update () {
			this.isEditStatus = false;
		},
		getInfo () {
			var self = this;
			self.$api.get(self.url.myInfo + 'chenghongtu', {}, function(r) {
                console.log(r);
                if (r.code === 'ACK') {
                	self.formLabelAlign = r.data.adminUserDetail;
                } else {
                	self.$message.error(r.message);
                }
            }, function(r) {
                self.$message.error(r.message);
            }, self.url.MOCK, '', true);
		},
 		handleRemove(file, fileList) {
	        console.log(file, fileList);
	      },
	    handlePictureCardPreview(file) {
	        this.img.degreecertificateUrl = file.url;
	        this.img.degreecertificateVisible = true;
	    },
	    onFileChange() {
            var self = this;
            debugger;
            var fileInfo = document.getElementById('bgcertificateForm')[0].files[0];
            var formdata = new FormData();
            formdata.append("multipartFile", fileInfo);
            self.$api.post(self.url.imgUpload + '?staffId=150753&imgType=PhotoUrl', formdata, function(r) {
                console.log(r);
                if (r.code === 'ACK') {
                	self.formLabelAlign.bgcertificateVisible = true;
                	self.formLabelAlign.bgcertificateUrl = r.data;
                }
            }, function(r) {
                self.$message(r.message);
            }, self.url.MOCK, '', true);
        },
        deleteImg(type) {
        	var self = this;
        	if (type === 'bgcertificate') {
        		self.img.bgcertificateVisible = false;
        		self.img.bgcertificateUrl = '';
        	}
        }
	}
}
</script>
<style>
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
.person .form-content{
	padding-left: 26px;
}
.person .el-form--label-top .el-form-item__label {
	color: #a3abaf !important;
}
.person .form-content .el-input__inner, .person .form-content .el-date-editor.el-input {
	border-radius: 0;
	width: 228px;
    height: 38px;	
}
.person .form-content .el-input__inner {
	border: 1px solid #adadad;
}
.person .el-form--inline .el-form-item{
	margin-right:32px;
}
.person .contact{
	margin-top:74px;
	padding-left: 26px;
}
.person .contact .el-input__inner, .person .contact .el-date-editor.el-input {
	border-radius: 0;
	width: 228px;
    height: 38px;	
}
.person .contact .el-input__inner{
	border: 1px solid #adadad;
}
.person .contact .large-form-item .el-input__inner, .person .contact .large-form-item .el-date-editor.el-input {
	width: 488px;
}
.person .contact .large-form-item .el-input__inner{
	border: 1px solid #adadad;
}
.margin-bottom80 {
	margin-bottom:80px;
}
.margin-bottom234 {
	margin-bottom:234px;
}
.person .el-input__inner:focus {
	border-color: #012080 !important;
}
.person .img-div{
	height: 168px;
	margin-right:32px;
	display:inline-block;
	float:left;
}
.person .img-common{
	width: 228px;
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
.my-button{
	margin-top: 128px;
}
.my-button button{
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