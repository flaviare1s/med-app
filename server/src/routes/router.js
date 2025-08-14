import express from "express";

let router = express.Router();

router.get("/", (req, res) => {
  console.log("Hello World");
  res.status(200).json({ message: "Hello World" });
});

export default router;
