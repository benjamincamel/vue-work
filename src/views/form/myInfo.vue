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
              <el-input v-model="personalAll.personalInfo.id" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="personalAll.personalInfo.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="personalAll.personalInfo.sex" size="medium">
                <el-option label="男" :value="0"></el-option>
                <el-option label="女" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="personalAll.personalInfo.age" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="出生日期">
              <el-date-picker
                v-model="personalAll.personalInfo.birthday"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                default-time="23:59:59"
                :editable="false"
                placeholder="出生日期">
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
            <el-form-item label="毕业时间">
              <el-date-picker v-model="personalAll.personalInfo.graduationTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" default-time="23:59:59" :editable="true" placeholder="毕业时间">
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
            <el-form-item label="创建时间">
              <el-date-picker v-model="personalAll.personalInfo.createTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" default-time="23:59:59" :editable="true" placeholder="创建时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="personalAll.personalInfo.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="员工编号">
              <el-input v-model="personalAll.personalInfo.employeeNumber" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="户籍地址">
              <el-input v-model="personalAll.personalInfo.homeAddress" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="户口性质">
              <el-input v-model="personalAll.personalInfo.homeProperty" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="身份证">
              <el-input v-model="personalAll.personalInfo.identityCard" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="籍贯">
              <el-input v-model="personalAll.personalInfo.nativePlace" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="职称">
              <el-input v-model="personalAll.personalInfo.title" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="工作年限">
              <el-input v-model="personalAll.personalInfo.workingLife" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="personalAll.personalInfo.memo" type="textarea" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="工资信息">
          <el-form label-width="180px">
            <el-form-item label="到岗时间">
              <el-date-picker v-model="personalAll.personalSalaryInfo.arrivalTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" default-time="23:59:59" :editable="true" placeholder="到岗时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="招商银行账号">
              <el-input v-model="personalAll.personalSalaryInfo.bankCardNumber" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="开户行">
              <el-input v-model="personalAll.personalSalaryInfo.bankOpenPlace" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="基本工资">
              <el-input v-model="personalAll.personalSalaryInfo.basePay" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker v-model="personalAll.personalSalaryInfo.createTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" default-time="23:59:59" :editable="true" placeholder="创建时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="缴纳社保起始月份">
              <el-input v-model="personalAll.personalSalaryInfo.insuranceBeginDate" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="社保缴纳地点">
              <el-input v-model="personalAll.personalSalaryInfo.insurancePlace" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="实际缴纳社保起始月份">
              <el-input v-model="personalAll.personalSalaryInfo.insuranceRealDate" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="绩效工资">
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
            <el-form-item label="结算价">
              <el-input v-model="personalAll.personalSalaryInfo.settlementPrice" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="补贴">
              <el-input v-model="personalAll.personalSalaryInfo.subsidy" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="转正工资">
              <el-input v-model="personalAll.personalSalaryInfo.workerPay" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="转正时间">
              <el-date-picker v-model="personalAll.personalSalaryInfo.workerTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" default-time="23:59:59" :editable="true" placeholder="转正时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="转正福利">
              <el-input v-model="personalAll.personalSalaryInfo.workerWelfare" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="工龄">
              <el-input v-model="personalAll.personalSalaryInfo.workingYears" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="工作信息">
          <el-form label-width="180px">
            <el-form-item label="归属中心">
              <el-input v-model="personalAll.personalWorkInfo.center" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="合同签署次数">
              <el-input v-model="personalAll.personalWorkInfo.contractCount" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="合同生效日期">
              <el-date-picker v-model="personalAll.personalSalaryInfo.contractStartdate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" default-time="23:59:59" :editable="true" placeholder="合同生效日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="合同失效日期">
              <el-date-picker v-model="personalAll.personalSalaryInfo.contractEnddate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" default-time="23:59:59" :editable="true" placeholder="合同失效日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="续签合同日期">
              <el-date-picker v-model="personalAll.personalSalaryInfo.contractRenewDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" default-time="23:59:59" :editable="true" placeholder="续签合同日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="续签合同失效日期">
              <el-date-picker v-model="personalAll.personalSalaryInfo.contractRenewEnddate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" default-time="23:59:59" :editable="true" placeholder="续签合同失效日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="部门">
              <el-input v-model="personalAll.personalWorkInfo.department" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="全通负责人">
              <el-input v-model="personalAll.personalWorkInfo.expatriateManager" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="外派单位">
              <el-input v-model="personalAll.personalWorkInfo.expatriateUnit" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="离职原因">
              <el-input v-model="personalAll.personalWorkInfo.leaveReason" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="离职状态">
              <el-input v-model="personalAll.personalWorkInfo.leaveStatus" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="离职类型">
              <el-input v-model="personalAll.personalWorkInfo.leaveType" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="离职日期">
              <el-date-picker v-model="personalAll.personalSalaryInfo.leaveWorkingTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" default-time="23:59:59" :editable="true" placeholder="离职日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="级别">
              <el-input v-model="personalAll.personalWorkInfo.level" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="员工信息表ID">
              <el-input v-model="personalAll.personalWorkInfo.personalInfoId" auto-complete="off"></el-input>
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
        <el-button type="primary" @click="updateData()" style="margin-left: 180px">修改信息</el-button>
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
          createTime: '',
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
          createTime: '',
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
          createTime: '',
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
      }
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
    // 编辑
    updateData() {
      this.$confirm('请您确认信息填写无误后提交', '提示', {
        closeOnClickModal: false
      }).then(() => {
        this.getData(
          'personal/updatePersonalAllInfo',
          { personalAllJsonStr: JSON.stringify(this.personalAll) },
          () => {
            this.tools.alertInfo(this, '修改成功！')
            this.dialogFormVisible = false
          }
        )
      }).catch()
    }
  },
  // 请求数据渲染
  created() {
    this.getData(
      'personal/getPersonalAllInfoById',
      { personalInfoId: 22 },
      data => {
        console.log(this.personalAll.personalInfo.birthday)
        this.personalAll.personalInfo = data.personalInfo
        this.personalAll.personalSalaryInfo = data.personalSalaryInfo
        this.personalAll.personalWorkInfo = data.personalWorkInfo
        this.personalAll.personalInfo.birthday = new Date(this.personalAll.personalInfo.birthday)
        this.personalAll.personalInfo.graduationTime = new Date(this.personalAll.personalInfo.graduationTime)
        this.personalAll.personalInfo.createTime = new Date(this.personalAll.personalInfo.createTime)
        this.personalAll.personalSalaryInfo.arrivalTime = new Date(this.personalAll.personalSalaryInfo.arrivalTime)
        this.personalAll.personalSalaryInfo.createTime = new Date(this.personalAll.personalInfo.createTime)
        this.personalAll.personalSalaryInfo.workerTime = new Date(this.personalAll.personalSalaryInfo.workerTime)
        this.personalAll.personalWorkInfo.contractStartdate = new Date(this.personalAll.personalWorkInfo.contractStartdate)
        this.personalAll.personalWorkInfo.contractEnddate = new Date(this.personalAll.personalWorkInfo.contractEnddate)
        this.personalAll.personalWorkInfo.contractRenewDate = new Date(this.personalAll.personalWorkInfo.contractRenewDate)
        this.personalAll.personalWorkInfo.contractRenewEnddate = new Date(this.personalAll.personalWorkInfo.contractRenewEnddate)
        this.personalAll.personalWorkInfo.leaveWorkingTime = new Date(this.personalAll.personalWorkInfo.leaveWorkingTime)
      }
    )
  }
}
</script>

<style scoped>

</style>

