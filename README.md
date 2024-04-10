# UTIBU API

node pro

## START HERE

### PREREQUISITES

- NODEJS
- MSSQL

### SETUP

#### Setup Project and Dependencies

- Clone this repo

- `npm install`

#### Setup DB

- Create a **.env** file and add these environment variables. Use a development DB to avoid your valuable data being overwritten. 

```env
JWT_SECRET
PORT
MSSQL_USERNAME
MSSQL_DATABASE_NAME
MSSQL_SERVER_NAME
MSSQL_PASSWORD
MSSQL_SERVER_PORT

```

- To create the Database , go to the /Database folder in this repo



- Run `npm run dev` to start up the development server


 Utibu health is a health facility that caters for patients with chronic conditions such as HIV, diabetes and hypertension. Stable patients can be given medication to last several months without having to return for a doctor’s visit. They can also refill their prescriptions at the pharmacy without having to see a doctor. The pharmacist at Utibu health has an inventory system that manages the stock of medication items, customer orders, sales, invoices and payments. It runs on Microsoft SQL Server and on a legacy desktop application developed in Delphi.

 

The pharmacist wishes that their clients are able to make orders for their medication remotely from a mobile app and if an order is successful, based on the level of stock in the pharmacy in the current database, indicate to the client that it has been confirmed. Then the client visits the health facility to pick their medication or can have the medication sent to them. The client may pay immediately or choose to pay later at the point of collection/receipt of their medication.

 

You are required to devise a solution that comprises a mobile app that allows a registered customer of Utibu health to make orders for their medication and check their statement. 

 

The pharmacist wants to maintain the legacy database and system for face-to-face sales and have the online orders appear in that database as well. There is reliable internet in the health facility but it does not have a public IP address. You are free to use any approach, technology or tools so long as orders are eventually saved in the legacy database.

 

