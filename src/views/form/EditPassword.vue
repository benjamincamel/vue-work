<template>
  <div class="app-container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-date"></i> 系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>修改密码</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form status-icon :rules="EditPasswordRules" ref="EditPasswordForm" :model="EditPasswordForm" label-width="120px">
          <el-form-item label="原密码" prop="password">
            <el-input @keyup.enter.native="handleEditPassword" type="password" v-model="EditPasswordForm.password" auto-complete="off" placeholder="请输入原密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="repassword">
            <el-input @keyup.enter.native="handleEditPassword" type="password" v-model="EditPasswordForm.repassword" auto-complete="off" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="confirmpwd">
            <el-input @keyup.enter.native="handleEditPassword" type="password" v-model="EditPasswordForm.confirmpwd" auto-complete="off" placeholder="请确认新密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native.prevent="handleEditPassword">提交</el-button>
            <el-button type="reset" @click.native.prevent="resetForm">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'editPassword',
  data() {
    const validateCode = (rule, value, callback) => {
      if (
        this.EditPasswordForm.repassword !== this.EditPasswordForm.confirmpwd
      ) {
        // this.loginForm.code = ''
        // this.refreshCode()
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      EditPasswordForm: {
        password: '',
        repassword: '',
        confirmpwd: ''
      },
      EditPasswordRules: {
        password: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 5, message: '密码长度最少为5位', trigger: 'blur' }
        ],
        confirmpwd: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { min: 5, message: '密码长度最少为5位', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validateCode }
        ]
      }
    }
  },
  created() {},
  mounted() {},
  computed: {},
  props: [],
  methods: {
    getData(fun) {
      // 数据请求方法
      this.showLoading = true
      this.ax
        .post('user/editpwd', this.EditPasswordForm)
        .then(response => {
          this.showLoading = false
          if (response.data.code === 0) {
            // 请求成功
            this.tools.alertInfo(this, response.data.msg)
          } else {
            this.tools.alertError(this, response.data.msg)
          }
        })
        .catch(Error => {
          this.showLoading = false
          this.tools.alertError(this, '请求错误！')
        })
    },
    handleEditPassword() {
      this.$refs.EditPasswordForm.validate(valid => {
        if (valid) {
          // console.log(this.EditPasswordForm)
          this.getData(data => {})
        }
      })
    },
    resetForm() {
      this.$refs.EditPasswordForm.resetFields()
    }
  }
}
</script>
