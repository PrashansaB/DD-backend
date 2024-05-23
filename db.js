const mongoose = require("mongoose");

const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log(`Connected to MongoDB at ${mongoose.connection.host}`);

    const fetchedData = await mongoose.connection.db
      .collection("Food_category")
      .find({})
      .toArray();

    const foodCategory = await mongoose.connection.db
      .collection("Sample")
      .find({})
      .toArray();

    global.food_cat = foodCategory;
    global.food_items = fetchedData;

    console.log("Data fetched successfully!!!!!.");
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};
module.exports = mongoDB;
