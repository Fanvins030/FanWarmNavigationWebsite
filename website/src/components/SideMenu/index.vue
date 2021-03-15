<template>
  <div class="side-menu" v-show="isShow">
    <div class="fixed" :data-shadow="hasMask ? false : true">
      <slot></slot>
      <router-link
        to="/"
        tag="div"
        class="logo-wrap"
        @click.native="activeItem(homeIndex), $emit('updateIsShow', false)"
      >
        <i class="iconfont icon_slogan"></i>
      </router-link>
      <div class="menu-wrap">
        <ul>
          <router-link
            :to="item.linkTo"
            tag="li"
            ref="item"
            :data-active="onActive[index]"
            v-for="(item, index) of menuData"
            :key="index"
            @click.native="activeItem(index), $emit('updateIsShow', false)"
          >
            <i :class="['iconfont', item.iconName]"></i>{{ item.menuName }}
          </router-link>
        </ul>
      </div>
      <div class="email-wrap">
        <div class="txt">仅供学习，不可商用</div>
        <div class="txt">fanvins@foxmail.com</div>
      </div>
    </div>
    <div
      class="mask"
      v-show="hasMask"
      @click="$emit('updateIsShow', false)"
    ></div>
  </div>
</template>

<script>
export default {
  name: "SideMenu",
  props: {
    menuData: Array,
    hasMask: {
      type: Boolean,
      default: false,
    },
    isShow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      onActive: [],
      homeIndex: 0,
    };
  },
  methods: {
    // 激活菜单项
    activeItem(index) {
      this.$refs.item.map((val) => {
        val.$el.removeAttribute("data-active");
      });
      this.$refs.item[index].$el.setAttribute("data-active", true);
    },

    // 初始化菜单项
    initMenuItem() {
      var name = this.$router.options.routes.find((val) => {
        if (val.path == "/") {
          return val;
        }
      }).name;
      this.menuData.map((val, index) => {
        if (val.linkTo == this.$route.path) {
          this.onActive.push(true);
        } else {
          this.onActive.push(false);
        }
        if (val.menuName == name) {
          this.homeIndex = index;
        }
      });
      if (this.$route.path == "/") {
        this.onActive[this.homeIndex] = true;
      }
    },
  },
  mounted() {
    this.initMenuItem();
  },
  watch: {
    // 监听路由
    $route: function (nval) {
      this.menuData.map((val, index) => {
        if (val.menuName == nval.name) {
          this.$refs.item[index].$el.setAttribute("data-active", true);
        } else {
          this.$refs.item[index].$el.removeAttribute("data-active");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.side-menu {
  min-width: 230px;
  height: 100vh;
  position: relative;
  @include transEaseIn(all);

  .fixed {
    width: 230px;
    height: inherit;
    background-color: $--bg-WHITE;
    position: fixed;
    left: 0;

    &[data-shadow] {
      box-shadow: 0 0 18px 0px $--shadow-GREY;
    }

    .logo-wrap {
      height: 120px;
      color: $--fan-BRAND;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      i {
        font-size: 70px;
      }
    }

    .menu-wrap {
      ul {
        li {
          line-height: 48px;
          padding-left: 50px;
          color: $--text-GREY;
          @include transEaseIn(all);
          cursor: pointer;

          &[data-active],
          &:hover {
            color: $--fan-BRAND;
          }

          &[data-active] {
            background-color: rgba($color: $--bg-GREY, $alpha: 0.6);
          }

          i {
            margin-right: 12px;
            pointer-events: none;
          }
        }
      }
    }

    .email-wrap {
      width: 100%;
      position: absolute;
      bottom: 30px;

      .txt {
        font-size: 12px;
        color: $--text-GREY;
        text-align: center;
      }
    }
  }

  .mask {
    width: calc(100% - 230px);
    height: inherit;
    background-color: rgba($color: $--bg-BLACK, $alpha: 0.6);
    position: fixed;
    right: 0;
  }
}
</style>