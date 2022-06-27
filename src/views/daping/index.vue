<template>
  <div class="boxWrap">
    <div id="map" class="box"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import * as echarts from "echarts";
import hnJson from "@/api/data.json";
/* eslint-disable @typescript-eslint/no-explicit-any */

export default defineComponent({
  name: "",
  setup() {
    const data = reactive({
      chart: null as any,
      jsonData: hnJson as any,
      arr: [
        "浏阳黑山羊",
        "茶陵黄牛",
        "槟榔",
        "黄花菜",
        "新宁脐橙",
        "增润草",
        "桃源黄牛",
        "",
        "安化黑茶",
        "仙鹿牌葡萄",
        "野产异竹",
        "溆浦金银花",
        "双峰碧玉绿茶",
        "湘西枞菌",
      ],
      option: {
        title: {
          text: "全省特色农产品分布图",
          textStyle: {
            color: "#fff",
            fontSize: 20,
          },
          left: "center",
          top: "20px",
        },
        //鼠标移入的提示信息框
        tooltip: {
          show: true,
          trigger: "item",
          formatter: function (a: any) {
            return `${a.name}<br/> 农产品：${data.arr[a.value - 1]}`;
          },
        },
        series: [
          {
            type: "map",
            map: "hn", //对应registerMap() 对应的名称
            top: "center", //调整地图在页面的位置
            zoom: 1, //缩放比例
            emphasis: {
              label: { show: true },
              itemStyle: {
                areaColor: "rgba(255, 255, 255)",
              },
            },
            itemStyle: {
              borderColor: "#fff",
            },
            label: {
              show: true,
              color: "#333",
              formatter: (a: any) => {
                return `${a.name}\n ${data.arr[a.value - 1]}`;
              },
            },
            data: [
              {
                name: "长沙市",
                value: 1,
                itemStyle: {
                  borderColor: "rgba(147, 235, 248, 1)",
                  borderWidth: 1,
                  areaColor: "#2E8B57",
                },
              },
              {
                name: "株洲市",
                value: 2,
                itemStyle: {
                  borderColor: "rgba(147, 235, 248, 1)",
                  borderWidth: 1,
                  areaColor: "rgba(126, 211, 244)",
                },
              },
              {
                name: "湘潭市",
                value: 3,
                itemStyle: {
                  borderColor: "rgba(147, 235, 248, 1)",
                  borderWidth: 1,
                  areaColor: "rgba(92, 123, 217)",
                },
              },
              {
                name: "衡阳市",
                value: 4,
                itemStyle: {
                  borderColor: "rgba(147, 235, 248, 1)",
                  borderWidth: 1,
                  areaColor: "rgba(159, 224, 128)",
                },
              },
              {
                name: "邵阳市",
                value: 5,
                itemStyle: {
                  borderColor: "rgba(147, 235, 248, 1)",
                  borderWidth: 1,
                  areaColor: "rgba(255, 220, 96)",
                },
              },
              {
                name: "岳阳市",
                value: 6,
                itemStyle: {
                  borderColor: "rgba(147, 235, 248, 1)",
                  borderWidth: 1,
                  areaColor: "rgba(115, 192, 222)",
                },
              },
              {
                name: "常德市",
                value: 7,
                itemStyle: {
                  borderColor: "rgba(147, 235, 248, 1)",
                  borderWidth: 1,
                  areaColor: "rgba(59, 162, 114)",
                },
              },
              {
                name: "张家界市",
                value: 8,
                itemStyle: {
                  borderColor: "rgba(147, 235, 248, 1)",
                  borderWidth: 1,
                  areaColor: "rgba(252, 132, 82)",
                },
              },
              {
                name: "益阳市",
                value: 9,
                itemStyle: {
                  borderColor: "rgba(147, 235, 248, 1)",
                  borderWidth: 1,
                  areaColor: "rgba(154, 96, 180)",
                },
              },
              {
                name: "郴州市",
                value: 10,
                itemStyle: {
                  borderColor: "rgba(147, 235, 248, 1)",
                  borderWidth: 1,
                  areaColor: "rgba(234, 124, 204)",
                },
              },
              {
                name: "永州市",
                value: 11,
                itemStyle: {
                  borderColor: "rgba(147, 235, 248, 1)",
                  borderWidth: 1,
                  areaColor: "rgba(84, 112, 198)",
                },
              },
              {
                name: "怀化市",
                value: 12,
                itemStyle: {
                  borderColor: "rgba(147, 235, 248, 1)",
                  borderWidth: 1,
                  areaColor: "rgba(234, 124, 204)",
                },
              },
              {
                name: "娄底市",
                value: 13,
                itemStyle: {
                  borderColor: "rgba(147, 235, 248, 1)",
                  borderWidth: 1,
                  areaColor: "rgba(255, 112, 112)",
                },
              },
              {
                name: "湘西土家族苗族自治州",
                value: 14,
                itemStyle: {
                  borderColor: "rgba(147, 235, 248, 1)",
                  borderWidth: 1,
                  areaColor: "rgba(159, 224, 128)",
                },
              },
            ], //有数据才显示颜色
          },
        ],
      },
    });

    const initChart = () => {
      // echarts的map需要注册，根据引入的json文件名，并定义map的名称
      echarts.registerMap("hn", data.jsonData);
      const chartDom = document.getElementById("map");
      if (chartDom) {
        //init()挂载在某个元素，所以还需要在mounted调用， { renderer: "svg" } 将原来的canvas绘图改为svg 清晰度更高
        data.chart = echarts.init(chartDom, "", {
          renderer: "svg",
        });
        drawMap();
      }
    };

    const drawMap = () => {
      data.chart.setOption(data.option, true);
    };

    onMounted(() => {
      initChart();
    });

    return {
      ...toRefs(data),
      initChart,
    };
  },
});
</script>

<style lang="scss" scoped>
.boxWrap {
  width: 100%;
  height: 100%;
  .box {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
}
</style>
