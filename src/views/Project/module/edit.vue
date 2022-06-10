<template>
  <el-dialog
    :close-on-click-modal="false"
    :append-to-body="true"
    v-model="dialog"
    title="编辑"
    width="1200px"
  >
    <div class="content">
      <el-form label-position="right" label-width="100px">
        <el-form-item label="产品名称：">
          <el-input
            class="item"
            v-model="editForm.name"
            placeholder="请输入产品名称"
            @change="productNameEdit = true"
          />
          <el-button v-if="productNameEdit" type="primary" plain
            >提交产品修改</el-button
          >
        </el-form-item>
        <el-form-item label="产品品类：">
          <el-select
            v-model="value1"
            placeholder="Select"
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
            v-model="value2"
            placeholder="Select"
            class="item"
            v-show="value1"
            @change="value2Change"
          >
            <el-option
              v-for="item in getOptionData(value1)"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-model="value3"
            placeholder="Select"
            class="item"
            v-show="value2"
            @change="value3Change"
          >
            <el-option
              v-for="item in getOptionData(value2)"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-model="value4"
            placeholder="Select"
            class="item"
            v-show="value3"
          >
            <el-option
              v-for="item in getOptionData(value3)"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="原材料列表" name="1">
          <template #title>
            <div class="title">原材料列表</div>
          </template>
          <div>
            <el-table
              :data="materData"
              :expand-row-keys="expandKey"
              row-key="id"
            >
              <el-table-column prop="name" label="原材料名称" />
              <el-table-column prop="source" label="来源" />
              <el-table-column prop="number" label="数量" />
              <el-table-column label="操作">
                <template #default="{ row }">
                  <el-button type="success" plain @click="editMater(row)"
                    >编辑</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column label="" type="expand">
                <template #default>
                  <el-form
                    ref="ruleFormRef"
                    :model="rowForm"
                    :rules="rules"
                    label-width="100px"
                  >
                    <el-form-item label="原料品类：" prop="type">
                      <el-input v-model="rowForm.type" />
                    </el-form-item>
                    <el-form-item label="数量：" prop="number">
                      <el-radio-group v-model="rowForm.number">
                        <el-radio label="1">营业中</el-radio>
                        <el-radio label="2">停业</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="标签：" prop="tag">
                      <el-checkbox-group v-model="rowForm.tag">
                        <el-checkbox label="基本原材料" name="tag" />
                        <el-checkbox label="辅助原材料" name="tag" />
                        <el-checkbox label="添加剂" name="tag" />
                        <el-checkbox label="副产品" name="tag" />
                        <el-checkbox label="初加工" name="tag" />
                        <el-checkbox label="深加工" name="tag" />
                      </el-checkbox-group>
                    </el-form-item>
                    <el-form-item>
                      <el-button
                        :loading="loading"
                        type="primary"
                        @click="editMaterSubmit()"
                        >修改原材料</el-button
                      >
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
        <el-collapse-item title="年均产量" name="2">
          <template #title>
            <div class="title">年均产量</div>
          </template>
          <div class="content">
            <el-form label-position="right" label-width="100px">
              <el-form-item label="年均产量：">
                <el-input
                  class="item"
                  v-model="editForm.yearTotal"
                  placeholder="请输入年均产量"
                  @change="yearTotalEdit = true"
                />
                <el-button :disabled="!yearTotalEdit" type="primary" plain
                  >提交</el-button
                >
              </el-form-item></el-form
            >
          </div>
        </el-collapse-item>
        <el-collapse-item title="年均销量" name="3">
          <template #title>
            <div class="title">年均销量</div>
          </template>
          <div class="content">
            <el-button type="primary" @click="addSales">新增</el-button>
            <el-table
              :data="salesVolumeData"
              size="medium"
              :header-cell-style="{ 'background-color': '#f1f1f1' }"
              :expand-row-keys="expandKey"
              row-key="id"
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
              <el-table-column label="操作">
                <template #default="{ row }">
                  <el-button type="success" plain @click="editMater(row)"
                    >编辑</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column label="" type="expand">
                <template #default>
                  <el-form
                    ref="ruleFormRef"
                    :model="rowForm"
                    :rules="rules"
                    label-width="100px"
                  >
                    <el-form-item label="渠道名称：">
                      <el-input v-model="rowForm.channel" />
                    </el-form-item>
                    <el-form-item label="是否启用：">
                      <el-radio-group v-model="rowForm.isEnable">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="销量：">
                      <el-input v-model="rowForm.salesNum" />
                    </el-form-item>
                    <el-form-item>
                      <el-button
                        :loading="loading"
                        type="primary"
                        @click="editMaterSubmit()"
                        >提交</el-button
                      >
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <template #footer class="dialog-footer">
      <el-button :loading="loading" type="primary" @click="submitClick()"
        >关闭</el-button
      >
    </template>
    <AddSales ref="addSalesRef"></AddSales>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import AddSales from "./addSales.vue";

export default defineComponent({
  emits: ["init"],
  components: {
    AddSales,
  },
  setup(props, { emit }) {
    const addSalesRef = ref();
    const data = reactive({
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
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      loading: false,
      dialog: false,
      editForm: {
        name: "",
        type: "",
        yearTotal: "",
      },
      productNameEdit: false,
      yearTotalEdit: false,
      value: 1,
      activeName: "",
      materData: [
        { id: "1", name: "梗稻", source: "省内", number: "35吨" },
        { id: "2", name: "食用石蜡", source: "省外", number: "100公斤" },
      ],
      expandKey: [] as string[],
      rowForm: {
        channel: "",
        isEnable: "",
        type: "",
        number: "",
        tag: [],
        salesNum: "",
      },
      rules: {
        type: [
          {
            required: true,
            message: "请输入原料品类",
            trigger: "blur",
          },
        ],
      },
      editMater: (row: any) => {
        data.expandKey = [row.id];
        data.rowForm = JSON.parse(JSON.stringify(row));
      },
      editMaterSubmit: () => {
        // 提交修改，刷新表格
        data.expandKey = [];
      },
      salesVolumeData: [
        { id: "a1", channel: "电商", isEnable: false, salesNum: 0 },
        { id: "a2", channel: "代理商", isEnable: true, salesNum: 60 },
        { id: "a3", channel: "自营门店", isEnable: true, salesNum: 20 },
        { id: "a4", channel: "大型商超", isEnable: true, salesNum: 20 },
      ],
      addSales: () => {
        addSalesRef.value.open();
        data.expandKey = [];
      },
      value1Change: () => {
        data.value2 = "";
        data.value3 = "";
        data.value4 = "";
      },
      value2Change: () => {
        data.value3 = "";
        data.value4 = "";
      },
      value3Change: () => {
        data.value4 = "";
      },
    });
    // 显示弹出框
    const openDialog = (row: any) => {
      data.dialog = true;

      data.editForm = row;
    };
    // 修改提交
    const submitClick = () => {
      data.dialog = false;
      data.loading = false;

      emit("init");
    };

    const getOptionData = (parentId: string) => {
      return data.optionData.filter((item) => {
        return item.parentId === parentId;
      });
    };

    return {
      ...toRefs(data),
      openDialog,
      submitClick,
      addSalesRef,
      getOptionData,
    };
  },
});
</script>

<style lang="scss" scoped>
.wrap {
  max-height: 600px;
}
.green {
  color: #67c23a;
}
.red {
  color: #f56c6c;
}
/deep/ .el-input {
  width: 180px;
}
.content {
  padding: 10px;
  .item {
    margin-right: 20px;
  }
  /deep/ .el-collapse-item__header {
    background-color: #169bd5;
    color: #fff;
  }
  .title {
    width: 100%;
    display: flex;
    justify-content: center;
    background: #169bd5;
    color: #fff;
    font-size: 17px;
  }
}
</style>
