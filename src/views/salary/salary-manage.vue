<template>
  <section class="app-container hx-container">
    <!-- 面包屑 -->
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 薪酬管理</el-breadcrumb-item>
        <el-breadcrumb-item>工资管理</el-breadcrumb-item>
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
        <el-form-item label="账期">
          <el-date-picker v-model="filters.term" type="month" format="yyyy-MM" value-format="yyyyMM" placeholder="选择账期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleFilters">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="handleAddDialogVisible">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table :data="salaryList" stripe highlight-current-row ref="table" height="570" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="term" label="账期" width="120">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="expatriateUnit" label="外派单位" width="120">
      </el-table-column>
      <el-table-column prop="entryTime" label="入职时间" width="120" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="probationaryPay" label="试用期工资" width="100">
      </el-table-column>
      <el-table-column prop="basePay" label="基本工资" width="100">
      </el-table-column>
      <el-table-column prop="meritPay" label="绩效工资" width="100">
      </el-table-column>
      <el-table-column prop="otherPay" label="其他工资" width="100">
      </el-table-column>
      <el-table-column prop="trafficSubsidy" label="交通补助" width="100">
      </el-table-column>
      <el-table-column prop="computerSubsidy" label="电脑补助" width="100">
      </el-table-column>
      <el-table-column prop="mealSubsidy" label="餐补" width="80">
      </el-table-column>
      <el-table-column prop="phoneSubsidy" label="话补" width="80">
      </el-table-column>
      <el-table-column prop="attendanceDeduction" label="考勤扣款" width="100">
      </el-table-column>
      <el-table-column prop="otherDeduction" label="其它扣款" width="100">
      </el-table-column>
      <el-table-column prop="shouldPay" label="本月应发工资" width="120">
      </el-table-column>
      <el-table-column prop="endowment" label="养老个人合计" width="120">
      </el-table-column>
      <el-table-column prop="medical" label="医疗个人合计" width="120">
      </el-table-column>
      <el-table-column prop="unemployment" label="失业个人合计" width="120">
      </el-table-column>
      <el-table-column prop="accumulationFund" label="公积金个人合计" width="120">
      </el-table-column>
      <el-table-column prop="insuranceDeduction" label="个人社保及公积金扣款合计" width="190">
      </el-table-column>
      <el-table-column prop="taxPay" label="报税工资" width="100">
      </el-table-column>
      <el-table-column prop="shouldTaxAmount" label="应纳税所得额" width="120">
      </el-table-column>
      <el-table-column prop="tax" label="税率" width="80">
      </el-table-column>
      <el-table-column prop="deductNumber" label="速算扣除数" width="120">
      </el-table-column>
      <el-table-column prop="incomeTax" label="代扣代缴所得税" width="120">
      </el-table-column>
      <el-table-column prop="realPay" label="实发工资" width="100">
      </el-table-column>
      <el-table-column prop="bankPay" label="招行代发" width="100">
      </el-table-column>
      <!-- <el-table-column prop="cash" label="现金" width="100">
      </el-table-column> -->
      <el-table-column prop="startDate" label="结算开始时间" width="120" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="endDate" label="结算结束时间" width="120" :formatter="dateFormat">
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
    <!--修改工资信息-->
    <el-dialog class="addEditDialog" title="修改工资" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="salaryInfo" ref="salaryInfo">
        <el-form-item label="账期" :label-width="formLabelWidth">
          <el-date-picker v-model="salaryInfo.term" type="month" format="yyyyMM" value-format="yyyyMM" placeholder="选择账期" :disabled="true">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="salaryInfo.name" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="外派单位" :label-width="formLabelWidth">
          <el-input v-model="salaryInfo.expatriateUnit" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" :label-width="formLabelWidth">
          <el-date-picker v-model="salaryInfo.entryTime" type="date" placeholder="入职时间" format="yyyy-MM-dd" :disabled="true">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="试用期工资" :label-width="formLabelWidth">
          <el-input-number v-model="salaryInfo.probationaryPay" @change="handleChangeSalary" :step="100" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="基本工资" :label-width="formLabelWidth">
          <el-input-number v-model="salaryInfo.basePay" @change="handleChangeSalary" :step="100" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="绩效工资" :label-width="formLabelWidth">
          <el-input-number v-model="salaryInfo.meritPay" @change="handleChangeSalary" :step="100" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="其他工资" :label-width="formLabelWidth">
          <el-input-number v-model="salaryInfo.otherPay" @change="handleChangeSalary" :step="100" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="交通补助" :label-width="formLabelWidth">
          <el-input-number v-model="salaryInfo.trafficSubsidy" @change="handleChangeSalary" :step="10" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="电脑补助" :label-width="formLabelWidth">
          <el-input-number v-model="salaryInfo.computerSubsidy" @change="handleChangeSalary" :step="10" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="餐补" :label-width="formLabelWidth">
          <el-input-number v-model="salaryInfo.mealSubsidy" @change="handleChangeSalary" :step="10" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="话补" :label-width="formLabelWidth">
          <el-input-number v-model="salaryInfo.phoneSubsidy" @change="handleChangeSalary" :step="10" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="考勤扣款" :label-width="formLabelWidth">
          <el-input-number v-model="salaryInfo.attendanceDeduction" @change="handleChangeSalary" :step="10" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="其它扣款" :label-width="formLabelWidth">
          <el-input-number v-model="salaryInfo.otherDeduction" @change="handleChangeSalary" :step="10" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="本月应发工资" :label-width="formLabelWidth">
          <el-input-number v-model="salaryInfo.shouldPay" :step="100" :min="0" :max="20000" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="养老个人合计" :label-width="formLabelWidth">
          <el-input-number v-model="salaryInfo.endowment" @change="handleChangeSalary" :step="10" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="医疗个人合计" :label-width="formLabelWidth">
          <el-input-number v-model="salaryInfo.medical" @change="handleChangeSalary" :step="10" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="失业个人合计" :label-width="formLabelWidth">
          <el-input-number v-model="salaryInfo.unemployment" @change="handleChangeSalary" :step="10" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="公积金个人合计" :label-width="formLabelWidth">
          <el-input-number v-model="salaryInfo.accumulationFund" @change="handleChangeSalary" :step="10" :min="0" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="个人社保及公积金扣款合计" :label-width="formLabelWidth">
          <el-input-number v-model="salaryInfo.insuranceDeduction" :step="0.1" :min="0" :max="20000" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="报税工资" :label-width="formLabelWidth">
          <el-input-number v-model="salaryInfo.taxPay" :step="0.1" :max="20000" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="应纳税所得额" :label-width="formLabelWidth">
          <el-input-number v-model="salaryInfo.shouldTaxAmount" :step="0.1" :min="0" :max="20000" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="税率" :label-width="formLabelWidth">
          <el-input-number v-model="salaryInfo.tax" :step="0.1" :min="0" :max="20000" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="速算扣除数" :label-width="formLabelWidth">
          <el-input-number v-model="salaryInfo.deductNumber" :step="0.1" :min="0" :max="20000" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="代扣代缴所得税" :label-width="formLabelWidth">
          <el-input-number v-model="salaryInfo.incomeTax" :step="0.1" :min="0" :max="20000" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="实发工资" :label-width="formLabelWidth">
          <el-input-number v-model="salaryInfo.realPay" :step="0.1" :min="0" :max="20000" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="招行代发" :label-width="formLabelWidth">
          <el-input-number v-model="salaryInfo.bankPay" :min="0" :max="20000" :disabled="true"></el-input-number>
        </el-form-item>
        <!-- <el-form-item label="现金" :label-width="formLabelWidth">
          <el-input-number v-model="salaryInfo.cash" @change="handleChangeCash" :step="100" :min="0" :max="20000"></el-input-number>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">修 改</el-button>
      </div>
    </el-dialog>
    <!--生成工资信息-->
    <el-dialog title="生成工资" :visible.sync="dialogAddVisible" :close-on-click-modal="false">
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
      dialogVisible: false,
      dialogAddVisible: false,
      dialogStatus: '',
      formLabelWidth: '180px',
      filters: {
        // 查询页页码
        pageIndex: 0,
        // 查询条数
        pageSize: 8
      },
      salaryInfo: {},
      // baseSalaryInfo: {},
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
      salaryList: null
    }
  },
  methods: {
    // 小数点余两位
    roundFun(value, n) {
      return Math.round(value * Math.pow(10, n)) / Math.pow(10, n)
    },
    // 清除验证信息
    clearValidate(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].clearValidate()
      }
    },
    // 现金发放与招行代发联动
    // handleChangeCash(value) {
    //   this.salaryInfo.bankPay = this.baseSalaryInfo.bankPay - value
    // },
    // 工资组成变更与工资联动
    handleChangeSalary(value) {
      // 计算应发工资
      this.salaryInfo.shouldPay = this.salaryInfo.probationaryPay + this.salaryInfo.basePay + this.salaryInfo.meritPay + this.salaryInfo.otherPay + this.salaryInfo.trafficSubsidy + this.salaryInfo.computerSubsidy + this.salaryInfo.mealSubsidy + this.salaryInfo.phoneSubsidy - this.salaryInfo.attendanceDeduction - this.salaryInfo.otherDeduction
      this.salaryInfo.shouldPay = this.roundFun(this.salaryInfo.shouldPay, 2)
      console.log(this.salaryInfo.shouldPay)
      // 计算个人社保及公积金扣款合计
      this.salaryInfo.insuranceDeduction = this.salaryInfo.endowment + this.salaryInfo.medical + this.salaryInfo.unemployment + this.salaryInfo.accumulationFund
      this.salaryInfo.insuranceDeduction = this.roundFun(this.salaryInfo.insuranceDeduction, 2)
      console.log(this.salaryInfo.insuranceDeduction)
      // 计算报税工资
      this.salaryInfo.taxPay = this.salaryInfo.shouldPay - this.salaryInfo.insuranceDeduction
      this.salaryInfo.taxPay = this.roundFun(this.salaryInfo.taxPay, 2)
      console.log(this.salaryInfo.taxPay)
      // 计算应纳税所得额
      this.salaryInfo.shouldTaxAmount = this.salaryInfo.taxPay - 3500
      // 计算税率
      this.salaryInfo.tax = this.salaryInfo.shouldTaxAmount > 0 && this.salaryInfo.shouldTaxAmount <= 1500 ? 0.03 : this.salaryInfo.shouldTaxAmount > 1500 && this.salaryInfo.shouldTaxAmount <= 4500 ? 0.1 : this.salaryInfo.shouldTaxAmount > 4500 && this.salaryInfo.shouldTaxAmount <= 9000 ? 0.2 : this.salaryInfo.shouldTaxAmount > 9000 ? 0.25 : 0
      console.log(this.salaryInfo.tax)
      // 根据税率返回速算扣除数
      this.salaryInfo.deductNumber = this.salaryInfo.tax === 0.03 ? 0 : this.salaryInfo.tax === 0.1 ? 105 : this.salaryInfo.tax === 0.2 ? 555 : this.salaryInfo.tax === 0.25 ? 1005 : 0
      console.log(this.salaryInfo.deductNumber)
      // 计算代扣代缴所得税
      this.salaryInfo.incomeTax = this.salaryInfo.shouldTaxAmount * this.salaryInfo.tax - this.salaryInfo.deductNumber
      this.salaryInfo.incomeTax = this.roundFun(this.salaryInfo.incomeTax, 2)
      console.log(this.salaryInfo.incomeTax)
      // 计算实发工资
      this.salaryInfo.realPay = this.salaryInfo.taxPay - this.salaryInfo.incomeTax
      // 返回银行代发
      this.salaryInfo.bankPay = this.salaryInfo.realPay
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
      this.getData('salary/getSalaryDetailList', this.filters, data => {
        console.log(data)
        this.count = data.count
        this.salaryList = data.salaryViewList
        this.tools.setLocal(this.$route.name, 'filters', this.filters)
      })
    },
    // 显示新增工资信息
    handleAddDialogVisible(row) {
      this.dialogAddVisible = true
      this.clearValidate('salaryAddInfo')
    },
    // 新增工资信息
    handleAdd() {
      this.$refs.salaryAddInfo.validate(valid => {
        if (valid) {
          this.$confirm('确认新增工资信息?', '提示', {
            closeOnClickModal: false
          })
            .then(() => {
              this.getData(
                'salary/createSalaryDetail',
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
    // 显示修改工资信息
    handleEditDialogVisible(row) {
      this.dialogVisible = true
      this.salaryInfo = Object.assign({}, row)
      // this.baseSalaryInfo = Object.assign({}, row)
      // this.handleChangeCash(0)
    },
    // 修改工资信息
    handleEdit(row) {
      this.$refs.salaryInfo.validate(valid => {
        if (valid) {
          this.$confirm('确认修改工资信息?', '提示', {
            closeOnClickModal: false
          })
            .then(() => {
              this.getData(
                'salary/updateSalaryDetail',
                { salaryDetailJsonStr: JSON.stringify(this.salaryInfo) },
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
      this.getData('salary/getSalaryDetailList', this.filters, data => {
        this.count = data.count
        this.salaryList = data.salaryViewList
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
    this.getData('salary/getSalaryDetailList', this.filters, data => {
      this.count = data.count
      this.salaryList = data.salaryViewList
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
