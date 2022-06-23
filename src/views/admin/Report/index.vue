<template>
  <div class="boxWrap">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="生产报表" name="first">
        <div id="report1" class="box"></div>
        <div id="report2" class="box"></div>
        <div id="report3" class="box"></div>
      </el-tab-pane>
      <el-tab-pane label="销售报表" name="second">
        <div id="sales1" class="box"></div>
        <div id="sales2" class="box"></div>
        <div id="sales3" class="box"></div>
      </el-tab-pane>
      <el-tab-pane label="原材料报表" name="third">
        <div id="chart1" class="box"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import * as echarts from "echarts";
import { TabsPaneContext } from "element-plus";

export default defineComponent({
  name: "",
  setup() {
    const data = reactive({
      activeName: "first",
      option1: {
        title: {
          text: "种植业产品产量统计",
          left: "45%",
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
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["产量(吨)"],
          bottom: 0,
        },
        xAxis: [
          {
            name: "品类",
            type: "category",
            data: [
              "粮食及其副产品",
              "油料及其副产品",
              "果品",
              "蔬菜及其制品",
              "香辛料",
              "食用菌及其制品",
              "饮料作物产品",
              "糖料及其制品",
            ],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "产量(吨)",
            min: 0,
            max: 30,
            interval: 5,
            // axisLabel: {
            //   formatter: "{value} ml",
            // },
          },
        ],
        series: [
          {
            name: "产量(吨)",
            type: "bar",
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 20.0, 6.4, 3.3],
          },
        ],
      },
      option2: {
        title: {
          text: "畜牧业产品产量统计",
          left: "45%",
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
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["投放数", "存栏数", "出栏数"],
          bottom: 0,
        },
        xAxis: [
          {
            name: "品类",
            type: "category",
            data: ["猪", "牛", "羊", "鸡", "鸭", "鹅"],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "产量(吨)",
            min: 0,
            max: 100,
            interval: 10,
            // axisLabel: {
            //   formatter: "{value} ml",
            // },
          },
        ],
        series: [
          {
            name: "投放数",
            type: "bar",
            data: [2.0, 59, 17.0, 23.2, 25.6, 20.0],
          },
          {
            name: "存栏数",
            type: "bar",
            data: [33, 4.9, 27.0, 23.2, 25.6, 40],
          },
          {
            name: "出栏数",
            type: "bar",
            data: [20, 49, 70, 52, 56, 27],
          },
        ],
      },
      option3: {
        title: {
          text: "水产品产量统计",
          left: "45%",
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
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["淡水", "海水"],
          bottom: 0,
        },
        xAxis: [
          {
            name: "品类",
            type: "category",
            data: ["鱼", "虾", "蟹", "贝", "藻", "头足", "不另分类的水产品"],
            axisPointer: {
              type: "shadow",
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
            // axisLabel: {
            //   formatter: "{value} ml",
            // },
          },
        ],
        series: [
          {
            name: "淡水",
            type: "bar",
            data: [12.0, 4.9, 7.0, 23.2, 25.6, 20.0, 6.4],
          },
          {
            name: "海水",
            type: "bar",
            data: [20, 49, 17, 23, 25, 20, 34],
          },
        ],
      },
      option4: {
        title: {
          text: "种植业产品产量统计",
          left: "45%",
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
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["销量(吨)", "销售额(万元)"],
          bottom: 0,
        },
        xAxis: [
          {
            name: "品类",
            type: "category",
            data: [
              "粮食及其副产品",
              "油料及其副产品",
              "果品",
              "蔬菜及其制品",
              "香辛料",
              "食用菌及其制品",
              "饮料作物产品",
              "糖料及其制品",
            ],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "销量(吨)",
            min: 0,
            max: 30,
            interval: 3,
          },
          {
            type: "value",
            name: "销售额(万元)",
            min: 0,
            max: 300,
            interval: 30,
          },
        ],
        series: [
          {
            name: "销量(吨)",
            type: "bar",
            data: [12.0, 4.9, 7.0, 13.2, 25.6, 20.0],
          },
          {
            name: "销售额(万元)",
            type: "bar",
            yAxisIndex: 1,
            data: [120, 49, 70, 132, 256, 200],
          },
        ],
      },
      option5: {
        title: {
          text: "畜牧业产品销量统计",
          left: "45%",
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
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["销量(吨)", "销售额(万元)"],
          bottom: 0,
        },
        xAxis: [
          {
            name: "品类",
            type: "category",
            data: ["猪", "牛", "羊", "鸡", "鸭", "鹅"],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "销量(吨)",
            min: 0,
            max: 30,
            interval: 5,
            // axisLabel: {
            //   formatter: "{value} ml",
            // },
          },
          {
            type: "value",
            name: "销售额(万元)",
            min: 0,
            max: 260,
            interval: 30,
            // axisLabel: {
            //   formatter: "{value} ml",
            // },
          },
        ],
        series: [
          {
            name: "销量(吨)",
            type: "bar",
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 20.0],
          },
          {
            name: "销售额(万元)",
            type: "bar",
            yAxisIndex: 1,
            data: [20, 49, 70, 132, 256, 200],
          },
        ],
      },
      option6: {
        title: {
          text: "水产品销量统计",
          left: "45%",
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
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["淡水", "海水"],
          bottom: 0,
        },
        xAxis: [
          {
            name: "品类",
            type: "category",
            data: ["鱼", "虾", "蟹", "贝", "藻", "头足", "不另分类的水产品"],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "销量(吨)",
            min: 0,
            max: 30,
            interval: 5,
          },
          {
            type: "value",
            name: "销售额(万元)",
            min: 0,
            max: 300,
            interval: 30,
          },
        ],
        series: [
          {
            name: "淡水",
            type: "bar",
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 20.0, 6.4],
          },
          {
            name: "海水",
            type: "bar",
            yAxisIndex: 1,
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 20.0, 6.4],
          },
        ],
      },
      chartOption: {
        title: {
          text: "原材料价格统计",
          left: "45%",
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
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["农药", "化肥", "种子"],
          bottom: 0,
        },
        xAxis: [
          {
            name: "月份",
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "产量(吨)",
            min: 0,
            max: 250,
            interval: 30,
            // axisLabel: {
            //   formatter: "{value} ml",
            // },
          },
        ],
        series: [
          {
            name: "农药",
            type: "line",
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 20.0, 6.4, 7.0, 23.2, 25.6, 20.0, 6.4,
            ],
          },
          {
            name: "化肥",
            type: "line",
            data: [
              12.0, 14.9, 17.0, 123.2, 125.6, 120.0, 16.4, 17.0, 123.2, 125.6,
              120.0, 16.4,
            ],
          },
          {
            name: "种子",
            type: "line",
            data: [
              22.0, 24.9, 27.0, 223.2, 225.6, 220.0, 26.4, 27.0, 223.2, 225.6,
              220.0, 26.4,
            ],
          },
        ],
      },
    });
    const reportInit = () => {
      var chartDom = document.getElementById("report1");
      if (chartDom) {
        var myChart = echarts.init(chartDom);
        data.option1 && myChart.setOption(data.option1, true);
      }

      var chartDom2 = document.getElementById("report2");
      if (chartDom2) {
        var myChart2 = echarts.init(chartDom2);
        data.option1 && myChart2.setOption(data.option2, true);
      }

      var chartDom3 = document.getElementById("report3");
      if (chartDom3) {
        var myChart3 = echarts.init(chartDom3);
        data.option1 && myChart3.setOption(data.option3, true);
      }
    };
    const salesInit = () => {
      var chartDom = document.getElementById("sales1");
      if (chartDom) {
        var myChart = echarts.init(chartDom);
        data.option1 && myChart.setOption(data.option4, true);
      }

      var chartDom2 = document.getElementById("sales2");
      if (chartDom2) {
        var myChart2 = echarts.init(chartDom2);
        data.option1 && myChart2.setOption(data.option5, true);
      }

      var chartDom3 = document.getElementById("sales3");
      if (chartDom3) {
        var myChart3 = echarts.init(chartDom3);
        data.option1 && myChart3.setOption(data.option6, true);
      }
    };
    const chartInit = () => {
      var chartDom = document.getElementById("chart1");
      if (chartDom) {
        var myChart = echarts.init(chartDom);
        data.option1 && myChart.setOption(data.chartOption, true);
      }
    };

    const handleClick = (tab: TabsPaneContext) => {
      if (tab.index === "2") {
        setTimeout(() => {
          chartInit();
        });
      } else if (tab.index === "1") {
        setTimeout(() => {
          salesInit();
        });
      } else {
        setTimeout(() => {
          reportInit();
        });
      }
    };

    onMounted(() => {
      reportInit();
    });

    return {
      ...toRefs(data),
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.boxWrap {
  min-height: calc(100vh - 130px);
  background-color: #fff;
  padding: 10px;
  .box {
    box-sizing: border-box;
    width: 100%;
    height: 500px;
    padding: 10px 0 30px;
    border-bottom: 1px solid #f0f0f0;
  }
}
</style>
