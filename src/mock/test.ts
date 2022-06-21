const projectList = [
  {
    status: 200,
    message: "success",
    data: {
      total: 100,
      "data|10": [
        {
          id: "@guid",
          "name|1": [
            "桃江稻花香米",
            "桃江七月醉米",
            "小麦",
            "玉米",
            "大豆",
            "油菜",
            "花生",
            "香蕉",
            "荔枝",
          ],
          "type|1": ["梗稻谷", "梗糯稻谷", "粮食及其副产品类", "果品"],
          "status|1": ["未开始", "待填报", "审核中", "已完成"],
          date: "@datetime",
        },
      ],
    },
  },
];
export default {
  "post|api/projectList": projectList,
};
