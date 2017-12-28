var Validator = require('jsonschema').Validator;

function validation(target,source,schema,callback)
{
    //check schema
    if(!('properties' in schema))
    {
        err = new Error('No properties item in schema');
        err.name = "Schema";
        console.error(err.message);
        callback(err);
    }
    
    //validate source with schema
    let v = new Validator();
    let vresults = v.validate(source,schema);
    if(vresults.errors.length!=0)
    {
        err = new Error('Validation errors');
        err.errors = vresults.errors.map((item,index,arr)=>{
            return (item.property + ' ' + item.message);
        });
        err.name = "Validation";
        console.error(err.message);
        callback(err);
    }
    
    //return schema compliant object
    var obj = {};
    Object.keys(schema.properties).forEach((item,index,arr)=>{
        if(item in source)
        {
            obj[item] = source[item];
        }
        else if(typeof(target)=='object' && (item in target))
        {
            obj[item] = target[item];
        }
        else if('default' in schema.properties[item])
        {
            obj[item] = schema.properties[item].default;
        }
        else if('type' in schema.properties[item])
        {
            switch(schema.properties[item].type)
            {
                case 'string':
                obj[item] = "";
                break;
                case 'integer':
                obj[item] = 0;
                break;
                case 'array':
                obj[item] = [];
                break;
                case 'object':
                obj[item] = {};
                break;
                default: //unimplemented types default to empty string.
                obj[item] = '';
            }
        }
        else
        {
            //no type? Defaults to empty string.
            obj[item] = '';
        }
    });
    callback(undefined,obj);
}

module.exports = validation;