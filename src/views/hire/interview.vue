<template>
  <section class="app-container hx-container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 招聘管理</el-breadcrumb-item>
        <el-breadcrumb-item>面试沟通</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--查询区域-->
    <el-col :span="24" class="toolbar clearfix" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item label="姓名">
          <el-input v-model="filters.name" placeholder="姓名" clearable></el-input>
        </el-form-item>
        <el-form-item label="岗位名称">
          <el-input v-model="filters.position" placeholder="岗位名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="外派单位">
          <el-select v-model="filters.expatriateUnit" clearable size="medium" placeholder="请选择">
            <el-option v-for="item in expatriateUnitOptions" clearable :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入职状态">
          <el-select v-model="filters.status" clearable size="medium" placeholder="请选择">
            <el-option v-for="item in statusOptions" clearable :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="handleFilters">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table :data="interViewList" stripe highlight-current-row ref="table" height="570" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="position" label="岗位名称" width="150">
      </el-table-column>
      <el-table-column prop="expatriateUnit" label="外派单位" width="150">
      </el-table-column>
      <el-table-column prop="level" label="级别" width="150">
      </el-table-column>
      <el-table-column prop="recruitChannel" label="招聘渠道" width="150">
      </el-table-column>
      <el-table-column prop="projectManager" label="项目经理" width="150">
      </el-table-column>
      <el-table-column prop="location" label="驻场位置" width="150">
      </el-table-column>
      <el-table-column prop="interviewTime" label="面试时间" width="120" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="firstCommunicateTime" label="初步沟通时间" width="120" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="finalCommunicateResult" label="初步沟通结果" width="150">
      </el-table-column>
      <el-table-column prop="finalCommunicateTime" label="最终沟通时间" width="120" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="firstCommunicateResult" label="最终沟通结果" width="150">
      </el-table-column>
      <el-table-column prop="firstTime" label="首日回访到岗情况" width="150">
      </el-table-column>
      <el-table-column prop="entryTime" label="办理入职时间" width="150" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="50">
      </el-table-column>
      <el-table-column prop="phone" label="联系电话" width="120">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="250">
      </el-table-column>
      <el-table-column prop="wantSalary" label="期望薪资" width="120">
      </el-table-column>
      <el-table-column prop="finalSalary" label="最终薪资" width="120">
      </el-table-column>
      <el-table-column prop="probationPeriod" label="试用期" width="120" :formatter="completeProbationPeriod">
      </el-table-column>
      <el-table-column prop="probationaryPay" label="试用期工资" width="120">
      </el-table-column>
      <el-table-column prop="probationPeriodWelfare" label="试用期福利" width="120">
      </el-table-column>
      <el-table-column prop="basePay" label="基本工资" width="120">
      </el-table-column>
      <el-table-column prop="insurance" label="五险" width="120">
      </el-table-column>
      <el-table-column prop="meritPay" label="绩效工资" width="120">
      </el-table-column>
      <el-table-column prop="workerWelfare" label="转正福利" width="120">
      </el-table-column>
      <el-table-column prop="subsidy" label="补贴" width="120">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="160" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="updateTime" label="修改时间" width="160" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="status" label="状态" min-width="120" :formatter="statusFormat">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="360">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEditDialogVisible(scope.row)">查看/编辑</el-button>
          <el-button type="success" size="small" v-if="scope.row.status === 1" @click="handleEntry(scope.row)">入职</el-button>
          <el-button type="danger" size="small" v-if="scope.row.status === 1" @click="handleNotEntry(scope.row)">未入职</el-button>
          <el-button type="success" size="small" v-if="scope.row.status === 2" @click="handleReEntry(scope.row)">再次入职</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination @current-change="currentChange" :page-size="filters.pageSize" background layout="total, prev, pager, next, jumper" :current-page="filters.pageIndex + 1" :total="count">
    </el-pagination>
    <!--查看/修改面试沟通-->
    <el-dialog class="addEditDialog" title="查看/修改面试沟通" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="interViewInfo">
        <el-form-item label="岗位名称" :label-width="formLabelWidth">
          <el-input v-model="interViewInfo.position" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="外派单位" :label-width="formLabelWidth">
          <el-select v-model="interViewInfo.expatriateUnit" clearable size="medium" placeholder="请选择">
            <el-option v-for="item in expatriateUnitOptions" clearable :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="级别" :label-width="formLabelWidth">
          <el-select v-model="interViewInfo.level" clearable size="medium" placeholder="请选择">
            <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="招聘渠道" :label-width="formLabelWidth">
          <el-input v-model="interViewInfo.recruitChannel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目经理" :label-width="formLabelWidth">
          <el-input v-model="interViewInfo.projectManager" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="驻场位置" :label-width="formLabelWidth">
          <el-input v-model="interViewInfo.location" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="面试时间" :label-width="formLabelWidth">
          <el-date-picker v-model="interViewInfo.interviewTime" type="date" value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" :editable="true" placeholder="面试时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="初步沟通时间" :label-width="formLabelWidth">
          <el-date-picker v-model="interViewInfo.firstCommunicateTime" type="date" value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" :editable="true" placeholder="初步沟通时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="初步沟通结果" :label-width="formLabelWidth">
          <el-input v-model="interViewInfo.finalCommunicateResult" type="textarea" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="最终沟通时间" :label-width="formLabelWidth">
          <el-date-picker v-model="interViewInfo.finalCommunicateTime" type="date" value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" :editable="true" placeholder="初步沟通时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="最终沟通结果" :label-width="formLabelWidth">
          <el-input v-model="interViewInfo.firstCommunicateResult" type="textarea" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="首日回访到岗情况" :label-width="formLabelWidth">
          <el-input v-model="interViewInfo.firstTime" type="textarea" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="办理入职时间" :label-width="formLabelWidth">
          <el-date-picker v-model="interViewInfo.entryTime" type="date" value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" :editable="true" placeholder="办理入职时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="interViewInfo.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="interViewInfo.sex" size="medium">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="interViewInfo.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="interViewInfo.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="期望薪资" :label-width="formLabelWidth">
          <el-input-number v-model="interViewInfo.wantSalary" :step="500" :min="1000" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="最终薪资" :label-width="formLabelWidth">
          <el-input-number v-model="interViewInfo.finalSalary" :step="500" :min="1000" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="试用期" :label-width="formLabelWidth">
          <el-input-number v-model="interViewInfo.probationPeriod" :min="0" :max="5"></el-input-number>
        </el-form-item>
        <el-form-item label="试用期工资" :label-width="formLabelWidth">
          <el-input-number v-model="interViewInfo.probationaryPay" :step="500" :min="1000" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="试用期福利" :label-width="formLabelWidth">
          <el-input-number v-model="interViewInfo.probationPeriodWelfare" :step="100" :min="100" :max="2000"></el-input-number>
        </el-form-item>
        <el-form-item label="基本工资" :label-width="formLabelWidth">
          <el-input-number v-model="interViewInfo.basePay" :step="500" :min="1000" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="五险" :label-width="formLabelWidth">
          <el-input v-model="interViewInfo.insurance" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="绩效工资" :label-width="formLabelWidth">
          <el-input-number v-model="interViewInfo.meritPay" :step="500" :min="1000" :max="20000"></el-input-number>
        </el-form-item>
        <el-form-item label="转正福利" :label-width="formLabelWidth">
          <el-input-number v-model="interViewInfo.workerWelfare" :step="100" :min="100" :max="2000"></el-input-number>
        </el-form-item>
        <el-form-item label="补贴" :label-width="formLabelWidth">
          <el-input-number v-model="interViewInfo.subsidy" :step="500" :min="1000" :max="2000"></el-input-number>
        </el-form-item>
        <el-form-item label="入职状态" :label-width="formLabelWidth">
          <el-select v-model="interViewInfo.status" clearable size="medium" placeholder="请选择" disabled>
            <el-option v-for="item in statusOptions" clearable :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
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
      passStatus: '',
      formLabelWidth: '130px',
      filters: {
        age: '',
        position: '',
        experience: '',
        // 查询页页码
        pageIndex: 0,
        // 查询条数
        pageSize: 8
      },
      interViewInfo: {
        status: 1
      },
      isDelOptions: [
        {
          value: '0',
          label: '未删除'
        },
        {
          value: '1',
          label: '已删除'
        }
      ],
      levelOptions: [
        {
          value: '初级',
          label: '初级'
        },
        {
          value: '中级',
          label: '中级'
        },
        {
          value: '高级',
          label: '高级'
        },
        {
          value: '高级+',
          label: '高级+'
        }
      ],
      expatriateUnitOptions: [
        {
          value: '全通',
          label: '全通'
        },
        {
          value: '北京物联网',
          label: '北京物联网'
        },
        {
          value: '成都物联网',
          label: '成都物联网'
        },
        {
          value: '重庆物联网',
          label: '重庆物联网'
        },
        {
          value: '百度',
          label: '百度'
        }
      ],
      statusOptions: [
        {
          value: '0',
          label: '未入职'
        },
        {
          value: '1',
          label: '待入职'
        },
        {
          value: '2',
          label: '已入职'
        }
      ],
      // 数据总共数量 多少条
      count: 0,
      // 是否展示table的loading状态
      showLoading: true,
      interViewList: null
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
    // 试用期加单位“月”
    completeProbationPeriod(row, column) {
      if (row.probationPeriod === undefined) {
        return ''
      }
      return ` ${row.probationPeriod}月 `
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
      this.getData('resume/getInterViewList', this.filters, data => {
        console.log(data)
        this.count = data.count
        this.interViewList = data.interviewLists
        this.tools.setLocal(this.$route.name, 'filters', this.filters)
      })
    },
    // 显示查看/修改面试沟通
    handleEditDialogVisible(row) {
      this.dialogVisible = true
      this.interViewInfo = Object.assign({}, row)
      this.interViewInfo.status = this.statusFormat(row)
    },
    // 编辑面试沟通
    handleEdit(row) {
      this.$confirm('确认修改招聘需求?', '提示', {
        closeOnClickModal: false
      })
        .then(() => {
          const myData = { ...this.interViewInfo }
          myData.status = myData.status === '未入职' ? 0 : myData.status === '待入职' ? 1 : myData.status === '已入职' ? 2 : ''
          this.getData(
            'resume/updateResumeInterview',
            { resumeInterviewJsonStr: JSON.stringify(myData) },
            data => {
              this.tools.alertInfo(this, '修改成功！')
              this.dialogVisible = false
              this.handleFilters()
            }
          )
        })
        .catch()
    },
    // 入职
    handleEntry(row) {
      this.$confirm('确认已入职?', '提示', {
        closeOnClickModal: false
      })
        .then(() => {
          this.getData(
            'resume/updateInterviewEntry',
            { resumeInterviewId: row.id },
            data => {
              this.tools.alertInfo(this, '入职成功！')
              this.handleFilters()
              console.log(data)
              localStorage.interViewData = JSON.stringify(data)
              this.$router.push({
                name: 'addEdit',
                paramas: {
                  pageType: 0
                }
              })
            }
          )
        })
        .catch()
    },
    // 再次办理入职
    handleReEntry(row) {
      this.$confirm('确认再次入职?', '提示', {
        closeOnClickModal: false
      })
        .then(() => {
          this.getData(
            'resume/updateInterviewReEntry',
            { resumeInterviewId: row.id },
            data => {
              this.tools.alertInfo(this, '再次入职成功！')
              this.handleFilters()
              console.log(data)
              localStorage.interViewData = JSON.stringify(data)
              this.$router.push({
                name: 'addEdit',
                paramas: {
                  pageType: 0
                }
              })
            }
          )
        })
        .catch()
    },
    // 未入职
    handleNotEntry(row) {
      this.$confirm('确认未入职?', '提示', {
        closeOnClickModal: false
      })
        .then(() => {
          this.getData(
            'resume/updateInterviewNotEntry',
            { resumeInterviewId: row.id },
            data => {
              this.tools.alertInfo(this, '更改成功！')
              this.handleFilters()
            }
          )
        })
        .catch()
    },
    // 状态数据翻译
    statusFormat(row, column) {
      if (row.status === 0) {
        return this.statusOptions[0].label
      } else if (row.status === 1) {
        return this.statusOptions[1].label
      } else if (row.status === 2) {
        return this.statusOptions[2].label
      }
    },
    // 分页change方法
    currentChange(value) {
      this.filters.pageIndex = value - 1
      this.getData('resume/getInterViewList', this.filters, data => {
        this.count = data.count
        this.interViewList = data.interviewLists
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
    this.getData('resume/getInterViewList', this.filters, data => {
      this.count = data.count
      console.log(data)
      this.interViewList = data.interviewLists
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
