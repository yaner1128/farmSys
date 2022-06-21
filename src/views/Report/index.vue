<template>
  <div class="content">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="生产报表" name="first">
        <div ref="productReport" id="productReport" class="box"></div>
      </el-tab-pane>
      <el-tab-pane label="销售报表" name="second">
        <div ref="salesReport" id="salesReport" class="box"></div>
        <div ref="graceReport" id="graceReport" class="box"></div>
        <div ref="roadReport" id="roadReport" class="box"></div>
      </el-tab-pane>
      <el-tab-pane label="库存报表" name="third">
        <div ref="inventory" id="inventory" class="box"></div>
      </el-tab-pane>
      <el-tab-pane label="原材料报表" name="fourth">
        <div ref="rawMaterial" id="rawMaterial" class="box"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import * as echarts from "echarts";

export default defineComponent({
  name: "",
  setup() {
    const data = reactive({
      activeName: "first",
      option: {
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
          data: ["计划产量", "实际产量"],
        },
        xAxis: [
          {
            type: "category",
            name: "月份",
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
            name: "产量",
            min: 0,
            max: 1000,
            interval: 100,
            axisLabel: {
              formatter: "{value} kg",
            },
          },
        ],
        series: [
          {
            name: "计划产量",
            type: "bar",
            data: [500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500],
            tooltip: {
              valueFormatter: function (value: number) {
                return value + "kg";
              },
            },
          },
          {
            name: "实际产量",
            type: "bar",
            data: [510, 580, 680, 760, 951, 967, 954, 977, 812, 857, 657, 518],
            tooltip: {
              valueFormatter: function (value: number) {
                return value + "kg";
              },
            },
          },
        ],
      },
      option2: {
        title: {
          text: "同期销量对比",
          left: "50%",
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
          data: ["2021年度", "2022年度"],
          bottom: 0,
        },
        xAxis: [
          {
            type: "category",
            name: "月份",
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
            name: "销量",
            min: 0,
            max: 300,
            interval: 30,
            axisLabel: {
              formatter: "{value} kg",
            },
          },
        ],
        series: [
          {
            name: "2021年度",
            type: "bar",
            tooltip: {
              valueFormatter: function (value: number) {
                return value + " kg";
              },
            },
            data: [70, 69, 95, 145, 184, 215, 252, 265, 233, 183, 139, 96],
          },
          {
            name: "2022年度",
            type: "bar",
            tooltip: {
              valueFormatter: function (value: number) {
                return value + " kg";
              },
            },
            data: [39, 42, 57, 85, 119, 152, 170, 166, 142, 103, 66, 48],
          },
        ],
      },
      option3: {
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
          data: ["种植业产品", "畜牧业产品", "水产品"],
        },
        xAxis: [
          {
            type: "category",
            name: "月份",
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
            name: "库存量",
            min: 0,
            max: 1000,
            interval: 100,
            axisLabel: {
              formatter: "{value} kg",
            },
          },
        ],
        series: [
          {
            name: "种植业产品",
            type: "bar",
            data: [68, 107, 360, 501, 834, 567, 311, 297, 341, 308, 385, 201],
            tooltip: {
              valueFormatter: function (value: number) {
                return value + "kg";
              },
            },
          },
          {
            name: "畜牧业产品",
            type: "bar",
            data: [100, 200, 300, 300, 451, 267, 68, 107, 360, 501, 834, 567],
            tooltip: {
              valueFormatter: function (value: number) {
                return value + "kg";
              },
            },
          },
          {
            name: "水产品",
            type: "bar",
            data: [311, 297, 341, 308, 385, 201, 100, 200, 300, 300, 451, 267],
            tooltip: {
              valueFormatter: function (value: number) {
                return value + "kg";
              },
            },
          },
        ],
      },
      option4: {
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
          data: ["稻梗", "食用石蜡"],
        },
        xAxis: [
          {
            type: "category",
            name: "月份",
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
            name: "使用量",
            min: 0,
            max: 100,
            interval: 10,
            axisLabel: {
              formatter: "{value} kg",
            },
          },
        ],
        series: [
          {
            name: "稻梗",
            type: "line",
            tooltip: {
              valueFormatter: function (value: number) {
                return value + " kg";
              },
            },
            data: [88, 100, 68, 71, 66, 27, 55, 51, 47, 56, 76, 87],
          },
          {
            name: "食用石蜡",
            type: "line",
            tooltip: {
              valueFormatter: function (value: number) {
                return value + " kg";
              },
            },
            data: [5, 7, 3, 4, 3, 1, 2, 3, 4, 5, 7, 9],
          },
        ],
      },
      option5: {
        title: {
          text: "同期价格对比",
          left: "50%",
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
          data: ["2021年度", "2022年度"],
          bottom: 0,
        },
        xAxis: [
          {
            type: "category",
            name: "月份",
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
            name: "平均售价",
            min: 0,
            max: 30,
            interval: 10,
            axisLabel: {
              formatter: "{value} 元",
            },
          },
        ],
        series: [
          {
            name: "2021年度",
            type: "line",
            tooltip: {
              valueFormatter: function (value: number) {
                return value + " 元";
              },
            },
            data: [
              7, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6,
            ],
          },
          {
            name: "2022年度",
            type: "line",
            tooltip: {
              valueFormatter: function (value: number) {
                return value + " 元";
              },
            },
            data: [
              3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8,
            ],
          },
        ],
      },
      option6: {
        title: {
          text: "销售渠道占比",
          left: "50%",
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {d}%",
        },
        legend: {
          orient: "horizontal",
          bottom: 0,
        },
        series: [
          {
            name: "销售渠道",
            type: "pie",
            radius: "50%",
            data: [
              { value: 22.5, name: "电商" },
              { value: 30.0, name: "代理商" },
              { value: 21.5, name: "自营门店" },
              { value: 26.5, name: "商超" },
            ],
            label: {
              show: true,
              formatter: function (res: {
                data: { name: string; value: string };
              }) {
                return res.data.name + ": " + res.data.value + "%";
              },
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    });

    const chartsInit = () => {
      var chartDom = document.getElementById("productReport");
      if (chartDom) {
        var myChart = echarts.init(chartDom);
        data.option && myChart.setOption(data.option, true);
      }

      var chartDom2 = document.getElementById("salesReport");
      if (chartDom2) {
        var myChart2 = echarts.init(chartDom2);
        data.option && myChart2.setOption(data.option2, true);
      }

      var chartDom3 = document.getElementById("inventory");
      if (chartDom3) {
        var myChart3 = echarts.init(chartDom3);
        data.option && myChart3.setOption(data.option3, true);
      }

      var chartDom4 = document.getElementById("rawMaterial");
      if (chartDom4) {
        var myChart4 = echarts.init(chartDom4);
        data.option && myChart4.setOption(data.option4, true);
      }

      var chartDom5 = document.getElementById("graceReport");
      if (chartDom5) {
        var myChart5 = echarts.init(chartDom5);
        data.option && myChart5.setOption(data.option5, true);
      }

      var chartDom6 = document.getElementById("roadReport");
      if (chartDom6) {
        var myChart6 = echarts.init(chartDom6);
        data.option && myChart6.setOption(data.option6, true);
      }
    };

    onMounted(() => {
      chartsInit();
    });

    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang="scss" scoped>
.content {
  background-color: #fff;
  padding: 10px;
  min-height: calc(100vh - 150px);
  .box {
    width: 1600px;
    height: 500px;
    margin-bottom: 20px;
  }
}
</style>
