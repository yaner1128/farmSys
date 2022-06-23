<template>
  <div class="workBox">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="最新企业报送情况" name="first">
        <el-table :data="tableData" border stripe>
          <el-table-column prop="companyName" label="公司名称" />
          <el-table-column prop="companyCode" label="企业信用代码" />
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button
                link
                type="primary"
                size="small"
                @click="handleClick(row.code)"
                >报送详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 详情 -->
        <el-dialog v-model="dialogTableVisible" title="报送详情">
          <el-table :data="gridData">
            <el-table-column property="productName" label="产品名称" />
            <el-table-column property="productType" label="农产品品类">
              <template #default="{ row }">
                <el-tag>{{ row.productType }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column property="date" label="填报时间" />
            <el-table-column property="productNum" label="生产量" />
            <el-table-column property="salesNum" label="销售量" />
          </el-table>
        </el-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { getCompanyDetails, getCompanyList } from "@/api/project";
import { defineComponent, onMounted, reactive, toRefs } from "vue";

export default defineComponent({
  name: "workSpace",
  setup() {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const data = reactive({
      activeName: "first",
      dialogTableVisible: false,
      tableData: [],
      gridData: [],
      handleClick: (code: string) => {
        // 报送详情
        data.dialogTableVisible = true;
        getCompanyDetails({ code: code }).then((res) => {
          data.gridData = res.data[0].data.data;
        });
      },
    });
    // 获取数据
    const getData = () => {
      getCompanyList("").then((res: any) => {
        data.tableData = res.data[0].data.data;
      });
    };
    onMounted(() => {
      getData();
    });

    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang="scss" scoped>
.workBox {
  height: calc(100vh - 125px);
  background-color: #fff;
  padding: 0 10px;
}
</style>
