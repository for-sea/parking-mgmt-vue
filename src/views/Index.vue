<template>
  <div>
    <el-divider></el-divider>
      <el-button size="default" plain>
        <router-link style="text-decoration: none;color: black;" to="/user/login">登录</router-link>
      </el-button>
      <el-button size="default" plain>
        <router-link style="text-decoration: none;color: black;" to="/user/register">注册</router-link>
      </el-button>
      <el-divider></el-divider>
      <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'Index'
}
</script>

<style>

</style>