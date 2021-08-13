<template>
  <div id="app">
    <div class="title-cell">
      <div class="title">
        <span style="margin-bottom: 20px;">
          <img style="height: 40px; width: auto; margin-top: 20px;" src="./assets/logo.png">停车场进出管理
        </span>
      </div>
      <div class="btn-cell">
        <slot></slot>
      </div>
    </div> 
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #f5f7fa;
  margin-top: 0px;
}
.title-cell {
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: #ecf2ff;
  line-height: 50px;
  border-bottom: 5px solid #4e84fe;
}
.title-cell .title {
  flex: 1;
  font-size: 20px;
  font-weight: 400;
}
.title-cell .title .title-btn {
  width: 5px;
  height: 25px;
  border-radius: 0;
  cursor: none;
  padding: 0;
  vertical-align: middle;
  margin-right: 16px;
}
.title-cell .btn-cell {
  text-align: right;
}
</style>
