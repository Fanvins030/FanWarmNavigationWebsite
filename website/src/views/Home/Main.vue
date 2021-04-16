<template>
  <div class="main">
    <div class="header">
      <div class="fixed">
        <div class="left">
          <div class="title-wrap">
            <i :class="['iconfont', iconName]"></i>
            <div
              class="name"
              @mouseover="showNav = true"
              @mouseleave="showNav = false"
            >
              {{ menuName
              }}{{ sectionName ? "&nbsp;-&nbsp;" + sectionName : "" }}
              <div class="nav-wrap" v-show="sectionName && showNav">
                <ul>
                  <li
                    v-for="(item, index) of navList"
                    :key="index"
                    @click="scrollToSection(index)"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="right">
          <ul>
            <li><i class="iconfont icon_share"></i></li>
            <li><i class="iconfont icon_user"></i></li>
          </ul>
        </div> -->
      </div>
    </div>
    <div :class="dataName.replace('Data', '')">
      <div class="section-wrap">
        <Section
          :iconName="item.iconName"
          :titleName="item.titleName"
          :sectionIndex="index"
          :cardList="item.cardData"
          :dataName="dataName"
          v-for="(item, index) of sectionList"
          :key="index"
        />
      </div>
    </div>
    <div class="footer">
      Copyright © 2021 FanWarm 饭窝精选网址导航 粤ICP备2021023953号
    </div>
  </div>
</template>

<script>
import menuData from "@assets/json/menuData.json";
export default {
  name: "Main",
  data() {
    return {
      iconName: "",
      menuName: "",
      showNav: false,
      navList: [],
      sectionName: "",
      sectionHeight: [],
      sectionList: [],
      dataName: "",
      homeName: this.$router.options.routes.find((val) => {
        if (val.path == "/") {
          return val;
        }
      }).name,
    };
  },
  methods: {
    // 滚动导航到index对应的Section
    scrollToSection(index) {
      var distance = this.sectionHeight[index];
      assist.scrollAnimation(document.documentElement.scrollTop, distance);
    },

    // 通过监听滚动事件来获取被激活的SectionName
    getSectionNameByScroll() {
      var hasNavName = false;
      var section = document.querySelectorAll(".section-wrap>.section");
      var sectionHeight = Array.prototype.slice.call(section).map((val) => {
        return val.offsetTop - 72;
      });
      var length = sectionHeight.length;
      if (document.documentElement.scrollTop == 0) {
        this.sectionName = false;
      } else {
        for (var i = 0; i < length - 1; i++) {
          if (
            document.documentElement.scrollTop >= sectionHeight[i] &&
            document.documentElement.scrollTop < sectionHeight[i + 1]
          ) {
            this.sectionName = this.sectionList[i].titleName;
          } else if (
            document.documentElement.scrollTop >= sectionHeight[length - 1]
          ) {
            this.sectionName = this.sectionList[length - 1].titleName;
          }
        }
      }
      if (hasNavName) {
        return;
      } else {
        this.sectionHeight = sectionHeight;
        this.navList = this.sectionList.map((val) => {
          return val.titleName;
        });
        hasNavName = true;
      }
    },

    // 获取数据列表
    getSectionList(route) {
      menuData.map((val) => {
        if (val.linkTo == route.path) {
          this.iconName = val.iconName;
          this.menuName = val.menuName;
          this.dataName = val.linkTo.slice(1) + "Data";
        } else if (route.path == "/" && val.menuName == this.homeName) {
          this.iconName = val.iconName;
          this.menuName = val.menuName;
          this.dataName = val.linkTo.slice(1) + "Data";
        } else {
          return;
        }
        this.$axios
          .post("data/getList", { dataName: this.dataName })
          .then(async (res) => {
            if(res.data.code == 0){
              this.sectionList = await res.data.result;
            }
          });
      });
    },

    // 更新数据
    updateData() {
      bus.$on("updateSectionList", async (val) => {
        this.sectionList = await val;
      });
    },
  },
  mounted() {
    this.getSectionList(this.$route);
    window.addEventListener("scroll", this.getSectionNameByScroll);
    this.updateData();
  },
  watch: {
    // 监听路由
    $route: function (nval) {
      this.getSectionList(nval);
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  box-sizing: border-box;
  background-color: $--bg-GREY;

  & > div:not(.header) {
    padding: 0 40px;
  }

  .header {
    height: 72px;
    position: relative;
    z-index: 1;

    .fixed {
      padding: 0 40px;
      background-color: $--bg-GREY;
      height: 72px;
      line-height: 72px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      position: fixed;

      .left {
        .title-wrap {
          font-size: 22px;
          font-weight: bold;
          display: flex;
          cursor: default;

          i {
            font-size: 22px;
            margin-right: 15px;
          }

          .name {
            font-size: inherit;
            position: relative;
            cursor: pointer;

            .nav-wrap {
              width: 150px;
              font-size: 18px;
              text-align: center;
              position: relative;
              cursor: pointer;

              ul {
                li {
                  line-height: 30px;
                  padding: 5px 10px;
                  border-left: 1px solid $--border-GREY;
                  border-right: 1px solid $--border-GREY;
                  border-top: 1px solid $--border-GREY;
                  background-color: rgba($color: $--bg-WHITE, $alpha: 0.9);

                  &:hover {
                    color: $--fan-BRAND;
                  }

                  &:last-child {
                    border-bottom: 1px solid $--border-GREY;
                    border-radius: 0 0 14px 14px;
                  }
                }
              }
            }
          }
        }
      }

      .right {
        ul {
          display: flex;

          li {
            transition: all 0.2s linear;
            cursor: pointer;

            &:not(:last-child) {
              margin-right: 30px;
            }

            &:hover {
              color: $--fan-BRAND;
            }

            i {
              font-size: 22px;
            }
          }
        }
      }
    }
  }

  > div:not(.header):not(.footer) {
    min-height: 800px;

    .section-wrap {
      margin: 0 auto;
    }
  }

  .footer {
    border-top: 1px solid $--border-GREY;
    font-size: 12px;
    color: $--text-GREY;
    padding-top: 15px !important;
    padding-bottom: 30px !important;
  }
}

@media (min-width: 886px) {
  .fixed {
    width: calc(100% - 230px);
    box-shadow: 14px 0 18px 0px $--shadow-GREY;
  }
  .right {
    display: block;
  }
}
@media (max-width: 886px) {
  .fixed {
    width: 100%;
    box-shadow: 0 0 18px 0px $--shadow-GREY;
  }
  .right {
    display: none;
  }
}

// -------------------
@media (min-width: 1446px) {
  .section-wrap {
    width: 1120px;
  }
}

@media (min-width: 1166px) and (max-width: 1446px) {
  .section-wrap {
    width: 840px;
  }
}

@media (min-width: 886px) and (max-width: 1166px) {
  .section-wrap {
    width: 560px;
  }
}

@media (min-width: 656px) and (max-width: 886px) {
  .section-wrap {
    width: 560px;
  }
}

@media (min-width: 576px) and (max-width: 656px) {
  .section-wrap {
    width: 470px;
  }
}

@media (max-width: 576px) {
  .section-wrap {
    width: 100%;
  }
}
</style>