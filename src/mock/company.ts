// 企业列表
const companyList = [
  {
    status: 200,
    message: "success",
    data: {
      total: 100,
      "data|10": [
        {
          id: "@guid",
          companyCode: "@guid",
          "companyName|1": [
            "湖南省流沙河花猪生态牧业股份有限公司",
            "湖南省吉泰农牧股份有限公司",
            "湖南省季丰农业有限公司",
            "湖南省林大生物科技有限公司",
          ],
          "tags|1": [
            ["生产型企业"],
            ["高新企业"],
            ["深加工企业"],
            ["初加工企业"],
            ["贸易型企业"],
          ],
          password: "@guid",
          "status|1": ["营业中", "停业"],
          "planType|1": ["年报", "半年报", "季报", "月报", "周报"],
        },
      ],
    },
  },
];
// 报送详情
const companyDetails = [
  {
    status: 200,
    message: "success",
    data: {
      total: 100,
      "data|10": [
        {
          id: "@guid",
          productCode: "@guid",
          "productName|1": [
            "稻花香米",
            "玉米",
            "芹菜",
            "小麦",
            "鲤鱼",
            "小龙虾",
          ],
          "productType|1": ["淡水鱼", "稻谷", "粮食", "蔬菜"],
          date: "@datetime",
          productNum: /\d{2,4}吨/,
          salesNum: /\d{1,3}吨/,
        },
      ],
    },
  },
];
export default {
  "post|api/getCompanyList": companyList,
  "post|api/getCompanyDetails": companyDetails,
};
