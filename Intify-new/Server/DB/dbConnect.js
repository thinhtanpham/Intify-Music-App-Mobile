const mongoose = require('mongoose');

async function Connect () {
    try{
    await mongoose.connect('mongodb://localhost:27017/Intify');
    console.log("kết nối thành công nè")
    } catch(error){
        console.log("lõi nè:" + error)
    }
}

module.exports= {Connect}