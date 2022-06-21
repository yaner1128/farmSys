<template>
  <div class="productView">
    <el-form :model="form" label-width="160px">
      <el-form-item label="产品名称：">
        <el-input v-model="form.name" placeholder="请输入产品名称" />
      </el-form-item>
      <el-form-item label="产品品类：">
        <el-select
          v-model="dataValue.value1"
          placeholder="请选择一级分类"
          class="item"
          @change="value1Change"
        >
          <el-option
            v-for="item in getOptionData('')"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="dataValue.value2"
          placeholder="请选择二级分类"
          class="item"
          v-show="dataValue.value1"
          @change="value2Change"
        >
          <el-option
            v-for="item in getOptionData(dataValue.value1)"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="dataValue.value3"
          placeholder="请选择三级分类"
          class="item"
          v-show="dataValue.value2"
          @change="value3Change"
        >
          <el-option
            v-for="item in getOptionData(dataValue.value2)"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="dataValue.value4"
          placeholder="请选择四级分类"
          class="item"
          v-show="dataValue.value3"
        >
          <el-option
            v-for="item in getOptionData(dataValue.value3)"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="原料名称：">
        <el-input v-model="form.sourceName" placeholder="请输入原料名称" />
      </el-form-item>
      <el-form-item label="来源：">
        <el-input v-model="form.sourceType" placeholder="请输入原料来源" />
      </el-form-item>
      <el-form-item label="数量：">
        <el-input
          v-model="form.sourceNum"
          placeholder="请输入原料数量(kg)"
        /><span
          class="detail"
          v-if="form.sourceName && form.sourceType && form.sourceNum"
          @click="add"
          >添加</span
        >
      </el-form-item>
      <el-form-item label="" v-if="form.tableData.length > 0">
        <el-table
          size="medium"
          :header-cell-style="{ 'background-color': '#f1f1f1' }"
          :data="form.tableData"
          row-key="id"
        >
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
          placeholder="请输入备注内容"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="next">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";

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
        tableData: [] as any,
      },
      add: () => {
        data.form.tableData.push({
          name: data.form.sourceName,
          source: data.form.sourceType,
          number: data.form.sourceNum,
        });
        data.form.sourceName = "";
        data.form.sourceType = "";
        data.form.sourceNum = "";
      },
      optionData: [
        { label: "种植业产品", value: "01", parentId: "" },
        { label: "粮食及其副产品", value: "0101", parentId: "01" },
        { label: "油料及其副产品", value: "0102", parentId: "01" },
        { label: "果品", value: "0103", parentId: "01" },
        { label: "蔬菜及其制品", value: "0104", parentId: "01" },
        { label: "香辛料", value: "0105", parentId: "01" },
        { label: "食用菌及其制品", value: "0106", parentId: "01" },
        { label: "饮料作物产品", value: "0107", parentId: "01" },
        { label: "糖料及其制品", value: "0108", parentId: "01" },
        { label: "纺织用植物原料", value: "0109", parentId: "01" },
        { label: "烟草", value: "0110", parentId: "01" },
        { label: "其他种植业产品", value: "0110", parentId: "01" },
        { label: "畜牧业产品", value: "02", parentId: "" },
        { label: "家畜类", value: "0201", parentId: "02" },
        { label: "家禽类", value: "0202", parentId: "02" },
        { label: "特种经济动物类", value: "0203", parentId: "02" },
        { label: "其他畜牧业产品", value: "0299", parentId: "02" },
        { label: "水产品", value: "03", parentId: "" },
        { label: "鱼", value: "0301", parentId: "03" },
        { label: "海水鱼", value: "030101", parentId: "0301" },
        { label: "淡水鱼", value: "030102", parentId: "0301" },
        { label: "虾", value: "0302", parentId: "03" },
        { label: "海水虾", value: "030201", parentId: "0302" },
        { label: "淡水虾", value: "030202", parentId: "0302" },
        { label: "蟹", value: "0303", parentId: "03" },
        { label: "海水蟹", value: "030301", parentId: "0303" },
        { label: "淡水蟹", value: "030302", parentId: "0303" },
        { label: "贝", value: "0304", parentId: "03" },
        { label: "海水贝", value: "030401", parentId: "0304" },
        { label: "淡水贝", value: "030402", parentId: "0304" },
        { label: "藻", value: "0305", parentId: "03" },
        { label: "海水藻", value: "030501", parentId: "0305" },
        { label: "淡水藻", value: "030502", parentId: "0305" },
        { label: "头足", value: "0306", parentId: "03" },
        { label: "海水头足类", value: "030601", parentId: "0306" },
        { label: "不另分类的水产品", value: "0307", parentId: "03" },
        { label: "不另分类的海水产品", value: "030701", parentId: "0307" },
        { label: "不另分类的淡水产品", value: "030702", parentId: "0307" },
      ],
      dataValue: {
        value1: "",
        value2: "",
        value3: "",
        value4: "",
      },
      value1Change: () => {
        data.dataValue.value2 = "";
        data.dataValue.value3 = "";
        data.dataValue.value4 = "";
      },
      value2Change: () => {
        data.dataValue.value3 = "";
        data.dataValue.value4 = "";
      },
      value3Change: () => {
        data.dataValue.value4 = "";
      },
      getOptionData: (parentId: string) => {
        return data.optionData.filter((item) => {
          return item.parentId === parentId;
        });
      },
    });
    const deleteClick = (row: { name: string }) => {
      console.log(row);
      data.form.tableData = data.form.tableData.filter(
        (item: { name: string; source: string; number: string }) => {
          return item.name !== row.name;
        }
      );
    };
    const next = () => {
      localStorage.setItem(
        "sourceView",
        JSON.stringify({
          ...data.form,
          ...data.dataValue,
        })
      );
      emit("activeChange", {
        active: props.active + 1,
        dataValue: data.dataValue,
        name: data.form.name,
      });
    };

    onMounted(() => {
      if (localStorage.getItem("sourceView")) {
        const viewData = JSON.parse(localStorage.getItem("sourceView") || "");
        data.form = viewData;
        data.dataValue = viewData;
      }
    });

    return {
      ...toRefs(data),
      next,
      deleteClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.item {
  margin-right: 10px;
}
.productView {
  padding: 20px 10px;
  .el-form {
    // width: 600px;
    .detail {
      color: #38a0ff;
      cursor: pointer;
    }
  }
  .el-input {
    width: 240px;
  }
  .el-textarea {
    width: 240px;
  }
  .el-select {
    width: 240px;
  }
}
</style>
