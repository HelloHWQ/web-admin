<template>
  <div class="layui-row layui-col-space15">
    <div class="layui-col-sm6 layui-col-md3" v-for="(item) in cardList" :key="item.title">
      <Card
        :title="item.title"
        :count="item.count"
        :unit="item.unit"
        :totaltitle="item.totaltitle"
        :totalcount="item.totalcount"
        :type="item.type"
      ></Card>
    </div>
  </div>
</template>

<script>
import Card from "@/components/HomeCard.vue";
export default {
  name: "homeconsole",
  data: function() {
    return {
      cardList: [
        {
          title: "访问量",
          count: "9000",
          unit: "周",
          totaltitle: "总访问量",
          totalcount: "800000",
          type: "blue"
        },
        {
          title: "下载",
          count: "123",
          unit: "月",
          totaltitle: "新下载",
          totalcount: "22",
          type: "cyan"
        },
        {
          title: "收入",
          count: "434545",
          unit: "年",
          totaltitle: "总收入",
          totalcount: "3123123123",
          type: "green"
        },
        {
          title: "活跃用户",
          count: "34",
          unit: "月",
          totaltitle: "总用户数",
          totalcount: "232323",
          type: "orange"
        }
      ]
    };
  },
  components: {
    Card
  }
};
</script>

<style>
</style>