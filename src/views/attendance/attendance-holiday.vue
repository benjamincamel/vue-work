<template>
  <section class="app-container hx-container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 职场管理</el-breadcrumb-item>
        <el-breadcrumb-item>节假日管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--查询区域-->
    <el-col :span="24" class="toolbar clearfix" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item label="查询时间">
          <el-date-picker v-model="filters.startDate" type="date" value-format="yyyy-MM-dd 00:00:00" placeholder="选择日期">
          </el-date-picker>
          <span class="el-range-separator">至</span>
          <el-date-picker v-model="filters.endDate" type="date" value-format="yyyy-MM-dd 00:00:00" placeholder="选择日期">
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
    <el-table v-loading="listLoading" :data="holidayList" stripe highlight-current-row ref="table" height="570" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="type" label="日期类型" min-width="160" :formatter="workTypeFormat">
      </el-table-column>
      <el-table-column prop="curDate" label="具体日期" width="160" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="createTime" label="生成时间" width="160" :formatter="dateFormat">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="handleRemove(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination @current-change="currentChange" :page-size="filters.pageSize" background layout="total, prev, pager, next, jumper" :current-page="filters.pageIndex + 1" :total="count">
    </el-pagination>
    <!--生成节假日信息-->
    <el-dialog title="新增节假日" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="holidayInfo" ref="holidayInfo" :rules="addRules">
        <el-form-item prop="curDate" label="日期" :label-width="formLabelWidth">
          <el-date-picker v-model="holidayInfo.curDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="type" label="日期类型" :label-width="formLabelWidth">
          <el-select v-model="holidayInfo.type" clearable size="medium" placeholder="请选择日期类型">
            <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">新 增</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      formLabelWidth: '240px',
      holidayInfo: {},
      upload: {
        term: '',
        attendanceDays: ''
      },
      addRules: {
        curDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择日期类型', trigger: 'change' }
        ]
      },
      levelOptions: [
        {
          value: '1',
          label: '标记为普通工作日'
        },
        {
          value: '2',
          label: '标记为周末'
        },
        {
          value: '3',
          label: '标记为节假日'
        }
      ],
      filters: {
        // 查询页页码
        pageIndex: 0,
        // 查询条数
        pageSize: 8
      },
      // 数据总共数量 多少条
      count: 0,
      // 是否展示table的loading状态
      listLoading: true,
      holidayList: null
    }
  },
  methods: {
    // 清除验证信息
    clearValidate(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].clearValidate()
      }
    },
    // 显示新增节假日
    handleAddDialogVisible() {
      this.dialogVisible = true
      this.clearValidate('holidayInfo')
    },
    // 新增节假日信息
    handleAdd() {
      this.$refs.holidayInfo.validate(valid => {
        if (valid) {
          this.$confirm('确认新增节假日信息?', '提示', {
            closeOnClickModal: false
          })
            .then(() => {
              this.getData(
                'common/saveSettingHoliday',
                this.holidayInfo,
                data => {
                  this.tools.alertInfo(this, '新增成功！')
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
      this.getData('common/listSettingHoliday', this.filters, data => {
        console.log(data)
        this.count = data.count
        this.holidayList = data.listSettingHoliday
        this.tools.setLocal(this.$route.name, 'filters', this.filters)
      })
    },
    // 删除节假日信息
    handleRemove(id) {
      this.$confirm('是否确认删除，删除后无法恢复', '提示', {
        closeOnClickModal: false
      })
        .then(() => {
          this.getData(
            'common/deleteSettingHoliday',
            { holiDayId: id },
            data => {
              this.tools.alertInfo(this, '删除成功！')
              this.$router.go(0)
              this.handleFilters()
            }
          )
        })
        .catch()
    },
    // 工作类型数据翻译
    workTypeFormat(row, column) {
      if (row.type === 1) {
        return '标记为普通工作日'
      } else if (row.type === 2) {
        return '标记为周末'
      } else if (row.type === 3) {
        return '标记为节假日'
      }
    },
    // 分页change方法
    currentChange(value) {
      this.filters.pageIndex = value - 1
      this.getData('common/listSettingHoliday', this.filters, data => {
        this.count = data.count
        this.holidayList = data.listSettingHoliday
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
    this.getData('common/listSettingHoliday', this.filters, data => {
      this.count = data.count
      this.holidayList = data.listSettingHoliday
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
