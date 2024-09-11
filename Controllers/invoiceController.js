const { convertExcelToArray } = require("../HelperFunctions/helpers")
const { checkDateFormat, totalAmountTypeCheck, itemPriceTypeCheck, itemQuantityTypeCheck, itemTotalTypeCheck, uniqueInvoiceValidation, allFieldsValidation } = require("../ErrorHandler/errorHandler")
const invoiceModel = require("../Models/invoiceModel")
const { v4: uuidv4 } = require('uuid');
const { invoiceGenerated } = require("../ConstValues/constValues")


//=================  Generate Invoice API  =================//

const generateInvoice = async (req, res) => {
    try {
        let file;
        if (req.file.path.split(".")[1] == "csv") {
            file = req.file.path.split(".")[0] + ".xlsx"
        } else {
            file = req.file
        }
        let excelData = convertExcelToArray(file)


        let finalData = []
        let errorsArray = []
        let uniqueInvoiceObj = {}
        

        for (let i = 0; i < excelData.length; i++) {
            let items = excelData[i]
            let itemsArray = []
            let invoiceObj = {}


            if (finalData.length != 0) {
                if (finalData[finalData.length - 1]["Customer Name"] == items["Customer Name"]) {

                    // All Fields Are Required Validation
                    allFieldsValidation(items, invoiceObj, errorsArray)

                    finalData[finalData.length - 1]["Items"].push({
                        "Item Id": uuidv4(),
                        "Item Description": items["Item Description"],
                        "Item Quantity": items["Item Quantity"],
                        "Item Price": items["Item Price"],
                        "Item Total": items["Item Total"]
                    })

                    checkDateFormat(invoiceObj, items["Date"], errorsArray)
                    itemPriceTypeCheck(invoiceObj, items["Item Price"], errorsArray)
                    itemQuantityTypeCheck(invoiceObj, items["Item Quantity"], errorsArray)
                    itemTotalTypeCheck(invoiceObj, items["Item Total"], errorsArray)
                    totalAmountTypeCheck(invoiceObj, items["Total Amount"], errorsArray)

                    continue;

                } else if (finalData[finalData.length - 1]["Customer Name"] != items["Customer Name"]) {

                    // Logging successful invoice creations
                    (function (invoice) {
                        setTimeout(() => {
                            console.log(invoiceGenerated, invoice);
                        }, i * 2000);
                    })(finalData[finalData.length - 1])
                }
            }

            errorsArray = []

            // All Fields Are Required Validation
            allFieldsValidation(items, invoiceObj, errorsArray)

            invoiceObj["Customer Name"] = items["Customer Name"]

            //Unique Invoice Validation
            uniqueInvoiceValidation(invoiceObj, uniqueInvoiceObj, items["Invoice Number"], errorsArray)
            invoiceObj["Invoice Number"] = items["Invoice Number"]

            // Date Format Validation
            checkDateFormat(invoiceObj, items["Date"], errorsArray)
            invoiceObj["Date"] = items["Date"]


            // Number Type Validations
            itemPriceTypeCheck(invoiceObj, items["Item Price"], errorsArray)
            itemQuantityTypeCheck(invoiceObj, items["Item Quantity"], errorsArray)
            itemTotalTypeCheck(invoiceObj, items["Item Total"], errorsArray)

            itemsArray.push({
                "Item Id": uuidv4(),
                "Item Description": items["Item Description"],
                "Item Quantity": items["Item Quantity"],
                "Item Price": items["Item Price"],
                "Item Total": items["Item Total"]
            })
            invoiceObj["Items"] = itemsArray

            //Number Type Validation
            totalAmountTypeCheck(invoiceObj, items["Total Amount"], errorsArray)
            invoiceObj["Total Amount"] = items["Total Amount"]

            invoiceObj["Errors"] = errorsArray

            finalData.push(invoiceObj)

            if (excelData.length <= 1) {
                console.log(invoiceGenerated, finalData[0])
            }
        }


        await invoiceModel.create(finalData)
        return res.status(201).json({ message: finalData })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
};







//=================  Update Invoice API  =================//


const updateInvoice = async (req, res) => {
    try {
        let invoiceId = req.params.invoiceId
        let changesNeeded = req.body

        let updatedInvoice = await invoiceModel.findOneAndUpdate({ "Invoice Number": invoiceId }, changesNeeded, { new: true })

        return res.status(200).json({ message: "Invoice successfully updated!", updatedInvoice })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
};






//=================  Update Items API  =================//

const updateItems = async (req, res) => {
    try {
        let itemId = req.params.itemId
        let invoiceId = req.params.invoiceId
        let changesNeeded = Object.keys(req.body)

        let invoiceData = await invoiceModel.findOne({ "Invoice Number": invoiceId })
        let invoiceItem = invoiceData["Items"]


        invoiceItem.map(async items => {
            if (items["Item Id"] == itemId) {
                for (let keys in items) {
                    if (changesNeeded.includes(keys)) {
                        items[keys] = req.body[keys]
                    }
                }
            }
        })

        await invoiceModel.updateOne({ "Invoice Number": invoiceId }, invoiceData, { new: true })

        return res.status(200).json({ message: "Invoice successfully updated!" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
};



module.exports = { generateInvoice, updateInvoice, updateItems }