const express = require("express");
const mssql = require("mssql");
const app = express();
const PORT = 3000;
//===============================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//===============================================
app.use(express.static("public"));
//===============================================
const sqlConfig = {
  user: "Slava",
  password: "MyPass@word",
  database: "TravelDB",
  server: "localhost",
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};
//===============================================
app.post("/submitForm", async (req, res) => {
  const { name, email, region, country, typeOfTravel, season, descriptionOfTravel, howToGet, whereToStay } = req.body;

  try {
    const pool = await mssql.connect(sqlConfig);

    const result = await pool
      .request()
      .input("ID", mssql.NVarChar(100), id)
      .input("Name", mssql.NVarChar(100), name)
      .input("Email", mssql.NVarChar(100), email)
      .input("Region", mssql.NVarChar(50), region)
      .input("Country", mssql.NVarChar(100), country)
      .input("TypeOfTravel", mssql.NVarChar(50), typeOfTravel)
      .input("Season", mssql.NVarChar(50), season)
      .input("DescriptionOfTravel", mssql.NVarChar(mssql.MAX), descriptionOfTravel)
      .input("HowToGet", mssql.NVarChar(mssql.MAX), howToGet)
      .input("WhereToStay", mssql.NVarChar(mssql.MAX), whereToStay)
      .execute("InsertTravelInfo");

    await pool.close();

    res.status(200).send("Data inserted successfully!");
  } catch (err) {
    console.error("SQL error:", err.message);
    res.status(500).send("Error inserting data into database.");
  }
});
//===============================================
app.get("/getAllTravelInfo", async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);

    const result = await pool.request().execute("GetAllTravelInfo");

    await pool.close();

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error("SQL error:", err.message);
    res.status(500).send("Error fetching travel data from database.");
  }
});

//===============================================

//===============================================

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
