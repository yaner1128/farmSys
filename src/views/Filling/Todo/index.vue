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
          <el-tag type="danger" @click="editClick(row)">{{
            row.status
          }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import router from "../../../router";

export default defineComponent({
  name: "todo",
  setup() {
    const data = reactive({
      tableData: [
        {
          id: 1,
          name: "桃江稻花香米",
          type: "梗稻谷",
          date: "2022年6月7日",
          status: "待填报",
        },
        {
          id: 2,
          name: "桃江香米",
          type: "梗稻谷",
          date: "2022年6月14日",
          status: "待填报",
        },
      ],
    });
    // 填报
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const editClick = (row: any) => {
      console.log(row);
      router.push(`/filling/create?id=${row.id}`);
    };
    return {
      ...toRefs(data),
      editClick,
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
