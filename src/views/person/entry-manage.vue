<template>
  <section class="app-container hx-container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 入离职管理</el-breadcrumb-item>
        <el-breadcrumb-item>入职员工管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--查询区域-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item label="员工编号">
          <el-input v-model="filters.employeeNumber" placeholder="员工编号"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker v-model="filters.birthdayStartDate" type="date" value-format="yyyy-MM-dd 00:00:00" placeholder="选择日期">
          </el-date-picker>
          <span class="el-range-separator">至</span>
          <el-date-picker v-model="filters.birthdayEndDate" type="date" value-format="yyyy-MM-dd 00:00:00" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="filters.position" placeholder="职位"></el-input>
        </el-form-item>
        <el-form-item label="级别">
          <el-select v-model="filters.level" clearable size="medium" placeholder="请选择">
            <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在部门">
          <el-select v-model="filters.department" clearable size="medium" placeholder="请选择">
            <el-option v-for="item in departmentOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="外派单位">
          <el-select v-model="filters.expatriateUnit" clearable size="medium" placeholder="请选择">
            <el-option v-for="item in expatriateUnitOptions" clearable :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属中心">
          <el-select v-model="filters.center" clearable size="medium" placeholder="请选择">
            <el-option-group v-for="group in centerOptions" :key="group.label" :label="group.label">
              <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="入职时间">
          <el-date-picker v-model="filters.entryStartDate" type="date" value-format="yyyy-MM-dd 00:00:00" placeholder="选择日期">
          </el-date-picker>
          <span class="el-range-separator">至</span>
          <el-date-picker v-model="filters.entryEndDate" type="date" value-format="yyyy-MM-dd 00:00:00" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="handleFilters">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- <el-upload ref="upload" action="personal/importExcel" :show-file-list="false" :auto-upload="false">
      <el-button slot="trigger" icon="el-icon-upload" size="small" type="primary">
        导入表格
      </el-button>
    </el-upload> -->
    <!-- <el-form :model="ruleForm" ref="ruleForm">
      <el-form-item label="上传文件">
        <el-upload ref="uploada" :action="personal/importExcel" :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">导出</el-button>
      </el-form-item>
    </el-form> -->
    <el-upload class="upload-demo" ref="upload" action="personal/importExcel" :http-request="myUpload" :file-list="fileList" :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">导入</el-button>
      <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
    </el-upload>
    <!--列表-->
    <el-table :data="personalAllList" stripe highlight-current-row ref="table" height="570" style="width: 100%;" :default-sort="{prop: 'date', order: 'descending'}">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="employeeNumber" label="员工编号" width="120">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="80">
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="80">
      </el-table-column>
      <el-table-column label="出生日期" sortable min-width="160">
        <template slot-scope="scope">
          {{tools.dateFormat(new Date(scope.row.birthday)).slice(0, 10)}}
        </template>
      </el-table-column>
      <el-table-column prop="position" label="职位" width="120">
      </el-table-column>
      <el-table-column prop="level" label="级别" width="120">
      </el-table-column>
      <el-table-column prop="department" label="所在部门" width="120">
      </el-table-column>
      <el-table-column prop="center" label="归属中心" width="120">
      </el-table-column>
      <el-table-column prop="expatriateUnit" label="外派单位" min-width="160">
      </el-table-column>
      <el-table-column label="入职时间" min-width="160">
        <template slot-scope="scope">
          {{tools.dateFormat(new Date(scope.row.arrivalTime)).slice(0, 10)}}
        </template>
      </el-table-column>
      <el-table-column prop="workingPlace" label="所在职场" min-width="160">
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleRemove(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination @current-change="currentChange" :page-size="filters.pageSize" layout="total, prev, pager, next, jumper" :total="count">
    </el-pagination>
    <!--分页-->
  </section>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        employeeNumber: '',
        name: '',
        birthday: '',
        position: '',
        level: '',
        department: '',
        expatriateUnit: '',
        arrivalTime: '',
        leaveStatus: 0,
        pageIndex: 0, // 查询页页码
        pageSize: 2 // 查询条数
      },
      sexOptions: [
        {
          value: '男',
          label: '男'
        },
        {
          value: '女',
          label: '女'
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
      departmentOptions: [
        {
          value: '产品事业部',
          label: '产品事业部'
        },
        {
          value: '市场技术部',
          label: '市场技术部'
        },
        {
          value: '系统运维部',
          label: '系统运维部'
        },
        {
          value: '系统集成部',
          label: '系统集成部'
        },
        {
          value: '政企支撑中心',
          label: '政企支撑中心'
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
      centerOptions: [
        {
          label: '产品事业部',
          options: [
            {
              value: '管理信息化中心',
              label: '管理信息化中心'
            },
            {
              value: '交通行业中心',
              label: '交通行业中心'
            },
            {
              value: '医疗行业中心',
              label: '医疗行业中心'
            },
            {
              value: '教育行业中心',
              label: '教育行业中心'
            },
            {
              value: '安全项目中心',
              label: '安全项目中心'
            },
            {
              value: 'ERP组',
              label: 'ERP组'
            },
            {
              value: '质量管理中心',
              label: '质量管理中心'
            }
          ]
        },
        {
          label: '市场技术部',
          options: [
            {
              value: '一大区',
              label: '一大区'
            },
            {
              value: '东北二大区',
              label: '东北二大区'
            },
            {
              value: '三大区',
              label: '三大区'
            },
            {
              value: '四大区',
              label: '四大区'
            },
            {
              value: '五大区',
              label: '五大区'
            }
          ]
        },
        {
          label: '系统运维部',
          options: [
            {
              value: '质量管理中心',
              label: '质量管理中心'
            },
            {
              value: '百度亦庄',
              label: '百度亦庄'
            },
            {
              value: '设备维护中心',
              label: '设备维护中心'
            }
          ]
        },
        {
          label: '系统集成部',
          options: [
            {
              value: '技术支持组',
              label: '技术支持组'
            },
            {
              value: '工程实施中心',
              label: '工程实施中心'
            }
          ]
        },
        {
          label: '政企支撑中心',
          options: [
            {
              value: '人力支撑',
              label: '人力支撑'
            },
            {
              value: '商务支撑',
              label: '商务支撑'
            },
            {
              value: '属地化支撑',
              label: '属地化支撑'
            }
          ]
        }
      ],
      count: 0, // 数据总共数量 多少条
      showLoading: true, // 是否展示table的loading状态
      personalAllList: null
    }
  },
  methods: {
    submitUpload(content) {
      console.log('myUpload...')
      this.$axios({
        method: 'post',
        url: content.action,
        timeout: 20000,
        data: content.file
      })
        .then(res => {
          content.onSuccess('配时文件上传成功')
        })
        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            content.onError(
              '配时文件上传失败(' +
                error.response.status +
                ')，' +
                error.response.data
            )
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            content.onError('配时文件上传失败，服务器端无响应')
          } else {
            // Something happened in setting up the request that triggered an Error
            content.onError('配时文件上传失败，请求封装失败')
          }
        })
    },
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
      // 出生日期
      const bdStart = this.filters.birthdayStartDate
      const bdEnd = this.filters.birthdayEndDate
      if (
        new Date(bdStart === null ? '' : bdStart) >
        new Date(bdEnd === null ? '' : bdEnd)
      ) {
        this.tools.alertError(
          this,
          '开始时间大于结束时间，请重新选择出生日期！'
        )
        return
      }
      // 入职时间
      const edStart = this.filters.entryStartDate
      const edEnd = this.filters.entryEndDate
      if (
        new Date(edStart === null ? '' : edStart) >
        new Date(edEnd === null ? '' : edEnd)
      ) {
        this.tools.alertError(
          this,
          '开始时间大于结束时间，请重新选择入职时间！'
        )
        return
      }
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
    },
    // 新增员工信息
    handleAdd() {
      this.$router.push({ path: '/', query: { pageType: 0 }})
    },
    // 编辑员工信息
    handleEdit(id) {
      this.$router.push({ path: '/', query: { pageType: 1, userId: id }})
    },
    // 删除员工信息
    handleRemove(id) {
      this.$confirm('是否确认删除，删除后无法恢复', '提示', {
        closeOnClickModal: false
      })
        .then(() => {
          this.getData(
            'personal/deletePersonalAllInfo',
            { personalInfoId: id },
            data => {
              this.tools.alertInfo(this, '删除成功！')
              this.$router.go({ path: '/person/entry-manage' })
            }
          )
        })
        .catch()
    },
    handleDel(index, row) {
      console.log(index, row)
    }
  },
  // 请求数据渲染
  created() {
    if (this.tools.getLocal(this.$route.name, 'filters')) {
      this.filters = this.tools.getLocal(this.$route.name, 'filters')
      this.filters.pageIndex = 0
      // this.typesArr = this.filters.types.split(',')
    }
    // 页面展示后 第一次请求人员列表
    this.getData('personal/getList', this.filters, data => {
      this.count = data.count
      console.log(data)
      this.personalAllList = data.personalViewList
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
</style>
