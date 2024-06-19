function run(msg)
{
    console.log(msg);
    msg.getContact().then((res)=>{
        console.log(res);
    })
}

module.exports = {run};