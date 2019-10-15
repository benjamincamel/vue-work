<template>
  <section class="app-container hx-container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 职场管理</el-breadcrumb-item>
        <el-breadcrumb-item>年假休假加班管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--查询区域-->
    <el-col :span="24" class="toolbar clearfix" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item label="姓名">
          <el-input v-model="filters.name" placeholder="姓名" clearable></el-input>
        </el-form-item>
        <el-form-item label="年度">
          <el-date-picker v-model="filters.term" value-format="yyyy" type="year" placeholder="选择年度">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="handleFilters">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table v-loading="listLoading" :data="currentList" stripe highlight-current-row ref="table" height="570" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="term" label="年度" width="80">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="entryTime" label="入职日期" width="120" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="startDate" label="可休年假起始日期" width="140" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="endDate" label="截止日期" width="120" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="annualLeaveDays" label="当年应休年假天数" width="140">
      </el-table-column>
      <el-table-column label="实际休年假天数">
        <el-table-column prop="annualLeaveJan" label="1月底" width="120">
        </el-table-column>
        <el-table-column prop="annualLeaveFeb" label="2月底" width="120">
        </el-table-column>
        <el-table-column prop="annualLeaveMar" label="3月底" width="120">
        </el-table-column>
        <el-table-column prop="annualLeaveApr" label="4月底" width="120">
        </el-table-column>
        <el-table-column prop="annualLeaveMay" label="5月底" width="120">
        </el-table-column>
        <el-table-column prop="annualLeaveJun" label="6月底" width="120">
        </el-table-column>
        <el-table-column prop="annualLeaveJul" label="7月底" width="120">
        </el-table-column>
        <el-table-column prop="annualLeaveAug" label="8月底" width="120">
        </el-table-column>
        <el-table-column prop="annualLeaveSept" label="9月底" width="120">
        </el-table-column>
        <el-table-column prop="annualLeaveOct" label="10月底" width="120">
        </el-table-column>
        <el-table-column prop="annualLeaveNov" label="11月底" width="120">
        </el-table-column>
        <el-table-column prop="annualLeaveDec" label="12月底" width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="surplusAnnualLeave" label="当年剩余年假天数" width="140">
      </el-table-column>
      <el-table-column label="加班明细">
        <el-table-column prop="overtimeJan" label="1月" width="120">
        </el-table-column>
        <el-table-column prop="overtimeFeb" label="2月" width="120">
        </el-table-column>
        <el-table-column prop="overtimeMar" label="3月" width="120">
        </el-table-column>
        <el-table-column prop="overtimeApr" label="4月" width="120">
        </el-table-column>
        <el-table-column prop="overtimeMay" label="5月" width="120">
        </el-table-column>
        <el-table-column prop="overtimeJun" label="6月" width="120">
        </el-table-column>
        <el-table-column prop="overtimeJul" label="7月" width="120">
        </el-table-column>
        <el-table-column prop="overtimeAug" label="8月" width="120">
        </el-table-column>
        <el-table-column prop="overtimeSept" label="9月" width="120">
        </el-table-column>
        <el-table-column prop="overtimeOct" label="10月" width="120">
        </el-table-column>
        <el-table-column prop="overtimeNov" label="11月" width="120">
        </el-table-column>
        <el-table-column prop="overtimeDec" label="12月" width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="overtimeCollect" label="当年加班汇总" width="140">
      </el-table-column>
      <el-table-column prop="overtimeLastYear" label="去年剩余加班" width="140">
      </el-table-column>
      <el-table-column prop="surplusOvertimeDays" label="剩余加班天数" width="120">
      </el-table-column>
      <el-table-column label="调休明细">
        <el-table-column prop="offDutyShiftJan" label="1月" width="120">
        </el-table-column>
        <el-table-column prop="offDutyShiftFeb" label="2月" width="120">
        </el-table-column>
        <el-table-column prop="offDutyShiftMar" label="3月" width="120">
        </el-table-column>
        <el-table-column prop="offDutyShiftApr" label="4月" width="120">
        </el-table-column>
        <el-table-column prop="offDutyShiftMay" label="5月" width="120">
        </el-table-column>
        <el-table-column prop="offDutyShiftJun" label="6月" width="120">
        </el-table-column>
        <el-table-column prop="offDutyShiftJul" label="7月" width="120">
        </el-table-column>
        <el-table-column prop="offDutyShiftAug" label="8月" width="120">
        </el-table-column>
        <el-table-column prop="offDutyShiftSept" label="9月" width="120">
        </el-table-column>
        <el-table-column prop="offDutyShiftOct" label="10月" width="120">
        </el-table-column>
        <el-table-column prop="offDutyShiftNov" label="11月" width="120">
        </el-table-column>
        <el-table-column prop="offDutyShiftDec" label="12月" width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="offDutyShiftCollect" label="调休汇总" width="140">
      </el-table-column>
      <el-table-column label="请假明细">
        <el-table-column prop="leaveJan" label="1月" width="120">
        </el-table-column>
        <el-table-column prop="leaveFeb" label="2月" width="120">
        </el-table-column>
        <el-table-column prop="leaveMar" label="3月" width="120">
        </el-table-column>
        <el-table-column prop="leaveApr" label="4月" width="120">
        </el-table-column>
        <el-table-column prop="leaveMay" label="5月" width="120">
        </el-table-column>
        <el-table-column prop="leaveJun" label="6月" width="120">
        </el-table-column>
        <el-table-column prop="leaveJul" label="7月" width="120">
        </el-table-column>
        <el-table-column prop="leaveAug" label="8月" width="120">
        </el-table-column>
        <el-table-column prop="leaveSept" label="9月" width="120">
        </el-table-column>
        <el-table-column prop="leaveOct" label="10月" width="120">
        </el-table-column>
        <el-table-column prop="leaveNov" label="11月" width="120">
        </el-table-column>
        <el-table-column prop="leaveDec" label="12月" width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="surplusLeave" label="请假汇总" width="120">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="120" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" min-width="120" :formatter="dateFormat">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEditDialogVisible(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination @current-change="currentChange" :page-size="filters.pageSize" background layout="total, prev, pager, next, jumper" :current-page="filters.pageIndex + 1" :total="count">
    </el-pagination>
    <!--修改考勤信息-->
    <el-dialog title="修改考勤信息" class="addEditDialog" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="checkInfo" ref="checkInfo">
        <el-form-item label="年度" :label-width="formLabelWidth">
          <el-date-picker v-model="checkInfo.term" type="year" value-format="yyyy" placeholder="选择账期" :disabled="true">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="checkInfo.name" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" :label-width="formLabelWidth">
          <el-date-picker v-model="checkInfo.entryTime" type="date" placeholder="入职时间" format="yyyy-MM-dd" :disabled="true">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="可休年假起始日期" :label-width="formLabelWidth">
          <el-date-picker v-model="checkInfo.startDate" type="date" placeholder="入职时间" format="yyyy-MM-dd" :disabled="true">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="截止日期" :label-width="formLabelWidth">
          <el-date-picker v-model="checkInfo.endDate" type="date" placeholder="入职时间" format="yyyy-MM-dd" :disabled="true">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="当年应休年假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.annualLeaveDays" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="1月休年假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.annualLeaveJan" @change="handleChangeCheck" :step=".5" :min="0" :max="20"></el-input-number>
        </el-form-item>
        <el-form-item label="2月休年假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.annualLeaveFeb" @change="handleChangeCheck" :step=".5" :min="0" :max="20"></el-input-number>
        </el-form-item>
        <el-form-item label="3月休年假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.annualLeaveMar" @change="handleChangeCheck" :step=".5" :min="0" :max="20"></el-input-number>
        </el-form-item>
        <el-form-item label="4月休年假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.annualLeaveApr" @change="handleChangeCheck" :step=".5" :min="0" :max="20"></el-input-number>
        </el-form-item>
        <el-form-item label="5月休年假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.annualLeaveMay" @change="handleChangeCheck" :step=".5" :min="0" :max="20"></el-input-number>
        </el-form-item>
        <el-form-item label="6月休年假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.annualLeaveJun" @change="handleChangeCheck" :step=".5" :min="0" :max="20"></el-input-number>
        </el-form-item>
        <el-form-item label="7月休年假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.annualLeaveJul" @change="handleChangeCheck" :step=".5" :min="0" :max="20"></el-input-number>
        </el-form-item>
        <el-form-item label="8月休年假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.annualLeaveAug" @change="handleChangeCheck" :step=".5" :min="0" :max="20"></el-input-number>
        </el-form-item>
        <el-form-item label="9月休年假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.annualLeaveSept" @change="handleChangeCheck" :step=".5" :min="0" :max="20"></el-input-number>
        </el-form-item>
        <el-form-item label="10月休年假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.annualLeaveOct" @change="handleChangeCheck" :step=".5" :min="0" :max="20"></el-input-number>
        </el-form-item>
        <el-form-item label="11月休年假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.annualLeaveNov" @change="handleChangeCheck" :step=".5" :min="0" :max="20"></el-input-number>
        </el-form-item>
        <el-form-item label="12月休年假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.annualLeaveDec" @change="handleChangeCheck" :step=".5" :min="0" :max="20"></el-input-number>
        </el-form-item>
        <el-form-item label="当年剩余年假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.surplusAnnualLeave" :step=".5" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="1月加班天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.overtimeJan" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="2月加班天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.overtimeFeb" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="3月加班天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.overtimeMar" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="4月加班天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.overtimeApr" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="5月加班天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.overtimeMay" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="6月加班天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.overtimeJun" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="7月加班天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.overtimeJul" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="8月加班天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.overtimeAug" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="9月加班天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.overtimeSept" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="10月加班天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.overtimeOct" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="11月加班天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.overtimeNov" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="12月加班天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.overtimeDec" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="当年加班汇总" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.overtimeCollect" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="去年剩余加班" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.overtimeLastYear" @change="handleChangeCheck" :step=".5" :min="0" :max="20"></el-input-number>
        </el-form-item>
        <el-form-item label="剩余加班天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.surplusOvertimeDays" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="1月调休天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.offDutyShiftJan" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="2月调休天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.offDutyShiftFeb" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="3月调休天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.offDutyShiftMar" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="4月调休天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.offDutyShiftApr" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="5月调休天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.offDutyShiftMay" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="6月调休天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.offDutyShiftJun" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="7月调休天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.offDutyShiftJul" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="8月调休天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.offDutyShiftAug" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="9月调休天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.offDutyShiftSept" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="10月调休天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.offDutyShiftOct" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="11月调休天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.offDutyShiftNov" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="12月调休天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.offDutyShiftDec" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="调休汇总" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.offDutyShiftCollect" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="1月请假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.leaveJan" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="2月请假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.leaveFeb" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="3月请假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.leaveMar" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="4月请假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.leaveApr" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="5月请假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.leaveMay" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="6月请假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.leaveJun" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="7月请假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.leaveJul" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="8月请假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.leaveAug" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="9月请假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.leaveSept" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="10月请假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.leaveOct" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="11月请假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.leaveNov" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="12月请假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.leaveDec" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="请假汇总" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.surplusLeave" :step=".5" :min="0" :max="20" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="创建时间" :label-width="formLabelWidth">
          <el-date-picker v-model="checkInfo.createTime" type="date" placeholder="入职时间" format="yyyy-MM-dd" :disabled="true">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="更新时间" :label-width="formLabelWidth">
          <el-date-picker v-model="checkInfo.updateTime" type="date" placeholder="入职时间" format="yyyy-MM-dd" :disabled="true">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">修 改</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      formLabelWidth: '140px',
      filters: {
        // 查询页页码
        pageIndex: 0,
        // 查询条数
        pageSize: 8
      },
      checkInfo: {},
      // 数据总共数量 多少条
      count: 0,
      // 是否展示table的loading状态
      listLoading: true,
      currentList: null
    }
  },
  methods: {
    // 小数点余两位
    roundFun(value, n) {
      return Math.round(value * Math.pow(10, n)) / Math.pow(10, n)
    },
    // 时间格式转换
    dateFormat: function(row, column) {
      var date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return this.tools.dateFormat(new Date(date)).slice(0, 10)
    },
    handleChangeCheck(value) {
      // 计算当年剩余年假天数
      this.checkInfo.surplusAnnualLeave = this.checkInfo.annualLeaveDays - this.checkInfo.annualLeaveJan - this.checkInfo.annualLeaveFeb - this.checkInfo.annualLeaveMar - this.checkInfo.annualLeaveApr - this.checkInfo.annualLeaveMay - this.checkInfo.annualLeaveJun - this.checkInfo.annualLeaveJul - this.checkInfo.annualLeaveAug - this.checkInfo.annualLeaveSept - this.checkInfo.annualLeaveOct - this.checkInfo.annualLeaveNov - this.checkInfo.annualLeaveDec
      this.checkInfo.surplusAnnualLeave = this.roundFun(this.checkInfo.surplusAnnualLeave, 2)
      // 计算剩余加班
      this.checkInfo.surplusOvertimeDays = this.checkInfo.overtimeCollect + this.checkInfo.overtimeLastYear - this.checkInfo.offDutyShiftCollect
    },
    // 数据请求方法
    getData(funName, param, fun) {
      this.listLoading = true
      this.ax
        .post(funName, param)
        .then(response => {
          // console.log(response)
          this.listLoading = false
          if (response.data.code === 0) {
            // 请求成功
            this.tools.alertInfo(this, response.data.msg)
            fun(response.data.data)
          } else {
            this.tools.alertError(this, response.data.msg)
          }
        })
        .catch(Error => {
          this.listLoading = false
          this.tools.alertError(this, '请求错误！')
        })
    },
    // 查询按钮事件
    handleFilters() {
      this.filters.pageIndex = 0
      this.getData('checkwork/getCurrentList', this.filters, data => {
        console.log(data)
        this.count = data.count
        this.currentList = data.checkWorkCurrentLists
        this.tools.setLocal(this.$route.name, 'filters', this.filters)
      })
    },
    // 显示修改考勤信息
    handleEditDialogVisible(row) {
      this.dialogVisible = true
      this.checkInfo = Object.assign({}, row)
    },
    // 修改考勤信息
    handleEdit(row) {
      this.$refs.checkInfo.validate(valid => {
        if (valid) {
          this.$confirm('确认修改考勤信息?', '提示', {
            closeOnClickModal: false
          })
            .then(() => {
              this.getData(
                'checkwork/updateCheckWorkAnnualLeave',
                { annualLeaveJsonStr: JSON.stringify(this.checkInfo) },
                data => {
                  this.tools.alertInfo(this, '修改成功！')
                  this.dialogVisible = false
                  this.handleFilters()
                }
              )
            })
            .catch()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 分页change方法
    currentChange(value) {
      this.filters.pageIndex = value - 1
      this.getData('checkwork/getCurrentList', this.filters, data => {
        this.count = data.count
        this.currentList = data.checkWorkCurrentLists
        console.log(data)
      })
      this.$refs.table.bodyWrapper.scrollTop = 0
      console.log(`当前第${value}页`)
    }
  },
  // 请求数据渲染
  created() {
    if (this.tools.getLocal(this.$route.name, 'filters')) {
      this.filters = this.tools.getLocal(this.$route.name, 'filters')
      this.filters.pageIndex = 0
    }
    // 页面展示后 第一次请求人员列表
    this.getData('checkwork/getCurrentList', this.filters, data => {
      this.count = data.count
      this.currentList = data.checkWorkCurrentLists
      console.log(data)
    })
  },
  beforeRouteLeave(to, from, next) {
    this.tools.setLocal(this.$route.name, 'filters', this.filters)
    next()
  }
}
</script>

<style>
.hx-container .el-table {
  border: 1px solid rgb(235, 238, 245);
  border-bottom-width: 0;
}
.hx-container .el-pagination {
  text-align: center;
  padding: 1em 0;
  border: 1px solid rgb(235, 238, 245);
  border-top-width: 0;
}
.hx-container .el-range-separator {
  width: 10% !important;
}
.hx-container .el-checkbox {
  line-height: 3;
}
.hx-container .toolbar {
  padding: 10px 0;
}
.hx-container .addEditDialog .el-dialog__body {
  height: 60vh;
  overflow: auto;
}
</style>
