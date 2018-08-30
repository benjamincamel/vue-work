<template>
  <section class="app-container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 入离职管理</el-breadcrumb-item>
        <el-breadcrumb-item>入职员工管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-col :sm="12" :lg="8">
        <span class="form-fonts">姓名：</span>
        <el-input v-model="filters.name" placeholder="请输入名字" size="medium"></el-input>
      </el-col>
      <el-col :sm="12" :lg="8">
        <el-button type="primary" @click="handleFilters">查询</el-button>
      </el-col>
    </el-col>

    <!--列表-->
    <el-table :data="personalAllList" highlight-current-row ref="table" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="120">
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="120">
      </el-table-column>
      <el-table-column prop="birthday" label="生日" width="120">
      </el-table-column>
      <el-table-column prop="contactAddress" label="地址" min-width="160">
      </el-table-column>
      <el-table-column prop="identityCard" label="身份证号" min-width="160">
      </el-table-column>
      <!-- <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <!--分页-->
    <el-pagination @current-change="currentChange" :page-size="1" layout="total, prev, pager, next, jumper" :total="count">
    </el-pagination>
    <!--分页-->
  </section>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        name: '',
        pageIndex: 0, // 查询页页码
        pageSize: 1 // 查询条数
      },
      count: 0, // 数据总共数量 多少条
      showLoading: true, // 是否展示table的loading状态
      personalAllList: null
    }
  },
  methods: {
    getData(funName, param, fun) {
      // 数据请求方法
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
    handleFilters() {
      // 查询按钮事件
      this.filters.pageIndex = 0
      this.getData('personal/getList', this.filters, data => {
        this.count = data.count
        this.personalAllList = data.personalViewList
        this.tools.setLocal(this.$route.name, 'filters', this.filters)
      })
    },
    currentChange(value) {
      // 分页change方法
      // this.currentPageSize = value
      this.filters.pageIndex = value - 1
      this.getData('personal/getList', this.filters, data => {
        this.count = data.count
        this.personalAllList = data.personalViewList
      })
      this.$refs.table.bodyWrapper.scrollTop = 0
      console.log(`当前第${value}页`)
    }
  },
  // 请求数据渲染
  created() {
    if (this.tools.getLocal(this.$route.name, 'filters')) {
      this.filters = this.tools.getLocal(this.$route.name, 'filters')
      console.log(this.$route.name)
      this.filters.pageIndex = 0
      // this.dealDate = [
      //   new Date(this.dealQueryParam.startTime),
      //   new Date(this.dealQueryParam.endTime)
      // ]
      this.typesArr = this.filters.types.split(',')
    }
    // 页面展示后 第一次请求交易列表
    this.getData('personal/getList', this.filters, data => {
      this.count = data.count
      this.personalAllList = data.personalViewList
    })
  },
  beforeRouteLeave(to, from, next) {
    this.tools.setLocal(this.$route.name, 'filters', this.filters)
    next()
  },
}
</script>
