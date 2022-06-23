const projectList = [
  {
    status: 200,
    message: "success",
    data: {
      total: 100,
      "data|10": [
        {
          id: "@guid",
          date: "@datetime",
        },
      ],
    },
  },
];
export default {
  "post|api/projectList": projectList,
};
