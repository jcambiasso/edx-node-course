//Module to parse a string to json

const csvtojson = function(data){
    let result = '';
    if(data==null || typeof(data)!="string") 
    {
        result = '{"error":"no source"}';
        return result;
    }
    var raw = data.split('\n');
    raw[0] = clearString(raw[0]);
    raw = raw.filter(data => data !='');
    var categories = raw[0].split(',');
    raw.shift();
    //Taking advantage of ES6 Computed Property names
    raw.forEach((item,index,array)=>{
        let customerInfo = {};
        item = clearString(item);
        item.split(',').forEach((da,ind,ar)=>{
            if(ar.lenght != categories.lenght)
            {
                customerInfo = {error:"Missing data"};
                return;
            }
            customerInfo[categories[ind]]=da;
        })
        array[index] = customerInfo;
    });
    
    try{
    result = JSON.stringify(raw,null,2);
    }
    catch(error)
    {
        console.error(error.meesage);
    }
    return result;
}

var clearString = function(string)
{
    return string.replace(/[\x00-\x1F\x7F-\x9F]/g, "");
} 

module.exports = csvtojson;