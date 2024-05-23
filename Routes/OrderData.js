const express = require("express");
const router = express.Router();
const Order = require("../modals/Order");

router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
  console.log(data);
  await data.splice(0, { Order_date: req.body.order_date });

  //if email not exisitng in db then create: else: InsertMany()
  let eId = await Order.findOne({ email: req.body.email });
  console.log(eId);
  if (eId === null) {
    try {
      console.log(data);

      await Order.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  }
});

router.post("/myOrderData", async (req, res) => {
  try {
    let myData = await Order.findOne({ email: req.body.email });
    res.json({ orderData: myData });
  } catch (error) {
    console.log(error.message);
    res.send("Server Error", error.message);
  }
});
module.exports = router;