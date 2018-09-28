<template>
  <section class="app-container hx-container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 招聘管理</el-breadcrumb-item>
        <el-breadcrumb-item>招聘需求</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--查询区域-->
    <el-col :span="24" class="toolbar clearfix" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item label="岗位名称">
          <el-input v-model="filters.position" placeholder="岗位名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="外派单位">
          <el-select v-model="filters.expatriateUnit" size="medium" placeholder="请选择" clearable>
            <el-option v-for="item in expatriateUnitOptions" clearable :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="filters.status" clearable size="medium" placeholder="请选择">
            <el-option v-for="item in statusOptions" clearable :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
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
    <el-table :data="recruitList" stripe highlight-current-row ref="table" height="570" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="position" label="岗位名称" width="150">
      </el-table-column>
      <el-table-column prop="postDuty" label="岗位职责" width="180">
      </el-table-column>
      <el-table-column prop="pepoleNeed" label="人员缺口" width="80">
      </el-table-column>
      <el-table-column prop="createUser" label="创建人" width="120">
      </el-table-column>
      <el-table-column label="创建时间" width="160">
        <template slot-scope="scope">
          {{tools.dateFormat(new Date(scope.row.createTime)).slice(0, 10)}}
        </template>
      </el-table-column>
      <el-table-column prop="center" label="所属中心" width="120">
      </el-table-column>
      <el-table-column prop="expatriateUnit" label="外派单位" width="120">
      </el-table-column>
      <el-table-column prop="workPlace" label="所在职场" width="120">
      </el-table-column>
      <el-table-column prop="city" label="城市" width="120">
      </el-table-column>
      <el-table-column prop="status" label="状态" min-width="120" :formatter="statusFormat">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="240">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEditDialogVisible(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleRemove(scope.row)">删除</el-button>
          <el-button type="danger" v-if="scope.row.status===1" size="small" @click="handleStatus(scope.row)">更改状态</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination @current-change="currentChange" :page-size="filters.pageSize" background layout="total, prev, pager, next, jumper" :current-page="filters.pageIndex + 1" :total="count">
    </el-pagination>
    <!--新增招聘需求-->
    <el-dialog class="addEditDialog" :title="textMap[dialogStatus]" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="recruitInfo" ref="recruitInfo" :rules="recruitInfoRules">
        <el-form-item prop="position" label="岗位名称" :label-width="formLabelWidth">
          <el-input v-model="recruitInfo.position" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="postDuty" label="岗位职责" :label-width="formLabelWidth">
          <el-input v-model="recruitInfo.postDuty" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="pepoleNeed" label="人员缺口" :label-width="formLabelWidth">
          <el-input-number v-model="recruitInfo.pepoleNeed" :min="1" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item prop="expatriateUnit" label="外派单位" :label-width="formLabelWidth">
          <el-select v-model="recruitInfo.expatriateUnit" clearable size="medium" placeholder="请选择">
            <el-option v-for="item in expatriateUnitOptions" clearable :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="center" label="归属中心" :label-width="formLabelWidth">
          <el-select v-model="recruitInfo.center" clearable size="medium" placeholder="请选择">
            <el-option-group v-for="group in centerOptions" :key="group.label" :label="group.label">
              <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item prop="workPlace" label="所在职场" :label-width="formLabelWidth">
          <el-input v-model="recruitInfo.workPlace" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="city" label="城市" :label-width="formLabelWidth">
          <el-input v-model="recruitInfo.city" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" v-if="dialogStatus==='edit'" :label-width="formLabelWidth">
          <el-select v-model="recruitInfo.status" placeholder="请选择状态" disabled>
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
      textMap: {
        edit: '修改招聘需求',
        add: '新增招聘需求'
      },
      formLabelWidth: '120px',
      filters: {
        position: '',
        expatriateUnit: '',
        status: '',
        // 查询页页码
        pageIndex: 0,
        // 查询条数
        pageSize: 8
      },
      recruitInfo: {
        id: '',
        center: '',
        city: '',
        createTime: '',
        createUser: '',
        expatriateUnit: '',
        isDel: '',
        pepoleNeed: '',
        position: '',
        postDuty: '',
        serialVersionUID: '',
        status: 1,
        workPlace: ''
      },
      recruitInfoRules: {
        position: [
          { required: true, message: '请输入岗位名称', trigger: 'blur' }
        ],
        postDuty: [
          { required: true, message: '请输入岗位职责', trigger: 'blur' }
        ],
        pepoleNeed: [
          { required: true, message: '人员缺口不能为空' },
          { type: 'number', message: '人员缺口必须为数字值' }
        ],
        expatriateUnit: [
          { required: true, message: '请选择外派单位', trigger: 'change' }
        ],
        center: [
          { required: true, message: '请选择归属中心', trigger: 'change' }
        ],
        workPlace: [
          { required: true, message: '请输入所在职场', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '请输入城市', trigger: 'blur' }
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
          label: '已完成'
        },
        {
          value: '1',
          label: '进行中'
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
      // 数据总共数量 多少条
      count: 0,
      // 是否展示table的loading状态
      showLoading: true,
      recruitList: null
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
      this.getData('resume/getRecruitList', this.filters, data => {
        console.log(data)
        this.count = data.count
        this.recruitList = data.recruitLists
        this.tools.setLocal(this.$route.name, 'filters', this.filters)
      })
    },
    // 显示新增招聘需求
    handleAddDialogVisible() {
      this.dialogStatus = 'add'
      this.dialogVisible = true
      this.clearValidate('recruitInfo')
      this.recruitInfo = {
        id: '',
        center: '',
        city: '',
        createTime: '',
        createUser: '',
        expatriateUnit: '',
        isDel: '',
        pepoleNeed: '',
        position: '',
        postDuty: '',
        serialVersionUID: '',
        workPlace: '',
        status: '1'
      }
    },
    // 新增招聘需求
    handleAdd() {
      this.$refs.recruitInfo.validate(valid => {
        if (valid) {
          this.$confirm('确认新增招聘需求?', '提示', {
            closeOnClickModal: false
          })
            .then(() => {
              this.getData(
                'resume/addRecruitInfo',
                { recruitInfoJsonStr: JSON.stringify(this.recruitInfo) },
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
    // 显示修改招聘需求
    handleEditDialogVisible(row) {
      this.dialogStatus = 'edit'
      this.dialogVisible = true
      this.clearValidate('recruitInfo')
      this.recruitInfo = Object.assign({}, row)
      this.recruitInfo.status = this.statusFormat(row)
    },
    // 编辑招聘信息
    handleEdit(row) {
      this.$refs.recruitInfo.validate(valid => {
        if (valid) {
          this.$confirm('确认修改招聘需求?', '提示', {
            closeOnClickModal: false
          })
            .then(() => {
              const myData = { ...this.recruitInfo }
              myData.status = myData.status === '进行中' ? 1 : 0
              this.getData(
                'resume/updateRecruitInfo',
                { recruitInfoJsonStr: JSON.stringify(myData) },
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
    // 更改状态
    handleStatus(row) {
      this.$confirm('确认更改状态?', '提示', {
        closeOnClickModal: false
      })
        .then(() => {
          this.getData(
            'resume/updateRecruitStatusComplete',
            { recruitInfoId: row.id },
            data => {
              this.tools.alertInfo(this, '更改成功！')
              this.handleFilters()
            }
          )
        })
        .catch()
    },
    // 删除招聘需求
    handleRemove(row) {
      this.$confirm('是否确认删除，删除后无法恢复', '提示', {
        closeOnClickModal: false
      })
        .then(() => {
          this.getData(
            'resume/deleteRecruitInfo',
            { recruitInfoId: row.id },
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
      }
    },
    // 分页change方法
    currentChange(value) {
      this.filters.pageIndex = value - 1
      this.getData('resume/getRecruitList', this.filters, data => {
        this.count = data.count
        this.recruitList = data.recruitLists
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
    this.getData('resume/getRecruitList', this.filters, data => {
      this.count = data.count
      console.log(data)
      this.recruitList = data.recruitLists
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
