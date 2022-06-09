<template>
  <div>
    <el-table :data="tableData" size="medium">
      <el-table-column prop="name" label="产品名称" />
      <el-table-column prop="type" label="农产品品类">
        <template #default="{ row }">
          <el-tag type="">{{ row.type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="填报时间" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="success" plain size="small" @click="editClick(row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <edit ref="edit" @init="searchData"></edit>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import edit from "./module/edit.vue";

export default defineComponent({
  name: "project",
  components: {
    edit,
  },
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
    });

    // 编辑
    const edit = ref();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const editClick = (row: any) => {
      console.log(row);
      edit.value.openDialog(row);
    };

    const searchData = () => {
      // 搜索数据
    };

    return {
      ...toRefs(data),
      searchData,
      edit,
      editClick,
    };
  },
});
</script>

<style></style>
