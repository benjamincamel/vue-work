<template>
  <section class="app-container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 入离职管理</el-breadcrumb-item>
        <el-breadcrumb-item>入职管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--工具条-->
    <!-- <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUsers">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col> -->

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
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination @current-change="currentChange" :page-size="personalAllList.pageSize" layout="total, prev, pager, next, jumper" :total="count">
    </el-pagination>
    <!--分页-->
  </section>
</template>

<script>
export default {
  data() {
    return {
      personalAllList: null,
      count: null,
      showLoading: false
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
    currentChange(value) {
      // 分页change方法
      this.personalAllList.pageIndex = value - 1
      this.getData(data => {
        this.getPersonalAllList = data.personalViewList
      })
      this.$refs.table.bodyWrapper.scrollTop = 0
      console.log(`当前第${value}页`)
    }
  },
  // 请求数据渲染
  created() {
    this.getData('personal/getList', { pageSize: 20 }, data => {
      console.log(data)
      this.count = data.count
      this.pageCount = data.pageCount
      this.personalAllList = data.personalViewList
      // this.personalAllList.birthday = new Date(personalAllList.birthday)
    })
  }
}
</script>
