<template>
  <div class="screenBox">
    <div class="title">农产品调度中心</div>
    <div class="contentBox">
      <!-- 左边 -->
      <div class="left box">
        <div style="text-align: center">
          <el-button-group>
            <el-button
              :color="active === 1 ? '#007d79' : ''"
              @click="changeType(1)"
              >种植业</el-button
            >
            <el-button
              :color="active === 2 ? '#007d79' : ''"
              @click="changeType(2)"
              >畜牧业</el-button
            >
            <el-button
              :color="active === 3 ? '#007d79' : ''"
              @click="changeType(3)"
              >水产品</el-button
            >
          </el-button-group>
        </div>
        <div class="chart" id="bar1"></div>
        <div class="chart" id="bar2"></div>
        <div class="chart" id="bar3"></div>
      </div>
      <!-- 中间 -->
      <div class="middle box">
        <div class="subTitle">全省特色农产品分布图</div>
        <div class="mapBg"></div>
        <!-- <div class="mapBox">
          <map-view></map-view>
        </div> -->
      </div>
      <!-- 右边 -->
      <div class="right box">
        <div class="chart" id="pie1"></div>
        <div class="chart" id="pie2"></div>
        <div class="chart" id="pie3"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, reactive, toRefs } from "vue";
import * as echarts from "echarts";
// import mapView from "../daping/index.vue";

export default defineComponent({
  name: "largeScreen",
  // components: {
  //   mapView,
  // },
  setup() {
    const data = reactive({
      active: 1,
      barOption1: {
        title: {
          text: "近三年主要农产品产量统计",
          left: "center",
          textStyle: {
            color: "#fff",
          },
        },
        legend: {
          data: ["水稻", "小麦", "玉米", "花生", "大豆", "油菜"],
          bottom: "0",
          textStyle: {
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        xAxis: [
          {
            type: "category",
            name: "年度",
            data: ["2020", "2021", "2022"],
            axisPointer: {
              type: "shadow",
            },
            nameTextStyle: {
              color: "#fff",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "产量(吨)",
            min: 0,
            max: 50,
            interval: 10,
            axisLabel: {
              formatter: "{value}",
            },
            nameTextStyle: {
              color: "#fff",
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                width: 1,
              },
            },
          },
        ],
        series: [
          {
            name: "水稻",
            type: "line",
            data: [20, 22, 27],
          },
          {
            name: "小麦",
            type: "line",
            data: [34, 32, 33],
          },
          {
            name: "玉米",
            type: "line",
            data: [10, 12, 18],
          },
          {
            name: "花生",
            type: "line",
            data: [2.0, 2.2, 3.3],
          },
          {
            name: "大豆",
            type: "line",
            data: [27, 20, 26],
          },
          {
            name: "油菜",
            type: "line",
            data: [37, 35, 45],
          },
        ],
      },
      barOption2: {
        title: {
          text: "近三年主要农产品销量对比",
          left: "center",
          textStyle: {
            color: "#fff",
          },
        },
        legend: {
          data: ["水稻", "小麦", "玉米", "花生", "大豆", "油菜"],
          bottom: "0",
          textStyle: {
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        xAxis: [
          {
            type: "category",
            name: "年度",
            data: ["2020", "2021", "2022"],
            axisPointer: {
              type: "shadow",
            },
            nameTextStyle: {
              color: "#fff",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "销量(吨)",
            min: 0,
            max: 50,
            interval: 10,
            axisLabel: {
              formatter: "{value}",
            },
            nameTextStyle: {
              color: "#fff",
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                width: 1,
              },
            },
          },
        ],
        series: [
          {
            name: "水稻",
            type: "line",
            data: [20, 22, 27],
          },
          {
            name: "小麦",
            type: "line",
            data: [34, 32, 33],
          },
          {
            name: "玉米",
            type: "line",
            data: [10, 12, 18],
          },
          {
            name: "花生",
            type: "line",
            data: [2.0, 2.2, 3.3],
          },
          {
            name: "大豆",
            type: "line",
            data: [27, 20, 26],
          },
          {
            name: "油菜",
            type: "line",
            data: [37, 35, 45],
          },
        ],
      },
      barOption3: {
        title: {
          text: "近三年主要农产品库存量对比",
          left: "center",
          textStyle: {
            color: "#fff",
          },
        },
        legend: {
          data: ["水稻", "小麦", "玉米", "花生", "大豆", "油菜"],
          bottom: "0",
          textStyle: {
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        xAxis: [
          {
            type: "category",
            name: "年度",
            data: ["2020", "2021", "2022"],
            axisPointer: {
              type: "shadow",
            },
            nameTextStyle: {
              color: "#fff",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "库存量(吨)",
            min: 0,
            max: 50,
            interval: 10,
            axisLabel: {
              formatter: "{value}",
            },
            nameTextStyle: {
              color: "#fff",
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                width: 1,
              },
            },
          },
        ],
        series: [
          {
            name: "水稻",
            type: "line",
            data: [20, 22, 27],
          },
          {
            name: "小麦",
            type: "line",
            data: [34, 32, 33],
          },
          {
            name: "玉米",
            type: "line",
            data: [10, 12, 18],
          },
          {
            name: "花生",
            type: "line",
            data: [2.0, 2.2, 3.3],
          },
          {
            name: "大豆",
            type: "line",
            data: [27, 20, 26],
          },
          {
            name: "油菜",
            type: "line",
            data: [37, 35, 45],
          },
        ],
      },
      pieOption1: {
        title: {
          text: "农产品品类产量占比统计",
          left: "center",
          textStyle: {
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "horizontal",
          left: "center",
          bottom: "0",
          textStyle: {
            color: "#fff",
          },
        },
        series: [
          {
            name: "品类",
            type: "pie",
            radius: "60%",
            data: [
              { value: 1048, name: "粮食及其副产品" },
              { value: 735, name: "油料及其副产品" },
              { value: 580, name: "果品" },
              { value: 484, name: "蔬菜及其制品" },
              { value: 300, name: "家畜" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              formatter: "{b}: {d}%",
              color: "#fff",
            },
          },
        ],
      },
      pieOption2: {
        title: {
          text: "农产品品类销量占比统计",
          left: "center",
          textStyle: {
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "horizontal",
          left: "center",
          bottom: "0",
          textStyle: {
            color: "#fff",
          },
        },
        series: [
          {
            name: "品类",
            type: "pie",
            radius: "60%",
            data: [
              { value: 1048, name: "粮食及其副产品" },
              { value: 735, name: "油料及其副产品" },
              { value: 580, name: "果品" },
              { value: 1484, name: "蔬菜及其制品" },
              { value: 300, name: "家畜" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              formatter: "{b}: {d}%",
              color: "#fff",
            },
          },
        ],
      },
      pieOption3: {
        title: {
          text: "销售占比统计",
          left: "center",
          textStyle: {
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "horizontal",
          left: "center",
          bottom: "0",
          textStyle: {
            color: "#fff",
          },
        },
        series: [
          {
            name: "渠道",
            type: "pie",
            radius: ["30%", "60%"],
            data: [
              { value: 1048, name: "电商" },
              { value: 1735, name: "代理商" },
              { value: 1580, name: "自营门店" },
              { value: 1484, name: "大型商超" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              formatter: "{b}: {d}%",
              color: "#fff",
            },
          },
        ],
      },
    });
    // 左侧折线图
    const initPie = () => {
      var chartDom = document.getElementById("pie1");
      if (chartDom) {
        var myChart = echarts.init(chartDom);
        data.pieOption1 && myChart.setOption(data.pieOption1, true);
      }

      var chartDom2 = document.getElementById("pie2");
      if (chartDom2) {
        var myChart2 = echarts.init(chartDom2);
        data.pieOption2 && myChart2.setOption(data.pieOption2, true);
      }

      var chartDom3 = document.getElementById("pie3");
      if (chartDom3) {
        var myChart3 = echarts.init(chartDom3);
        data.pieOption3 && myChart3.setOption(data.pieOption3, true);
      }
    };
    // 右侧饼图
    const initBar = () => {
      var chartDom = document.getElementById("bar1");
      if (chartDom) {
        var myChart = echarts.init(chartDom);
        data.barOption1 && myChart.setOption(data.barOption1, true);
      }

      var chartDom2 = document.getElementById("bar2");
      if (chartDom2) {
        var myChart2 = echarts.init(chartDom2);
        data.barOption2 && myChart2.setOption(data.barOption2, true);
      }

      var chartDom3 = document.getElementById("bar3");
      if (chartDom3) {
        var myChart3 = echarts.init(chartDom3);
        data.barOption3 && myChart3.setOption(data.barOption3, true);
      }
    };

    const changeType = (val: number) => {
      data.active = val;
    };
    onMounted(() => {
      nextTick(() => {
        initPie();
        initBar();
      });
    });

    return {
      ...toRefs(data),
      changeType,
    };
  },
});
</script>

<style lang="scss" scoped>
.screenBox {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/dpbg.png") no-repeat 100% 100%;
  color: #fff;
  overflow: hidden;
}
.title {
  height: 80px;
  line-height: 80px;
  font-weight: 1000;
  font-size: 30px;
  text-align: center;
}
.contentBox {
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  .box {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .chart {
      flex: 0 1 31%;
      // background-color: #f0f0f0;
    }
  }
  .left,
  .right {
    flex: 0 1 550px;
  }
  .middle {
    flex: 1 0 auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    .subTitle {
      color: #fff;
      font-size: 25px;
      font-weight: 500;
      flex: 0 1 80px;
      line-height: 80px;
    }
    .mapBox {
      width: 100%;
      flex: 1 0 auto;
      // background: url("../../assets/logo.png") no-repeat;
    }
    .mapBg {
      width: 100%;
      flex: 1 0 auto;
      background-image: url("../../assets/map.png");
      background-size: cover;
    }
  }
}
</style>
