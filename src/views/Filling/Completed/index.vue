<template>
  <div class="content">
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
          <el-tag type="success">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "completed",
  setup() {
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
          status: "已完成",
        },
      ],
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
  background-color: #fff;
}
</style>
