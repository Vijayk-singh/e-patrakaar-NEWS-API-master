const express = require("express");
const router = express.Router();
const Article = require("../models/articleModel");


const { postArticle, getArticle } = require("../controllers/articleController");

const upload = require("../middleware/upload");


router.post("/postarticle", upload, postArticle);

// router.post("/getarticle",postArticle)

router.get("/getarticle", getArticle);

router.get("/everything", async (req, res) => {

  let data = await Article.find({});

  res.send(data);
});

router.get("/postfilter", async (req, res) => {
  const date = new Date();

  let data;

  if(req.query.category){
    //console.log(req.query.category)
    data = await Article.find({
      "$or": [{
        category: {
          $regex: req.query.category
        }
      }]
    });
  }

  if(req.query.tag){
    data = await Article.find({
      "$or": [{
        tags: {
          $regex: req.query.tag
        }
      }]
    });
  }

  if(req.query.keyword){
    data = await Article.find({
      "$or": [{
        keywords: {
          $regex: req.query.keyword
        }
      }]
    });
  }

  if (req.query.author) {
    data = await Article.find({
      $or: [
        {
          author: {
            $regex: req.query.author,
          },
        },
      ],
    });
  }

  if (req.query.from) {
    data = await Article.find({
      $and: [
        {
          author: {
            $regex: req.query.author,
          },
          publishedAt: { $gte: req.query.from, $lt: date },
        },
      ],
    });
  }

  if (req.query.from && req.query.to) {
    data = await Article.find({
      $and: [
        {
          author: {
            $regex: req.query.author,
          },
          publishedAt: { $gte: req.query.from, $lt: req.query.to },
        },
      ],
    });
  }

  res.send(data);
});

module.exports = router;
