<template>
  <div class="back-top" :data-show="show ? true : false" @click="backTop">
    <i class="iconfont icon_backtop_filled"></i>
  </div>
</template>

<script>
export default {
  name: "BackTop",
  data() {
    return {
      visibilityHeight: 220,
      show: false,
    };
  },
  methods: {
    // 获取滚动高度
    getScrollHeight() {
      if (document.documentElement.scrollTop > this.visibilityHeight) {
        this.show = true;
      } else {
        this.show = false;
      }
    },

    // 返回顶部
    backTop() {
      assist.scrollAnimation(document.documentElement.scrollTop, 0);
    },
  },
  mounted() {
    window.addEventListener("scroll", this.getScrollHeight);
  },
};
</script>

<style lang="scss" scoped>
.back-top {
  width: 50px;
  height: 50px;
  line-height: 50px;
  border-radius: 50%;
  background-color: rgba($color: $--fan-BRAND, $alpha: 0.5);
  color: $--bg-WHITE;
  text-align: center;
  display: none;
  position: fixed;
  right: 30px;
  bottom: 100px;
  cursor: pointer;
  transition: all 0.3 linear;
  @include transEaseIn(all);

  &:hover {
    background-color: $--fan-BRAND;
  }

  &[data-show] {
    display: block;
  }

  i {
    font-size: 22px;
  }
}
</style>