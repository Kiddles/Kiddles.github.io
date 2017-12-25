<template>
  <div class="content">
    <table class="index-big-table">
      <tr>
        <td valign="top" id="td-calendar">
          <div id="calendar" class="index-box">
            <div class="index-month">
              <ul>
                <li class="index-arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
                <li class="index-year-month" @click="pickYear(currentYear,currentMonth)">
                  <span class="index-choose-year">{{month}}{{ currentYear }}</span>
                  <!--<span class="choose-month">{{ currentMonth }}</span>-->
                  <span class="index-choose-month"></span>
                </li>
                <li class="index-arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
              </ul>
            </div>
            <ul class="index-weekdays">
              <li>Sun</li>
              <li>Mon</li>
              <li>Tue</li>
              <li>Wed</li>
              <li>Thu</li>
              <li>Fri</li>
              <li>Sat</li>
            </ul>
            <ul class="index-days">
              <li @click="pick(day)" v-for="day in days">
                <table>
                  <tr>
                    <td>
                <!--今天-->
                <span v-if="day.getMonth()+1 != currentMonth" class="index-other-month">{{ day.getDate() }}</span>
                <span v-else="">
                  <!--今天-->
                  <span v-if="day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()" class="index-active">{{ day.getDate() }}</span>
                  <span v-else="">{{ day.getDate() }}</span>
                </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <canvas id="day-small-box" v-if="small_boxs[day.getDate()-1] && day.getMonth()+1==currentMonth"></canvas>
                      <canvas id="day-leave" v-if="leaveMonthSumDay[day.getDate()-1] && day.getMonth()+1==currentMonth"></canvas>
                      <canvas id="day-overtime" v-if="overtimeMonthSumDay[day.getDate()-1] && day.getMonth()+1==currentMonth"></canvas>
                    </td>
                  </tr>
                </table>
              </li>
              <!--<li v-for="small_box in small_boxs">
                      <canvas id="day-small-box" v-if="small_box"></canvas>
              </li>-->
            </ul>
            <ul>
              <hr />
              <li class="index-daily-report">
                <canvas id="daily-report-box"></canvas>
                <span class="index-other-span">Daily Report</span>
                <canvas id="leave-box"></canvas>
                <span class="index-other-span">Leave</span>
                <canvas id="ot-box"></canvas>
                <span class="index-ot-span">OT</span>
              </li>
            </ul>
          </div>
          <div id="workinfo" class="index-box">
            <div class="index-work-title">
              <canvas class="index-flag"></canvas>
              <span class="index-content-title">{{attendanceDate}}出勤情况</span>
            </div>
            <div>
              <fieldset class="index-groupbox-border">
                <legend class="index-groupbox-title">
                  打卡时长<span class="index-blue-font">{{personalClockHistory.workingHours}}</span>小时<span class="index-blue-font">{{personalClockHistory.workingMinutes}}</span>分
                </legend>
                <div class="index-arrow-up"></div>
                <div>
                  <span class="index-groupbox-content">上班时间</span>
                  <span v-if="work_time_show" class="index-abnormal">{{personalClockHistory.clockInTime}}</span>
                  <span v-if="!work_time_show" class="index-normal">{{personalClockHistory.clockInTime}}</span>
                </div>
                <div class="index-groupbox-bottom">
                  <span class="index-groupbox-content">下班时间</span>
                  <span v-if="close_time_show" class="index-abnormal">{{personalClockHistory.clockOutTime}}</span>
                  <span v-if="!close_time_show" class="index-normal">{{personalClockHistory.clockOutTime}}</span>
                </div>
              </fieldset>
            </div>
            <div>
              <fieldset class="index-groupbox-border">
                <legend  class="index-groupbox-title">
                  加班时长<span class="index-blue-font">{{overtimeDetail.overtimeHours}}</span>小时
                </legend>
                <div class="index-arrow-up2"></div>
                <div class="index-groupbox-bottom">
                  <span class="index-groupbox-content">内容：</span>
                  <span  class="index-groupbox-title">{{overtimeDetail.applyReason}}</span>
                </div>
              </fieldset>
            </div>
            <div>
              <fieldset class="index-groupbox-border">
                <legend  class="index-groupbox-title">
                  请假时长<span class="index-blue-font">{{leaveDayDetail.leaveDays*8}}</span>小时
                </legend>
                <div class="index-arrow-up1"></div>
                <div>
                  <span class="index-groupbox-content">类型：</span>
                  <span class="index-groupbox-title">{{leaveDayDetail.leaveType}}</span>
                </div>
                <div class="index-groupbox-bottom">
                  <span class="index-groupbox-content">原因：</span>
                  <span class="index-groupbox-title">{{leaveDayDetail.leaveReason}}</span>
                </div>
              </fieldset>
            </div>
          </div>
        </td>

        <!--<td id="td-personalinfo2" valign="top">
          <div id="personalinfo2" class="index-box">
            <div class="index-work-title">
              <canvas class="index-flag"></canvas>
              <span class="index-content-title">个人信息</span>
            </div>
            <div>
              <table class="index-table-width1">
                <tr class="index-table-title">
                  <td class="index-td-width3">
                    <span>中文名：</span>
                  </td>
                  <td class="index-td-width3">
                    <span>拼音：</span>
                  </td>
                  <td class="index-td-width3">
                    <span>英文名：</span>
                  </td>
                  <td class="index-td-width3">
                    <span>性别：</span>
                  </td>
                  <td class="index-td-width3">
                    <span>国籍：</span>
                  </td>
                </tr>
              </table>
            </div>
            <div>
              <table class="index-table-width">
                <tr class="index-table-content">
                  <td class="index-td-width3">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.baseRealname"></input>
                  </td>
                  <td class="index-td-width3">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.basePinyin"></input>
                  </td>
                  <td class="index-td-width3">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.baseEnglishname"></input>
                  </td>
                  <td class="index-td-width3">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.baseSex"></input>
                  </td>
                  <td class="index-td-width3">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.baseNationality"></input>
                  </td>
                </tr>
              </table>
            </div>
            <div>
              <table class="index-table-width1">
                <tr class="index-table-title">
                  <td class="index-td-width3">
                    <span>身份证号：</span>
                  </td>
                  <td class="index-td-width3">
                    <span>出生日期：</span>
                  </td>
                  <td class="index-td-width3">
                    <span>婚姻状况：</span>
                  </td>
                  <td class="index-td-width3">
                    <span>个人电话：</span>
                  </td>
                  <td class="index-td-width3">
                    <span>个人邮箱：</span>
                  </td>
                </tr>
              </table>
            </div>
            <div>
              <table class="index-table-width">
                <tr class="index-table-content">
                  <td class="index-td-width3">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.baseIdcardcode"></input>
                  </td>
                  <td class="index-td-width3">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.baseBirthdate"></input>
                  </td>
                  <td class="index-td-width3">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.baseMaritalStatus"></input>
                  </td>
                  <td class="index-td-width3">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.basePersonalphone"></input>
                  </td>
                  <td class="index-td-width3">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.basePersonalemail"></input>
                  </td>
                </tr>
              </table>
            </div>
            <div>
              <table class="index-table-width1">
                <tr class="index-table-title">
                  <td class="index-td-width3">
                    <span>职称：</span>
                  </td>
                  <td class="index-td-width3"></td>
                  <td class="index-td-width3"></td>
                  <td class="index-td-width3"></td>
                  <td class="index-td-width3"></td>
                </tr>
              </table>
            </div>
            <div>
              <table class="index-table-width">
                <tr class="index-table-content">
                  <td class="index-td-width3">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.socialZhicheng"></input>
                  </td>
                  <td class="index-td-width3"></td>
                  <td class="index-td-width3"></td>
                  <td class="index-td-width3"></td>
                  <td class="index-td-width3"></td>
                </tr>
              </table>
            </div>
            <div>
              <table class="index-table-width1">
                <tr class="index-table-title">
                  <td class="index-td-width4">
                    <span>现住地址：</span>
                  </td>
                  <td class="index-td-width3">
                    <span>紧急联系人：</span>
                  </td>
                  <td class="index-td-width3">
                    <span>紧急联系电话：</span>
                  </td>
                  <td class="index-td-width3"></td>
                </tr>
              </table>
            </div>
            <div>
              <table class="index-table-width">
                <tr class="index-table-content">
                  <td class="index-td-width4">
                    <input type="text" class="index-text-style1" readonly="readonly" v-model="personalinfo.baseNowaddress"></input>
                  </td>
                  <td class="index-td-width3">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.baseEmergencyperson"></input>
                  </td>
                  <td class="index-td-width3">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.baseEmergencyphone"></input>
                  </td>
                  <td class="index-td-width3"></td>
                </tr>
              </table>
            </div>
            <div class="index-work-title">
              <canvas class="index-flag"></canvas>
              <span class="index-content-title">教育经历</span>
            </div>
            <div>
              <table class="index-table-width1">
                <tr class="index-table-title">
                  <td class="index-td-width3">
                    <span>毕业学校：</span>
                  </td>
                  <td class="index-td-width3">
                    <span>所学专业：</span>
                  </td>
                  <td class="index-td-width3">
                    <span>所获学位：</span>
                  </td>
                  <td class="index-td-width3"></td>
                  <td class="index-td-width3"></td>
                </tr>
              </table>
            </div>
            <div>
              <table class="index-table-width">
                <tr class="index-table-content">
                  <td class="index-td-width3">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="edu.schoolname"></input>
                  </td>
                  <td class="index-td-width3">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="edu.major"></input>
                  </td>
                  <td class="index-td-width3">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="edu.degree"></input>
                  </td>
                  <td class="index-td-width3"></td>
                  <td class="index-td-width3"></td>
                </tr>
              </table>
            </div>
            <div class="index-work-title">
              <canvas class="index-flag"></canvas>
              <span class="index-content-title">企业信息</span>
            </div>
            <div>
              <table class="index-table-width1">
                <tr class="index-table-title">
                  <td class="index-td-width3">
                    <span>Account：</span>
                  </td>
                  <td class="index-td-width3">
                    <span>Project：</span>
                  </td>
                  <td class="index-td-width3">
                    <span>直接主管：</span>
                  </td>
                  <td class="index-td-width3">
                    <span>入职时间：</span>
                  </td>
                  <td class="index-td-width3">
                    <span>职级：</span>
                  </td>
                </tr>
              </table>
            </div>
            <div>
              <table class="index-table-width">
                <tr class="index-table-content">
                  <td class="index-td-width3">
                    <input type="text" class="index-text-style" readonly="readonly"></input>
                  </td>
                  <td class="index-td-width3">
                    <input type="text" class="index-text-style" readonly="readonly"></input>
                  </td>
                  <td class="index-td-width3">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="officeinfo.primaryPersonName"></input>
                  </td>
                  <td class="index-td-width3">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.epriseEnrolldate"></input>
                  </td>
                  <td class="index-td-width3">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.epriseJobband"></input>
                  </td>
                </tr>
              </table>
            </div>
            <div>
              <table class="index-table-width1">
                <tr class="index-table-title">
                  <td class="index-td-width3">
                    <span>HR Partner：</span>
                  </td>
                  <td class="index-td-width3">
                    <span>良师益友：</span>
                  </td>
                  <td class="index-td-width3">
                    <span>主要办公地点：</span>
                  </td>
                  <td class="index-td-width3">
                    <span>办公电话：</span>
                  </td>
                  <td class="index-td-width3">
                    <span>司龄（含实习）：</span>
                  </td>
                </tr>
              </table>
            </div>
            <div>
              <table class="index-table-width">
                <tr class="index-table-content">

                  <td class="index-td-width3">
                    <input type="text" class="index-text-style" readonly="readonly"></input>
                  </td>
                  <td class="index-td-width3">
                    <input type="text" class="index-text-style" readonly="readonly"></input>
                  </td>
                  <td class="index-td-width3">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.epriseWorkaddress"></input>
                  </td>
                  <td class="index-td-width3">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.epriseWorkphone"></input>
                  </td>
                  <td class="index-td-width3">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.epriseWorkage"></input>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </td>-->

        <td id="td-personalinfo2" valign="top" v-if="td_personalinfo2_show">
          <div id="personalinfo2" class="index-box">
            <ul>
              <li>
                <div>
                  <div class="index-work-title">
                    <canvas class="index-flag"></canvas>
                    <span class="index-content-title">个人信息</span>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">中文名：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.baseRealname"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">拼音：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.basePinyin"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">英文名：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.baseEnglishname"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">性别：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.baseSex"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">国籍：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.baseNationality"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">身份证号：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.baseIdcardcode"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">出生日期：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.baseBirthdate"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">婚姻状况：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.baseMaritalStatus"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">个人电话：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.basePersonalphone"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">个人邮箱：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.basePersonalemail"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">职称：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.socialZhicheng"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">现住地址：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style1" readonly="readonly" v-model="personalinfo.baseNowaddress"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">紧急联系人：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.baseEmergencyperson"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">紧急联系电话：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.baseEmergencyphone"></input>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div>
                  <div class="index-work-title2">
                    <canvas class="index-flag"></canvas>
                    <span class="index-content-title">教育经历</span>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">毕业学校：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style" readonly="readonly" v-model="edu.schoolname"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">所学专业：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style" readonly="readonly" v-model="edu.major"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">所获学位：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style" readonly="readonly" v-model="edu.degree"></input>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div>
                  <div class="index-work-title2">
                    <canvas class="index-flag"></canvas>
                    <span class="index-content-title">企业信息</span>
                  </div>
                  <!--<div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">Account：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style" readonly="readonly"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">Project：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style" readonly="readonly"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">直接主管：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style" readonly="readonly" v-model="officeinfo.primaryPersonName"></input>
                    </div>
                  </div>-->
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">部门：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style" readonly="readonly" v-model="officeinfo.name"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">负责人：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style" readonly="readonly" v-model="officeinfo.primaryPersonName"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">入职时间：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.epriseEnrolldate"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">职级：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.epriseJobband"></input>
                    </div>
                  </div>
                  <!--<div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">HR Partner：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style" readonly="readonly"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">良师益友：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style" readonly="readonly"></input>
                    </div>
                  </div>-->
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">主要办公地点：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style" readonly="readonly"  v-model="personalinfo.epriseWorkaddress"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">办公电话：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.epriseWorkphone"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">司龄（含实习）：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.epriseWorkage"></input>
                    </div>
                  </div>

                </div>
              </li>
            </ul>
          </div>
        </td>

        <td id="td-personalinfo" valign="top" v-if="td_personalinfo1_show">
          <div id="personalinfo" class="index-box">
            <ul>
              <li>
                <div>
                  <div class="index-work-title">
                    <canvas class="index-flag"></canvas>
                    <span class="index-content-title">个人信息</span>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">中文名：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style2" readonly="readonly" v-model="personalinfo.baseRealname"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">拼音：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style2" readonly="readonly" v-model="personalinfo.basePinyin"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">英文名：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style2" readonly="readonly" v-model="personalinfo.baseEnglishname"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">性别：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style2" readonly="readonly" v-model="personalinfo.baseSex"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">国籍：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style2" readonly="readonly" v-model="personalinfo.baseNationality"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">身份证号：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style2" readonly="readonly" v-model="personalinfo.baseIdcardcode"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">出生日期：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style2" readonly="readonly" v-model="personalinfo.baseBirthdate"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">婚姻状况：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style2" readonly="readonly" v-model="personalinfo.baseMaritalStatus"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">个人电话：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style2" readonly="readonly" v-model="personalinfo.basePersonalphone"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">个人邮箱：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style2" readonly="readonly" v-model="personalinfo.basePersonalemail"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">职称：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style2" readonly="readonly" v-model="personalinfo.socialZhicheng"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">现住地址：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style3" readonly="readonly" v-model="personalinfo.baseNowaddress"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">紧急联系人：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style2" readonly="readonly" v-model="personalinfo.baseEmergencyperson"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">紧急联系电话：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style2" readonly="readonly" v-model="personalinfo.baseEmergencyphone"></input>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div>
                  <div class="index-work-title2">
                    <canvas class="index-flag"></canvas>
                    <span class="index-content-title">教育经历</span>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">毕业学校：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style2" readonly="readonly" v-model="edu.schoolname"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">所学专业：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style2" readonly="readonly" v-model="edu.major"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">所获学位：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style2" readonly="readonly" v-model="edu.degree"></input>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div>
                  <div class="index-work-title2">
                    <canvas class="index-flag"></canvas>
                    <span class="index-content-title">企业信息</span>
                  </div>
                  <!--<div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">Account：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style2" readonly="readonly"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">Project：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style2" readonly="readonly"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">直接主管：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style2" readonly="readonly" v-model="officeinfo.primaryPersonName"></input>
                    </div>
                  </div>-->
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">部门：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style2" readonly="readonly" v-model="officeinfo.name"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">负责人：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style2" readonly="readonly" v-model="officeinfo.primaryPersonName"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">入职时间：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style2" readonly="readonly" v-model="personalinfo.epriseEnrolldate"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">职级：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style2" readonly="readonly" v-model="personalinfo.epriseJobband"></input>
                    </div>
                  </div>
                  <!--<div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">HR Partner：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style2" readonly="readonly"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">良师益友：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style2" readonly="readonly"></input>
                    </div>
                  </div>-->
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">主要办公地点：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style2" readonly="readonly"  v-model="personalinfo.epriseWorkaddress"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">办公电话：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style2" readonly="readonly" v-model="personalinfo.epriseWorkphone"></input>
                    </div>
                  </div>
                  <div class="index-divLayout">
                    <div class="index-title-margin">
                      <span class="index-title">司龄（含实习）：</span>
                    </div>
                    <div>
                      <input type="text" class="index-text-style2" readonly="readonly" v-model="personalinfo.epriseWorkage"></input>
                    </div>
                  </div>

                </div>
              </li>
            </ul>
          </div>
        </td>

        <!--<td id="td-personalinfo1" rowspan="2" valign="top" hidden="">
          <div id="personalinfo" class="index-box">
            <div class="index-work-title">
              <canvas class="index-flag"></canvas>
              <span class="index-content-title">个人信息</span>
            </div>
            <div>
              <table class="index-table-width1">
                <tr class="index-table-title">
                  <td class="index-td-width1">
                    <span>中文名：</span>
                  </td>
                  <td class="index-td-width1">
                    <span>拼音：</span>
                  </td>
                  <td class="index-td-width1">
                    <span>英文名：</span>
                  </td>
                  <td class="index-td-width1">
                    <span>性别：</span>
                  </td>
                </tr>
              </table>
            </div>
            <div>
              <table class="index-table-width">
                <tr class="index-table-content">
                  <td class="index-td-width1">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.baseRealname"></input>
                  </td>
                  <td class="index-td-width1">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.basePinyin"></input>
                  </td>
                  <td class="index-td-width1">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.baseEnglishname"></input>
                  </td>
                  <td class="index-td-width1">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.baseSex"></input>
                  </td>
                </tr>
              </table>
            </div>
            <div>
              <table class="index-table-width1">
                <tr class="index-table-title">
                  <td class="index-td-width1">
                    <span>国籍：</span>
                  </td>
                  <td class="index-td-width1">
                    <span>身份证号：</span>
                  </td>
                  <td class="index-td-width1">
                    <span>出生日期：</span>
                  </td>
                  <td class="index-td-width1">
                    <span>婚姻状况：</span>
                  </td>
                </tr>
              </table>
            </div>
            <div>
              <table class="index-table-width">
                <tr class="index-table-content">
                  <td class="index-td-width1">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.baseNationality"></input>
                  </td>
                  <td class="index-td-width1">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.baseIdcardcode"></input>
                  </td>
                  <td class="index-td-width1">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.baseBirthdate"></input>
                  </td>
                  <td class="index-td-width1">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.baseMaritalStatus"></input>
                  </td>
                </tr>
              </table>
            </div>
            <div>
              <table class="index-table-width1">
                <tr class="index-table-title">
                  <td class="index-td-width1">
                    <span>个人电话：</span>
                  </td>
                  <td class="index-td-width1">
                    <span>个人邮箱：</span>
                  </td>
                  <td class="index-td-width1">
                    <span>职称：</span>
                  </td>
                  <td class="index-td-width1"></td>
                </tr>
              </table>
            </div>
            <div>
              <table class="index-table-width">
                <tr class="index-table-content">
                  <td class="index-td-width1">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.basePersonalphone"></input>
                  </td>
                  <td class="index-td-width1">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.basePersonalemail"></input>
                  </td>
                  <td class="index-td-width1">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.socialZhicheng"></input>
                  </td>
                  <td class="index-td-width1"></td>
                </tr>
              </table>
            </div>
            <div>
              <table class="index-table-width1">
                <tr class="index-table-title">
                  <td class="index-td-width2">
                    <span>现住地址：</span>
                  </td>
                  <td class="index-td-width1">
                    <span>紧急联系人：</span>
                  </td>
                  <td class="index-td-width1">
                    <span>紧急联系电话：</span>
                  </td>
                  <td class="index-td-width1"></td>
                </tr>
              </table>
            </div>
            <div>
              <table class="index-table-width">
                <tr class="index-table-content">
                  <td class="index-td-width2">
                    <input type="text" class="index-text-style1" readonly="readonly" v-model="personalinfo.baseNowaddress"></input>
                  </td>
                  <td class="index-td-width1">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.baseEmergencyperson"></input>
                  </td>
                  <td class="index-td-width1">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.baseEmergencyphone"></input>
                  </td>
                  <td class="index-td-width1"></td>
                </tr>
              </table>
            </div>
            <div class="index-work-title">
              <canvas class="index-flag"></canvas>
              <span class="index-content-title">教育经历</span>
            </div>
            <div>
              <table class="index-table-width1">
                <tr class="index-table-title">
                  <td class="index-td-width1">
                    <span>毕业学校：</span>
                  </td>
                  <td class="index-td-width1">
                    <span>所学专业：</span>
                  </td>
                  <td class="index-td-width1">
                    <span>所获学位：</span>
                  </td>
                  <td class="index-td-width1"></td>
                </tr>
              </table>
            </div>
            <div>
              <table class="index-table-width">
                <tr class="index-table-content">
                  <td class="index-td-width1">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="edu.schoolname"></input>
                  </td>
                  <td class="index-td-width1">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="edu.major"></input>
                  </td>
                  <td class="index-td-width1">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="edu.degree"></input>
                  </td>
                  <td class="index-td-width1"></td>
                </tr>
              </table>
            </div>
            <div class="index-work-title">
              <canvas class="index-flag"></canvas>
              <span class="index-content-title">企业信息</span>
            </div>
            <div>
              <table class="index-table-width1">
                <tr class="index-table-title">
                  <td class="index-td-width1">
                    <span>Account：</span>
                  </td>
                  <td class="index-td-width1">
                    <span>Project：</span>
                  </td>
                  <td class="index-td-width1">
                    <span>直接主管：</span>
                  </td>
                  <td class="index-td-width1">
                    <span>入职时间：</span>
                  </td>
                </tr>
              </table>
            </div>
            <div>
              <table class="index-table-width">
                <tr class="index-table-content">
                  <td class="index-td-width1">
                    <input type="text" class="index-text-style" readonly="readonly"></input>
                  </td>
                  <td class="index-td-width1">
                    <input type="text" class="index-text-style" readonly="readonly"></input>
                  </td>
                  <td class="index-td-width1">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="officeinfo.primaryPersonName"></input>
                  </td>
                  <td class="index-td-width1">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.epriseEnrolldate"></input>
                  </td>
                </tr>
              </table>
            </div>
            <div>
              <table class="index-table-width1">
                <tr class="index-table-title">
                  <td class="index-td-width1">
                    <span>职级：</span>
                  </td>
                  <td class="index-td-width1">
                    <span>HR Partner：</span>
                  </td>
                  <td class="index-td-width1">
                    <span>良师益友：</span>
                  </td>
                  <td class="index-td-width1">
                    <span>主要办公地点：</span>
                  </td>
                </tr>
              </table>
            </div>
            <div>
              <table class="index-table-width">
                <tr class="index-table-content">
                  <td class="index-td-width1">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.epriseJobband"></input>
                  </td>
                  <td class="index-td-width1">
                    <input type="text" class="index-text-style" readonly="readonly"></input>
                  </td>
                  <td class="index-td-width1">
                    <input type="text" class="index-text-style" readonly="readonly"></input>
                  </td>
                  <td class="index-td-width1">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.epriseWorkaddress"></input>
                  </td>
                </tr>
              </table>
            </div>
            <div>
              <table class="index-table-width1">
                <tr class="index-table-title">
                  <td class="index-td-width1">
                    <span>办公电话：</span>
                  </td>
                  <td class="index-td-width1">
                    <span>司龄（含实习）：</span>
                  </td>
                  <td class="index-td-width1">
                    <span></span>
                  </td>
                  <td class="index-td-width1">
                    <span></span>
                  </td>
                </tr>
              </table>
            </div>
            <div>
              <table class="index-table-width">
                <tr class="index-table-content">
                  <td class="index-td-width1">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.epriseWorkphone"></input>
                  </td>
                  <td class="index-td-width1">
                    <input type="text" class="index-text-style" readonly="readonly" v-model="personalinfo.epriseWorkage"></input>
                  </td>
                  <td class="index-td-width1">
                    <span></span>
                  </td>
                  <td class="index-td-width1">
                    <span></span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </td>-->
        
        <td id="td-birthdayinfo" rowspan="2" valign="top" v-if="td_birthdayinfo_show">
          <div id="birthdayinfo" class="index-box" >
            <div>
              <img id="birthdayimg1" class="index-imgstyle" src="../../../static/img/staffbirthday.png"/>
            </div>
            <div class="index-birthday-text-style1">
              <span>祝：</span>
            </div>
            <div class="index-birthday-text-style">
              <span>{{personalinfo.baseRealname}}</span>
            </div>
            <div class="index-birthday-text-style">
              <span>生日快乐！</span>
            </div>
            <div>
              <img id="birthdayimg2" class="index-imgstyle" src="../../../static/img/staffbirthday2.png"/>
            </div>
          </div>
        </td>

        <td id="td-contractTip" valign="top" v-if="td_contractTip_show">
          <div id="staffBirthdayTip" class="index-box">
            <div class="index-work-title">
              <canvas class="index-flag"></canvas>
              <span class="index-content-title">员工生日提醒</span>
            </div>
            <el-tabs>
              <template v-for="item in birthdayTip">
                <el-tab-pane :label="item.tipDate">
                  <ul>
                    <template v-for="info in item.listUsertip">

                        <div class="index-birthdayTip-divstyle">
                          <span class="index-tipname">{{info.baseRealname}}</span>
                          <span class="index-tipid">{{info.staffid}}</span>
                        </div>

                    </template>
                  </ul>
                </el-tab-pane>
              </template>
            </el-tabs>
          </div>
          <div id="contractTip" class="index-box">
            <div class="index-work-title">
              <canvas class="index-flag"></canvas>
              <span class="index-content-title">合同到期提醒</span>
            </div>
            <el-tabs>
              <template v-for="item in contractTip">
                <el-tab-pane :label="item.tipDate">
                  <ul>
                    <div class="index-tipdiv">
                      <div  class="index-tipimg">
                      <img src="../../../static/img/hr.png"/>
                      </div>
                      <div  class="index-tip">
                      <span >以下员工的合同将在{{item.tipday}}天后到期</span>
                      </div>
                    </div>
                    <div class="index-scollbarstyle">
                      <template v-for="info in item.listUsertip">
                        <!--<li  class="index-tipborder" v-for="detail in item">-->
                          <div class="index-birthdayTip-divstyle">
                            <span class="index-tipname">{{info.baseRealname}}</span>
                            <span class="index-tipid">{{info.staffid}}</span>
                          </div>
                        <!--</li>-->
                      </template>
                    </div>
                  </ul>
                </el-tab-pane>
              </template>
            </el-tabs>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script src="http://cdnjs.cloudflare.com/ajax/libs/vue/1.0.18/vue.min.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
  export default {
    name:'calendar',
    data(){
      return{
        td_personalinfo1_show:false,
        td_personalinfo2_show:false,
        td_birthdayinfo_show:false,
        td_contractTip_show:false,
        work_time_show:false,
        close_time_show:false,
        small_boxs:[],
        num: 1,
        month:'Jan',
        currentDay: 1,
        currentMonth: 1,
        currentYear: 1970,
        currentWeek: 1,
        attendanceDate:'',
        days: [],
        listPersonalClockHistory:[],
        leaveDayDetail:{},
        leaveMonthSumDay:[],
        overtimeDetail:{},
        overtimeMonthSumDay:[],
        contractTip:[],
        birthdayTip:[],
        dictionaryList:[],
        personalClockHistory:{
          date:"",
          clockInTime:"",
          clockOutTime:"",
          workingHours:"",
          workingMinutes:""
        },
        personalOvertimeHistory:{
          
        },
        personalinfo: {
          baseRealname:"",
          basePinyin:"",
          baseEnglishname:"",
          baseSex:"",
          baseNationality:"",
          baseIdcardcode:"",
          baseBirthdate:"",
          baseMaritalStatus:"",
          basePersonalphone:"",
          basePersonalemail:"",
          socialZhicheng:"",
          baseNowaddress:"",
          baseEmergencyperson:"",
          baseEmergencyphone:"",
          epriseEnrolldate:"",
          epriseJobband:"",
          epriseHRPartner:"",
          epriseMentor:"",
          epriseWorkaddress:"",
          epriseWorkphone:"",
          epriseWorkage:""
        },
        edu:{
          schoolname:"",
          major:"",
          degree:"",
        },
        officeinfo:{
          primaryPersonName:"",
          name: ''
        }
      }
    },
    
    created: function () {
      this.initData(null);
      this.getInfo();
    },
    
    methods: {
      tab(index) {
        this.num = index;
      },

      initData: function(cur) {
        var date;
        if (cur) {
          date = new Date(cur);
        } else {
          date = new Date();
        }
        
        this.currentDay = date.getDate();
        this.currentYear = date.getFullYear();
        this.currentMonth = date.getMonth() + 1;
        if(this.currentMonth===1){
          this.month='Jan';
        }
        else if(this.currentMonth===2){
          this.month='Feb';
        }
        else if(this.currentMonth===3){
          this.month='Mar';
        }
        else if(this.currentMonth===4){
          this.month='Apr';
        }
        else if(this.currentMonth===5){
          this.month='May';
        }
        else if(this.currentMonth===6){
          this.month='Jun';
        }
        else if (this.currentMonth===7){
          this.month='Jul';
        }
        else if(this.currentMonth===8){
          this.month='Aug';
        }
        else if (this.currentMonth===9){
          this.month='Sep';
        }
        else if(this.currentMonth===10){
          this.month='Oct';
        }
        else if(this.currentMonth===11){
          this.month='Nov';
        }
        else if(this.currentMonth===12){
          this.month='Dec';
        }
        this.currentWeek = date.getDay(); // 1...6,0
        if (this.currentWeek == 0) {
          this.currentWeek = 7;
        }
        var str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay);
        this.days.length = 0;
        // 今天是周日，放在第一行第7个位置，前面6个
        var week;
        var dayone=new Date(this.formatDate(this.currentYear , this.currentMonth, '1'));
        week=dayone.getDay();
        for (var i = week - 1; i >= 0; i--) {
          var d = new Date(dayone);
          d.setDate(d.getDate() - i-1);
          this.days.push(d);
        }

        //请假月度
        var self=this;
        self.$api.post(self.url.leaveMonthSumDay,{applyDate:date},function(r){
          if(r.code==='ACK'){
            self.leaveMonthSumDay=r.data;
          }else{
            self.$message.error(r.message);
          }
        },function(r) {
          self.$message.error(r.message)
        }, self.url.MOCK, '', true);

        //请假详细
        var self=this;
        self.$api.post(self.url.leaveDayDetail,{applyDate:date},function(r){
          if(r.code==='ACK'){
            self.leaveDayDetail=r.data;
          }else{
            self.$message.error(r.message);
          }
        },function(r) {
          self.$message.error(r.message)
        }, self.url.MOCK, '', true);

        //加班月度
        var self=this;
        self.$api.post(self.url.overtimeMonthSumDay,{applyDate:date},function(r){
          if(r.code==='ACK'){
            console.log(r.data);
            self.overtimeMonthSumDay=r.data;
          }else{
            self.$message.error(r.message);
          }
        },function(r) {
          self.$message.error(r.message)
        }, self.url.MOCK, '', true);

        //加班详细
        var self=this;
        self.$api.post(self.url.overtimeDetail,{applyDate:date},function(r){
          if(r.code==='ACK'){
            console.log(r.data);
            self.overtimeDetail=r.data;
          }else{
            self.$message.error(r.message);
          }
        },function(r) {
          self.$message.error(r.message)
        }, self.url.MOCK, '', true);
        //考勤打卡信息
        var self=this;
        self.small_boxs.length=0;
        var now_month=date.getFullYear()+'-'+(date.getMonth() + 1);
        self.$api.get(self.url.check_in+'?month='+now_month,{},function(r){
          if(r.code==='ACK'){
            self.listPersonalClockHistory=r.data.listPersonalClockHistoryByMonthlyDto;
            for(var i =0;i<self.listPersonalClockHistory.length;i++){
              self.personalClockHistory=self.listPersonalClockHistory[i];
              if(self.personalClockHistory.clockInTime!=null ||self.personalClockHistory.clockOutTime!=null){
                self.small_boxs.push(true);
              }else{
                self.small_boxs.push(false);
              }
            }
          }else{
            self.$message.error(r.message);
          }
        },function(r) {
          self.$message.error(r.message)
        }, self.url.MOCK, '', true);

        for (var i = 1; i <= 42 - week; i++) {
          var d = new Date(dayone);
          d.setDate(d.getDate() + i-1);
          self.days.push(d);
        }
      },
      
      getInfo () {
        var self = this;
        //个人基础信息
        self.$api.get(self.url.myInfo, {}, function(r) {
          if (r.code === 'ACK') {
            self.personalinfo = r.data.adminUserDetail;
            if(self.personalinfo.epriseEnrolldate!=null){
              self.personalinfo.epriseEnrolldate=new Date(self.personalinfo.epriseEnrolldate).format('yyyy-MM-dd');
            }
            if(self.personalinfo.baseBirthdate!=null){
              self.personalinfo.baseBirthdate=new Date(self.personalinfo.baseBirthdate).format('yyyy-MM-dd');
            }
            if (r.data.adminOfficeDetail) {
              self.officeinfo=r.data.adminOfficeDetail;
            }
            if(r.data.educateDetailList.length>0){
              self.edu=r.data.educateDetailList[0];
            }
            var mydate=new Date();
            self.currentDay = mydate.getDate();
            self.currentMonth = mydate.getMonth() + 1;
            var str = self.formatDate(self.currentYear , self.currentMonth, self.currentDay);
            
            self.$api.post(self.url.dictionaryList, {}, function(r) {
              if (r.code === 'ACK') {
                self.dictionaryList = r.data;
                for(var i =0;i<self.dictionaryList.length;i++){
                  if(self.dictionaryList[i].typeCode==="baseSex" && self.dictionaryList[i].value===self.personalinfo.baseSex){
                    self.personalinfo.baseSex=self.dictionaryList[i].label;
                  }
                  if(self.dictionaryList[i].typeCode==="baseMaritalStatus" && self.dictionaryList[i].value===self.personalinfo.baseMaritalStatus){
                    self.personalinfo.baseMaritalStatus=self.dictionaryList[i].label;
                  }
                  if(self.dictionaryList[i].typeCode==="socialZhicheng" && self.dictionaryList[i].value===self.personalinfo.socialZhicheng){
                    self.personalinfo.socialZhicheng=self.dictionaryList[i].label;
                  }
                  if(self.dictionaryList[i].typeCode==="epriseJobband" && self.dictionaryList[i].value===self.personalinfo.epriseJobband){
                    self.personalinfo.epriseJobband=self.dictionaryList[i].label;
                  }
                  if(self.dictionaryList[i].typeCode==="degree" && self.dictionaryList[i].value===self.personalinfo.degree){
                    self.personalinfo.degree=self.dictionaryList[i].label;
                  }
                  if(self.dictionaryList[i].typeCode==="degree" && self.dictionaryList[i].value===self.personalinfo.degree){
                    self.personalinfo.degree=self.dictionaryList[i].label;
                  }
                }
              } else {
                self.$message.error(r.message);
              }
            }, function(r) {
              self.$message.error(r.message);
            }, self.url.MOCK, '', true);
            
            var staff_birthday=new Date(self.personalinfo.baseBirthdate).format('yyyy-MM-dd');
            if(self.contractTip.length!=0 || self.birthdayTip.length!=0){
              if((self.contractTip.length!=0 &&(self.contractTip[0].listUsertip.length>0 || self.contractTip[1].listUsertip.length>0)) || (self.birthdayTip.length!=0 && (self.birthdayTip[0].listUsertip.length>0||self.birthdayTip[1].listUsertip.length>0))){
                if(self.contractTip[0].listUsertip.length===0 && self.contractTip[1].listUsertip.length===0 && self.birthdayTip[0].listUsertip.length===1 && self.birthdayTip[0].listUsertip[0].baseRealname===self.personalinfo.baseRealname && self.birthdayTip[1].listUsertip.length===0){
                  self.td_personalinfo1_show=false;
                  self.td_personalinfo2_show=true;
                  self.td_birthdayinfo_show=true;                                                      
                  self.td_contractTip_show=false;
                }else{
                  self.td_personalinfo1_show=false;
                  self.td_personalinfo2_show=true;
                  self.td_birthdayinfo_show=false;
                  self.td_contractTip_show=true;
                }
              }else if(staff_birthday.split('-')[1]===str.split('-')[1] && staff_birthday.split('-')[2]===str.split('-')[2]) {
                self.td_personalinfo1_show=false;
                self.td_personalinfo2_show=true;
                self.td_birthdayinfo_show=true;                                                      
                self.td_contractTip_show=false;
              }else{
                self.td_personalinfo1_show=true;
                self.td_personalinfo2_show=false;
                self.td_birthdayinfo_show=false;
                self.td_contractTip_show=false;
              }
            }else if(staff_birthday.split('-')[1]===str.split('-')[1] && staff_birthday.split('-')[2]===str.split('-')[2]) {
              self.td_personalinfo1_show=false;
              self.td_personalinfo2_show=true;
              self.td_birthdayinfo_show=true;                                                      
              self.td_contractTip_show=false;
            }else{
              self.td_personalinfo1_show=true;
              self.td_personalinfo2_show=false;
              self.td_birthdayinfo_show=false;
              self.td_contractTip_show=false;
            }
          } else {
            self.$message.error(r.message);
          }
        }, function(r) {
          self.$message.error(r.message);
        }, self.url.MOCK, '', true);

        //请假月度
        var self=this;
        self.$api.post(self.url.leaveMonthSumDay,{applyDate:self.currentYear+'-'+self.currentMonth+'-'+self.currentDay},function(r){
          if(r.code==='ACK'){
            self.leaveMonthSumDay=r.data;
          }else{
            self.$message.error(r.message);
          }
        },function(r) {
          self.$message.error(r.message)
        }, self.url.MOCK, '', true);

        //请假详细
        var self=this;
        self.$api.post(self.url.leaveDayDetail,{applyDate:self.currentYear+'-'+self.currentMonth+'-'+self.currentDay},function(r){
          if(r.code==='ACK'){
            self.leaveDayDetail=r.data;
          }else{
            self.$message.error(r.message);
          }
        },function(r) {
          self.$message.error(r.message)
        }, self.url.MOCK, '', true);

        //加班月度
        var self=this;
        self.$api.post(self.url.overtimeMonthSumDay,{applyDate:self.currentYear+'-'+self.currentMonth+'-'+self.currentDay},function(r){
          if(r.code==='ACK'){
            self.overtimeMonthSumDay=r.data;
          }else{
            self.$message.error(r.message);
          }
        },function(r) {
          self.$message.error(r.message)
        }, self.url.MOCK, '', true);

        //加班详细
        var self=this;
        self.$api.post(self.url.overtimeDetail,{applyDate:self.currentYear+'-'+self.currentMonth+'-'+self.currentDay},function(r){
          if(r.code==='ACK'){
            console.log(r.data);
            self.overtimeDetail=r.data;
          }else{
            self.$message.error(r.message);
          }
        },function(r) {
          self.$message.error(r.message)
        }, self.url.MOCK, '', true);


        //考勤打卡信息
        var now_month=self.currentYear+'-'+self.currentMonth;
        self.$api.get(self.url.check_in+'?month='+now_month,{},function(r){
          if(r.code==='ACK'){
            self.listPersonalClockHistory=r.data.listPersonalClockHistoryByMonthlyDto;
            self.personalClockHistory=self.listPersonalClockHistory[self.currentDay-2];
            if(self.personalClockHistory.clockInStatus!="NORMAL"){
              self.work_time_show=true;
            }else{
              self.work_time_show=false;
            }
            if(self.personalClockHistory.clockOutStatus!="NORMAL"){
              self.close_time_show=true;
            }else{
              self.close_time_show=false;
            }
            if(self.personalClockHistory.clockInTime===null){
              self.personalClockHistory.clockInTime="上班未打卡";
            }
            if(self.personalClockHistory.clockOutTime===null){
              self.personalClockHistory.clockOutTime="下班未打卡";
            }
            self.attendanceDate=self.formatDate(self.currentYear , self.currentMonth, self.currentDay-1);
          }else{
            self.$message.error(r.message);
          }
        },function(r) {
          self.$message.error(r.message)
        }, self.url.MOCK, '', true);
        
        //合同提醒信息
        self.$api.get(self.url.contractTipUrl,{},function(r){
          if(r.code==='ACK'){
            self.contractTip=r.data;
            for(var i =0; i<self.contractTip.length ; i++){
              //var contractDate=(new Date(parseInt(self.contractTip[i].tipDate)).toLocaleString().replace(/:\d{1,2}$/,' ')).toString();
              //self.contractTip[i].tipDate=contractDate.split('/')[1]+'月'+contractDate.split('/')[2].split(' ')[0]+'日';
              self.contractTip[i].tipDate=new Date(self.contractTip[i].tipDate).format('MM月dd日');
            }
          }else{
            self.$message.error(r.message);
          }
        },function(r) {
          self.$message.error(r.message);
        }, self.url.MOCK, '', true);
        
        //生日提醒信息
        self.$api.get(self.url.birthdayTipUrl,{},function(r){
          if(r.code==='ACK'){
            self.birthdayTip=r.data;
            for(var i =0; i<self.birthdayTip.length ; i++){
              //var birthdayDate=(new Date(parseInt(self.birthdayTip[i].tipDate)).toLocaleString().replace(/:\d{1,2}$/,' ')).toString();
              //self.birthdayTip[i].tipDate=birthdayDate.split('/')[1]+'月'+birthdayDate.split('/')[2].split(' ')[0]+'日';
              self.birthdayTip[i].tipDate=new Date(self.birthdayTip[i].tipDate).format('MM月dd日');
            }
          }else{
            self.$message.error(r.message);
          }
        },function(r) {
          self.$message.error(r.message);
        }, self.url.MOCK, '', true);
      },
      
      pick: function(date) {
        //alert(this.formatDate( date.getFullYear() , date.getMonth() + 1, date.getDate()));
        var self=this;
        self.attendanceDate=self.formatDate(date.getFullYear() , date.getMonth() + 1, date.getDate());
        var now_month=date.getFullYear()+'-'+(date.getMonth() + 1);
        self.$api.get(self.url.check_in+'?month='+now_month,{},function(r){
          if(r.code==='ACK'){
            self.listPersonalClockHistory=null;
            self.personalClockHistory=null;
            self.listPersonalClockHistory=r.data.listPersonalClockHistoryByMonthlyDto;
            self.personalClockHistory=self.listPersonalClockHistory[date.getDate()-1];
            if(self.personalClockHistory.clockInStatus!="NORMAL"){
              self.work_time_show=true;
            }else{
              self.work_time_show=false;
            }
            if(self.personalClockHistory.clockOutStatus!="NORMAL"){
              self.close_time_show=true;
            }else{
              self.close_time_show=false;
            }
            if(self.personalClockHistory.clockInTime===null){
              self.personalClockHistory.clockInTime="上班未打卡";
            }
            if(self.personalClockHistory.clockOutTime===null){
              self.personalClockHistory.clockOutTime="下班未打卡";
            }
          }else{
            self.$message.error(r.message);
          }
        },function(r) {
          self.$message.error(r.message)
        }, self.url.MOCK, '', true);
      },
      
      pickPre: function(year, month) {
        // setDate(0); 上月最后一天
        // setDate(-1); 上月倒数第二天
        // setDate(dx) 参数dx为 上月最后一天的前后dx天
        var d = new Date(this.formatDate(year , month , 1));
        d.setDate(0);
        this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
      },
      
      pickNext: function(year, month) {
        var d = new Date(this.formatDate(year , month , 1));
        d.setDate(35);
        this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
        },
        
        pickYear: function(year, month) {
          alert(year + "," + month);
        },
        
        // 返回 类似 2016-01-02 格式的字符串
        formatDate: function(year,month,day){
          var y = year;
          var m = month;
          if(m<10) m = "0" + m;
          var d = day;
          if(d<10) d = "0" + d;
          return y+"-"+m+"-"+d
        },
      },
    }
</script>

<style type="text/css">
  @media screen and (min-width:1px) and (max-width:1280px) {
    /*小屏样式*/
    #personalinfo2{
      margin-left: 20px;
      width:500px;
      height: 902px;
    }
    #personalinfo{
      margin-left: 20px;
      margin-right: 20px;
      width:730px;
      height:902px;
    }
  }

  @media screen and (min-width:1281px) and (max-width:1366px) {
    #personalinfo2{
      margin-left: 20px;
      width:580px;
      height: 902px;
    }
    #personalinfo{
      margin-left: 20px;
      margin-right: 20px;
      width:820px;
      height:902px;
    }
  }

  @media screen and (min-width:1367px) and (max-width:1440px) {
    #personalinfo2{
      margin-left: 20px;
      width:650px;
      height: 902px;
    }
    #personalinfo{
      margin-left: 20px;
      margin-right: 20px;
      width:890px;
      height:902px;
    }
  }

  @media screen and (min-width:1441px) and (max-width:1600px) {
    #personalinfo2{
      margin-left: 20px;
      width:800px;
      height: 902px;
    }
    #personalinfo{
      margin-left: 20px;
      margin-right: 20px;
      width:1040px;
      height:902px;
    }
  }

  @media screen and (min-width:1661px) and (max-width:1680px) {
    #personalinfo2{
      margin-left: 20px;
      width:900px;
      height: 902px;
    }
    #personalinfo{
      margin-left: 20px;
      margin-right: 20px;
      width:1140px;
      height:902px;
    }
  }

  @media screen and (min-width:1681px) and (max-width:3000px) {
    /*大屏样式*/
    #personalinfo2{
      margin-left: 20px;
      width:1130px;
      height: 902px;
    }
    #personalinfo{
      margin-left: 20px;
      margin-right: 20px;
      width:1370px;
      height:902px;
    }
  }

  .content{
    background-color: white;
  }

  #personalinfo2 ul{
    overflow: scroll;
    height:902px;
    margin-right:8px;
  }

  #personalinfo2 li{
    list-style-type:none;
  }

  #personalinfo2 ::-webkit-scrollbar-track{
    -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.1);
    background-color: #fff;
    border-radius: 10px;
  }

  #personalinfo2 ::-webkit-scrollbar{
    width:2px;
  }

  #personalinfo2 ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #bfbfbf;
  }

  #personalinfo ul{
    overflow: scroll;
    height:902px;
    margin-right:8px;
  }

  #personalinfo li{
    list-style-type:none;
  }

  #personalinfo ::-webkit-scrollbar-track{
    -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.1);
    background-color: #fff;
    border-radius: 10px;
  }

  #personalinfo ::-webkit-scrollbar{
    width:2px;
  }

  #personalinfo ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #bfbfbf;
  }

  .index-divLayout{
    float: left;
    margin-top:20px;
  }

  .index-divLayout2{
    position:absolute;
  }

  .index-title{
    font-size: 14px;
    color: #a3abaf;
    margin-left: 20px;
  }

  .index-title-margin{
    margin-bottom: 6px;
  }

  hr{
    height:1px;
    border:none;
    border-top:1px dashed #c5c5c5;
    font-size: 14px;
    list-style-type: none;
    margin-top: 38px;
    margin-bottom: 28px;
  }

  .index-text-style{
    border: solid 1px #dde2e4;
    color: #475055;
    font-size: 16px;
    padding-left:10px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-left: 20px;
    width: 210px;
    background-color: white;
  }

  .index-text-style1{
    border: solid 1px #dde2e4;
    color: #475055;
    font-size: 16px;
    padding-left:10px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-left: 20px;
    width: 440px;
    background-color: white;
  }

  .index-text-style2{
    border: solid 1px #dde2e4;
    color: #475055;
    font-size: 16px;
    padding-left:10px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-left: 20px;
    width: 217px;
    background-color: white;
  }

  .index-text-style3{
    border: solid 1px #dde2e4;
    color: #475055;
    font-size: 16px;
    padding-left:10px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-left: 20px;
    width: 454px;
    background-color: white;
  }

  .index-box {
    -moz-box-shadow:0px 0px 14px rgba(1,41,137,0.36);
    -webkit-box-shadow:0px 0px 14px rgba(1,41,137,0.36);
    box-shadow: 0px 0px 14px rgba(1,41,137,0.36);
    padding-bottom: 36px;
  }

  .index-table-content{
    font-size: 16px;
    color: #475055;
  }

  .index-table-width{
    width: 100%;
    margin-left: 22px;
    margin-top: 18px;
  }

  .index-table-width1{
    width: 100%;
    margin-top:18px;
    margin-left: 22px;
  }

  .index-imgstyle{
    width:170px;
  }

  .index-birthday-text-style{
    text-align: center;
    font-size:24px;
    color:#475055;
  }

  .index-birthday-text-style1{
    margin-bottom: 30px;
    font-size:24px;
    color:#475055;
    text-align: center;
  }

  .index-daily-report{
    color: #787878;
    font-size: 14px;
    padding-left: 13.5px;
    padding-right: 13.5px;
    list-style-type: none;
  }

  .index-other-span{
    padding-left:6px;
    padding-right: 34px;
    font-size: 14px;
  }

  .index-ot-span{
    padding-left: 6px;
    font-size: 14px;
  }

  .index-work-title{
    padding-top: 22px;
    margin-bottom: 20px;
  }

  .index-work-title2{
    padding-top:60px;
    margin-bottom:20px;
    clear:both;
  }

  .index-content-title{
    font-size:18px;
    color:#475055;
    padding-left: 16px;
  }

  .index-groupbox-border{
    border:solid 1px #dde2e4;
    margin-left: 18px;
    margin-top:36px;
    margin-right: 14px;
    padding-bottom:10px;
    padding-top: 20px;
    padding-left: 16px;
    display: block;
  }

  .index-groupbox-title{
    font-size:14px;
    color:#475055;
    padding-left:6px;
    padding-right: 16px;
    text-align: left;
  }

  .index-groupbox-content{
    font-size: 14px;
    color: #a3abaf;
    margin-left: 6px;
  }

  .index-arrow {
    padding-left: 14px;
    padding-right: 14px;
    padding-top:12px;
    font-size: 10px;
    list-style-type: none;
  }

  .index-choose-month {
    font-size: 18px;
    padding: 14px;
  }

  .index-weekdays {
    margin-top:40px;
    margin-left: 6.5px;
    margin-right: 6.5px;
    margin-bottom: 11px;
    display: flex;
    flex-wrap: wrap;
    color: #666666;
    justify-content: space-around;
    font-size: 14px;
  }

  .index-days li {
    list-style-type: none;
    display: inline-block;
    width: 26px;
    height: 26px;
    display: flex;
    justify-content:center;
    align-items:Center;
    margin: 13px 6.5px 0 6.5px;
    font-size: 14px;
    color: #000;
  }

  .index-choose-year {
    font-size: 18px;
    padding: 14px;
  }

  .index-month ul li {
    color: white;
    font-size: 18px;
    letter-spacing: 2px;
  }

  .index-month {
    background: #66707f;
    height: 48px;
  }

  #birthdayimg2{
    margin-left: 22px;
    margin-top:112px;
    margin-right:22px;
    margin-bottom: 46px;
  }

  #birthdayimg1{
    margin-left: 22px;
    margin-right:22px;
    margin-top: 24px;
    margin-bottom: 74px;
  } 

  #staffBirthdayTip ul{
    overflow: scroll;
    height: 330px;
    margin-right: 20px;
  }

  #workinfo{
    margin-top:20px;
    width:300px;
    height: 423px;
  }

  .index-abnormal{
    margin-left: 8px;
    font-size:12px;
    color:#fb6c6c;
  }

  .index-normal{
    margin-left:8px;
    font-size:12px;
    color:#333333;
  }

  #birthdayinfo{
    margin-left: 20px;
    width: 214px;
    height: 902px;
  }

  #contractTip{
    width: 214px;
    height: 423px;
    margin-top: 20px;
    margin-left: 20px;
  }

  #staffBirthdayTip{
    width: 214px;
    height: 423px;
    margin-left: 20px;
  }

  .index-scollbarstyle{
    overflow: scroll;
    height:280px;
    margin-right: 8px;
  }

  #calendar{
    width:300px;
    height: 423px;
  }

  #daily-report-box{
    width: 10px;
    height: 10px;
    background: #20bf7a;
  }

  #day-small-box{
    width: 4px;
    height: 4px;
    background: #20bf7a;
  }

  .index-arrow-up {
    width: 0;
    height: 0;
    border-top: 10px solid #20bf7a;
    border-left: 10px solid transparent;
    margin-left: 230px;
    margin-top: -20px;
  }

  #leave-box{
    width: 10px;
    height: 10px;
    background: #ffa91f;
  }
  
  #day-leave{
    width: 4px;
    height: 4px;
    background: #ffa91f;
  }

  .index-arrow-up1 {
    width: 0;
    height: 0;
    border-top: 10px solid #ffa91f;
    border-left: 10px solid transparent;
    margin-left: 230px;
    margin-top: -20px;
  }

  #ot-box{
    width: 10px;
    height: 10px;
    background: #fb6c6c;
  }

  #day-overtime{
    width: 4px;
    height: 4px;
    background: #fb6c6c;
  }

  .index-arrow-up2 {
    width: 0;
    height: 0;
    border-top: 10px solid #fb6c6c;
    border-left: 10px solid transparent;
    margin-left: 230px;
    margin-top: -20px;
  }

  .index-tipdiv{
    background-color: #fff1db;
    margin-bottom: 20px;
    height: 22px;
  }

  .index-tipimg{
    margin-left: 4px;
    margin-right: 4px;
    padding-top: 4px;
    float: left;
  }

  .index-tip{
    font-size: 12px;
    color: #ffa91f;
    float: left;
    padding-top: 4px;
  }

  #contractTip li{
    list-style-type: none;
  }

  #contractTip ::-webkit-scrollbar-track{
    -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.1);
    background-color: #fff;
    border-radius: 10px;
  }

  #contractTip ::-webkit-scrollbar{
    width:2px;
  }

  #contractTip ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #bfbfbf;
  }

  #staffBirthdayTip ::-webkit-scrollbar-track{
    -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.1);
    background-color: #fff;
    border-radius: 10px;
  }

  #staffBirthdayTip ::-webkit-scrollbar{
    width:2px;
  }

  #staffBirthdayTip ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #bfbfbf;
  }

  .index-month ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    list-style-type: nome;
  }

  .index-year-month {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  .index-weekdays li {
    display: inline-block;
    text-align: center;
  }

  .index-days {
    padding: 0;
    background: #FFFFFF;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .index-days li .index-active {
    border-radius: 50%;
    color: #5e85e0;
  }

  .index-days li .index-other-month {
    color: #c5c5c5;
  }

  .index-days li:hover {
    background: #5f94e1;
    text-align: center;
    vertical-align:middle;
    color: #ffffff;
  }

  .index-blue-font{
    color:#5e85e0;
  }

  .index-flag{
    height: 20px;
    width: 3px;
    background:#5e85e0;
  }

  .index-td-width1{
    width: 25%;
  }

  .index-td-width2{
    width:50%;
  }

  .index-td-width3{
    width:20%;
  }

  .index-td-width4{
    width: 40px;
  }

  .index-big-table{
    width:100%;
  }

  .index-tipborder{
    border-bottom:1px solid #dde2e4;
    margin:8px 14px 8px 20px;
    list-style-type:none;
  }

  .index-birthdayTip-divstyle{
    margin-bottom:8px;
    border-bottom:1px solid #dde2e4;
    margin:8px 14px 8px 20px;
    list-style-type:none;
  }

  .index-tipname{
    font-size:14px;
    color:#475055;
  }

  .index-tipid{
    font-size:14px;
    color:#475055;
    float:right;
  }
</style>

