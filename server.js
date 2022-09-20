const express = require('express')
const path = require('path').join(__dirname, '/frontend-build')
const cors = require('cors')
const multer  = require('multer')
const upload = multer()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use(express.static(path))

app.get('/api', (req, res) => {
  res.send('Hello World, this is API route')
})

app.post('/api/post', (req, res) =>{
  console.log(req.body)
  res.sendStatus(200)

})

// NOTE: formdata
app.post('/Login',upload.array(),  (req, res) => {
  let formData = req.body;
  console.log('form data', formData);
  res.status(200).send(formData);

  // res.render("/index.html")
  // res.render('/')
})


app.get('*', function (req,res) {
  res.sendFile(path + "/index.html");
});


app.listen(3000)
