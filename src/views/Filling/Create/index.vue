<template>
  <div class="content">
    <div class="title">
      <h1>{{ product }}-信息填报</h1>
    </div>
    <!-- 步骤条 -->
    <div>
      <el-steps :active="active" finish-status="success">
        <el-step title="原材料来源情况" @click="sourceClick" />
        <el-step title="生产情况" @click="productClick" />
        <el-step title="销售情况" @click="salesClick" />
      </el-steps>
    </div>
    <!-- 根据步骤条,展示不同内容 -->
    <sales-view
      v-if="active === 2"
      :active="active"
      @activeChange="activeChange"
      :valueData="valueData"
    ></sales-view>
    <product-view
      v-else-if="active === 1"
      :active="active"
      @activeChange="activeChange"
      :valueData="valueData"
    ></product-view>
    <source-view
      v-else
      :active="active"
      @activeChange="activeChange"
      :valueData="valueData"
    ></source-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import sourceView from "./module/sourceView.vue";
import salesView from "./module/salesView.vue";
import productView from "./module/productView.vue";

export default defineComponent({
  name: "",
  components: {
    sourceView,
    salesView,
    productView,
  },
  created() {
    localStorage.removeItem("sourceView");
    localStorage.removeItem("productView");
    localStorage.removeItem("salesView");
  },
  setup() {
    const data = reactive({
      product: "",
      active: 0,
      valueData: {},
      sourceClick: () => {
        data.active = 0;
      },
      productClick: () => {
        data.active = 1;
      },
      salesClick: () => {
        data.active = 2;
      },
      activeChange: ({ active, dataValue, name }: any) => {
        data.active = active;
        if (dataValue) {
          data.valueData = Object.assign({ name: name }, dataValue);
          data.product = name;
        }
      },
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
  min-height: calc(100vh - 150px);
  .title {
    position: relative;
    height: 50px;
    line-height: 50px;
    h1 {
      position: absolute;
      top: 50%;
      left: 45%;
      transform: translate(-50%, -50%);
      font-size: 22px;
    }
  }
  .el-steps {
    width: 88%;
    margin: 0 auto;
  }
}
</style>
