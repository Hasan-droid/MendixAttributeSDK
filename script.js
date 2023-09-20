"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mendixmodelsdk_1 = require("mendixmodelsdk");
const mendixplatformsdk_1 = require("mendixplatformsdk");
async function main(moduleName, entityName, recievedAttributeType, attributeLength, attributeName, token) {
  //take off the spaces from the attribute name
  const trimedAttributeName = attributeName.replace(/\s/g, "");
  (0, mendixplatformsdk_1.setPlatformConfig)({
    mendixToken:
      "7Tsbdz362meSQVE8YzfKp3FaL4XHNgappmih8KSXWxXHi9h2AfsCvLSY537WwTJAFqJ1WPzMXXXjLQfmLLjC6f2wrEvpDrVzkZkV",
  });
  const client = new mendixplatformsdk_1.MendixPlatformClient();
  const app = await client.getApp("b49e1a2e-3d76-4ab0-ab42-0bcbb14b988b");
  const workingCopy = await app.createTemporaryWorkingCopy("main");
  const model = await workingCopy.openModel();
  const mendixModel = model.allModules().filter((module) => module.name === moduleName)[0];
  if (!mendixModel) {
    throw new Error("Module not found");
  }
  const loadModule = await mendixModel.domainModel.load();
  const entityToCreateAttributeIn = loadModule.entities.filter((entity) => entity.name === entityName)[0];
  if (!entityToCreateAttributeIn) {
    throw new Error("Entity not found");
  }
  //create attribute
  const attribute = mendixmodelsdk_1.domainmodels.Attribute.createIn(entityToCreateAttributeIn);
  const attributeType = mendixmodelsdk_1.domainmodels.StringAttributeType.createInAttributeUnderType(attribute);
  attributeType.length = attributeLength;
  attribute.name = trimedAttributeName;
  await model.flushChanges();
  //commit changes directly to the repository with out creating a pull request
  await workingCopy.commitToRepository("main", { commitMessage: `Created attribute ${attribute.name}` });
  //close connection to the working copy
  await model.closeConnection();
}
//export main function as default;
exports.main = main;
