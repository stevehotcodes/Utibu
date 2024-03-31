import mssql from 'mssql'




const dbConfig={
    user:'sa',
    database:'Utibu',
    server:'localhost',
    password:'Omosh123',
    port:1433,
    options:{
        encrypt:false,
        trustServerCertificate:true
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