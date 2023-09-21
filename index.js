const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = 3000;
app.use(express.json());
//receive form data from the client

const script = require("./script");

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.post("/createAttribute", (req, res) => {
  console.log("bodyRequest", req.body);
  const moduleName = req.body?.moduleName?.toString();
  const entityName = req.body?.entityName?.toString();
  const recievedAttributeType = req.body?.recievedAttributeType?.toString();
  const attributeLength = parseInt(req.body?.attributeLength);
  const token = req.body?.token?.toString();
  const attributeName = req.body?.attributeName?.toString();
  if (!moduleName || !entityName || !recievedAttributeType || !attributeLength || !token || !attributeName) {
    console.log("Missing required fields", req.body);
    return res.status(400).send("Missing required fields");
  }
  console.log("script", script);

  script
    .main(moduleName, entityName, recievedAttributeType, attributeLength, attributeName, token)
    .then((data) => {
      console.log("Attribute Created!");
      return res.status(200).send("Attribute Created!");
    })
    .catch((err) => {
      console.log("Error creating attribute", err);
      return res.status(500).send("Error creating attribute://" + err);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
