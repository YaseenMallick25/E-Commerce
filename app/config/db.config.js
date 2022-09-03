module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "0786",
    //PORT : 5432,
    DB: "store",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};