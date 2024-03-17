<template>
    <div class="layout-wrap">
      <div class="layout-header">
        <div class="left">
          <!-- <img src="@/assets/logo.png" alt="" /> -->
          <div class="title">
            <div class="en">Tree Map Operation</div>
            <div class="ch">图谱编辑工具</div>
          </div>
        </div>
        <div class="right">

          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            :ellipsis="false"
            router
            @select="handleSelect"
          >
            <el-menu-item index="/">编辑</el-menu-item>
            <!-- <el-submenu index="2">
              <template slot="title">决策树</template>
              <el-menu-item index="2-1">查看完整决策树</el-menu-item>
              <el-menu-item index="2-2">编辑决策树</el-menu-item>
            </el-submenu>
            <el-menu-item index="1">相似病例</el-menu-item> -->
          </el-menu>
          <el-avatar :size="36" :src="circleUrl" />
          <el-dropdown>
            <span class="el-dropdown-link">
              User
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </template>
  <script>
  // import { ref } from 'vue';
  // const circleUrl = ref(
  //   'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  // );
  export default {
    data() {
      return {
        circleUrl: "",
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
  </script>
  <style lang="less" scoped>
  .layout-wrap {
    width: 100%;
    height: 100%;
    .layout-header {
      height: 56px;
      width: 100%;
      line-height: 56px;
      box-sizing: border-box;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #297ef5e0;
      .left {
        height: 56px;
        display: flex;
        align-items: center;
        .title {
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          .en,
          .ch {
            height: 16px;
            line-height: 16px;
            color: #edeff2;
            font-weight: bold;
          }
          .ch {
            font-family: PangMenZhengDao;
            font-size: 14px;
            font-weight: bold;
          }
        }
      }
      img {
        width: 40px;
        height: 40px;
      }
    }
    .right {
      width: 70%;
      display: flex;
      align-items: center;
      justify-content: right;
      .el-menu-demo {
        background-color: #297ef500;
        margin-right: 10px;
        color: #edeff2;
        font-weight: bold;
      }
      .el-avatar {
        margin-right: 6px;
      }
      .el-dropdown {
        .el-tooltip__trigger {
          color: #ffe8e8;
          font-size: 14px;
          font-family: 'PingFangSC-Regular';
        }
      }
    }
    .layout-content {
      width: 100%;
      height: calc(100% - 56px);
      background: var(--lab-theme-white);
    }
  }
  </style>
  