<template>
    <div class="header">
        <div class="user-info">
            <img class="logout" src="../../../static/img/logout.png" @click="loginout">
        </div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/setting.png">
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="my-menu">
                    <el-dropdown-item command="org"><img src="../../../static/img/org-menu-icon.png" />机构信息</el-dropdown-item>
                    <el-dropdown-item command="auth"><img src="../../../static/img/auth-menu-icon.png" />权限管理</el-dropdown-item>
                    <el-dropdown-item command="role"><img src="../../../static/img/role-menu-icon.png" />角色管理</el-dropdown-item>
                    <el-dropdown-item command="dictionary"><img src="../../../static/img/dic-menu-icon.png" />数据字典</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: 'linxin'
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
            handleCommand(command) {
                if(command === 'org'){
                    this.$router.push('/org');
                } else if(command === 'userInfo') {
                    this.$router.push('/userInfo');
                } else if(command === 'dictionary') {
                    this.$router.push('/dictionary');
                } else if(command === 'role') {
                    this.$router.push('/role');
                } else if(command === 'auth') {
                    this.$router.push('/auth');
                }
            },
            loginout() {
                //localStorage.removeItem('ms_username')
                //this.$router.push('/login');
                keycloak.logout();
            }
        }
    }
</script>
<style scoped>
    .header {
        box-sizing: border-box;
        height: 60px;
        font-size: 22px;
        line-height: 60px;
        color: #fff;
        background: -webkit-linear-gradient(to right, #514198, #122e7f); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(to right, #514198, #122e7f); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(to right, #514198, #122e7f); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #514198, #122e7f); /* 标准的语法 */
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
    }
    .user-info {
        float: right;
        width: 128px;
        border-left: 1px solid rgba(255, 255, 255, 0.5);
        height: 60px;
        text-align: center;
    }
    .user-info .el-icon-caret-bottom{
        line-height:60px !important;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:30px;
        height:28px;
    }
    .user-info .logout{
        position: absolute;
        top: 18px;
        width: 28px;
        height: 22px;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #dde2e3;
        padding-right: 54px;
    }
    .el-dropdown-menu__item > img {
        float: left;
        margin: 12px 24px 0 10px;
    }
    .el-dropdown-menu {
        margin: 0;
        padding: 0;
    }
    .my-menu{
        font-size:14px;
        color: #545358;
    }
    .my-menu .el-dropdown-menu__item:not(.is-disabled):hover {
        background-color: #eff3fc;
    }
</style>
