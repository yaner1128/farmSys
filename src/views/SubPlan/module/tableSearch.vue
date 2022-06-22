<template>
  <div class="box_wrap">
    <div class="bigbox" v-if="isBg" @click="closeup()"></div>
    <el-select
      v-model="dataForm.processDefinitionId"
      placeholder="请选择"
      @change="handselect"
      ref="selectRef"
      @click="deptogglePanel($event)"
      multiple
      collapse-tags
    >
      <el-option
        v-for="(item, index) in processDefinition"
        :key="index"
        :label="item.companyName"
        :value="item.companyCode"
      >
      </el-option>
    </el-select>
    <div v-if="showTree" class="treeDiv" ref="tableListRef">
      <el-input
        placeholder="输入企业名称或者信用代码搜索"
        v-model="searchName"
      ></el-input>
      <el-table
        @select="handleSelectClick"
        @row-click="handleRegionNodeClick"
        @selection-change="handleChange"
        ref="moviesTable"
        :data="memberList"
        border
        :row-key="getRowKeys"
        @select-all="selectAll"
        max-height="300px"
      >
        <el-table-column
          type="selection"
          header-align="center"
          align="center"
          :reserve-selection="true"
          width="50"
        ></el-table-column>
        <el-table-column prop="companyName" label="企业名称" />
        <el-table-column prop="companyCode" label="企业信用代码" />
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, reactive, ref, toRefs, watch } from "vue";

export default defineComponent({
  props: {
    editForm: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const selectRef = ref();
    const dataFormRef = ref();
    const tableListRef = ref();
    const moviesTable = ref();

    const data = reactive({
      isBg: false, //整体背景
      isDisabled: false, //按钮重复提交
      searchName: "",
      showTree: false, // 下拉框显示隐藏
      isShowSelect: true, // 隐藏select本来的下拉框
      /* eslint-disable @typescript-eslint/no-explicit-any */
      dataForm: {
        id: 0,
        processDefinitionId: [] as any,
      },
      memberList: [] as any, // list下拉表格
      multipleSelection: [] as any, //选中行数据
      arr: [] as any, //选中行id
      //下拉框数据
      processDefinition: [
        {
          id: 1,
          companyName: "湖南省流沙河花猪生态牧业股份有限公司",
          companyCode: "91430100770098569U",
        },
        {
          id: 2,
          companyName: "湖南省吉泰农牧股份有限公司",
          companyCode: "91430281691812963R",
        },
        {
          id: 3,
          companyName: "湖南省季丰农业有限公司",
          companyCode: "914311253448565235",
        },
      ] as any,
    });

    const init = () => {
      nextTick(() => {
        data.isDisabled = false;
        data.arr = [];
        data.multipleSelection = [];
        data.dataForm.processDefinitionId = [];
      }).then(() => {
        if (props.editForm && props.editForm?.companyCode) {
          // 将当前行赋值
          data.multipleSelection = [props.editForm];
          // 选中的企业编码
          data.dataForm.processDefinitionId = [props.editForm?.companyCode];
          // mock数据，将当前数据添加到公司列表
          data.processDefinition.push(props.editForm);
        }
        methods.rowMultipleChecked(data.multipleSelection);
      });
    };
    // 初始化
    init();
    data.memberList = data.processDefinition;
    watch(
      () => props.editForm,
      () => {
        // if (props.editForm?.companyCode) {
        //   init();
        // }
        init();
      }
    );

    const methods = reactive({
      getRowKeys: (row: any) => {
        return row.companyCode;
      },
      // 表格多选框变化事件
      handleChange: (val: any) => {
        console.log(val);
        //表格中选中的行
        data.arr = [];
        for (let i in val) {
          data.arr.push(val[i].companyName);
        }
        data.dataForm.processDefinitionId = data.arr; //select赋值
        data.multipleSelection = val; //勾选放在multipleSelection数组中
      },
      // 删除选择
      handselect: (value: any) => {
        //select和表格相关联
        let resData: any = data.multipleSelection;
        let arr = [];
        if (value.length > 0) {
          //删除multipleSelection（选中的所有值）中的value
          for (let j = 0; j < resData.length; j++) {
            if (value.indexOf(resData[j].id) == -1) {
              resData.splice(j, 1);
            }
          }
          data.multipleSelection = resData;
        } else {
          data.multipleSelection = [];
          resData = [];
        }
        for (let s in resData) {
          arr.push(resData[s].id);
        }
        if (arr != null) {
          //需要判断那些值需要取消选中
          for (let i = 0; i < data.memberList.length; i++) {
            if (arr.indexOf(data.memberList[i].id) == -1) {
              nextTick(() => {
                //必写
                if (moviesTable.value && moviesTable.value != undefined) {
                  moviesTable.value.toggleRowSelection(
                    data.memberList[i],
                    false
                  );
                }
              });
            }
          }
        }
      },
      // 点击table节点
      handleRegionNodeClick: () => {
        data.showTree = true;
      },
      // 多选
      handleSelectClick: () => {
        data.showTree = true;
      },
      selectAll: () => {
        data.showTree = true;
      },
      closeup: () => {
        data.showTree = false;
        data.isBg = false;
      },
      tableHideList: (e: { target: any }) => {
        if (tableListRef.value && !tableListRef.value.contains(e.target)) {
          methods.tableHide();
        }
      },
      //表格多选框选中判断
      rowMultipleChecked: (multipleSelection: any) => {
        if (multipleSelection) {
          for (let j = 0; j < multipleSelection.length; j++) {
            for (let i = 0; i < data.memberList.length; i++) {
              if (
                multipleSelection[j].companyCode ==
                data.memberList[i].companyCode
              ) {
                //如果在后端传来的值中id存在则选中多选框
                nextTick(() => {
                  //必写
                  if (moviesTable.value && moviesTable.value != undefined) {
                    moviesTable.value.toggleRowSelection(
                      data.memberList[i],
                      true
                    );
                  }
                });
              }
            }
          }
        }
      },
      //显示表格
      tableShow: () => {
        data.showTree = true;
        document.addEventListener("click", methods.tableHideList, false);
        if (data.multipleSelection.length > 0 && data.memberList.length > 0) {
          methods.rowMultipleChecked(data.multipleSelection);
        }
      },
      //隐藏表格
      tableHide: () => {
        data.showTree = false;
        document.addEventListener("click", methods.tableHideList, false);
      },
      // 点击input 阻止冒泡 控制table显示隐藏
      deptogglePanel: (event: any) => {
        data.isBg = true;
        data.isShowSelect = !data.isShowSelect; //隐藏select本来的下拉框
        event || (event = window.event);
        event.stopPropagation
          ? event.stopPropagation()
          : (event.cancelBubble = true);
        data.showTree ? methods.tableHide() : methods.tableShow();
      },
    });
    // 隐藏select自带的下拉框
    watch(
      () => data.isShowSelect,
      () => {
        selectRef.value.blur();
      }
    );

    const clear = () => {
      data.arr = [];
      data.multipleSelection = [];
      data.dataForm.processDefinitionId = [];
    };

    return {
      ...toRefs(data),
      ...toRefs(methods),
      dataFormRef,
      selectRef,
      tableListRef,
      moviesTable,
      clear,
    };
  },
});
</script>

<style lang="scss" scoped>
.box_wrap {
  position: relative;
  .el-select {
    width: 450px;
  }
}
.bigbox {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  position: fixed;
  z-index: 9999998;
  top: 0;
  left: 0;
  opacity: 0;
}
.treeDiv {
  position: absolute;
  top: 40px;
  left: -1px;
  z-index: 9999999 !important;
  width: 100%;
  overflow: auto;
  max-height: 280px;
  border-radius: 6px;
  background: #ffffff;
  box-shadow: 0 0 6px 0px #ccc;
  padding: 5px;
}

.treeDiv::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}

.treeDiv::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}

.treeDiv::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}

.treeDiv .el-table {
  font-size: 14px;
}

.treeDiv .el-table /deep/ td {
  padding: 4px 0;
}

#selecTable .el-select {
  width: 100%;
}

#selecTable .el-input {
  width: 100%;
}

#kuan .el-form-item__content {
  width: 80%;
}
</style>
