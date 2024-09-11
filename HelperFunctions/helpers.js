const xlsx = require('xlsx');
const fs = require('fs');


const convertExcelToArray = (file) => {
    try {
        const filePath = file.path;
        const workBook = xlsx.readFile(filePath);
        const sheet = workBook.Sheets[workBook.SheetNames[0]];

        const finalData = xlsx.utils.sheet_to_json(sheet);

        fs.unlinkSync(filePath);

        return finalData

    } catch (error) {

        console.log(error)
        return error
    }
};




const convertCSVToExcel = async (req, res, next) => {
    try {
        if (req.file.path.split(".")[1] == "csv") {
            let csvData = req.file.buffer.toString('utf8')

            let rows = csvData.split('\n').map(row => row.split(','))

            let ws = xlsx.utils.aoa_to_sheet(rows)

            let workBook = xlsx.utils.book_new()
            xlsx.utils.book_append_sheet(workBook, ws, 'Sheet1')

            let outputFile = req.file.path.split(".")[0] + ".xlsx"
            xlsx.writeFile(workBook, outputFile)

        }

        return next()

    } catch (error) {
        console.log(error)
        return error
    }
};







module.exports = { convertExcelToArray, convertCSVToExcel }