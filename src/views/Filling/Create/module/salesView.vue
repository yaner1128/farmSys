<template>
  <div class="productView">
    <el-form :model="form" label-width="160px">
      <el-form-item label="产品名称：">
        <el-input v-model="form.name" placeholder="请输入产品名称" disabled />
      </el-form-item>
      <el-form-item label="产品品类：">
        <el-input v-model="form.type" placeholder="请输入产品名称" disabled />
      </el-form-item>
      <el-form-item label="本次销售量：">
        <el-input v-model="form.estProduction" placeholder="请输入预计生产量" />
      </el-form-item>
      <el-form-item label="已交货：">
        <el-input v-model="form.produced" placeholder="请输入已生产量" />
      </el-form-item>
      <el-form-item label="单价：">
        <el-input v-model="form.inventory" placeholder="请输入库存量" />
      </el-form-item>
      <el-form-item label="已销售：">
        <el-input v-model="form.sold" placeholder="请输入已销售数量" /><span
          class="detail"
          @click="isDetail = !isDetail"
          >详情</span
        >
        <div class="salesDetail" v-show="isDetail">
          <el-table
            :data="tableData"
            size="medium"
            :header-cell-style="{ 'background-color': '#f1f1f1' }"
          >
            <el-table-column prop="channel" label="销售渠道" />
            <el-table-column prop="isEnable" label="是否启动">
              <template #default="{ row }">
                <span :class="row.isEnable ? 'green' : 'red'">{{
                  row.isEnable ? "是" : "否"
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="salesNum" label="销售数量" />
          </el-table>
        </div>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input
          v-model="form.remark"
          type="textarea"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="pre">上一步</el-button>
        <el-button type="primary" @click="onSubmit">上报</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "salesView",
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
        estProduction: "",
        produced: "",
        inventory: "",
        sold: "",
        toBeProduced: "",
        currentOutput: "",
        remark: "",
      },
      isDetail: false,
      tableData: [],
    });
    const pre = () => {
      emit("activeChange", props.active - 1);
    };
    const onSubmit = () => {
      console.log(data);
      // 提交
    };

    return {
      ...toRefs(data),
      onSubmit,
      pre,
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
  .salesDetail {
    width: 600px;
  }
}
</style>
