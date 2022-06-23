<template>
  <div class="enterLibraryBox">
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="公司名称：">
        <el-input v-model="query.companyName" placeholder="" />
      </el-form-item>
      <el-form-item label="信用代码：">
        <el-input v-model="query.companyCode" placeholder="" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData">查询</el-button>
        <el-button type="success" @click="createClick">新建</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="companyName" label="公司名称" />
      <el-table-column prop="companyCode" label="企业信用代码" />
      <el-table-column label="标签">
        <template #default="{ row }">
          <el-tag v-for="item in row.tags" :key="item">{{ item }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="editClick(row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <editVue ref="editRef"></editVue>
  </div>
</template>

<script lang="ts">
import { getCompanyList } from "@/api/project";
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import editVue from "./module/edit.vue";

export default defineComponent({
  name: "enterLibrary",
  components: {
    editVue,
  },
  setup() {
    const editRef = ref();
    const data = reactive({
      query: {
        companyName: "",
        companyCode: "",
      },
      tableData: [],
      createClick: () => {
        editRef.value.open(false);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      editClick: (row: any) => {
        editRef.value.open(true, row);
      },
    });

    const getData = () => {
      getCompanyList(data.query).then((res) => {
        console.log(res);
        data.tableData = res.data[0].data.data;
      });
    };
    onMounted(() => {
      getData();
    });

    return {
      ...toRefs(data),
      editRef,
      getData,
    };
  },
});
</script>

<style lang="scss" scoped>
.enterLibraryBox {
  height: calc(100vh - 150px);
  background-color: #fff;
  padding: 10px;
}
</style>
