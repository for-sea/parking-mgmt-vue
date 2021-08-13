<template>
  <div>
    <!-- 个人信息 -->
    <el-row :gutter="20" style="margin-top: 10px" class="el-row">
      <!-- 展示个人信息 -->
      <el-col :span="8">
        <el-card>
          <div slot="header" class="clearfix">
            <span>个人中心</span>
          </div>
          <div>
            <div>
              <span>
                {{ userVO.username }} -
                <span>{{ userVO.status === 0 ? "社区住户车辆" : "外来车辆" }}</span>
              </span>
            </div>
            <div class="registe-info">
              <span class="registe-info">
                注册时间：
                <li class="el-icon-date"></li>
                {{ userVO.createTime }}
              </span>
            </div>
            <el-divider></el-divider>
            <div class="personal-relation">
              <div class="el-icon-mobile-phone">
                手机号：
                <div style="float: right; padding-right: 20px">{{ userVO.phone }}</div>
              </div>
            </div>
            <div class="personal-relation">
              <div class="el-icon-truck">
                车牌号：
                <div style="float: right; padding-right: 20px">{{ userVO.license }}</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <!-- 修改个人信息 -->
      <el-col :span="16">
        <el-card>
          <div slot="header" class="clearfix">
            <span>修改个人信息</span>
          </div>
          <div>
            <el-form :model="updateUserDTO" ref="updateUserDTO" :rules="rules" label-width="80px" size="small" label-position="right">
              <el-row :gutter="20">
                <el-col :span="12" :offset="0">
                  <el-form-item label="用户名" prop="username">
                    <el-input auto-complete="off" v-model.trim="updateUserDTO.username"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="0">
                  <el-form-item label="手机号" prop="phone">
                    <el-input auto-complete="off" v-model.trim="updateUserDTO.phone"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" :offset="0">
                  <el-form-item label="车牌号" prop="license">
                    <el-input maxlength="18" v-model.trim="updateUserDTO.license"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="0">
                  <el-form-item label="密码" prop="password">
                    <el-input type="password" maxlength="18" v-model.trim="updateUserDTO.password"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12" :offset="0">
                  <el-form-item label="新密码" prop="newPassword">
                    <el-input type="password" maxlength="15" v-model.trim="updateUserDTO.newPassword"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12" :offset="0">
                  <el-form-item label="确认新密码" prop="newPassword">
                    <el-input type="password" maxlength="15" v-model.trim="updateUserDTO.reNewPassword"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button size="mini" type="primary" @click="onSubmit">提交</el-button>
              <el-button size="mini" @click="onReset">重置</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 账单表格 -->
    <el-table :data="bills" style="width: 100%">
      <el-table-column prop="bid" label="账单id" min-width="200"></el-table-column>
      <el-table-column prop="license" label="车牌号" min-width="200"></el-table-column>
      <el-table-column prop="stop" label="计费停车时长（小时）" min-width="200"></el-table-column>
      <el-table-column prop="cost" label="停车费（元）" min-width="200"></el-table-column>
      <el-table-column prop="beginTime" label="进入时间" min-width="200"></el-table-column>
      <el-table-column prop="endTime" label="离开时间" min-width="200"></el-table-column>
      <!-- <el-table-column
        prop="address"
        label="操作"
        fixed="right"
        width="150"
      >
        <template slot-scope="scope">   
          <el-button type="text" @click="operType('detail', scope.row)">详情</el-button>
        </template>
      </el-table-column>-->
    </el-table>

    <!-- 修改对话框 -->
  </div>
</template>

<script>
import baseURL from "../api/baseURL.js";
export default {
  name: "UserPersonal",
  data() {
    return {
      userVO: {
        uid: 0,
        username: '',
        license: '',
        status: 0,
        createTime: '',
      },
      updateUserDTO: {
        uid: 0,
        username: '',
        password: '',
        newPassword: '',
        reNewPassword: '',
        license: '',
        phone: '',
        status: 0,
        createTime: '',
      },
      bills: [],
      billVO: {
        bid: 0,
        license: '',
        stop: '',
        cost: '',
        beginTime: '',
        endTime: '',
      },
      // 校验规则合集
      rules: {
        password: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === '') {
                return callback(new Error("请输入密码"));
              } else {
                return callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    getUserData() {
      this.uid = 5;
      this.$axios
        .get(baseURL + "/user/personal/" + localStorage.uid)
        .then((result) => {
          if (result.data) {
            console.log(result.data);
            let data = result.data.data;
            this.userVO.uid = data.uid;
            this.userVO.username = data.username;
            this.userVO.license = data.license;
            this.userVO.phone = data.phone;
            this.userVO.status = data.status;
            this.userVO.createTime = data.createTime;
          }
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    },
    getBillsData() {
      this.$axios
        .get(baseURL + "/bill/list/" + localStorage.uid)
        .then((result) => {
          if (result.data) {
            this.bills = result.data.data;
            console.log(result.data);
          }
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    },
    // 提交
    onSubmit() {
      this.$refs["updateUserDTO"].validate((valid) => {
        if (valid) {
          this.updateUserDTO.uid = localStorage.uid;
          this.$axios.put(baseURL + '/user/personal/' + localStorage.uid, this.updateUserDTO).then((result) => {
            console.log(result.data);
          }).catch((err) => {
            console.log('error submit');
            return false;
          });
          console.log(this.updateUserDTO);
        }
      });
    },
    // 重置
    onReset() {
      this.$refs["updateUserDTO"].resetFields();
    },
  },
  mounted() {
    this.getUserData();
    this.getBillsData();
  },
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.name-role {
  font-size: 16px;
  padding: 5px;
  text-align: center;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}

.sender {
  text-align: center;
}

.registe-info {
  text-align: center;
  padding-top: 10px;
}

.personal-relation {
  font-size: 16px;
  padding: 0px 5px 15px;
  margin-right: 1px;
  width: 100%;
}

.relation-item {
  padding: 12px;
}

.dialog-footer {
  padding-top: 10px;
  padding-left: 10%;
}

.el-row {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
}

.el-row .el-card {
  min-width: 100%;
  height: 100%;
  margin-right: 20px;
  transition: all 0.5s;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}
</style>
