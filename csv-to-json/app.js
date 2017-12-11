//generic app to take control of the cvstojson.
const csvtojson = require("./csvtojson.js");
const fs = require('fs');
const path = require('path');

var source = 'customer-data.csv';
if(process.argv[2] != null && process.argv[2] !="")
{
    source = process.argv[2];
}

var result = '{"error":"no source"}'
try{
    result = csvtojson(fs.readFileSync(source,"utf-8"));
}
catch (error){
    console.error(error.message);
}

fs.writeFileSync(path.join(__dirname,'customer-data.json'),result);