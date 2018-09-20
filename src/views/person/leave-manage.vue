<template>
  <section class="app-container hx-container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 入离职管理</el-breadcrumb-item>
        <el-breadcrumb-item>离职员工管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--查询区域-->
    <el-col :span="24" class="toolbar clearfix" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item label="姓名">
          <el-input v-model="filters.name" placeholder="姓名" clearable></el-input>
        </el-form-item>
        <el-form-item label="离职时间">
          <el-date-picker v-model="filters.leaveStartDate" type="date" value-format="yyyy-MM-dd 00:00:00" placeholder="选择日期">
          </el-date-picker>
          <span class="el-range-separator">至</span>
          <el-date-picker v-model="filters.leaveEndDate" type="date" value-format="yyyy-MM-dd 00:00:00" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="handleFilters">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- 动态插入table列 -->
    <div class="toolbar">
      <h4>显示列</h4>
      <el-checkbox-group v-model="checkedColums">
        <el-checkbox v-for="{ prop, label } in columns" :prop="prop" :label="label" :key="prop" @change="handleCheckedColumsChange($event, label)">{{ label }}</el-checkbox>
      </el-checkbox-group>
    </div>
    <!--列表-->
    <el-table :data="personalAllList" stripe highlight-current-row ref="table" height="570" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="employeeNumber" label="员工编号" width="120">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="80">
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="80">
      </el-table-column>
      <el-table-column prop="birthday" label="出生日期" sortable min-width="160" :formatter="dateFormat">
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
      <el-table-column prop="leaveWorkingTime" label="离职时间" sortable min-width="160" :formatter="dateFormat">
      </el-table-column>
      <el-table-column prop="leaveType" :formatter="leaveTypeFormat" label="离职类型" min-width="160">
      </el-table-column>
      <el-table-column prop="workingPlace" label="所在职场" min-width="160">
      </el-table-column>
      <el-table-column v-for="{ prop, label, width } in colConfigs" :key="prop" :prop="prop" :label="label" :width="width">
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination @current-change="currentChange" :page-size="filters.pageSize" background layout="total, prev, pager, next, jumper" :current-page="filters.pageIndex + 1" :total="count">
    </el-pagination>
  </section>
</template>

<script>
const checkOptions = [
  { prop: 'age', label: '年龄', width: 60 },
  { prop: 'bankCardNumber', label: '银行卡号', width: 180 },
  { prop: 'bankOpenPlace', label: '开户行', width: 180 },
  { prop: 'basePay', label: '基本工资', width: 120 },
  { prop: 'contact', label: '紧急联系人', width: 120 },
  { prop: 'contactAddress', label: '联系地址', width: 180 },
  { prop: 'contactPhone', label: '联系电话', width: 120 },
  { prop: 'education', label: '学历', width: 50 },
  { prop: 'email', label: '邮箱', width: 180 }
]
export default {
  data() {
    return {
      leaveDate: '',
      checkAll: false,
      checkedColums: [],
      columns: checkOptions,
      isIndeterminate: false,
      colConfigs: [],
      filters: {
        employeeNumber: '',
        name: '',
        birthday: '',
        position: '',
        level: '',
        department: '',
        expatriateUnit: '',
        leaveWorkingTime: '',
        leaveStatus: 0,
        leaveType: '',
        // 查询页页码
        pageIndex: 0,
        // 查询条数
        pageSize: 8
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
      leaveTypeOptions: [
        {
          value: '1',
          label: '辞职'
        },
        {
          value: '2',
          label: '退休'
        },
        {
          value: '3',
          label: '合同期满'
        },
        {
          value: '4',
          label: '试用期未通过'
        }
      ],
      rolesOptions: [
        {
          value: '1',
          label: '超级管理员'
        },
        {
          value: '2',
          label: '普通管理员'
        },
        {
          value: '3',
          label: '人事经理'
        },
        {
          value: '4',
          label: '人事专员'
        },
        {
          value: '5',
          label: '中心领导'
        },
        {
          value: '6',
          label: '中心管理'
        },
        {
          value: '7',
          label: '普通员工'
        }
      ],
      // 数据总共数量 多少条
      count: 0,
      // 是否展示table的loading状态
      showLoading: true,
      personalAllList: null
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
    // 动态插入table列
    handleCheckedColumsChange(event, value) {
      if (event) {
        for (let i = 0; i < checkOptions.length; i++) {
          if (checkOptions[i].label === value) {
            this.colConfigs.push(checkOptions[i])
          }
        }
      } else {
        for (let i = 0; i < this.colConfigs.length; i++) {
          if (this.colConfigs[i].label === value) {
            this.colConfigs.splice(i, 1)
          }
        }
      }
    },
    // 离职类型数据翻译
    leaveTypeFormat(row, column) {
      if (row.leaveType === 1) {
        return this.leaveTypeOptions[0].label
      } else if (row.leaveType === 2) {
        return this.leaveTypeOptions[1].label
      } else if (row.leaveType === 3) {
        return this.leaveTypeOptions[2].label
      } else if (row.leaveType === 4) {
        return this.leaveTypeOptions[3].label
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
      // 转正时间
      const tdStart = this.filters.workerStartDate
      const tdEnd = this.filters.workerEndDate
      if (
        new Date(tdStart === null ? '' : tdStart) >
        new Date(tdEnd === null ? '' : tdEnd)
      ) {
        this.tools.alertError(
          this,
          '开始时间大于结束时间，请重新选择转正时间！'
        )
        return
      }
      this.getData('personal/getList', this.filters, data => {
        this.count = data.count
        this.personalAllList = data.personalViewList
        this.tools.setLocal(this.$route.name, 'filters', this.filters)
      })
    },
    // 分页change方法
    currentChange(value) {
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
.hx-container .el-checkbox {
  line-height: 3;
}
.hx-container .toolbar {
  padding: 10px 0;
}
</style>
