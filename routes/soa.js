const express = require("express");
const sql = require("mssql");
const router = express.Router();
const dbconfig = require("../connect/connect");
let fs = require("fs");

//router.get("/:id/:session", async (req, res) => {
router.get("/", async (req, res) => {
  let userid = req.params.id;
  let sessionid = req.params.session;
  console.log("soa-node", userid, sessionid);

  try {
    let conn = new sql.ConnectionPool(dbconfig.config);
    await conn.connect().then(function (pool) {
      var request = new sql.Request(pool);
      request.input("inUser", sql.VarChar(30), userid);
      //request.input("inSession", sql.VarChar(100), sessionid);
      request
        .execute("spLoad_SOADashboard")
        .then(function (recordset) {
          // IMPORTANT: hindi ko pa nachecheck sa db directly to

          if (recordset !== undefined) {
            res.json(recordset.recordset);
            const item = {}; //NOTE: for offline json-server
            item["session_user"] = recordset.recordset;
            var data = JSON.stringify(item, null, 2);

            fs.writeFileSync("./routes/SelectData.json", data, callback);
          }

          console.log(recordset.recordset);
          conn.close();
        })
        .catch(function (err) {
          console.error(err.message);
          res.status("400").send("Server Error");
        });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err);
  }
});

module.exports = router;

// FIX: nested select dapat ganitong data ang gagamitin kapag nested select para pwede mag offline
// const data = {
//   countries: [
//     {
//       value: 'INDIA',
//       label: 'India',
//       states: [
//         { value: 'TAMIL NADU', label: 'Tamil Nadu' },
//         { value: 'KERALA', label: 'Kerala' },
//         { value: 'ANDHRA PRADESH', label: 'Andhra Pradesh' }
//       ]
//     },
//     {
//       value: 'US',
//       label: 'USA',
//       states: [
//         { value: 'CA', label: 'California' },
//         { value: 'NY', label: 'New York' }
//       ]
//     }
//   ]
// }
////// nested select //////
