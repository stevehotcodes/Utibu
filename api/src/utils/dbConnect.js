import mssql from 'mssql'
import dotenv from 'dotenv'

dotenv.config()


const dbConfig={
    user:process.env.MSSQL_USERNAME,
    database:process.env.MSSQL_DATABASE_NAME,
    server:process.env.MSSQL_SERVER_NAME,
    password:process.env.MSSQL_PASSWORD,
    port: 1433,
    options:{
        encrypt:false, //for local development 
        trustServerCertificate:true //for local development but false for azure
    }

}

let appPool
let poolRequest

try {
    appPool=await mssql.connect(dbConfig)
    poolRequest=()=>appPool.request()
    if(appPool){
        console.log("Connected to the database");

    }
    
} catch (error) {
    console.log("error in creating the pool", error)
}

export {poolRequest, appPool}