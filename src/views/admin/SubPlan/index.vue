<template>
  <div class="enterLibraryBox">
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="计划名称：">
        <el-input v-model="query.planName" placeholder="" />
      </el-form-item>
      <el-form-item label="公司名称：">
        <el-input v-model="query.companyName" placeholder="" />
      </el-form-item>
      <el-form-item label="报送方式：">
        <el-select v-model="query.methods" placeholder="请选择">
          <el-option label="年报" value="年报" />
          <el-option label="半年报" value="半年报" />
          <el-option label="季报" value="季报" />
          <el-option label="月报" value="月报" />
          <el-option label="周报" value="周报" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData">查询</el-button>
        <el-button type="success" @click="createClick">新建</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="planName" label="计划名称">
        <template #default="{ row }">
          <span>{{ row.planType }}计划</span>
        </template>
      </el-table-column>
      <el-table-column prop="companyName" label="公司名称" />
      <el-table-column prop="planType" label="报送方式" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="editClick(row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <formVue ref="formVue"></formVue>
  </div>
</template>

<script lang="ts">
import { getCompanyList } from "@/api/project";
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import formVue from "./module/form.vue";

export default defineComponent({
  name: "subPlan",
  components: { formVue },
  setup() {
    const formVue = ref();
    const data = reactive({
      query: {
        planName: "",
        companyName: "",
        methods: "",
      },
      tableData: [],
      createClick: () => {
        formVue.value.open(false);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      editClick: (row: any) => {
        formVue.value.open(true, row);
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
      formVue,
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
