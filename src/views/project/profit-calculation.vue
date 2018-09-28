<template>
  <section class="app-container hx-container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 项目经管</el-breadcrumb-item>
        <el-breadcrumb-item>利润测算表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--查询区域-->
    <el-col :span="24" class="toolbar clearfix" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item label="姓名">
          <el-input v-model="filters.name" placeholder="姓名" clearable></el-input>
        </el-form-item>
        <el-form-item label="账期">
          <el-date-picker v-model="filters.term" type="month" format="yyyy-MM" value-format="yyyyMM" placeholder="选择账期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="handleFilters">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="handleAddDialogVisible">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table :data="profitList" stripe highlight-current-row ref="table" height="570" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="term" label="账期" width="120">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="expatriateUnit" label="外派单位" width="120">
      </el-table-column>
      <el-table-column prop="department" label="部门" width="120">
      </el-table-column>
      <el-table-column prop="workingPlace" label="工作地点" width="100">
      </el-table-column>
      <el-table-column prop="position" label="职位" width="120">
      </el-table-column>
      <el-table-column prop="level" label="级别" width="100">
      </el-table-column>
      <el-table-column prop="probationaryPay" label="试用期工资" width="100">
      </el-table-column>
      <el-table-column prop="meritPay" label="绩效工资" width="100">
      </el-table-column>
      <el-table-column prop="trafficSubsidy" label="交通补助" width="100">
      </el-table-column>
      <el-table-column prop="computerSubsidy" label="电脑补助" width="100">
      </el-table-column>
      <el-table-column prop="mealSubsidy" label="餐补" width="100">
      </el-table-column>
      <el-table-column prop="otherPay" label="其他工资" width="100">
      </el-table-column>
      <el-table-column prop="probationaryInsurance" label="试用期社保" width="100">
      </el-table-column>
      <el-table-column prop="workerPay" label="转正后薪资" width="100">
      </el-table-column>
      <el-table-column prop="socialSecurity" label="转正后社保" width="100">
      </el-table-column>
      <el-table-column prop="housingPay" label="公积金" width="100">
      </el-table-column>
      <el-table-column prop="settlementPrice" label="全通结算价" width="100">
      </el-table-column>
      <el-table-column prop="settlementDays" label="结算天数" width="100">
      </el-table-column>
      <el-table-column prop="settlementDayPrice" label="结算日单价" width="100">
      </el-table-column>
      <el-table-column prop="probationaryUnionPay" label="试用期工会经费" width="100">
      </el-table-column>
      <el-table-column prop="probationaryDisabledPay" label="试用期残疾人就业保障金" width="100">
      </el-table-column>
      <el-table-column prop="probationaryTaxPay" label="试用期增值税及附加税" width="100">
      </el-table-column>
      <el-table-column prop="unionPay" label="转正后工会经费" width="100">
      </el-table-column>
      <el-table-column prop="disabledPay" label="转正后残疾人就业保障金" width="100">
      </el-table-column>
      <el-table-column prop="taxPay" label="转正后增值税及附加税" width="100">
      </el-table-column>
      <el-table-column prop="probationaryProfit" fixed="right" label="试用期利润" width="100">
      </el-table-column>
      <el-table-column prop="probationaryProfitRate" fixed="right" label="试用期利润率" width="110">
      </el-table-column>
      <el-table-column prop="profit" fixed="right" label="转正后利润" width="100">
      </el-table-column>
      <el-table-column prop="profitRate" fixed="right" label="转正后利润率" width="110">
      </el-table-column>
      <el-table-column prop="startDate" label="结算开始时间" width="120" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="endDate" label="结算结束时间" width="120" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="120" :formatter="dateFormat">
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination @current-change="currentChange" :page-size="filters.pageSize" background layout="total, prev, pager, next, jumper" :current-page="filters.pageIndex + 1" :total="count">
    </el-pagination>
    <!--新增利润测算表明细信息-->
    <el-dialog title="新增利润测算表明细信息" :visible.sync="dialogAddVisible" :close-on-click-modal="false">
      <el-form :model="salaryAddInfo" ref="salaryAddInfo" :rules="addRules">
        <el-form-item prop="term" label="账期" :label-width="formLabelWidth">
          <el-date-picker v-model="salaryAddInfo.term" type="month" format="yyyy-MM" value-format="yyyyMM" placeholder="选择账期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">生 成</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      dialogAddVisible: false,
      formLabelWidth: '120px',
      filters: {
        // 查询页页码
        pageIndex: 0,
        // 查询条数
        pageSize: 8
      },
      salaryAddInfo: {},
      addRules: {
        term: [
          { required: true, message: '请选择账期', trigger: 'change' }
        ]
      },
      rules: {
        startDate: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        endDate: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ]
      },
      // 数据总共数量 多少条
      count: 0,
      // 是否展示table的loading状态
      showLoading: true,
      profitList: null
    }
  },
  methods: {
    // 清除验证信息
    clearValidate(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].clearValidate()
      }
    },
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
      this.getData('salary/getProfitDetailList', this.filters, data => {
        console.log(data)
        this.count = data.count
        this.profitList = data.profitViewList
        this.tools.setLocal(this.$route.name, 'filters', this.filters)
      })
    },
    // 显示新增利润测算表明细信息
    handleAddDialogVisible(row) {
      this.dialogAddVisible = true
      this.clearValidate('salaryAddInfo')
    },
    // 新增工资信息
    handleAdd() {
      this.$refs.salaryAddInfo.validate(valid => {
        if (valid) {
          this.$confirm('确认新增利润测算表明细信息?', '提示', {
            closeOnClickModal: false
          })
            .then(() => {
              this.getData(
                'salary/createProfitDetail',
                { term: this.salaryAddInfo.term },
                data => {
                  this.tools.alertInfo(this, '新增成功！')
                  this.dialogAddVisible = false
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
      this.getData('salary/getProfitDetailList', this.filters, data => {
        this.count = data.count
        this.profitList = data.profitViewList
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
    this.getData('salary/getProfitDetailList', this.filters, data => {
      this.count = data.count
      this.profitList = data.profitViewList
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
