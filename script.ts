// import { domainmodels } from "mendixmodelsdk";
// import { MendixPlatformClient, setPlatformConfig } from "mendixplatformsdk";
// async function main() {
//   setPlatformConfig({
//     mendixToken:
//       "7Tsbdz362meSQVE8YzfKp3FaL4XHNgappmih8KSXWxXHi9h2AfsCvLSY537WwTJAFqJ1WPzMXXXjLQfmLLjC6f2wrEvpDrVzkZkV",
//   });
//   const client = new MendixPlatformClient();
//   const app = await client.getApp("fa517ca0-7b0c-4db6-9b64-039cfed357e7");
//   const workingCopy = await app.createTemporaryWorkingCopy("main");
//   //set platform config from Imendixplatformconfig
//   //use this platform config to set the client
//   const model = await workingCopy.openModel();
//   const mendixModel = model.allModules().filter((module) => module.name === "MyFirstModule")[0];
//   const loadModule = await mendixModel.domainModel.load();
//   const entityToCreateAttributeIn = loadModule.entities.filter((entity) => entity.name === "myEntity")[0];
//   //create attribute
//   const attribute = domainmodels.Attribute.createIn(entityToCreateAttributeIn);
//   const attributeType = domainmodels.StringAttributeType.createInAttributeUnderType(attribute);
//   attributeType.length = 100;
//   attribute.name = "CreatedAttribute";
//   //   attribute.type = domainmodels.StringAttributeType.createIn(attribute);

//   //   attributeType.attribute.documentation = "This attribute was created by the Mendix Model SDK";

//   await model.flushChanges();
//   await workingCopy.commitToRepository("main");
// }

// main().catch(console.error);
