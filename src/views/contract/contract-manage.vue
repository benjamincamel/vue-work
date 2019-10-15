<template>
  <section class="app-container hx-container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 合同管理</el-breadcrumb-item>
        <el-breadcrumb-item>合同管理</el-breadcrumb-item>
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
        <el-form-item label="合同状态">
          <el-select v-model="filters.status" clearable size="medium" placeholder="请选择合同状态">
            <el-option v-for="item in statusOptions" clearable :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合同结束时间">
          <el-date-picker v-model="filters.startDate" type="date" value-format="yyyy-MM-dd 00:00:00" placeholder="选择日期">
          </el-date-picker>
          <span class="el-range-separator">至</span>
          <el-date-picker v-model="filters.endDate" type="date" value-format="yyyy-MM-dd 00:00:00" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="handleFilters">查询</el-button>
          <!-- <el-button type="primary" v-on:click="handleAddDialogVisible">新增</el-button> -->
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table v-loading="listLoading" :data="contractList" stripe highlight-current-row ref="table" height="570" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="contractNumber" label="合同编号" width="120">
      </el-table-column>
      <el-table-column prop="contractCount" label="合同签署次数" width="110">
      </el-table-column>
      <el-table-column label="合同开始日期" width="120">
        <template slot-scope="scope">
          {{tools.dateFormat(new Date(scope.row.startDate)).slice(0, 10)}}
        </template>
      </el-table-column>
      <el-table-column label="合同截止日期" width="120">
        <template slot-scope="scope">
          {{tools.dateFormat(new Date(scope.row.endDate)).slice(0, 10)}}
        </template>
      </el-table-column>
      <el-table-column prop="employeeNumber" label="员工编号" width="120">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="100">
      </el-table-column>
      <el-table-column prop="position" label="职位" width="120">
      </el-table-column>
      <el-table-column label="创建时间" width="120">
        <template slot-scope="scope">
          {{tools.dateFormat(new Date(scope.row.createTime)).slice(0, 10)}}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="合同状态" min-width="100" :formatter="statusFormat">
      </el-table-column>
      <el-table-column prop="memo" label="备注" min-width="250">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="170">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEditDialogVisible(scope.row)">编辑</el-button>
          <el-button type="success" size="small" @click="handleAddDialogVisible(scope.row)">续签合同</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination @current-change="currentChange" :page-size="filters.pageSize" background layout="total, prev, pager, next, jumper" :current-page="filters.pageIndex + 1" :total="count">
    </el-pagination>
    <!--新增/修改合同信息-->
    <el-dialog class="addEditDialog" :title="textMap[dialogStatus]" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="contractInfo" ref="contractInfo" :rules="rules">
        <el-form-item label="合同签署次数" :label-width="formLabelWidth">
          <el-input-number v-model="contractInfo.contractCount" :min="1" :max="20" disabled></el-input-number>
        </el-form-item>
        <el-form-item prop="startDate" label="合同开始日期" :label-width="formLabelWidth">
          <el-date-picker v-model="contractInfo.startDate" type="date" placeholder="合同开始日期" required>
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="endDate" label="合同截止日期" :label-width="formLabelWidth">
          <el-date-picker v-model="contractInfo.endDate" type="date" placeholder="合同截止日期" required>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="contractInfo.name" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="岗位名称" :label-width="formLabelWidth">
          <el-input v-model="contractInfo.position" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="memo" :label-width="formLabelWidth">
          <el-input v-model="contractInfo.memo" type="textarea" auto-complete="off"></el-input>
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
        edit: '修改合同信息',
        add: '续签合同'
      },
      formLabelWidth: '120px',
      filters: {
        status: 1,
        // 查询页页码
        pageIndex: 0,
        // 查询条数
        pageSize: 8
      },
      contractInfo: {
        contractNumber: '',
        contractCount: '',
        createTime: '',
        employeeNumber: '',
        endDate: '',
        id: '',
        isDel: '',
        memo: '',
        name: '',
        personalInfoId: '',
        position: '',
        serialVersionUID: '',
        startDate: '',
        updateTime: ''
      },
      statusOptions: [
        {
          value: 0,
          label: '历史合同'
        },
        {
          value: 1,
          label: '最新合同'
        },
        {
          value: 2,
          label: '全部'
        }
      ],
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
      listLoading: true,
      contractList: null
    }
  },
  methods: {
    // 状态数据翻译
    statusFormat(row, column) {
      if (row.status === 0) {
        return this.statusOptions[0].label
      } else if (row.status === 1) {
        return this.statusOptions[1].label
      }
    },
    // 清除验证信息
    clearValidate(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].clearValidate()
      }
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
      this.getData('contract/getList', this.filters, data => {
        console.log(data)
        this.count = data.count
        this.contractList = data.contractViewList
        this.tools.setLocal(this.$route.name, 'filters', this.filters)
      })
    },
    // 显示新增合同信息
    handleAddDialogVisible(row) {
      this.dialogStatus = 'add'
      this.dialogVisible = true
      this.contractInfo = {
        contractNumber: '',
        contractCount: row.contractCount + 1,
        id: '',
        createTime: '',
        employeeNumber: row.employeeNumber,
        endDate: '',
        personalInfoId: row.personalInfoId,
        isDel: '',
        memo: '',
        name: row.name,
        position: row.position,
        serialVersionUID: '',
        startDate: ''
      }
      this.clearValidate('contractInfo')
      console.log(this.contractInfo)
    },
    // 新增合同信息
    handleAdd() {
      this.$refs.contractInfo.validate(valid => {
        if (valid) {
          this.$confirm('确认新增合同信息?', '提示', {
            closeOnClickModal: false
          })
            .then(() => {
              this.getData(
                'contract/addContractInfo',
                { contractInfoJsonStr: JSON.stringify(this.contractInfo) },
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
    // 显示修改合同信息
    handleEditDialogVisible(row) {
      this.dialogStatus = 'edit'
      this.dialogVisible = true
      this.contractInfo = Object.assign({}, row)
      this.clearValidate('contractInfo')
    },
    // 修改合同信息
    handleEdit(row) {
      this.$refs.contractInfo.validate(valid => {
        if (valid) {
          this.$confirm('确认修改合同信息?', '提示', {
            closeOnClickModal: false
          })
            .then(() => {
              this.getData(
                'contract/updateContractInfo',
                { contractInfoJsonStr: JSON.stringify(this.contractInfo) },
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
      this.getData('contract/getList', this.filters, data => {
        this.count = data.count
        this.contractList = data.contractViewList
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
    this.getData('contract/getList', this.filters, data => {
      this.count = data.count
      this.contractList = data.contractViewList
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
