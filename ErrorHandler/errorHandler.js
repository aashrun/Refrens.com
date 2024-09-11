const moment = require("moment")
const { wrongDateFormatValidation, totalAmountValidation, itemPriceValidation, itemQuantityValidation, itemTotalValidation, duplicateInvoice, noInvoiceNumber, noDate, noCustomerName, noTotalAmount, noItemDescription, noItemQuantity, noItemPrice, noItemTotal } = require("../ConstValues/constValues")


const checkDateFormat = (data, date, errorsArray) => {
    try {
        const format = 'YYYY-MM-DD';
        const isValidDate = moment(date, format, true).isValid();

        if (isValidDate == true) {
            return isValidDate

        } else {
            errorsArray.push(wrongDateFormatValidation)
            data["Errors"] = errorsArray

            return errorsArray
        }

    } catch (error) {
        console.log(error)
        return error
    }

};




const totalAmountTypeCheck = (data, totalAmount, errorsArray) => {
    try {
        if (typeof totalAmount != "number") {
            errorsArray.push(totalAmountValidation)
            data["Errors"] = errorsArray

            return errorsArray
        } else {
            return true
        }
    } catch (error) {
        console.log(error)
        return error
    }
};






const itemPriceTypeCheck = (data, itemPrice, errorsArray) => {
    try {
        if (typeof itemPrice != "number") {
            errorsArray.push(itemPriceValidation)
            data["Errors"] = errorsArray

            return errorsArray
        } else {
            return true
        }
    } catch (error) {
        console.log(error)
        return error
    }
};





const itemQuantityTypeCheck = (data, itemQuantity, errorsArray) => {
    try {
        if (typeof itemQuantity != "number") {
            errorsArray.push(itemQuantityValidation)
            data["Errors"] = errorsArray

            return errorsArray
        } else {
            return true
        }
    } catch (error) {
        console.log(error)
        return error
    }
};





const itemTotalTypeCheck = (data, itemTotal, errorsArray) => {
    try {
        if (typeof itemTotal != "number") {
            errorsArray.push(itemTotalValidation)
            data["Errors"] = errorsArray

            return errorsArray
        } else {
            return true
        }
    } catch (error) {
        console.log(error)
        return error
    }
};




const uniqueInvoiceValidation = (data, obj, invoiceNumber, errorsArray) => {
    try {
        if (!obj[invoiceNumber]) {
            obj[invoiceNumber] = 1
        } else {
            errorsArray.push(duplicateInvoice)
            data["Errors"] = errorsArray

            return errorsArray
        }
    } catch (error) {
        console.log(error)
        return error
    }
};




const allFieldsValidation = (data, obj, errorsArray) => {
    if (!data["Invoice Number"]) {
        errorsArray.push(noInvoiceNumber)
        obj["Errors"] = errorsArray

        return errorsArray
    }

    if (!data["Date"]) {
        errorsArray.push(noDate)
        obj["Errors"] = errorsArray

        return errorsArray
    }

    if (!data["Customer Name"]) {
        errorsArray.push(noCustomerName)
        obj["Errors"] = errorsArray

        return errorsArray
    }

    if (!data["Total Amount"]) {
        errorsArray.push(noTotalAmount)
        obj["Errors"] = errorsArray

        return errorsArray
    }

    if (!data["Item Description"]) {
        errorsArray.push(noItemDescription)
        obj["Errors"] = errorsArray

        return errorsArray
    }

    if (!data["Item Quantity"]) {
        errorsArray.push(noItemQuantity)
        obj["Errors"] = errorsArray

        return errorsArray
    }

    if (!data["Item Price"]) {
        errorsArray.push(noItemPrice)
        obj["Errors"] = errorsArray

        return errorsArray
    }

    if (!data["Item Total"]) {
        errorsArray.push(noItemTotal)
        obj["Errors"] = errorsArray

        return errorsArray
    }

    return
}






module.exports = { checkDateFormat, totalAmountTypeCheck, itemPriceTypeCheck, itemQuantityTypeCheck, itemTotalTypeCheck, uniqueInvoiceValidation, allFieldsValidation }