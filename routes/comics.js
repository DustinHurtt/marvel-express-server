var express = require('express');
var router = express.Router();

var md5 = require("md5");

var axios = require("axios");

/* GET home page. */
router.get('/:seriesId', async (req, res, next) => {

    const { seriesId } = req.params

    const date = `${new Date().getTime()}`;
    let hash = md5(
      `${date}${process.env.MARVEL_PRIVATE_KEY}${process.env.MARVEL_PUBLIC_KEY}`
    );

    try {
        let response = await axios.get(
            `https://gateway.marvel.com/v1/public/series/${seriesId}/comics?limit=100&ts=${date}&apikey=${process.env.MARVEL_PUBLIC_KEY}&hash=${hash}`
          );

          console.log("Response from Marvel ===>", response, req.params);
          res.json(response.data.data.results);

    } catch(err) {
        console.log(err)
        res.json({error: err})
    }

})

router.get('/details/:comicId', async (req, res, next) => {

    const { comicId } = req.params

    const date = `${new Date().getTime()}`;
    let hash = md5(
      `${date}${process.env.MARVEL_PRIVATE_KEY}${process.env.MARVEL_PUBLIC_KEY}`
    );

    try {
        let response = await axios.get(
            `https://gateway.marvel.com/v1/public/comics/${comicId}/comics?&ts=${date}&apikey=${process.env.MARVEL_PUBLIC_KEY}&hash=${hash}`
          );

          console.log("Response from Marvel ===>", response, req.params);
          res.json(response.data.data.results[0]);

    } catch(err) {
        console.log(err)
        res.json({error: err})
    }

})

module.exports = router;