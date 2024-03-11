var express = require("express");
var router = express.Router();
var md5 = require("md5");

var axios = require("axios");


/* GET home page. */
router.get("/:series", async (req, res, next) => {
  const date = `${new Date().getTime()}`;
  let hash = md5(
    `${date}${process.env.MARVEL_PRIVATE_KEY}${process.env.MARVEL_PUBLIC_KEY}`
  );

  try {
    let response = await axios.get(
      `https://gateway.marvel.com:443/v1/public/series?titleStartsWith=${req.params.series}&contains=comic&orderBy=startYear&limit=100&ts=${date}&apikey=${process.env.MARVEL_PUBLIC_KEY}&hash=${hash}`
    );

    console.log("Response from Marvel ===>", response, req.params);
    res.json(response.data.data.results);
  } catch (err) {
    console.log(err);
    res
      .status(501)
      .json({
        message: "Unable to make request",
        key: process.env.MARVEL_PUBLIC_KEY,
        private: process.env.MARVEL_PRIVATE_KEY,
        hash,
        date,
      });
  }
});

router.get('/details/:seriesId', async (req, res, next) => {
    const { seriesId } = req.params
    const date = `${new Date().getTime()}`;
    let hash = md5(
      `${date}${process.env.MARVEL_PRIVATE_KEY}${process.env.MARVEL_PUBLIC_KEY}`
    );

    try {
        let response = await axios.get(
          `https://gateway.marvel.com/v1/public/series/${seriesId}?&ts=${date}&apikey=${process.env.MARVEL_PUBLIC_KEY}&hash=${hash}`
        );
    
        console.log("Response from Marvel ===>", response.data);
        res.json(response.data.data.results[0]);
      } catch (err) {
        console.log(err);
        res
          .status(501)
          .json({
            message: "Unable to make request",
            key: process.env.MARVEL_PUBLIC_KEY,
            private: process.env.MARVEL_PRIVATE_KEY,
            hash,
            date,
          });
      }


})

module.exports = router;
