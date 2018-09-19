<template>
  <section class="app-container hx-container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 薪酬管理</el-breadcrumb-item>
        <el-breadcrumb-item>奖惩管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--查询区域-->
    <el-col :span="24" class="toolbar clearfix" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item label="员工编号">
          <el-input v-model="filters.employeeNumber" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="filters.name" placeholder="姓名" clearable></el-input>
        </el-form-item>
        <el-form-item label="调整工资记录时间">
          <el-date-picker v-model="filters.startDate" type="date" value-format="yyyy-MM-dd 00:00:00" placeholder="选择日期">
          </el-date-picker>
          <span class="el-range-separator">至</span>
          <el-date-picker v-model="filters.endDate" type="date" value-format="yyyy-MM-dd 00:00:00" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="handleFilters">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table :data="salaryList" :row-class-name="tableRowClassName" stripe highlight-current-row ref="table" height="570" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="employeeNumber" label="员工编号" width="150">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="changeRange" label="调薪幅度" width="150">
      </el-table-column>
      <el-table-column prop="finalSalary" label="调薪后工资" width="110">
      </el-table-column>
      <el-table-column prop="reason" label="调薪原因" width="150">
      </el-table-column>
      <el-table-column prop="type" label="调薪类型" width="150" :formatter="typeFormat">
      </el-table-column>
      <el-table-column prop="createUser" label="创建人" width="110">
      </el-table-column>
      <el-table-column label="创建时间" width="120">
        <template slot-scope="scope">
          {{tools.dateFormat(new Date(scope.row.createTime)).slice(0, 10)}}
        </template>
      </el-table-column>
      <el-table-column prop="memo" label="备注" min-width="250">
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination @current-change="currentChange" :page-size="filters.pageSize" background layout="total, prev, pager, next, jumper" :current-page="filters.pageIndex + 1" :total="count">
    </el-pagination>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        // 查询页页码
        pageIndex: 0,
        // 查询条数
        pageSize: 8
      },
      typeOptions: [
        {
          value: '1',
          label: '调级别'
        },
        {
          value: '2',
          label: '调薪'
        },
        {
          value: '3',
          label: '其他'
        }
      ],
      // 数据总共数量 多少条
      count: 0,
      // 是否展示table的loading状态
      showLoading: true,
      salaryList: null
    }
  },
  methods: {
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
      this.getData('salary/getList', this.filters, data => {
        console.log(data)
        this.count = data.count
        this.salaryList = data.salaryViewList
        this.tools.setLocal(this.$route.name, 'filters', this.filters)
      })
    },
    // 分页change方法
    currentChange(value) {
      this.filters.pageIndex = value - 1
      this.getData('salary/getList', this.filters, data => {
        this.count = data.count
        this.salaryList = data.salaryViewList
        console.log(data)
      })
      this.$refs.table.bodyWrapper.scrollTop = 0
      console.log(`当前第${value}页`)
    },
    // 调薪类型数据翻译
    typeFormat(row, column) {
      if (row.type === 1) {
        return this.typeOptions[0].label
      } else if (row.type === 2) {
        return this.typeOptions[1].label
      } else if (row.type === 3) {
        return this.typeOptions[2].label
      }
    },
    // 降薪行警告背景色
    tableRowClassName({ row, rowIndex, column, columnIndex }) {
      if (row.changeRange < 0) {
        return 'warning-row'
        return coulumn[columnIndex]
      }
    }
  },
  // 请求数据渲染
  created() {
    if (this.tools.getLocal(this.$route.name, 'filters')) {
      this.filters = this.tools.getLocal(this.$route.name, 'filters')
      this.filters.pageIndex = 0
    }
    // 页面展示后 第一次请求人员列表
    this.getData('salary/getList', this.filters, data => {
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
.hx-container .el-table .warning-row td {
  background: oldlace !important;
  color: #F56C6C;
}
</style>
