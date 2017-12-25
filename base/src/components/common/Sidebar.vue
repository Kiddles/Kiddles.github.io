<template>
    <div class="sidebar">
        <!-- <img src="../../../static/img/logo.png" class="logo"/> -->
        <div class="img-container"><img v-bind:src="baseInfo.photoUrl" class="mypic" @click="handleMyInfo" onerror="javascript:this.src='../../../web/static/img/img.jpg';" alt="pic"/></div>
        <div class="myname">{{baseInfo.pinyin}}</div>
        <div class="staff-no">{{baseInfo.staffId}}-{{baseInfo.staffType}}</div>
        <div class="project">Project: {{baseInfo.project}}</div>
        <div class="update-password" @click="handleUpdatePassword"><img src="../../../static/img/edit.png"/>修改密码</div>
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
            <el-menu-item  index="index">
                <div class="icon-container"><i class="icon-index"></i></div>
                <div class="title">首页</div>
            </el-menu-item>
            <el-menu-item  index="attendance">
                <div class="icon-container"><i class="icon-attendance"></i></div>
                <div class="title">考勤</div>
            </el-menu-item>
            <el-menu-item  index="leave" v-if="flag">
                <div class="icon-container"><i class="icon-leave"></i></div>
                <div class="title">请假</div>
            </el-menu-item>
            <el-menu-item  index="overtime">
                <div class="icon-container"><i class="icon-overtime"></i></div>
                <div class="title">加班</div>
            </el-menu-item>
            <el-menu-item  index="reimburse">
                <div class="icon-container"><i class="icon-payment"></i></div>
                <div class="title">报销</div>
            </el-menu-item>
            <el-menu-item  index="record">
                <div class="icon-container"><i class="icon-record"></i></div>
                <div class="title">员工档案</div>
            </el-menu-item>
        </el-menu>
        <el-dialog title="修改密码" :visible.sync="dialogVisible" class="pass-dialog">
            <iframe src="http://172.16.131.27/auth/realms/bsoa/account/password"></iframe>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                dialogVisible: false,
                flag: false,
                baseInfo: {
                    photoUrl: '../../../static/img/img.jpg',
                    pinyin: 'Tu,chenghong',
                    staffId: '150753',
                    staffType: 'FTE',
                    project: 'SOMS'

                }
            }
        },
        created: function () {
            this.getBaseInfo();
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        methods:{
            handleMyInfo () {
                this.$router.push('/home');
            },
            handleUpdatePassword () {
                this.dialogVisible = true;
            },
            getBaseInfo () {
                var self = this;
                self.$api.get(self.url.myInfo, {}, function(r) {
                    if (r.code === 'ACK') {
                        self.baseInfo = r.data;
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
<style type="text/css">
    .pass-dialog .el-dialog {
        height:502px;
        width: 732px;
    }
    .pass-dialog .el-dialog__body {
       
    }
    .pass-dialog .el-dialog__body {
        padding: 0;
    }
</style>
<style scoped>
    .pass-dialog iframe {
        height:100%;
        width:100%;
        border:none;
        width: 732px;
    }
    .sidebar{
        width: 164px;
        background: #FFFFFF;
        text-align: center;
        height: auto;
        float: left;
        display: inline-block;
    }
    .sidebar > .img-container{
        position:relative;
    }
    .sidebar .update-password {
        width: 112px;
        height: 36px;
        margin: 0 auto;
        line-height: 36px;
        font-size: 14px;
        color: #545358;
        border: 1px solid #dde2e4;
        border-radius: 4px;
        cursor: pointer;
    }
    .update-password  img {
        height: 21px;
        width: 20px;
        margin-top: 7px;
        margin-left: 11px;
        float: left;
    }
    .mypic{
        width:84px;
        height:84px;
        border-radius:84px;
        cursor: pointer;
    }
    .pic-edit{
        background: url(../../../static/img/pic-edit.png) no-repeat;
        width: 30px;
        height: 30px;
        position: absolute;
        right: 28px;
        top: 54px;
    }
    .sidebar > ul {
    }
    .sidebar > .el-menu {
        background: #fff;
        margin-top:35px;
    }
    .sidebar > .el-menu-item{
        color:#adadad;
        font-size:14px;
        height:64px;
    }
    .sidebar .el-menu-item{
        line-height: inherit !important;
        padding-bottom: 19px !important;
        height: 102px !important;
        padding-top: 19px !important;
    }
    .sidebar .el-menu-item:hover {
        background-color: #e0e9ff;
    }
    .icon-container{
        height: 32px !important;
    }
    .title{
        height:14px;
        margin-top:10px;
        font-weight: bold;
        color:#adadad;
        line-height: 14px;
    }
    .el-menu-item.is-active .title{
        color:#012989;
    }
    .el-menu-item .icon-index {
        width:31px;
        height:29px;
        background:url(../../../static/img/index.png) no-repeat;
        position: absolute;
        left: 68px;
    }
    .el-menu-item.is-active .icon-index {
        background:url(../../../static/img/index-active.png) no-repeat;
    }
    .el-menu-item .icon-leave {
        width:32px;
        height:28px;
        background:url(../../../static/img/leave-gray.png) no-repeat;
        position: absolute;
        left:68px;
    }
    .el-menu-item.is-active .icon-leave {
        background:url(../../../static/img/leave-active.png) no-repeat;
    }
    .el-menu-item .icon-attendance {
        width:32px;
        height:28px;
        background:url(../../../static/img/attendance.png) no-repeat;
        position: absolute;
        left:68px;
    }
    .el-menu-item.is-active .icon-attendance {
        background:url(../../../static/img/attendance-active.png) no-repeat;
    }
    .el-menu-item .icon-overtime {
        width:30px;
        height:30px;
        background:url(../../../static/img/overtime.png) no-repeat;
        position: absolute;
        left: 68px;
    }
    .el-menu-item.is-active .icon-overtime {
        background:url(../../../static/img/overtime-active.png) no-repeat;
    }
    .el-menu-item .icon-payment {
        width:33px;
        height:30px;
        background:url(../../../static/img/reimburse.png) no-repeat;
        position: absolute;
        left: 68px;
    }
    .el-menu-item.is-active .icon-payment {
        background:url(../../../static/img/reimburse-active.png) no-repeat;
    }
    .el-menu-item .icon-record {
        width:34px;
        height:32px;
        background:url(../../../static/img/record.png) no-repeat;
        position: absolute;
        left: 68px;
    }
    .el-menu-item.is-active .icon-record {
        background:url(../../../static/img/record-active.png) no-repeat;
    }
    .sidebar > .myname{
        font-size:17px;
        color:#012989;
        font-weight: bold;
        margin:14px 0;
    }
    .sidebar > .staff-no{
        font-size:12px;
        color:#adadad;
        font-weight: bold;
    }
    .sidebar > .project{
        font-size:12px;
        color:#adadad;
        font-weight: bold;
        margin-top:8px;
        margin-bottom: 8px;
    }
</style>
