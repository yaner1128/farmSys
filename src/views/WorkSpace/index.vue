<template>
  <div>
    <el-table :data="tableData" size="">
      <el-table-column prop="name" label="产品名称" />
      <el-table-column prop="type" label="农产品品类">
        <template #default="{ row }">
          <el-tag type="">{{ row.type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="填报时间" />
      <el-table-column prop="status" label="活动状态">
        <template #default="{ row }">
          <el-tag v-if="row.status === '已完成'" type="success">已完成</el-tag>
          <el-tag v-if="row.status === '待填报'" type="info">待填报</el-tag>
          <el-tag v-if="row.status === '审核中'" type="warning">审核中</el-tag>
          <el-tag v-if="row.status === '未开始'" type="danger">未开始</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-tabs v-model="activeName" class="tabs">
      <el-tab-pane label="待完成填报" name="first">待完成填报</el-tab-pane>
      <el-tab-pane label="已完成填报" name="second">
        <el-table :data="finishData" size="">
          <el-table-column prop="name" label="产品名称" />
          <el-table-column prop="type" label="农产品品类">
            <template #default="{ row }">
              <el-tag type="">{{ row.type }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="填报时间" />
          <el-table-column prop="status" label="活动状态">
            <template #default="{ row }">
              <el-tag type="success">{{ row.status }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="任务完成情况" name="third">
        <div ref="chartRef" id="chartRef"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import * as echarts from "echarts";

export default defineComponent({
  name: "workSpace",
  setup() {
    const chartRef = ref();
    const data = reactive({
      tableData: [
        {
          name: "桃江稻花香米",
          type: "梗稻谷",
          date: "2022年6月7日",
          status: "已完成",
        },
        {
          name: "桃江香米",
          type: "梗稻谷",
          date: "2022年6月14日",
          status: "审核中",
        },
        {
          name: "桃江七月醉米",
          type: "梗稻谷",
          date: "2022年6月21日",
          status: "待填报",
        },
        {
          name: "桃江粽子专用米",
          type: "梗糯稻谷",
          date: "2022年6月28日",
          status: "未开始",
        },
      ],
      activeName: "first",
      finishData: [
        {
          name: "桃江稻花香米",
          type: "梗稻谷",
          date: "2022年6月7日",
          status: "已完成",
        },
        {
          name: "桃江香米",
          type: "梗稻谷",
          date: "2022年6月14日",
          status: "已完成",
        },
      ],
      option: {
        title: {
          text: "World Population",
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
          data: ["Brazil", "Indonesia", "USA", "India", "China", "World"],
        },
        series: [
          {
            name: "2011",
            type: "bar",
            data: [18203, 23489, 29034, 104970, 131744, 630230],
          },
          {
            name: "2012",
            type: "bar",
            data: [19325, 23438, 31000, 121594, 134141, 681807],
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
      chartRef,
    };
  },
});
</script>

<style lang="scss" scoped>
.tabs {
  background-color: #fff;
  margin-top: 20px;
}
#chartRef {
  width: 1000px;
  height: 400px;
}
</style>
