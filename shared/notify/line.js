const axios = require('axios')
const lineTokenHelper = require("../../shared/tools/lineTokenHelper");
// UwZ5NVFGw2fDc89tWkIuKHVMZSOdghmsSWz0RP09DvR   line for dev
// YgGm7lxdzmaIQIFnudXM51QaZZKBDaMvIoz7qKVf20m   line for build
// dk8rwyKgxZOG3wShFpXn579I8XFRdZuiAesPpXMg9vu   line for me
exports.notifyLine = async(data)=>{
    let token = lineTokenHelper.getLineToken();
    try{
        const res = await axios({
            method: 'POST',
            url:'https://notify-api.line.me/api/notify',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            },
            data:"message=" +data
        })
    }catch(err){
        console.log(err)
    }
}