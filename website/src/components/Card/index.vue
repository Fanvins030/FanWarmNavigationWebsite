<template>
  <a
    class="card"
    :href="cardData.address"
    target="_blank"
    @click="viewPlusOne(cardData.sectionIndex, cardData.cardIndex)"
  >
    <div class="card-main">
      <div class="logo-wrap">
        <img :src="cardData.logo && cardData.logo" alt="" />
      </div>
      <div class="info-wrap">
        <div class="name">{{ cardData.name }}</div>
        <div class="describe">{{ cardData.describe }}</div>
      </div>
    </div>
    <div class="card-count">
      <div class="view-wrap" v-if="cardData.view != undefined">
        <i class="iconfont icon_eye_filled"></i>
        {{ formatCount(cardData.view) }}
      </div>
      <!-- <div class="like-wrap" v-if="cardData.like != undefined">
        <i class="iconfont icon_seed_filled"></i>
        {{ formatCount(cardData.like) }}
      </div> -->
    </div>
  </a>
</template>

<script>
export default {
  name: "Card",
  props: {
    cardData: Object,
    dataName: String,
  },
  data() {
    return {
      view_update: 0,
    };
  },
  methods: {
    // 用户点击卡片后访问量加一
    viewPlusOne(sectionIndex, CardIndex) {
      this.view_update = this.cardData.view + 1;
      var query = {
        dataName: this.dataName,
        view: this.view_update,
        sectionIndex: sectionIndex,
        CardIndex: CardIndex,
      };
      this.$axios.get("data/getList", { params: query }).then(async (res) => {
        bus.$emit("updateSectionList", await res.data);
      });
    },

    // 格式化数值
    formatCount(val) {
      if (val > 9999999999) {
        return "9999999999+";
      } else {
        return val;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 260px;
  height: 90px;
  padding: 15px;
  box-sizing: border-box;
  background-color: $--bg-WHITE;
  @include transEaseIn(all);
  cursor: pointer;

  &:hover {
    box-shadow: 0 6px 16px 0 $--shadow-GREY;
  }

  .card-main {
    display: flex;

    .logo-wrap {
      width: 32px;
      height: 32px;
      margin-right: 10px;
      background-color: $--bg-GREY;
      border-radius: 50%;
      overflow: hidden;

      img {
        background-color: $--bg-WHITE;
      }
    }

    .info-wrap {
      width: calc(260px - 15px - 15px - 32px - 10px);

      & > div {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .name {
      }

      .describe {
        font-size: 12px;
        color: $--text-GREY;
      }
    }
  }
  .card-count {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;

    & > div {
      color: $--text-LIGHTGREY;
      font-size: 12px;

      i {
        margin-right: 5px;
      }
    }

    .view-wrap {
      margin-right: 10px;
    }

    .like-wrap {
    }
  }
}
</style>