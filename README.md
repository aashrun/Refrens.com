To install and run on the local machine, follow the below steps - 

1. git clone >the repo link goes here<
2. cd Refrens.com
3. npm install
4. npx nodemon app.js




# Invoice Management API

This API provides endpoints to manage invoices by generating, updating invoices, and updating individual items within an invoice. It includes validation mechanisms for required fields, data formats, and unique invoice identification.

## Table of Contents

- [Generate Invoice API](#generate-invoice-api)
- [Update Invoice API](#update-invoice-api)
- [Update Items API](#update-items-api)

---

## Generate Invoice API

**Endpoint:** `POST refrens/generateInvoice`

This API is used to generate new invoices from a CSV or Excel file. It performs the following tasks:

- Converts the uploaded file (CSV or Excel) into an array of invoice data.
- Validates the required fields for each invoice.
- Checks for unique invoice numbers to avoid duplication.
- Performs type checks for the item prices, quantities, totals, and date formats.
- Logs the successful creation of each invoice with a small delay between logs.
- If all validations pass, the invoices are stored in the database.

### Request
- **File:** A CSV or Excel file containing invoice data.
  
### Response
- **Success:** HTTP 201 status with the message containing all generated invoice data.
- **Failure:** HTTP 500 status with an error message.

### Example Response:
```json
{
  "message": [
    {
      "Customer Name": "John Doe",
      "Invoice Number": "INV12345",
      "Date": "2024-09-11",
      "Items": [
        {
          "Item Id": "6f2c4a59-e5a3-4d02-8f91-5f2d999",
          "Item Description": "Laptop",
          "Item Quantity": 2,
          "Item Price": 1200,
          "Item Total": 2400
        }
      ],
      "Total Amount": 2400,
      "Errors": []
    }
  ]
}
```


## Update Invoice API

**Endpoint:** `PUT refrens/updateInvoice/:invoiceId`

This API allows updating an existing invoice. You can modify fields such as the customer name, date, total amount, or items.

### Request
- **Parameters:**
  - `invoiceId`: The invoice number to be updated.
- **Body:** The JSON object containing the fields to be updated.

### Response
- **Success:** HTTP 200 status with a message confirming the update along with the updated invoice.
- **Failure:** HTTP 500 status with an error message if something goes wrong.

### Example Request Body:
```json
{
  "Customer Name": "Jane Doe",
  "Date": "2024-09-12",
  "Total Amount": 3500
}
```

### Example Response Body:
```json
{
  "message": "Invoice successfully updated!",
  "updatedInvoice": {
    "Customer Name": "Jane Doe",
    "Invoice Number": "INV12345",
    "Date": "2024-09-12",
    "Items": [
      {
        "Item Id": "7f3c1a99-d5a7-41e2-bf95-5c7d123",
        "Item Description": "Smartphone",
        "Item Quantity": 1,
        "Item Price": 700,
        "Item Total": 700
      }
    ],
    "Total Amount": 3500
  }
}
```



## Update Items API

**Endpoint:** `PUT refrens/updateItems/:invoiceId/:itemId`

This API allows updating specific items within an existing invoice. The item to be updated is identified by the `itemId`, and the necessary fields in the item can be modified.

### Request
- **Parameters:**
  - `invoiceId`: The invoice number that contains the item to be updated.
  - `itemId`: The unique identifier of the item to be updated.
- **Body:** The JSON object containing the fields to be updated within the item.

### Response
- **Success:** HTTP 200 status with a message confirming that the item was updated.
- **Failure:** HTTP 500 status with an error message if an error occurs.

### Example Request Body:
```json
{
  "Item Description": "Wireless Headphones",
  "Item Quantity": 3,
  "Item Price": 150,
  "Item Total": 450
}
```

### Example Response Body:
``` json
{
  "message": "Invoice successfully updated!"
}
```
