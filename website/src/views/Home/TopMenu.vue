<template>
  <div class="top-menu">
    <div class="fixed">
      <i class="iconfont icon_menu" @click="isShow = true"></i>
      <i class="iconfont icon_logo"></i>
      <!-- <i class="iconfont icon_user"></i> -->
      <i></i>
    </div>

    <SideMenu
      :hasMask="hasMask"
      :isShow="isShow"
      :menuData="menuData"
      @updateIsShow="
        (val) => {
          isShow = val;
        }
      "
    >
      <i class="iconfont icon_close" @click="isShow = false"></i>
    </SideMenu>
  </div>
</template>

<script>
export default {
  name: "TopMenu",
  props: {
    menuData: Array,
  },
  data() {
    return {
      hasMask: true,
      isShow: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.top-menu {
  height: 50px;
  position: relative;

  > .fixed {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    background-color: $--bg-WHITE;
    box-shadow: 0 -8px 18px 0px $--shadow-GREY;
    display: flex;
    justify-content: space-between;
    position: fixed;

    i {
      line-height: 50px;
      @include transEaseIn(all);

      &.icon_logo {
        font-size: 35px;
        color: $--fan-BRAND;
      }

      &:not(.icon_logo) {
        font-size: 22px;
        cursor: pointer;

        &:hover {
          color: $--fan-BRAND;
        }
      }
    }
  }

  > .side-menu {
    i {
      font-size: 18px;
      color: $--text-LIGHTGREY;
      position: fixed;
      top: 14px;
      left: 14px;
      z-index: 2;
      @include transEaseIn(all);
      cursor: pointer;

      &:hover {
        color: $--text-GREY;
      }
    }
  }
}
</style>