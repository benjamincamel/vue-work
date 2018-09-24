<template>
  <section class="app-container hx-container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 薪酬管理</el-breadcrumb-item>
        <el-breadcrumb-item>社保管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--查询区域-->
    <el-col :span="24" class="toolbar clearfix" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item label="姓名">
          <el-input v-model="filters.name" placeholder="姓名" clearable></el-input>
        </el-form-item>
        <el-form-item label="外派单位">
          <el-input v-model="filters.expatriateUnit" clearable></el-input>
        </el-form-item>
        <el-form-item label="考勤月份">
          <el-date-picker v-model="filters.term" type="month" format="yyyy-MM" value-format="yyyyMM" placeholder="选择考勤月份">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="handleFilters">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- 导入操作区 -->
    <div class="toolbar clearfix">
      <form id="myForm" enctype="multipart/form-data" method="post" style="float: left">
        <el-upload class="upload-demo" :modal="upload" ref="upload" action="url" :on-preview="handlePreview" :on-remove="handleURemove" :on-change="handleChange" :before-upload="beforeUpload" :auto-upload="false">
          <el-button slot="trigger" size="small">选取文件</el-button>
          <el-date-picker size="small" v-model="upload.term" type="month" format="yyyy-MM" value-format="yyyyMM" placeholder="选择上传社保月份">
          </el-date-picker>
          <el-button style="margin-left: 10px;" size="small" type="primary" @click="submitUpload">导入</el-button>
          <div slot="tip" class="el-upload__tip">只能上传excel文件，必须选择上传社保月份</div>
        </el-upload>
      </form>
    </div>
    <!--列表-->
    <el-table :data="insurList" stripe highlight-current-row ref="table" height="570" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="80">
      </el-table-column>
      <el-table-column prop="expatriateUnit" label="外派单位" width="100">
      </el-table-column>
      <el-table-column prop="term" label="账期" width="80">
      </el-table-column>
      <el-table-column prop="insuranceBeginDate" label="缴纳社保起始月份" width="160">
      </el-table-column>
      <el-table-column prop="insuranceRealDate" label="实际缴纳社保起始月份" width="160">
      </el-table-column>
      <el-table-column prop="insurancePlace" label="社保缴纳地点" width="120">
      </el-table-column>
      <el-table-column prop="socialSecurity" label="社保单位合计" width="120">
      </el-table-column>
      <el-table-column prop="agencyCompany" label="代理公司" width="100">
      </el-table-column>
      <el-table-column prop="agencyPay" label="代理费" width="100">
      </el-table-column>
      <el-table-column prop="socialSecurityPersonal" label="社保个人合计" width="120">
      </el-table-column>
      <el-table-column prop="socialSecurityTotal" label="社保小计" width="100">
      </el-table-column>
      <el-table-column prop="insurancePay" label="单位缴费合计" width="120">
      </el-table-column>
      <el-table-column prop="insurancePayPersonal" label="个人缴费合计" width="120">
      </el-table-column>
      <el-table-column prop="insurancePayTotal" label="总合计" width="100">
      </el-table-column>
      <el-table-column prop="housingBase" label="住房公积金基数" width="120">
      </el-table-column>
      <el-table-column prop="housingPay" label="住房公积金单位" width="120">
      </el-table-column>
      <el-table-column prop="housingRate" label="住房公积金单位比例" width="160">
      </el-table-column>
      <el-table-column prop="housingPayPersonal" label="住房公积金个人" width="120">
      </el-table-column>
      <el-table-column prop="housingRatePersonal" label="住房公积金个人比例" width="160">
      </el-table-column>
      <el-table-column prop="housingPayTotal" label="公积金小计缴费" width="120">
      </el-table-column>
      <el-table-column prop="birthBase" label="生育基数" width="100">
      </el-table-column>
      <el-table-column prop="birthPay" label="生育单位" width="100">
      </el-table-column>
      <el-table-column prop="birthRate" label="生育单位比例" width="120">
      </el-table-column>
      <el-table-column prop="endowmentBase" label="养老基数" width="100">
      </el-table-column>
      <el-table-column prop="endowmentPay" label="养老单位" width="100">
      </el-table-column>
      <el-table-column prop="endowmentRate" label="养老单位比例" width="120">
      </el-table-column>
      <el-table-column prop="endowmentPayPersonal" label="养老个人" width="100">
      </el-table-column>
      <el-table-column prop="endowmentRatePersonal" label="养老个人比例" width="120">
      </el-table-column>
      <el-table-column prop="medicalBase" label="医疗基数" width="100">
      </el-table-column>
      <el-table-column prop="medicalPay" label="医疗单位" width="100">
      </el-table-column>
      <el-table-column prop="medicalRate" label="医疗单位比例" width="120">
      </el-table-column>
      <el-table-column prop="medicalPayPersonal" label="医疗个人" width="100">
      </el-table-column>
      <el-table-column prop="medicalRatePersonal" label="医疗个人比例" width="120">
      </el-table-column>
      <el-table-column prop="sickBase" label="大病/残保基数" width="120">
      </el-table-column>
      <el-table-column prop="sickPay" label="大病/残保单位" width="120">
      </el-table-column>
      <el-table-column prop="sickRate" label="大病/残保单位比例" width="160">
      </el-table-column>
      <el-table-column prop="sickPayPersonal" label="大病/残保个人" width="120">
      </el-table-column>
      <el-table-column prop="sickRatePersonal" label="大病/残保个人比例" width="160">
      </el-table-column>
      <el-table-column prop="unemploymentBase" label="失业基数" width="100">
      </el-table-column>
      <el-table-column prop="unemploymentPay" label="失业单位" width="100">
      </el-table-column>
      <el-table-column prop="unemploymentRate" label="失业单位比例" width="120">
      </el-table-column>
      <el-table-column prop="unemploymentPayPersonal" label="失业个人" width="100">
      </el-table-column>
      <el-table-column prop="unemploymentRatePersonal" label="失业个人比例" width="120">
      </el-table-column>
      <el-table-column prop="workInjuryBase" label="工伤基数" width="100">
      </el-table-column>
      <el-table-column prop="workInjuryPay" label="工伤单位" width="100">
      </el-table-column>
      <el-table-column prop="workInjuryRate" label="工伤单位比例" width="120">
      </el-table-column>
      <el-table-column prop="startDate" label="结算开始时间" :formatter="dateFormat" width="120">
      </el-table-column>
      <el-table-column prop="endDate" label="结算结束时间" :formatter="dateFormat" width="120">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" :formatter="dateFormat" width="100">
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
    <!--修改社保信息-->
    <el-dialog title="修改社保信息" class="addEditDialog" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="insurInfo" ref="insurInfo">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="insurInfo.name" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="外派单位" :label-width="formLabelWidth">
          <el-input v-model="insurInfo.expatriateUnit" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="账期" :label-width="formLabelWidth">
          <el-date-picker v-model="insurInfo.term" type="month" format="yyyyMM" value-format="yyyyMM" placeholder="选择账期" :disabled="true">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="缴纳社保起始月份" :label-width="formLabelWidth">
          <el-date-picker v-model="insurInfo.insuranceBeginDate" type="date" placeholder="合同开始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合同开始日期" :label-width="formLabelWidth">
          <el-date-picker v-model="insurInfo.insuranceRealDate" type="date" placeholder="实际缴纳社保起始月份">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="社保缴纳地点" :label-width="formLabelWidth">
          <el-input v-model="insurInfo.insurancePlace" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="社保单位合计" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.socialSecurity" :min="0" :max="20000" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="社保个人合计" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.socialSecurityPersonal" :min="0" :max="20000" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="社保小计" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.socialSecurityTotal" :min="0" :max="20000" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="单位缴费合计" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.insurancePay" :min="0" :max="20000" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="个人缴费合计" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.insurancePayPersonal" :min="0" :max="20000" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="总合计" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.insurancePayTotal" :min="0" :max="20000" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="住房公积金基数" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.housingBase" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="住房公积金单位" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.housingPay" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="住房公积金单位比例" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.housingRate" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="住房公积金个人" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.housingPayPersonal" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="住房公积金个人比例" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.housingRatePersonal" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="公积金小计缴费" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.housingPayTotal" :min="0" :max="20000" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="代理公司" :label-width="formLabelWidth">
          <el-input v-model="insurInfo.agencyCompany" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="代理费" :label-width="formLabelWidth">
          <el-input v-model="insurInfo.agencyPay" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="生育基数" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.birthBase" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="生育单位" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.birthPay" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="生育单位比例" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.birthRate" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="养老基数" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.endowmentBase" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="养老单位" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.endowmentPay" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="住房公积养老单位比例金个人比例" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.endowmentRate" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="养老个人" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.endowmentPayPersonal" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="养老个人比例" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.endowmentRatePersonal" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="医疗基数" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.medicalBase" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="医疗单位" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.medicalPay" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="医疗单位比例" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.medicalRate" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="医疗个人" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.medicalPayPersonal" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="医疗个人比例" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.medicalRatePersonal" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="大病/残保基数" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.sickBase" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="大病/残保单位" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.sickPay" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="大病/残保单位比例" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.sickRate" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="大病/残保个人" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.sickPayPersonal" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="大病/残保个人比例" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.sickRatePersonal" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="失业基数" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.unemploymentBase" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="失业单位" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.unemploymentPay" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="失业单位比例" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.unemploymentRate" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="失业个人" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.unemploymentPayPersonal" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="失业个人比例" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.unemploymentRatePersonal" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="工伤基数" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.workInjuryBase" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="工伤单位" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.workInjuryPay" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="工伤单位比例" :label-width="formLabelWidth">
          <el-input-number v-model="insurInfo.workInjuryRate" :min="0" :max="20000"></el-input-number>
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
import axios from 'axios' // axios请求插件
const curax = axios.create({
  timeout: 30000, // 超时时间 10s
  baseURL: this.env ? '正式环境' : 'api'
})
export default {
  data() {
    return {
      upload: {
        term: ''
      },
      dialogVisible: false,
      formLabelWidth: '200px',
      filters: {
        // 查询页页码
        pageIndex: 0,
        // 查询条数
        pageSize: 8
      },
      insurInfo: {},
      rules: {},
      // 数据总共数量 多少条
      count: 0,
      // 是否展示table的loading状态
      showLoading: true,
      insurList: null
    }
  },
  methods: {
    // 导入
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleURemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleChange(file, fileList) {
      console.log(file)
      console.log(fileList)
    },
    beforeUpload: function(file) {
      console.log(file)
      // 这里是重点，将文件转化为formdata数据上传
      // var data = document.getElementById('upload')
      const filedata = new FormData('#myForm')
      filedata.append('filedata', file)
      filedata.append('term', this.upload.term)
      curax.post('salary/importInsuranceExcel', filedata)
        .then(
          res => {
            console.log(res)
          },
          res => {
            console.log(res)
          }
        )
      return false
    },
    dateFormat: function(row, column) {
      const date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return this.tools.dateFormat(new Date(date)).slice(0, 10)
    },
    // 数据请求方法
    getData(funName, param, fun) {
      this.showLoading = true
      this.ax
        .post(funName, param)
        .then(response => {
          // console.log(response)
          this.showLoading = false
          if (response.data.code === 0) {
            // 请求成功
            this.tools.alertInfo(this, response.data.msg)
            fun(response.data.data)
          } else {
            this.tools.alertError(this, response.data.msg)
          }
        })
        .catch(Error => {
          this.showLoading = false
          this.tools.alertError(this, '请求错误！')
        })
    },
    // 查询按钮事件
    handleFilters() {
      this.filters.pageIndex = 0
      this.getData('salary/getInsuranceDetailList', this.filters, data => {
        console.log(data)
        this.count = data.count
        this.insurList = data.salaryViewList
        this.tools.setLocal(this.$route.name, 'filters', this.filters)
      })
    },
    // 显示修改社保信息
    handleEditDialogVisible(row) {
      this.dialogVisible = true
      this.insurInfo = Object.assign({}, row)
    },
    // 修改社保信息
    handleEdit(row) {
      this.$refs.insurInfo.validate(valid => {
        if (valid) {
          this.$confirm('确认修改社保信息?', '提示', {
            closeOnClickModal: false
          })
            .then(() => {
              this.getData(
                'salary/updateInsuranceDetail',
                { insuranceDetailJsonStr: JSON.stringify(this.insurInfo) },
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
      this.getData('salary/getInsuranceDetailList', this.filters, data => {
        this.count = data.count
        this.insurList = data.salaryViewList
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
    this.getData('salary/getInsuranceDetailList', this.filters, data => {
      this.count = data.count
      this.insurList = data.salaryViewList
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
.table-expand {
  font-size: 0;
}
.table-expand label {
  width: 180px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
}
</style>
