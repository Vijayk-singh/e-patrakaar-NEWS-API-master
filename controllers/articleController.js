const upload = require("../middleware/upload");
const Articles = require("../models/articleModel");
const base64 = require('node-base64-image');


// error handling

const handleErrors = (err) => {
  let errors = { title: "", description: "", url: "", content: "" };

  if (err.message.includes("title")) {
    errors.title = "title already exists";
    return errors;
  }
  if (err.message.includes("description")) {
    errors.description = "description already exists";
    return errors;
  }
  if (err.message.includes("url")) {
    errors.url = "url already exists";
    return errors;
  }
  if (err.message.includes("content")) {
    errors.content = "content already exists";
    return errors;
  }
};

//setting the posts in the database
module.exports.postArticle = async (req, res, next) => {
  try {
    console.log(req.body);

    const { author, title, images, description, content ,category, tags, keywords } =
      req.body;

      const options = {
        string: true,
        headers: {
          "User-Agent": "my-app"
        }}
      const image = await base64.encode(images);
      
      await decode(image, { fname: '', ext: 'jpg' });
      // removing , from tag and keyword
     const keyword = keywords.replace(/,/g, " ");
     const tag = tags.replace(/,/g, " ");
    
    //  let image = upload(images)
    const article = new Articles({
      author: author,
      title: title,
      images: image,
      description: description,
      content: content,
      category: category,
      tags: tag,
      keywords: keyword,
    });

    if (req.files) {
      let path = "";
      req.files.forEach(function (files, index, arr) {
        path = path + files.path + ",";
      });
      path = path.substring(0, path.lastIndexOf(","));
      article.images = path;
    }
    article.save();

    res.status(201).json({ created: true });
  } catch (err) {
    const errors = handleErrors(err);
    console.log(err);
    res.json({ err, created: false });
  }
};

// getting the posts from database
module.exports.getArticle = async (req, res, next) => {
  console.log(req.query);

  var data = await Articles.find({
    author: { $regex: new RegExp("^" + req.query.author, "i") },
  }).exec();
  res.send(data);
};
