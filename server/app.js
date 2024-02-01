import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";

//set up express intance
const app = express();

//set up middleware
app.use(morgan("dev")); //while in dev environment, use morgan for additinoal logging
app.use(express.urlencoded({ extended: false })); //allows express to read POST rquest
app.use(express.static("public")); //pointing tothe public folder for vite to undestand where to look. static files only?
app.use(express.json()); //lets server and front end know that they'll be communicating with JSON

//set up a global variable to simulate the DB
const TEST_DATA = [
  { id: 0, description: "Content plan", rate: 50, hours: 4 },
  { id: 1, description: "Copy writing", rate: 50, hours: 2 },
  { id: 2, description: "Website design", rate: 50, hours: 5 },
  { id: 3, description: "Website development", rate: 100, hours: 5 },
];

//Import handlerFunctions
import handlerFunctions from "./controller.js";

//Routes
//Before creating an endpoint address 4 endpoints
// 1. What is the purpose of my endpoint?
// 2. Will I need any queries/params/body objects fror receiving data>
// 3. What will endpoint string look like?
// 4. What do I want the response to look like when the front end recevies it.

//First endpoint (GET) answers:
// - When the front end makes a request to "/invoices", we want our server to send an array of invoices
// 1. Get a list of all invoices (TEST-DATA)
// 2. No - generic request for all test data
// 3. "/invoices"
// 4. Array of invoice objects
app.get("/invoices", handlerFunctions.getInvoices);

//2nd endpoint (POST)
// 1. Add new row of invoice data to our TEST-DATA in controller
// 2. Yes, req body to contain the new invoice object
// 3. "/invoice/add"
// 4. Send back just the new object with a confirmation
app.post("/invoice/add", handlerFunctions.addInvoice);

//3rd endpoint (DELETE)
// 1. DELETE A SPECIFIED INVOICE FROM test-data
// 2. Yes, req.params for id
// 3. "/invoice/delete/:id"
// 4. Send back the boolean comfirmation
app.delete("/invoice/delete/:id", handlerFunctions.deleteInvoice);

//4th endpoint
// 1. Update the rate.description on a specific invoice
// 2. id - req.params, rate/description/hours = req.body
// 3. (/invoice/update/:id)
// 4. Send back the updates invoice wiht confirmation
app.put("/invoice/update/:id", handlerFunctions.updateInvoice);

//Open up the door to the server
ViteExpress.listen(app, 8888, () =>
  console.log(`It's IN the computer.. at http://localhost:8888`)
);
