const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const mongoURI = "mongodb+srv://sandeshphuyal10:sandesh@12345@cluster0.6xamlsx.mongodb.net/"
const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, async (err, result) => {
        if (err) console.log("---", err)
        else {
            console.log("Connected Successfully");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("food_categories");
                foodCategory.find({}).toArray(function (err, catData) {
                    if (err) console.log(err);
                    else {
                        global.food_items = data;
                        global.foodCategory=catData;
                    }
                })
            })
        }
    });
}
module.exports = mongoDB;

