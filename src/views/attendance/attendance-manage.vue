<template>
  <section class="app-container hx-container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 职场管理</el-breadcrumb-item>
        <el-breadcrumb-item>考勤管理</el-breadcrumb-item>
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
    <el-table :data="currentList" stripe highlight-current-row ref="table" height="570" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="term" label="年度" width="80">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="surplusAnnualLeave" label="剩余年休天数" width="120">
      </el-table-column>
      <el-table-column prop="surplusOvertimeHours" label="剩余加班小时数" width="120">
      </el-table-column>
      <el-table-column prop="annualLeaveDays" label="可休年假天数" width="120">
      </el-table-column>
      <el-table-column prop="compassionateLeaveDays" label="累计长期事假天数" width="160">
      </el-table-column>
      <el-table-column prop="sickLeaveDays" label="累计长期病假天数" width="160">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="120" :formatter="dateFormat">
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
    <!--新增/修改合同信息-->
    <el-dialog class="addEditDialog" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="checkInfo" ref="checkInfo" :rules="rules">
        <el-form-item label="年度" :label-width="formLabelWidth">
          <el-date-picker v-model="checkInfo.term" type="year" value-format="yyyy" placeholder="选择账期" :disabled="true">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="checkInfo.name" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="剩余年休天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.surplusAnnualLeave" :step=".5" :min="0" :max="20"></el-input-number>
        </el-form-item>
        <el-form-item label="剩余加班小时数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.surplusOvertimeHours" :step="1" :min="0" :max="2000"></el-input-number>
        </el-form-item>
        <el-form-item label="可休年假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.annualLeaveDays" :step=".5" :min="0" :max="20"></el-input-number>
        </el-form-item>
        <el-form-item label="累计长期事假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.compassionateLeaveDays" :step=".5" :min="0" :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="累计长期病假天数" :label-width="formLabelWidth">
          <el-input-number v-model="checkInfo.sickLeaveDays" :step=".5" :min="0" :max="100"></el-input-number>
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
      rules: {
        startDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        endDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      },
      // 数据总共数量 多少条
      count: 0,
      // 是否展示table的loading状态
      showLoading: true,
      currentList: null
    }
  },
  methods: {
    // 时间格式转换
    dateFormat: function(row, column) {
      var date = row[column.property]
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
      this.getData('checkwork/getCurrentList', this.filters, data => {
        console.log(data)
        this.count = data.count
        this.currentList = data.checkWorkDetailLists
        this.tools.setLocal(this.$route.name, 'filters', this.filters)
      })
    },
    // 显示修改考勤信息
    handleEditDialogVisible(row) {
      this.dialogStatus = 'edit'
      this.dialogVisible = true
      this.checkInfo = Object.assign({}, row)
      this.$refs.checkInfo.clearValidate()
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
                'checkwork/updateCheckWorkCurrent',
                { currentInfoJsonStr: JSON.stringify(this.checkInfo) },
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
        this.currentList = data.checkWorkDetailLists
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
