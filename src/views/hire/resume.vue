<template>
  <section class="app-container hx-container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 招聘管理</el-breadcrumb-item>
        <el-breadcrumb-item>简历筛选</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--查询区域-->
    <el-col :span="24" class="toolbar clearfix" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item label="年龄">
          <el-input-number v-model="filters.age"></el-input-number>
        </el-form-item>
        <el-form-item label="岗位名称">
          <el-input v-model="filters.position" placeholder="岗位名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="工作年限">
          <el-input-number v-model="filters.experience" :min="0" :max="50"></el-input-number>
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
    <el-table :data="resumeList" stripe highlight-current-row ref="table" height="570" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="position" label="岗位名称" width="150">
      </el-table-column>
      <el-table-column label="面试时间" width="120">
        <template slot-scope="scope">
          {{tools.dateFormat(new Date(scope.row.interviewTime)).slice(0, 10)}}
        </template>
      </el-table-column>
      <el-table-column label="邀约时间" width="120">
        <template slot-scope="scope">
          {{tools.dateFormat(new Date(scope.row.inviteTime)).slice(0, 10)}}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="50">
      </el-table-column>
      <el-table-column label="出生日期" width="120">
        <template slot-scope="scope">
          {{tools.dateFormat(new Date(scope.row.birthday)).slice(0, 10)}}
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="联系电话" width="120">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="220">
      </el-table-column>
      <el-table-column prop="experience" label="工作年限" width="120">
      </el-table-column>
      <el-table-column prop="education" label="学历" width="120">
      </el-table-column>
      <el-table-column prop="school" label="毕业院校" width="120">
      </el-table-column>
      <el-table-column prop="major" label="专业" width="120">
      </el-table-column>
      <el-table-column label="创建时间" width="160">
        <template slot-scope="scope">
          {{tools.dateFormat(new Date(scope.row.createTime)).slice(0, 10)}}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" min-width="120" :formatter="statusFormat">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEditDialogVisible(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleRemove(scope.row)">删除</el-button>
          <el-button type="success" size="small" v-if="scope.row.status===1" @click="handlePass(scope.row)">通过</el-button>
          <el-button type="danger" size="small" v-if="scope.row.status===1" @click="handleNotPass(scope.row)">未通过</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination @current-change="currentChange" :page-size="filters.pageSize" background layout="total, prev, pager, next, jumper" :current-page="filters.pageIndex + 1" :total="count">
    </el-pagination>
    <!--新增/修改招聘需求-->
    <el-dialog class="addEditDialog" :title="textMap[dialogStatus]" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="resumeInfo" ref="resumeInfo" :rules="resumeInfoRules">
        <el-form-item prop="position" label="岗位名称" :label-width="formLabelWidth">
          <el-input v-model="resumeInfo.position" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="interviewTime" label="面试时间" :label-width="formLabelWidth">
          <el-date-picker v-model="resumeInfo.interviewTime" type="date" placeholder="面试时间" value-format="yyyy-MM-dd 00:00:00">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="inviteTime" label="邀约时间" :label-width="formLabelWidth">
          <el-date-picker v-model="resumeInfo.inviteTime" type="date" placeholder="邀约时间" value-format="yyyy-MM-dd 00:00:00">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="name" label="姓名" :label-width="formLabelWidth">
          <el-input v-model="resumeInfo.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="sex" label="性别" :label-width="formLabelWidth">
          <el-select v-model="resumeInfo.sex" size="medium">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="birthday" label="出生日期" :label-width="formLabelWidth">
          <el-date-picker v-model="resumeInfo.birthday" type="date" placeholder="出生日期" value-format="yyyy-MM-dd 00:00:00">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="phone" label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="resumeInfo.phone" maxlength="11" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="resumeInfo.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="experience" label="工作年限" :label-width="formLabelWidth">
          <el-input-number v-model="resumeInfo.experience" :min="0" :max="70"></el-input-number>
        </el-form-item>
        <el-form-item prop="education" label="学历" :label-width="formLabelWidth">
          <el-input v-model="resumeInfo.education" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="school" label="毕业院校" :label-width="formLabelWidth">
          <el-input v-model="resumeInfo.school" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="major" label="专业" :label-width="formLabelWidth">
          <el-input v-model="resumeInfo.major" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="入职状态" v-if="dialogStatus==='edit'" :label-width="formLabelWidth">
          <el-select v-model="resumeInfo.status" clearable size="medium" placeholder="请选择" disabled>
            <el-option v-for="item in statusOptions" clearable :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus==='add'" type="primary" @click="handleAdd">新 增</el-button>
        <el-button v-else type="primary" @click="handleEdit">修 改</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogStatus: '',
      passStatus: '',
      textMap: {
        edit: '修改简历',
        add: '新增简历'
      },
      formLabelWidth: '120px',
      filters: {
        age: '',
        position: '',
        experience: '',
        // 查询页页码
        pageIndex: 0,
        // 查询条数
        pageSize: 8
      },
      resumeInfo: {
        id: '',
        birthday: '',
        createTime: '',
        education: '',
        email: '',
        experience: '',
        interviewTime: '',
        inviteTime: '',
        major: '',
        name: '',
        phone: '',
        position: '',
        school: '',
        sex: '',
        status: ''
      },
      // 校验规则
      resumeInfoRules: {
        position: [
          { required: true, message: '请输入岗位名称', trigger: 'blur' }
        ],
        interviewTime: [
          { required: true, message: '请输入面试时间', trigger: 'blur' }
        ],
        inviteTime: [
          { required: true, message: '请输入邀约时间', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        birthday: [
          { required: true, message: '请输入出生日期', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value.trim() === '') {
                callback(new Error('请输入手机号码'))
              } else if (!(/^1[3456789]\d{9}$/.test(value))) {
                callback(new Error('您输入手机号码不正确'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        experience: [
          { required: true, message: '请输入工作年限', trigger: 'change' }
        ],
        education: [
          { required: true, message: '请输入学历', trigger: 'blur' }
        ],
        school: [
          { required: true, message: '请输入毕业院校', trigger: 'blur' }
        ],
        major: [
          { required: true, message: '请输入专业', trigger: 'blur' }
        ]
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
      statusOptions: [
        {
          value: '0',
          label: '未通过'
        },
        {
          value: '1',
          label: '进行中'
        },
        {
          value: '2',
          label: '面试通过'
        }
      ],
      // 数据总共数量 多少条
      count: 0,
      // 是否展示table的loading状态
      showLoading: true,
      resumeList: null
    }
  },
  methods: {
    // 清除验证信息
    clearValidate(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].clearValidate()
      }
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
      this.getData('resume/getResumeList', this.filters, data => {
        console.log(data)
        this.count = data.count
        this.resumeList = data.resumeViewList
        this.tools.setLocal(this.$route.name, 'filters', this.filters)
      })
    },
    interViewList() {
      this.$router.push({
        path: '/hire/interview'
      })
    },
    // 显示新增简历
    handleAddDialogVisible() {
      this.dialogStatus = 'add'
      this.dialogVisible = true
      this.clearValidate('resumeInfo')
      this.resumeInfo = {
        id: '',
        birthday: '',
        createTime: '',
        education: '',
        email: '',
        experience: '',
        interviewTime: '',
        inviteTime: '',
        major: '',
        name: '',
        phone: '',
        position: '',
        school: '',
        sex: '',
        status: 1
      }
      console.log(this.resumeInfo)
    },
    // 新增简历
    handleAdd() {
      this.$refs.resumeInfo.validate(valid => {
        if (valid) {
          this.$confirm('确认新增简历?', '提示', {
            closeOnClickModal: false
          })
            .then(() => {
              this.getData(
                'resume/addResumeInfo',
                { resumeInfoJsonStr: JSON.stringify(this.resumeInfo) },
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
    // 显示修改简历
    handleEditDialogVisible(row) {
      this.dialogStatus = 'edit'
      this.dialogVisible = true
      this.clearValidate('resumeInfo')
      this.resumeInfo = Object.assign({}, row)
      this.resumeInfo.status = this.statusFormat(row)
    },
    // 编辑简历
    handleEdit(row) {
      this.$refs.resumeInfo.validate(valid => {
        if (valid) {
          this.$confirm('确认修改招聘需求?', '提示', {
            closeOnClickModal: false
          })
            .then(() => {
              const myData = { ...this.resumeInfo }
              myData.status = myData.status === '未通过' ? 0 : myData.status === '进行中' ? 1 : myData.status === '面试通过' ? 2 : ''
              this.getData(
                'resume/updateResumeInfo',
                { resumeInfoJsonStr: JSON.stringify(myData) },
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
    // 更改通过状态
    handlePass(row) {
      this.$confirm('确认通过?', '提示', {
        closeOnClickModal: false
      })
        .then(() => {
          this.getData(
            'resume/updateResumePass',
            { resumeInfoId: row.id },
            data => {
              this.tools.alertInfo(this, '更改成功！')
              this.handleFilters()
            }
          )
        })
        .catch()
    },
    // 更改未通过状态
    handleNotPass(row) {
      this.$confirm('确认未通过?', '提示', {
        closeOnClickModal: false
      })
        .then(() => {
          this.getData(
            'resume/updateResumeNotPass',
            { resumeInfoId: row.id },
            data => {
              console.log(row.id)
              this.tools.alertInfo(this, '更改成功！')
              this.handleFilters()
            }
          )
        })
        .catch()
    },
    // 删除简历
    handleRemove(row) {
      this.$confirm('是否确认删除，删除后无法恢复', '提示', {
        closeOnClickModal: false
      })
        .then(() => {
          this.getData(
            'resume/deleteResumeInfo',
            { resumeInfoId: row.id },
            data => {
              this.tools.alertInfo(this, '删除成功！')
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
      this.getData('resume/getResumeList', this.filters, data => {
        this.count = data.count
        this.resumeList = data.resumeViewList
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
    this.getData('resume/getResumeList', this.filters, data => {
      this.count = data.count
      console.log(data)
      this.resumeList = data.resumeViewList
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
