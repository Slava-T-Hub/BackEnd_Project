const express = require("express");
const mssql = require("mssql");

const app = express();
const PORT = 3000;

// Парсинг JSON и urlencoded данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Папка для статических файлов (если необходимо)
app.use(express.static("public"));

// Конфигурация подключения к базе данных
const sqlConfig = {
  user: "sa",
  password: "MyPass@word",
  database: "TravelDB",
  server: "localhost",
  port: 1433,
  options: {
    encrypt: false, // для локальной разработки использовать false
    trustServerCertificate: true, // для локальной разработки использовать true
  },
};

// Обработчик POST запроса для формы
app.post("/submitForm", async (req, res) => {
  const { name, email, region, country, typeOfTravel, season, descriptionOfTravel, howToGet, whereToStay } = req.body;

  console.log("Полученные данные из формы:", req.body); // Логируем полученные данные

  try {
    // Создание пула соединений
    const pool = await mssql.connect(sqlConfig);
    console.log("Подключение к базе данных успешно"); // Логируем успешное подключение

    // Выполнение хранимой процедуры InsertTravelInfo
    const result = await pool
      .request()
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

    console.log("Результат выполнения хранимой процедуры:", result); // Логируем результат выполнения

    // Закрытие пула соединений
    await pool.close();
    console.log("Соединение закрыто"); // Логируем закрытие соединения

    // Отправка ответа клиенту
    res.status(200).send("Data inserted successfully!");
  } catch (err) {
    console.error("SQL error:", err.message);
    res.status(500).send("Error inserting data into database.");
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
