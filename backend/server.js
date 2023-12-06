
const dotenv = require("dotenv");
const app = require("./app");
const connectDatabase = require("./config/db");

let server; 

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

dotenv.config({ path: "config/config.env" });

connectDatabase();

const PORT = process.env.PORT || 5500;


server = app.listen(PORT, () => { 
  console.log(`Server is running on this Port: ${PORT}`);
});


process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
