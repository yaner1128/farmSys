<template>
  <div class="productView">
    <el-form :model="form" label-width="160px">
      <el-form-item label="产品名称：">
        <el-input v-model="form.name" placeholder="请输入产品名称" disabled />
      </el-form-item>
      <el-form-item label="产品品类：">
        <el-input v-model="form.type" placeholder="请输入产品名称" disabled />
      </el-form-item>
      <el-form-item label="预计生产：">
        <el-input v-model="form.estProduction" placeholder="请输入预计生产量" />
      </el-form-item>
      <el-form-item label="已生产：">
        <el-input v-model="form.produced" placeholder="请输入已生产量" />
      </el-form-item>
      <el-form-item label="库存量：">
        <el-input v-model="form.inventory" placeholder="请输入库存量" />
      </el-form-item>
      <el-form-item label="已销售：">
        <el-input v-model="form.sold" placeholder="请输入已销售数量" />
      </el-form-item>
      <el-form-item label="待生产：">
        <el-input v-model="form.toBeProduced" placeholder="请输入待生产数量" />
      </el-form-item>
      <el-form-item label="本次产量：">
        <el-input v-model="form.currentOutput" placeholder="请输入本次产量数" />
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
        <el-button type="primary" @click="next">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "productView",
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
    });

    const next = () => {
      console.log(data);
      emit("activeChange", props.active + 1);
    };
    const pre = () => {
      console.log(data);
      emit("activeChange", props.active - 1);
    };

    return {
      ...toRefs(data),
      next,
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
  }
  .el-input {
    width: 240px;
  }
}
</style>
