const mongoose = require('mongoose')

const dbConnect=async()=>{
    try {
        await mongoose.connect('mongodb+srv://anbu:123@cluster0.zo2og.mongodb.net/register?retryWrites=true&w=majority&appName=Cluster0')
        console.log(`mongodb connected successfully`);
    } catch (error) {
        console.log(`mongodb connection error ${error} `);      
    }
}
module.exports = dbConnect