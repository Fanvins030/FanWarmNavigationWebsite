<template>
  <div class="website">
    <TopMenu :menuData="menuData" />
    <div class="container">
      <SideMenu :menuData="menuData" />
      <Main />
    </div>
    <BackTop />
  </div>
</template>

<script>
import TopMenu from "@views/Home/TopMenu";
import Main from "@views/Home/Main";
import menuData from "@assets/json/menuData.json";

export default {
  components: {
    TopMenu,
    Main,
  },
  data() {
    return {
      menuData,
    };
  },
  mounted() {
    console.log(
      "%c 🌈你发现了小彩蛋~",
      "color:#1ba4a1;font-size:18px;font-family:'Microsoft Yahei'"
    );
  },
};
</script>

<style lang="scss" scoped>
.website {
  .top-menu {
    z-index: 99;
  }
  .container {
    display: flex;
  }
}

@media (min-width: 886px) {
  .top-menu {
    display: none;
  }
  .side-menu {
    display: block;
  }
  .main {
    width: calc(100vw - 230px);
  }
}

@media (max-width: 886px) {
  .top-menu {
    display: block;
  }
  .side-menu {
    display: none;
  }
  .main {
    width: 100vw;
  }
}
</style>