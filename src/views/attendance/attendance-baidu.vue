<template>
  <section class="app-container hx-container">
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
      <form id="myForm" enctype="multipart/form-data" method="post" style="float: left">
        <el-upload class="upload-demo" :modal="upload" ref="upload" action="url" :on-preview="handlePreview" :on-remove="handleURemove" :on-change="handleChange" :before-upload="beforeUpload" :auto-upload="false">
          <el-button slot="trigger" size="small">选取文件</el-button>
          <el-date-picker size="small" v-model="upload.term" type="month" format="yyyy-MM" value-format="yyyyMM" placeholder="选择上传考勤月份">
          </el-date-picker>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">导入</el-button>
          <div slot="tip" class="el-upload__tip">只能上传excel文件，必须选择上传考勤月份</div>
        </el-upload>
      </form>
    </div>
    <!--列表-->
    <el-table :data="checkBaiduList" stripe highlight-current-row ref="table" height="570" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="term" label="考勤月份" width="80">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="100">
      </el-table-column>
      <el-table-column prop="attendanceHours" label="应出勤小时数" width="100">
      </el-table-column>
      <el-table-column prop="	checkWorkHours" label="实际出勤小时数" width="100">
      </el-table-column>
      <el-table-column prop="overstepHours" label="超出小时数" width="100">
      </el-table-column>
      <el-table-column prop="overstepDays" label="超出小时折算全通给我司结算为天数" width="100">
      </el-table-column>
      <el-table-column prop="overtimeHours" label="加班小时数" width="100">
      </el-table-column>
      <el-table-column prop="oneHours" label="1倍核算天数" width="100">
      </el-table-column>
      <el-table-column prop="onePointFiveHours" label="1.5倍核算天数" width="100">
      </el-table-column>
      <el-table-column prop="twoHours" label="2倍核算天数" width="100">
      </el-table-column>
      <el-table-column prop="threeHours" label="3倍核算天数" width="100">
      </el-table-column>
      <el-table-column prop="overtimeSumHours" label="加班应发工资合计小时数" width="100">
      </el-table-column>
      <el-table-column prop="overtimeSettleDays" label="折算全通给我司结算为天数" width="100">
      </el-table-column>
      <el-table-column prop="settlementDays" label="全通加班结算天数合计" width="100">
      </el-table-column>
      <el-table-column prop="startDate" label="考勤开始时间" width="120" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="endDate" label="考勤结束时间" width="120" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="120" :formatter="dateFormat">
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
          <el-input-number v-model="checkBaiduInfo.overtimeHours" :step="1" :min="0" :max="100" :disabled="true"></el-input-number>
        </el-form-item>        
        <el-form-item label="1倍核算天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkBaiduInfo.oneHours" :step="1" :min="0" :max="100"></el-input-number>
        </el-form-item>        
        <el-form-item label="1.5倍核算天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkBaiduInfo.onePointFiveHours" :step="1" :min="0" :max="100"></el-input-number>
        </el-form-item>        
        <el-form-item label="2倍核算天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkBaiduInfo.twoHours" :step="1" :min="0" :max="100"></el-input-number>
        </el-form-item>        
        <el-form-item label="3倍核算天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkBaiduInfo.threeHours" :step="1" :min="0" :max="100"></el-input-number>
        </el-form-item>        
        <el-form-item label="加班应发工资合计小时数" :label-width="formLabelWidth">
          <el-input-number v-model="checkBaiduInfo.overtimeSumHours" :step="1" :min="0" :max="100" :disabled="true"></el-input-number>
        </el-form-item> 
        <el-form-item label="折算全通给我司结算为天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkBaiduInfo.overtimeSettleDays" :step="1" :min="0" :max="100" :disabled="true"></el-input-number>
        </el-form-item> 
        <el-form-item label="全通加班结算天数合计" :label-width="formLabelWidth">
          <el-input-number v-model="checkBaiduInfo.settlementDays" :step="1" :min="0" :max="100" :disabled="true"></el-input-number>
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
// axios请求插件
import axios from 'axios'
const curax = axios.create({
  // 超时时间 30s
  timeout: 30000,
  baseURL: this.env ? '正式环境' : 'api'
})
export default {
  data() {
    return {
      dialogVisible: true,
      formLabelWidth: '240px',
      upload: {
        term: ''
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
      checkBaiduList: null
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
      this.checkBaiduInfo.overstepDays = this.checkBaiduInfo.overstepHours * 1.5 / this.checkBaiduInfo.attendanceHours * 22
      this.checkBaiduInfo.overstepDays = this.roundFun(this.checkBaiduInfo.overstepDays, 2)
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
      // 这里是重点，将文件转化为formdata数据上传
      // var data = document.getElementById('upload')
      const filedata = new FormData('#myForm')
      filedata.append('filedata', file)
      filedata.append('term', this.upload.term)
      curax.post('checkwork/importBaiduExcel', filedata)
        .then(res => {
          if (res.data.code === 0) {
            // 请求成功
            this.tools.alertInfo(this, res.data.msg)
            this.handleFilters()
            // fun(res.data.data)
          } else {
            this.tools.alertError(this, res.data.msg)
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
                { detailInfoJsonStr: JSON.stringify(this.checkBaiduInfo) },
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
