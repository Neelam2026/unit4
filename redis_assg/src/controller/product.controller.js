const express = require("express");
const router = express.Router();
const client = require("../config/redis");
const Product = require("../model/product.model");

router.post("", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    const products = await Product.find().lean().exec();

    client.set("products", JSON.stringify(products));

    return res.status(201).send(products);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("", async (req, res) => {
  try {
      //pagination
    // const page = req.query.page || 1;
    // const pagesize = req.query.pagesize || 10;
    // const skip = (page - 1) * pagesize;
    //
    client.get("products", async function (err, fetchedproduct) {
      if (fetchedproduct) {
        const products = JSON.parse(fetchedproduct);
        return res.status(200).send({ products, redis: true }); //returning from redis therefore redis:true
      } else {
        try {
          const products = await Product.find()
          //.skip(skip).limit(pagesize)
          .lean().exec();
          client.set("products", JSON.stringify(products));
          return res.status(200).send({ todos, redis: false }); //returning from  database therefore  redis:false
        } catch (err) {
          return res.status(500).send({ message: err.message });
        }
      }
    });
  } catch (err) {
    return res.status(500).send({ message: err.messgae });
  }
});

router.get("/:id", async (req, res) => {
  try {
    client.get(
      `products.${req.params.id}`,
      async function (err, fetchedproduct) {
        if (fetchedproduct) {
          const products = JSON.parse(fetchedproduct);
          return res.status(200).send({ products, redis: true }); //returning from redis therefore redis:true
        } else {
          try {
            const products = await Product.findById(req.params.id)
              .lean()
              .exec();
            client.set(`products.${req.params.id}`, JSON.stringify(products));
            return res.status(200).send({ todos, redis: false }); //returning from  database therefore  redis:false
          } catch (err) {
            return res.status(500).send({ message: err.message });
          }
        }
      }
    );
  } catch (err) {
    return res.status(500).send({ message: err.messgae });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    const products = await Product.find().lean().exec();
    client.set(`products.${req.params.id}`, JSON.stringify(product));
    client.set("products", JSON.stringify(products));
    return res.status(200).send(product);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
      .lean()
      .exec();
    const products = await Product.find().lean().exec();
    client.del(`products.${req.params.id}`);
    client.set("products", JSON.stringify(products));
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
