const connect = {
  config: {
    server: "AXAPTATESTENVT",
    database: "Estatement",
    user: "axtest_sa",
    password: "axtest@06182020",
    options: {
      encrypt: false,
      enableArithAbort: true,
    },
  },
  port: function () {
    var portdata = process.env.PORT || 5000;
    return portdata;
  },
};

module.exports = connect;
