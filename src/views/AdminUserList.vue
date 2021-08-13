<template>
  <div>
    
    <!-- 用户列表 -->
    <el-table :data="bills" style="width: 100%">
      <el-table-column prop="bid" label="账单id" min-width="200"></el-table-column>
      <el-table-column prop="license" label="车牌号" min-width="200"></el-table-column>
      <el-table-column prop="stop" label="计费停车时长（小时）" min-width="200"></el-table-column>
      <el-table-column prop="cost" label="停车费（元）" min-width="200"></el-table-column>
      <el-table-column prop="beginTime" label="进入时间" min-width="200"></el-table-column>
      <el-table-column prop="endTime" label="离开时间" min-width="200"></el-table-column>
      <el-table-column prop="address" label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button type="text" @click="operType('detail', scope.row)">修改</el-button>
          <el-button type="text" @click="operType('detail', scope.row)">删除</el-button>
        </template>
      </el-table-column>
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
      user: {
        uid: 0,
        username: '',
        license: '',
        status: 0,
        createTime: '',
        updateTime: ''
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
    getUserListData() {
      this.uid = 5;
      this.$axios
        .get(baseURL + "/user/list/")
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
  content: "";
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
