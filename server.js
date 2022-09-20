const express = require('express')
const cors = require('cors')
const multer  = require('multer')
const upload = multer()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors());

const path = require('path').join(__dirname, './frontend/build')
app.use(express.static(path))

app.get('/api', (req, res) => {
  res.send('Hello World, this is API route')
})

app.post('/api/post', (req, res) =>{
  console.log(req.body)
  // res.sendStatus(200)
  res.status(200).send({
    message: 'OK',
    data: req.body
  });

})

// NOTE: multipart/form-data
app.post('/Login',upload.array(),  (req, res) => {
  let formData = req.body;
  console.log('form data', formData);

  if(req?.body === 'home'){
    res.redirect("/home")
  }
  if(req?.body === '404'){
    res.redirect("/home")
  }

  res.redirect("/404")
  res.redirect("/home")
})


app.get('*', function (req,res) {
  res.sendFile(path + "/index.html");
});


app.listen(3000)
