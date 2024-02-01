let TEST_DATA = [
  { id: 0, description: "Content plan", rate: 50, hours: 4 },
  { id: 1, description: "Copy writing", rate: 50, hours: 2 },
  { id: 2, description: "Website design", rate: 50, hours: 5 },
  { id: 3, description: "Website development", rate: 100, hours: 5 },
];

let globalId = 4;

const handlerFunctions = {
  getInvoices: (req, res) => {
    res.send({
      message: "All invoices from TEST-DATA",
      invoices: TEST_DATA,
    });
  },

  addInvoice: (req, res) => {
    //get the description from body
    const { description } = req.body;
    //create a new invoice object
    const newInvoice = {
      id: globalId,
      description: description,
      rate: 0,
      hours: 0,
    };
    //push that new object into TEST-DATA
    TEST_DATA.push(newInvoice);
    //increment globalId
    globalId++;
    //Send back the new object to the front end
    res.send({
      message: "New invoice added to the TEST_DATA",
      newInvoice: newInvoice,
    });
  },

  deleteInvoice: (req, res) => {
    //grab id from params
    const { id } = req.params;
    //delete the element
    TEST_DATA = TEST_DATA.filter((invoice) => {
      return invoice.id !== +id;
    });
    res.send({
      message: "I tried to delete the invoice",
      status: true,
    });
  },

  updateInvoice: (req, res) => {
    const { id } = req.params;
    const { rate, hours, description } = req.body;

    const index = TEST_DATA.findIndex((invoice) => {
      return invoice.id === +id;
    });
    //with that index, I can mark that invoice
    const invoiceToUpdate = TEST_DATA[index];
    //now just update the attributes of invoiceToUpdate
    invoiceToUpdate.description = description;
    invoiceToUpdate.rate = +rate;
    invoiceToUpdate.hours = +hours;

    res.send({
      message: "Invoice updated",
      updatedInvoice: invoiceToUpdate,
    });
  },
};

export default handlerFunctions;
