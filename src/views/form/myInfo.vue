<template>
  <div class="app-container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs>
        <el-tab-pane label="基本信息">
          <el-form label-width="180px">
            <el-form-item label="ID">
              <el-input v-model="personalAll.personalInfo.id" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="姓名" class="is-required">
              <el-input v-model="personalAll.personalInfo.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="personalAll.personalInfo.sex" size="medium" :disabled="true">
                <el-option label="男" :value="0"></el-option>
                <el-option label="女" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="personalAll.personalInfo.age" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="出生日期">
              <el-date-picker v-model="personalAll.personalInfo.birthday" type="date" :editable="false" placeholder="出生日期" :disabled="true">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="民族">
              <el-input v-model="personalAll.personalInfo.nation" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="婚姻状况">
              <el-input v-model="personalAll.personalInfo.marriage" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="personalAll.personalInfo.phone" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="学历">
              <el-input v-model="personalAll.personalInfo.education" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="毕业时间" class="is-required">
              <el-date-picker v-model="personalAll.personalInfo.graduationTime" type="date" :editable="true" placeholder="毕业时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="毕业学校">
              <el-input v-model="personalAll.personalInfo.school" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="毕业专业">
              <el-input v-model="personalAll.personalInfo.major" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="英语">
              <el-input v-model="personalAll.personalInfo.english" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="紧急联系人">
              <el-input v-model="personalAll.personalInfo.contact" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系地址">
              <el-input v-model="personalAll.personalInfo.contactAddress" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="紧急联系人电话">
              <el-input v-model="personalAll.personalInfo.contactPhone" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="personalAll.personalInfo.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="员工编号">
              <el-input v-model="personalAll.personalInfo.employeeNumber" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="户籍地址">
              <el-input v-model="personalAll.personalInfo.homeAddress" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="户口性质">
              <el-input v-model="personalAll.personalInfo.homeProperty" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" class="is-required">
              <el-input v-model="personalAll.personalInfo.identityCard" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="籍贯">
              <el-input v-model="personalAll.personalInfo.nativePlace" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="职称">
              <el-input v-model="personalAll.personalInfo.title" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="工作年限">
              <el-input v-model="personalAll.personalInfo.workingLife" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="personalAll.personalInfo.memo" type="textarea" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="工资信息">
          <el-form label-width="180px">
            <el-form-item label="入职时间" class="is-required">
              <el-date-picker v-model="personalAll.personalSalaryInfo.entryTime" type="date" placeholder="入职时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="到岗时间" class="is-required">
              <el-date-picker v-model="personalAll.personalSalaryInfo.arrivalTime" type="date" placeholder="入职时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="招商银行账号">
              <el-input v-model="personalAll.personalSalaryInfo.bankCardNumber" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="开户行">
              <el-input v-model="personalAll.personalSalaryInfo.bankOpenPlace" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="基本工资" class="is-required">
              <el-input v-model="personalAll.personalSalaryInfo.basePay" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="绩效工资" class="is-required">
              <el-input v-model="personalAll.personalSalaryInfo.meritPay" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="试用期工资">
              <el-input v-model="personalAll.personalSalaryInfo.probationaryPay" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="试用期">
              <el-input v-model="personalAll.personalSalaryInfo.probationPeriod" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="试用期福利">
              <el-input v-model="personalAll.personalSalaryInfo.probationPeriodWelfare" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="补贴" class="is-required">
              <el-input v-model="personalAll.personalSalaryInfo.subsidy" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker v-model="personalAll.personalSalaryInfo.createTime" type="date" :editable="true" placeholder="创建时间" :disabled="true">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="缴纳社保起始月份">
              <el-input v-model="personalAll.personalSalaryInfo.insuranceBeginDate" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="实际缴纳社保起始月份">
              <el-input v-model="personalAll.personalSalaryInfo.insuranceRealDate" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="社保缴纳地点">
              <el-input v-model="personalAll.personalSalaryInfo.insurancePlace" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="结算价">
              <el-input v-model="personalAll.personalSalaryInfo.settlementPrice" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="转正工资">
              <el-input v-model="personalAll.personalSalaryInfo.workerPay" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="转正时间">
              <el-date-picker v-model="personalAll.personalSalaryInfo.workerTime" type="date" :editable="true" placeholder="转正时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="转正福利">
              <el-input v-model="personalAll.personalSalaryInfo.workerWelfare" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="工龄">
              <el-input v-model="personalAll.personalSalaryInfo.workingYears" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="工作信息">
          <el-form label-width="180px">
            <el-form-item label="归属中心">
              <el-select v-model="personalAll.personalWorkInfo.center" clearable size="medium" placeholder="请选择">
                <el-option-group v-for="group in centerOptions" :key="group.label" :label="group.label">
                  <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
            <el-form-item label="中心负责人">
              <el-input v-model="personalAll.personalWorkInfo.expatriateManager" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="级别">
              <el-select v-model="personalAll.personalWorkInfo.level" clearable size="medium" placeholder="请选择">
                <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所在部门">
              <el-select v-model="personalAll.personalWorkInfo.department" clearable size="medium" placeholder="请选择">
                <el-option v-for="item in departmentOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="外派单位">
              <el-select v-model="personalAll.personalWorkInfo.expatriateUnit" clearable size="medium" placeholder="请选择">
                <el-option v-for="item in expatriateUnitOptions" clearable :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="合同签署次数">
              <el-input v-model="personalAll.personalWorkInfo.contractCount" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="合同生效日期">
              <el-date-picker v-model="personalAll.personalSalaryInfo.contractStartdate" type="date" :editable="true" placeholder="合同生效日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="合同失效日期">
              <el-date-picker v-model="personalAll.personalSalaryInfo.contractEnddate" type="date" :editable="true" placeholder="合同失效日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="续签合同日期">
              <el-date-picker v-model="personalAll.personalSalaryInfo.contractRenewDate" type="date" :editable="true" placeholder="续签合同日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="续签合同失效日期">
              <el-date-picker v-model="personalAll.personalSalaryInfo.contractRenewEnddate" type="date" :editable="true" placeholder="续签合同失效日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="离职原因">
              <el-input v-model="personalAll.personalWorkInfo.leaveReason" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="离职状态">
              <el-select v-model="personalAll.personalWorkInfo.leaveStatus" size="medium" disabled>
                <el-option label="已离职" :value="0"></el-option>
                <el-option label="在职" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="离职类型">
              <el-select v-model="personalAll.personalWorkInfo.leaveType" size="medium">
                <el-option v-for="item in leaveTypeOptions" clearable :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="离职日期">
              <el-date-picker v-model="personalAll.personalSalaryInfo.leaveWorkingTime" type="date" :editable="true" placeholder="离职日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="职位">
              <el-input v-model="personalAll.personalWorkInfo.position" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="岗位类别">
              <el-input v-model="personalAll.personalWorkInfo.postType" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="项目">
              <el-input v-model="personalAll.personalWorkInfo.project" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="招聘渠道">
              <el-input v-model="personalAll.personalWorkInfo.recruitChannel" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="工作地址">
              <el-input v-model="personalAll.personalWorkInfo.workingAddress" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="工作地点">
              <el-input v-model="personalAll.personalWorkInfo.workingPlace" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div class="btn-area">
        <el-button type="primary" @click="submitInfo()" style="margin-left: 180px">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      personalAll: {
        personalInfo: {
          id: '',
          name: '',
          sex: '',
          age: '',
          birthday: '',
          nation: '',
          marriage: '',
          phone: '',
          education: '',
          school: '',
          major: '',
          contact: '',
          contactAddress: '',
          contactPhone: '',
          email: '',
          employeeNumber: '',
          english: '',
          graduationTime: '',
          homeAddress: '',
          homeProperty: '',
          identityCard: '',
          nativePlace: '',
          serialVersionUID: '',
          title: '',
          updateTime: '',
          workingLife: '',
          memo: ''
        },
        personalSalaryInfo: {
          arrivalTime: '',
          bankCardNumber: '',
          bankOpenPlace: '',
          basePay: '',
          entryTime: '',
          insuranceBeginDate: '',
          insurancePlace: '',
          insuranceRealDate: '',
          meritPay: '',
          probationaryPay: '',
          probationPeriod: '',
          probationPeriodWelfare: '',
          settlementPrice: '',
          subsidy: '',
          updateTime: '',
          workerPay: '',
          workerTime: '',
          workerWelfare: '',
          workingYears: ''
        },
        personalWorkInfo: {
          center: '',
          contractCount: '',
          contractEnddate: '',
          contractRenewDate: '',
          contractRenewEnddate: '',
          contractStartdate: '',
          department: '',
          expatriateManager: '',
          expatriateUnit: '',
          leaveReason: '',
          leaveStatus: '',
          leaveType: '',
          leaveWorkingTime: '',
          level: '',
          personalInfoId: '',
          position: '',
          postType: '',
          project: '',
          recruitChannel: '',
          workingAddress: '',
          workingPlace: ''
        }
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
      ]
    }
  },
  methods: {
    getData(funName, param, fun) {
      // 数据请求方法
      this.showLoading = true
      this.ax
        .post(funName, param)
        .then(response => {
          console.log(response)
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
    // 新增&修改
    submitInfo() {
      if (!this.personalAll.personalInfo.name) {
        this.tools.alertError(this, '请填写姓名！')
        return
      }
      if (!this.personalAll.personalInfo.graduationTime) {
        this.tools.alertError(this, '请填写毕业时间！')
        return
      }
      if (!this.personalAll.personalInfo.identityCard) {
        this.tools.alertError(this, '请填写身份证号！')
        return
      }
      this.$confirm('请您确认信息填写无误后提交', '提示', {
        closeOnClickModal: false
      })
        .then(() => {
          this.getData(
            'personal/updatePersonalAllInfoBySelf',
            { personalAllJsonStr: JSON.stringify(this.personalAll) },
            data => {
              this.tools.alertInfo(this, '修改成功！')
              this.dialogFormVisible = false
            }
          )
        })
        .catch()
    }
  },
  // 请求数据渲染
  created() {
    console.log(this.$route.params.userId)
    this.getData(
      'personal/getPersonalAllInfoBySelfId',
      { personalInfoId: '' },
      data => {
        console.log(this.personalAll.personalInfo.birthday)
        this.personalAll.personalInfo = data.personalInfo
        this.personalAll.personalSalaryInfo = data.personalSalaryInfo
        this.personalAll.personalWorkInfo = data.personalWorkInfo
      }
    )
  }
}
</script>

<style scoped>
</style>
