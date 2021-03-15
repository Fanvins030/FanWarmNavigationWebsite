<template>
  <div class="section">
    <div class="title-wrap">
      <i :class="['iconfont', iconName]"></i>
      {{ titleName }}
    </div>
    <div class="card-wrap">
      <Card
        v-for="(item, index) of cardList_update"
        :key="index"
        :cardData="{ ...item, sectionIndex: sectionIndex, cardIndex: index }"
        :dataName="dataName"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Section",
  props: {
    iconName: {
      type: String,
    },
    titleName: {
      type: String,
    },
    sectionIndex: {
      type: Number,
    },
    cardList: {
      type: Array,
    },
    dataName: {
      type: String,
    },
  },
  data() {
    return {
      cardList_update: this.cardList,
    };
  },
  watch: {
    // 监听卡片列表
    cardList: function (nval) {
      this.cardList_update = nval;
    },
  },
};
</script>

<style lang="scss" scoped>
.section {
  .title-wrap {
    height: 70px;
    line-height: 70px;
    font-size: 20px;
    color: $--text-GREY;
    position: relative;

    i {
      font-size: 20px;
      margin-right: 10px;
    }
  }

  .card-wrap {
    display: flex;
    flex-wrap: wrap;
  }
}

@media (min-width: 656px) {
  .card-wrap > .card {
    width: 260px;
    margin: 0 20px 20px 0;
  }
}

@media (max-width: 656px) {
  .card-wrap > .card {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>