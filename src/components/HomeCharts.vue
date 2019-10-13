<template>
  <div class="layui-col-sm12">
    <div class="layui-card">
      <div class="layui-card-header">
        访问量
        <div class="layui-btn-group layuiadmin-btn-group">
        </div>
      </div>
      <div class="layui-card-body">
        <div class="layui-row">
          <div class="layui-col-sm8">
            <div
              class="layui-carousel layadmin-carousel layadmin-dataview"
              data-anim="fade"
              lay-filter="LAY-index-pagetwo"
              lay-anim="fade"
              style="width: 100%; height: 280px;"
            >
              <div carousel-item id="LAY-index-pagetwo">
                <div
                  class="layui-this"
                  _echarts_instance_="1570972733526"
                  style="-webkit-tap-highlight-color: transparent; user-select: none; background-color: rgba(0, 0, 0, 0); cursor: default;"
                >
                  <div
                    id="chartcontent"
                    style="position: relative; overflow: hidden; width: 713px; height: 332px;"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div class="layui-col-sm4">
            <div class="layuiadmin-card-list">
              <p class="layuiadmin-normal-font">月访问总数</p>
              <span>同上期增长</span>
              <div class="layui-progress layui-progress-big" lay-showpercent="yes">
                <div class="layui-progress-bar" lay-percent="30%" style="width: 30%;">
                  <span class="layui-progress-text">30%</span>
                </div>
              </div>
            </div>
            <div class="layuiadmin-card-list">
              <p class="layuiadmin-normal-font">月前台访问数</p>
              <span>同上期增长</span>
              <div class="layui-progress layui-progress-big" lay-showpercent="yes">
                <div class="layui-progress-bar" lay-percent="20%" style="width: 20%;">
                  <span class="layui-progress-text">20%</span>
                </div>
              </div>
            </div>
            <div class="layuiadmin-card-list">
              <p class="layuiadmin-normal-font">月后台访问数</p>
              <span>同上期增长</span>
              <div class="layui-progress layui-progress-big" lay-showpercent="yes">
                <div class="layui-progress-bar" lay-percent="25%" style="width: 25%;">
                  <span class="layui-progress-text">25%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "chartcontent",
  data: function() {
    return {};
  },
  mounted() {
    this.drawCharts();
  },
  methods: {
    drawCharts() {
      let charts = this.$echarts.init(document.getElementById("chartcontent"));
      charts.setOption({
        color: ['#01AAED','#009688'],
        title: {
          text: ""
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["前台访问量", "后台访问量"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "前台访问量",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#01AAED"
                }
              }
            }
          },
          {
            name: "后台访问量",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "#009688"
                }
              }
            }
          }
        ]
      });
    }
  }
};
</script>

<style>
</style>