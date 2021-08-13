<template>
  <div>
    <!-- 
          * :model="loginInfo" 绑定data数据
          * ref="loginInfo" 表单名，可以通过this.$refs['loginInfo']操作表单的DOM元素
          * :rules="rules" 校验规则合集
            * :prop="'username'" 绑定校验规则
            * v-model.trim 过滤前后空格，中间会保留一个空格（如果有）
    -->
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-card>
          <div slot="header" class="clearfix">
            <span>欢迎登录</span>
          </div>
          <div style="text-align:center">
            <el-form :model="loginInfo" ref="loginInfo" :rules="rules" label-width="80px" :inline="false" size="normal">
              <el-form-item :prop="'username'" label="用户名">
                <el-input type="text" v-model.trim="loginInfo.username" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item :prop="'password'" label="密码">
                <el-input type="password" v-model.trim="loginInfo.password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
                <el-button @click="onReset">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import baseURL from '../api/baseURL.js'
export default {
  name: 'Login',
  data() {
    return {
      // 登录信息
      loginInfo: {
        username: '',
        password: ''
      },
      // 校验规则合集
      rules: {
        username: [{
          // 必填项
          required: true,
          // 显示提示信息
          validator: (rule, value, callback) => {
            if (value === '') {
              return callback(new Error('请输入用户名'));
            } else {
              return callback();
            }
          },
          // 触发事件
          trigger: 'blur'
        }],
        password: [{
          required: true,
          validator: (rule, value, callback) => {
            if (value === '') {
              return callback(new Error('请输入用户名'));
            } else {
              return callback();
            }
          },
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    // 提交
    onSubmit() {
      this.$refs['loginInfo'].validate(valid => {
        if (valid) {
          this.$axios.post(baseURL + '/user/login', this.loginInfo).then((result) => {
            result = result.data;
            let code = result.code;
            let message = result.message;
            if (code === 0) {
              this.$message({
                showClose: true,
                message: message,
                type: 'success'
              });
              console.log(result);
              localStorage.uid = result.data.uid;
              console.log(localStorage.uid);
              this.$router.push('/user/personal');
            }else {
              this.$message({
                showClose: true,
                message: message,
                type: 'error'
              });
            }
          }).catch((err) => {
            console.log('error submit');
            return false;
          });
          console.log(this.loginInfo.username + ' ' + this.loginInfo.password);
        }
      })
    },
    // 重置
    onReset() {
      this.$refs['loginInfo'].resetFields();
    }
  }
}
</script>

<style>
</style>