<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-card>
          <div slot="header" class="clearfix">
            <span>欢迎注册</span>
          </div>
          <div>
            <el-form :model="registerInfo" ref="registerInfo" :rules="rules" label-width="80px" :inline="false" size="normal">
              <el-form-item :prop="'username'" label="用户名">
                <el-input type="text" v-model.trim="registerInfo.username" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item :prop="'password'" label="密码">
                <el-input type="password" v-model.trim="registerInfo.password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item :prop="'license'" label="车牌号">
                <el-input type="text" v-model.trim="registerInfo.license" placeholder="请输入车牌号"></el-input>
              </el-form-item>
              <el-form-item :prop="'phone'" label="手机号">
                <el-input type="text" v-model.trim="registerInfo.phone" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item prop="status" label="车辆类型">
                <el-select style="width: 100%" @change="statusChange" v-model.trim="registerInfo.status" placeholder="是否为社区住户">
                  <el-option :label="item.name" :value="item.val" v-for="(item, index) in statusType" :key="index"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onSubmit" :plain="true">注册</el-button>
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
import baseURL from "../api/baseURL.js";
export default {
  name: "UserRegister",
  data() {
    return {
      // 注册信息
      registerInfo: {
        username: "",
        password: "",
        license: "",
        phone: "",
        status: 1,
      },
      statusType: [
        { name: "社区住户车辆", val: 0 },
        { name: "外来车辆", val: 1 },
      ],
      // 校验规则合集
      rules: {
        username: [
          {
            // 必填项
            required: true,
            // 显示提示信息
            validator: (rule, value, callback) => {
              if (value === "") {
                return callback(new Error("请输入用户名"));
              } else {
                return callback();
              }
            },
            // 触发事件
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === "") {
                return callback(new Error("请输入用户名"));
              } else {
                return callback();
              }
            },
            trigger: "blur",
          },
        ],
        license: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === "") {
                return callback(new Error("请输入车牌号"));
              } else {
                return callback();
              }
            },
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === "") {
                return callback(new Error("请输入手机号"));
              } else {
                return callback();
              }
            },
            trigger: "blur",
          },
        ],
        status: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === "") {
                return callback(new Error("请选择发票通道"));
              } else {
                return callback();
              }
            },
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    // 提交
    onSubmit() {
      this.$refs["registerInfo"].validate((valid) => {
        if (valid) {
          this.$axios.post(baseURL + '/user/register', this.registerInfo).then((result) => {
            result = result.data;
            let code = result.code;
            let message = result.message;
            if (code === 0) {
              this.$message({
                showClose: true,
                message: message,
                type: 'success'
              });
              this.$router.push('/user/login');
            }else {
              this.$message({
                showClose: true,
                message: message,
                type: 'error'
              });
            } 
            console.log(result.data);
          }).catch((err) => {
            console.log('error submit');
            return false;
          });
          console.log(this.registerInfo);
        }
      });
    },
    // 重置
    onReset() {
      this.$refs["registerInfo"].resetFields();
    },
    statusChange() {
      this.$nextTick(() => {
        this.$refs["registerInfo"].clearValidate();
      });
    },
  },
};
</script>

<style>
</style>