<template>
  <div class="content">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label=" 基本信息 " name="first">
        <el-form :model="form" label-width="100px" class="elForm">
          <el-form-item label="公司名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入公司名称" />
          </el-form-item>
          <el-form-item label="经营状况" prop="operaCondition">
            <el-radio-group v-model="form.operaCondition">
              <el-radio label="营业中" />
              <el-radio label="停业" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="公司标签" prop="tags">
            <el-checkbox-group v-model="form.tags">
              <el-checkbox label="生产型企业" name="tags" />
              <el-checkbox label="高新企业" name="tags" />
              <el-checkbox label="深加工企业" name="tags" />
              <el-checkbox label="初加工企业" name="tags" />
              <el-checkbox label="贸易型企业" name="tags" />
              <el-checkbox label="示范企业" name="tags" />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="年利率" prop="rate">
            <el-slider v-model="form.rate" show-input />
          </el-form-item>
          <el-form-item label="主要销售渠道">
            <el-tag
              v-for="tag in form.channel"
              :key="tag"
              closable
              :disable-transitions="false"
              size="large"
              @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              v-if="inputVisible"
              ref="InputRef"
              v-model="inputValue"
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
            />
            <el-button v-else class="button-new-tag ml-1" @click="showInput">
              +
            </el-button>
          </el-form-item>
          <el-form-item label="备注" prop="remarks">
            <el-input
              v-model="form.remarks"
              type="textarea"
              placeholder="请输入内容"
            />
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button>Cancel</el-button>
          </el-form-item> -->
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, reactive, ref, toRefs } from "vue";

export default defineComponent({
  name: "Setting",
  setup() {
    const data = reactive({
      activeName: "first",
      inputVisible: false,
      inputValue: "",
      form: {
        name: "",
        operaCondition: "营业中",
        tags: ["生产型企业", "贸易型企业"],
        rate: 30,
        channel: ["代理商", "加盟商", "批发", "自营门店", "零售"],
        remarks: "",
      },
    });
    // 标签删除事件
    const handleClose = (tag: string) => {
      data.form.channel.splice(data.form.channel.indexOf(tag), 1);
    };
    // 切换显示输入框
    const InputRef = ref();
    const showInput = () => {
      data.inputVisible = true;
      nextTick(() => {
        InputRef.value?.input?.focus();
      });
    };
    // 新增新标签
    const handleInputConfirm = () => {
      if (data.inputValue) {
        data.form.channel.push(data.inputValue);
      }
      data.inputVisible = false;
      data.inputValue = "";
    };

    return {
      ...toRefs(data),
      handleClose,
      showInput,
      InputRef,
      handleInputConfirm,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-input {
  width: 240px;
}
.content {
  background-color: #fff;
  padding: 10px;
  height: calc(100vh - 150px);
  .elForm {
    width: 800px;
  }
  .el-tag {
    margin-right: 10px;
  }
}
</style>
