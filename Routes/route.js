const express = require('express');
const router = express.Router();
const multer = require('multer');
let { generateInvoice, updateInvoice, updateItems } = require("../Controllers/invoiceController")
let upload = multer({ dest: 'uploads/' });
const { convertCSVToExcel } = require("../HelperFunctions/helpers")





router.post("/generateInvoice", upload.single('file'), convertCSVToExcel, generateInvoice)

router.put("/updateInvoice/:invoiceId", updateInvoice)

router.put("/updateItems/:invoiceId/:itemId", updateItems)




//====================================  Invalid API  ==========================================//
router.all("/**", function (req, res) {
    res.status(404).send({
        message: "The api you requested is not available!"
    })
})




module.exports = router;