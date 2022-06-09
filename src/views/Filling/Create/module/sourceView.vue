<template>
  <div class="productView">
    <el-form :model="form" label-width="160px">
      <el-form-item label="产品名称：">
        <el-input v-model="form.name" placeholder="请输入产品名称" />
      </el-form-item>
      <el-form-item label="产品品类：">
        <el-input v-model="form.type" placeholder="请输入产品名称" />
      </el-form-item>
      <el-form-item label="原料名称：">
        <el-input v-model="form.sourceName" placeholder="请输入原料名称" />
      </el-form-item>
      <el-form-item label="来源：">
        <el-input v-model="form.sourceType" placeholder="请输入原料来源" />
      </el-form-item>
      <el-form-item label="数量：">
        <el-input v-model="form.sourceNum" placeholder="请输入原料数量" /><span
          class="detail"
          v-if="form.sourceName && form.sourceType && form.sourceNum"
          @click="add"
          >添加</span
        >
      </el-form-item>
      <el-form-item label="" v-if="tableData.length > 0">
        <el-table :data="tableData" row-key="id">
          <el-table-column prop="name" label="原材料名称" />
          <el-table-column prop="source" label="来源" />
          <el-table-column prop="number" label="数量" />
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button type="danger" link @click="deleteClick(row)"
                >删除</el-button
              ></template
            ></el-table-column
          ></el-table
        >
      </el-form-item>
      <el-form-item label="备注：">
        <el-input
          v-model="form.remark"
          type="textarea"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="next">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "sourceView",
  props: {
    active: {
      type: Number,
      default: 0,
    },
  },
  emits: ["activeChange"],
  setup(props, { emit }) {
    const data = reactive({
      form: {
        name: "",
        type: "",
        sourceName: "",
        sourceType: "",
        sourceNum: "",
        remark: "",
      },
      tableData: [] as any,
      add: () => {
        data.tableData.push({
          name: data.form.sourceName,
          source: data.form.sourceType,
          number: data.form.sourceNum,
        });
        data.form.sourceName = "";
        data.form.sourceType = "";
        data.form.sourceNum = "";
      },
    });
    const deleteClick = (row: { name: string }) => {
      console.log(row);
      data.tableData = data.tableData.filter(
        (item: { name: string; source: string; number: string }) => {
          return item.name !== row.name;
        }
      );
    };
    const next = () => {
      console.log(data);
      emit("activeChange", props.active + 1);
    };

    return {
      ...toRefs(data),
      next,
      deleteClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.productView {
  padding: 20px 10px;
  .el-form {
    width: 600px;
    .detail {
      color: #38a0ff;
      cursor: pointer;
    }
  }
  .el-input {
    width: 240px;
  }
}
</style>
