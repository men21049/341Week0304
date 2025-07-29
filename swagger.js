const swaggerAutogen = require("swagger-autogen")();

const doc = {
  insfo: {
    title: "CSE341 Contacts API",
    description: "Api for CSE341 week 03-04 Project",
  },
  host: "cse341-ww-student-code-1-sdyk.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
