<template>
  <div class="content">
    <div ref="chartRef" id="chartRef"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import * as echarts from "echarts";

export default defineComponent({
  name: "completion",
  setup() {
    const data = reactive({
      option: {
        title: {
          text: "任务完成情况",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: "category",
          data: [
            "梗稻谷",
            "梗糯稻谷",
            "桃花香谷",
            "早籼稻谷",
            "晚籼稻谷",
            "其他稻谷",
          ],
        },
        series: [
          {
            name: "",
            type: "bar",
            itemStyle: {
              color: "#38A0FF",
            },
            data: [18203, 23489, 29034, 104970, 131744, 630230],
          },
        ],
      },
    });

    const chartsInit = () => {
      var chartDom = document.getElementById("chartRef");
      if (chartDom) {
        var myChart = echarts.init(chartDom);
        data.option && myChart.setOption(data.option, true);
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
  padding: 10px;
  min-height: calc(100vh - 150px);
  background-color: #fff;
  #chartRef {
    width: 100%;
    height: 600px;
  }
}
</style>
