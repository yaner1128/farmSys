<template>
  <div class="content">
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="产品名称：">
        <el-input v-model="query.name" placeholder="请输入产品名称" />
      </el-form-item>
      <el-form-item label="产品品类：">
        <el-select v-model="query.type" placeholder="请选择产品品类">
          <el-option label="梗糯稻谷" value="梗糯稻谷" />
          <el-option label="梗稻谷" value="梗稻谷" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchData(true)">搜索</el-button>
        <!-- <el-button type="primary" @click="addClick()">新增</el-button> -->
      </el-form-item>
    </el-form>
    <el-table :data="tableData" size="medium" v-loading="loading">
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
    <el-pagination
      class="pageination"
      :current-page="currentPage"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="total"
      @current-change="currentPageChange"
    />
    <edit ref="edit" @init="searchData"></edit>
  </div>
</template>

<script lang="ts">
import { getProjectList } from "@/api/project";
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import edit from "./module/edit.vue";

export default defineComponent({
  name: "project",
  components: {
    edit,
  },
  setup() {
    const data = reactive({
      loading: false,
      query: {
        name: "",
        type: "",
      },
      currentPage: 1,
      total: 0,
      tableData: [],
      currentPageChange: (val: number) => {
        console.log(val);
        data.currentPage = val;
      },
    });

    // 编辑
    const edit = ref();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const editClick = (row: any) => {
      edit.value.openDialog(row);
    };
    const addClick = () => {
      console.log("新增");
      edit.value.openDialog();
    };

    const searchData = (flag?: boolean) => {
      if (flag) {
        data.currentPage = 1;
      }
      // 搜索数据
      data.loading = true;
      getProjectList(data.query).then((res) => {
        data.loading = false;
        data.tableData = res.data[0].data.data;
        data.total = res.data[0].data.total;
        console.log(res);
      });
    };

    onMounted(() => {
      searchData();
    });

    return {
      ...toRefs(data),
      searchData,
      edit,
      editClick,
      addClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.content {
  padding: 10px;
  min-height: calc(100vh - 150px);
  background-color: #fff;
  .pageination {
    padding-top: 20px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }
}
</style>
