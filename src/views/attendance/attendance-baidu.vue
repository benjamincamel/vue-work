<template>
  <section v-loading="showLoading" class="app-container hx-container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 职场管理</el-breadcrumb-item>
        <el-breadcrumb-item>百度考勤</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--查询区域-->
    <el-col :span="24" class="toolbar clearfix" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item label="姓名">
          <el-input v-model="filters.name" placeholder="姓名" clearable></el-input>
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
      <form id="myForm" :inline="true" enctype="multipart/form-data" method="post" style="float: left">
        <el-upload class="upload-demo" :modal="upload" ref="upload" action="url" :on-preview="handlePreview" :on-remove="handleURemove" :on-change="handleChange" :before-upload="beforeUpload" :auto-upload="false">
          <el-button slot="trigger" size="small">选取文件</el-button>
          <el-date-picker size="small" v-model="upload.term" type="month" format="yyyy-MM" value-format="yyyyMM" placeholder="选择上传考勤月份">
          </el-date-picker>
          <el-input-number size="small" v-model="upload.attendanceDays" :step="1" :min="20" :max="31" label="应出勤天数"></el-input-number>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">导入</el-button>
          <div slot="tip" class="el-upload__tip">只能上传excel文件，必须选择上传考勤月份并填写应出勤天数</div>
        </el-upload>
      </form>
    </div>
    <!--列表-->
    <el-table v-loading="listLoading" :data="checkBaiduList" stripe highlight-current-row ref="table" height="570" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="term" label="考勤月份" width="80">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="100">
      </el-table-column>
      <el-table-column prop="attendanceDays" label="应出勤天数" width="120">
      </el-table-column>
      <el-table-column prop="attendanceHours" label="应出勤小时数" width="120">
      </el-table-column>
      <el-table-column prop="checkWorkHours" label="实际出勤小时数" width="120">
      </el-table-column>
      <el-table-column label="超出工时">
        <el-table-column prop="overstepHours" label="超出小时数" width="100">
        </el-table-column>
        <el-table-column prop="overstepDays" label="超出小时折算全通给我司结算为天数" width="180">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="overtimeHours" label="加班小时数" width="100">
      </el-table-column>
      <el-table-column label="加班">
        <el-table-column prop="oneHours" label="1倍核算天数" width="100">
        </el-table-column>
        <el-table-column prop="onePointFiveHours" label="1.5倍核算天数" width="120">
        </el-table-column>
        <el-table-column prop="twoHours" label="2倍核算天数" width="100">
        </el-table-column>
        <el-table-column prop="threeHours" label="3倍核算天数" width="100">
        </el-table-column>
        <el-table-column prop="overtimeSumHours" label="加班应发工资合计小时数" width="120">
        </el-table-column>
        <el-table-column prop="overtimeSettleDays" label="折算全通给我司结算为天数" width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="settlementDays" label="全通加班结算天数合计" width="100">
      </el-table-column>
      <el-table-column label="绩效">
        <el-table-column prop="meritPay" label="绩效本月应发" width="120">
        </el-table-column>
        <el-table-column prop="residualPay" label="暂估残保金" width="100">
        </el-table-column>
        <el-table-column prop="addedTax" label="增值税及附加税" width="100">
        </el-table-column>
        <el-table-column prop="settlementPay" label="合计给我司结算金额" width="100">
        </el-table-column>
        <el-table-column prop="settlementPrice" label="全通结算单价" width="100">
        </el-table-column>
        <el-table-column prop="settlementPriceDay" label="全通日结算单价" width="100">
        </el-table-column>
        <el-table-column prop="meritPayDays" label="绩效奖励金额折算为天数" width="120">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="settlementFinalDays" label="记录上报全通考勤总天数" width="120">
      </el-table-column>
      <el-table-column prop="startDate" label="考勤开始时间" width="120" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="endDate" label="考勤结束时间" width="120" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="120" :formatter="dateFormat">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="220">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEditDialogVisible(scope.row)">编辑</el-button>
          <el-button type="success" size="small" @click="handleBaiduDetails(scope.row)">查看当月出勤详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination @current-change="currentChange" :page-size="filters.pageSize" background layout="total, prev, pager, next, jumper" :current-page="filters.pageIndex + 1" :total="count">
    </el-pagination>
    <!--修改百度考勤信息-->
    <el-dialog title="修改百度考勤信息" class="addEditDialog" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="checkBaiduInfo" ref="checkBaiduInfo">
        <el-form-item label="账期" :label-width="formLabelWidth">
          <el-date-picker v-model="checkBaiduInfo.term" type="month" format="yyyyMM" value-format="yyyyMM" placeholder="选择账期" :disabled="true">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="checkBaiduInfo.name" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="应出勤小时数" :label-width="formLabelWidth">
          <el-input-number v-model="checkBaiduInfo.attendanceHours" @change="handleChangeBaiduCheck" :step="1" :min="0" :max="300"></el-input-number>
        </el-form-item>
        <el-form-item label="应出勤天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkBaiduInfo.attendanceDays" @change="handleChangeBaiduCheck" :step="1" :min="0" :max="300"></el-input-number>
        </el-form-item>
        <el-form-item label="实际出勤小时数" :label-width="formLabelWidth">
          <el-input-number v-model="checkBaiduInfo.checkWorkHours" @change="handleChangeBaiduCheck" :step="1" :min="0" :max="300"></el-input-number>
        </el-form-item>
        <el-form-item label="超出小时数" :label-width="formLabelWidth">
          <el-input-number v-model="checkBaiduInfo.overstepHours" :step="1" :min="0" :max="100" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="超出小时折算全通给我司结算为天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkBaiduInfo.overstepDays" :step="1" :min="0" :max="100" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="加班小时数" :label-width="formLabelWidth">
          <el-input-number v-model="checkBaiduInfo.overtimeHours" :step="1" :min="0" :max="300" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="1倍核算天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkBaiduInfo.oneHours" @change="handleChangeBaiduCheck" :step="1" :min="0" :max="300"></el-input-number>
        </el-form-item>
        <el-form-item label="1.5倍核算天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkBaiduInfo.onePointFiveHours" @change="handleChangeBaiduCheck" :step="1" :min="0" :max="300"></el-input-number>
        </el-form-item>
        <el-form-item label="2倍核算天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkBaiduInfo.twoHours" @change="handleChangeBaiduCheck" :step="1" :min="0" :max="300"></el-input-number>
        </el-form-item>
        <el-form-item label="3倍核算天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkBaiduInfo.threeHours" @change="handleChangeBaiduCheck" :step="1" :min="0" :max="300"></el-input-number>
        </el-form-item>
        <el-form-item label="加班应发工资合计小时数" :label-width="formLabelWidth">
          <el-input-number v-model="checkBaiduInfo.overtimeSumHours" :step="1" :min="0" :max="300" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="折算全通给我司结算为天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkBaiduInfo.overtimeSettleDays" :step="1" :min="0" :max="300" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="全通加班结算天数合计" :label-width="formLabelWidth">
          <el-input-number v-model="checkBaiduInfo.settlementDays" :step="1" :min="0" :max="300" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="绩效本月应发" :label-width="formLabelWidth">
          <el-input-number v-model="checkBaiduInfo.meritPay" @change="handleChangeBaiduCheck" :precision="2" :step="1" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="暂估残保金" :label-width="formLabelWidth">
          <el-input-number v-model="checkBaiduInfo.residualPay" :step="1" :min="0" :max="20000" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="增值税及附加税" :label-width="formLabelWidth">
          <el-input-number v-model="checkBaiduInfo.addedTax" :step="1" :min="0" :max="20000" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="合计给我司结算金额" :label-width="formLabelWidth">
          <el-input-number v-model="checkBaiduInfo.settlementPay" :step="1" :min="0" :max="20000" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="全通结算单价" :label-width="formLabelWidth">
          <el-input-number v-model="checkBaiduInfo.settlementPrice" @change="handleChangeBaiduCheck" :step="1" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="全通日结算单价" :label-width="formLabelWidth">
          <el-input-number v-model="checkBaiduInfo.settlementPriceDay" :step="1" :min="0" :max="20000" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="绩效奖励金额折算为天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkBaiduInfo.meritPayDays" :step="1" :min="0" :max="300" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="记录上报全通考勤总天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkBaiduInfo.settlementFinalDays" :step="1" :min="0" :max="300" :disabled="true"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">修 改</el-button>
      </div>
    </el-dialog>
    <!--查看百度当月考勤信息-->
    <el-dialog title="查看百度当月考勤信息" class="addEditDialog" :visible.sync="dialogDetailVisible" :close-on-click-modal="false">
      <el-header>
        <i class="fa fa-user-o"></i>
        <span>姓名: {{ detailName }} </span>
        <i class="fa fa-calendar-check-o" style="margin-left: 10px"></i>
        <span>账期: {{ detailTerm }}</span>
      </el-header>
      <el-table :data="baiduDetails" border stripe highlight-current-row ref="table" style="width: 100%;" :default-sort="{prop: 'currentDay', order: 'ascending'}">
        <el-table-column prop="currentDay" label="考勤日" sortable>
        </el-table-column>
        <el-table-column prop="type" label="白班/晚班" :formatter="typeFormat">
        </el-table-column>
        <el-table-column prop="workType" label="工作类型" :formatter="workTypeFormat">
        </el-table-column>
        <el-table-column prop="workHours" label="工作小时数">
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDetailVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
// axios请求插件
import axios from 'axios'
const curax = axios.create({
  // 超时时间 30s
  timeout: 600000,
  baseURL: this.env ? '正式环境' : 'api'
})
export default {
  data() {
    return {
      dialogVisible: false,
      dialogDetailVisible: false,
      formLabelWidth: '240px',
      detailName: '',
      detailTerm: '',
      upload: {
        term: '',
        attendanceDays: ''
      },
      filters: {
        // 查询页页码
        pageIndex: 0,
        // 查询条数
        pageSize: 8
      },
      checkBaiduInfo: {},
      // 数据总共数量 多少条
      count: 0,
      // 是否展示table的loading状态
      showLoading: true,
      listLoading: true,
      checkBaiduList: null,
      baiduDetails: null
    }
  },
  methods: {
    // 小数点余两位
    roundFun(value, n) {
      return Math.round(value * Math.pow(10, n)) / Math.pow(10, n)
    },
    // 百度考勤联动
    handleChangeBaiduCheck(value) {
      // 计算超出小时数
      this.checkBaiduInfo.overstepHours = this.checkBaiduInfo.checkWorkHours - this.checkBaiduInfo.attendanceHours
      // 计算超出小时折算全通给我司结算为天数
      this.checkBaiduInfo.overstepDays = this.checkBaiduInfo.overstepHours * 1.5 / this.checkBaiduInfo.attendanceHours * this.checkBaiduInfo.attendanceDays
      this.checkBaiduInfo.overstepDays = this.roundFun(this.checkBaiduInfo.overstepDays, 2)
      // 加班小时数
      this.checkBaiduInfo.overtimeHours = this.checkBaiduInfo.oneHours + this.checkBaiduInfo.onePointFiveHours + this.checkBaiduInfo.twoHours + this.checkBaiduInfo.threeHours
      // 计算加班应发工资合计小时数
      this.checkBaiduInfo.overtimeSumHours = this.checkBaiduInfo.oneHours + this.checkBaiduInfo.onePointFiveHours * 1.5 + this.checkBaiduInfo.twoHours * 2 + this.checkBaiduInfo.threeHours * 3
      this.checkBaiduInfo.overtimeSumHours = this.roundFun(this.checkBaiduInfo.overtimeSumHours, 2)
      // 计算折算全通给我司结算为天数
      this.checkBaiduInfo.overtimeSettleDays = this.checkBaiduInfo.overtimeSumHours / this.checkBaiduInfo.attendanceHours * this.checkBaiduInfo.attendanceDays
      this.checkBaiduInfo.overtimeSettleDays = this.roundFun(this.checkBaiduInfo.overtimeSettleDays, 2)
      // 计算全通加班结算天数合计
      this.checkBaiduInfo.settlementDays = this.checkBaiduInfo.overstepDays + this.checkBaiduInfo.overtimeSettleDays
      // 计算暂估残保金
      this.checkBaiduInfo.residualPay = this.checkBaiduInfo.meritPay * 0.017
      this.checkBaiduInfo.residualPay = this.roundFun(this.checkBaiduInfo.residualPay, 2)
      // 计算增值税及附加税
      this.checkBaiduInfo.addedTax = (this.checkBaiduInfo.meritPay + this.checkBaiduInfo.residualPay) * 0.0672
      this.checkBaiduInfo.addedTax = this.roundFun(this.checkBaiduInfo.addedTax, 2)
      // 计算合计给我司结算金额
      this.checkBaiduInfo.settlementPay = this.checkBaiduInfo.meritPay + this.checkBaiduInfo.residualPay + this.checkBaiduInfo.addedTax
      this.checkBaiduInfo.settlementPay = this.roundFun(this.checkBaiduInfo.settlementPay, 2)
      // 计算全通日结算单价
      this.checkBaiduInfo.settlementPriceDay = this.checkBaiduInfo.settlementPrice / this.checkBaiduInfo.attendanceDays
      this.checkBaiduInfo.settlementPriceDay = this.roundFun(this.checkBaiduInfo.settlementPriceDay, 2)
      // 计算绩效奖励金额折算为天数
      this.checkBaiduInfo.meritPayDays = this.checkBaiduInfo.settlementPay / this.checkBaiduInfo.settlementPriceDay
      this.checkBaiduInfo.meritPayDays = this.roundFun(this.checkBaiduInfo.meritPayDays, 2)
      // 计算记录上报全通考勤总天数
      this.checkBaiduInfo.settlementFinalDays = this.checkBaiduInfo.attendanceDays + this.checkBaiduInfo.overstepDays + this.checkBaiduInfo.overtimeSettleDays + this.checkBaiduInfo.meritPayDays
      this.checkBaiduInfo.settlementFinalDays = this.roundFun(this.checkBaiduInfo.settlementFinalDays, 2)
    },
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
      this.showLoading = true
      // 这里是重点，将文件转化为formdata数据上传
      // var data = document.getElementById('upload')
      const filedata = new FormData('#myForm')
      filedata.append('filedata', file)
      filedata.append('term', this.upload.term)
      filedata.append('attendanceDays', this.upload.attendanceDays)
      curax.post('checkwork/importBaiduExcel', filedata)
        .then(res => {
          if (res.data.code === 0) {
            // 请求成功
            this.tools.alertInfo(this, res.data.msg)
            this.handleFilters()
            // fun(res.data.data)
            this.showLoading = false
          } else {
            this.tools.alertError(this, res.data.msg)
            this.showLoading = false
          }
        })
      return false
    },
    // 时间格式转换
    dateFormat(row, column) {
      const date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return this.tools.dateFormat(new Date(date)).slice(0, 10)
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
      this.getData('checkwork/getBaiduList', this.filters, data => {
        console.log(data)
        this.count = data.count
        this.checkBaiduList = data.checkWorkBaiduLists
        this.tools.setLocal(this.$route.name, 'filters', this.filters)
      })
    },
    // 显示修改考勤信息
    handleEditDialogVisible(row) {
      this.dialogVisible = true
      this.checkBaiduInfo = Object.assign({}, row)
    },
    // 修改考勤信息
    handleEdit(row) {
      this.$refs.checkBaiduInfo.validate(valid => {
        if (valid) {
          this.$confirm('确认修改考勤信息?', '提示', {
            closeOnClickModal: false
          })
            .then(() => {
              this.getData(
                'checkwork/updateCheckWorkBaidu',
                { baiduInfoJsonStr: JSON.stringify(this.checkBaiduInfo) },
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
    // 根据ID查看百度月度出勤详情
    handleBaiduDetails(row) {
      this.getData(
        'checkwork/getCheckWorkBaiduById',
        { baiduId: row.id },
        data => {
          console.log(data)
          this.baiduDetails = data.baiduDetails
          this.detailName = data.name
          this.detailTerm = data.term
          this.dialogDetailVisible = true
        }
      )
    },
    // 白班/晚班数据翻译
    typeFormat(row, column) {
      if (row.type === 0) {
        return '白班'
      } else if (row.type === 1) {
        return '晚班'
      }
    },
    // 工作类型数据翻译
    workTypeFormat(row, column) {
      if (row.workType === 0) {
        return '正常班'
      } else if (row.workType === 1) {
        return '普通加班'
      } else if (row.workType === 2) {
        return '周末加班'
      } else if (row.workType === 3) {
        return '节假日正常班'
      } else if (row.workType === 4) {
        return '节假日加班'
      } else if (row.workType === 5) {
        return '年假'
      } else if (row.workType === 6) {
        return '病假'
      } else if (row.workType === 7) {
        return '事假'
      }
    },
    // 分页change方法
    currentChange(value) {
      this.filters.pageIndex = value - 1
      this.getData('checkwork/getBaiduList', this.filters, data => {
        this.count = data.count
        this.checkBaiduList = data.checkWorkBaiduLists
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
    this.showLoading = false
    // 页面展示后 第一次请求人员列表
    this.getData('checkwork/getBaiduList', this.filters, data => {
      this.count = data.count
      this.checkBaiduList = data.checkWorkBaiduLists
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
.hx-container .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: left;
    line-height: 60px;
    font-size: 18px;
  }
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
