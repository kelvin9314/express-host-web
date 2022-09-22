const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const multer  = require('multer')
const upload = multer()

dotenv.config();

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());

const path = require('path').join(__dirname, './frontend/build')
app.use(express.static(path))

app.get('/api', (req, res) => {
  console.log(req.headers)
  res.status(200).send('Hello World, this is API route')
})

app.post('/api/post', (req, res) =>{
  console.log(req.body)
  // res.sendStatus(200)
  res.status(200).send({
    message: 'OK',
    data: req.body
  });

})

app.get('/f2e/get-cookies', (req, res, next) => {
  console.log(req.cookies);
  // true

  res.json(req.cookies);
});

// NOTE: multipart/form-data
app.post('/f2e/Login',upload.array(),  (req, res) => {
  let formData = req.body;
  console.log('form data', formData);

  const minute = 60 * 5
  // if (formData?.token) res.cookie('token', formData?.token, { maxAge: minute });

  // res.append('Set-Cookie', 'foo=bar; Path=/;')
  // res.append('Set-Cookie', `token=${formData?.token} Path=/home;`)
  res.append('Set-Cookie', `token=${formData?.token}`)
  // res.cookie('token', `token=${formData?.token}`, { maxAge: minute, httpOnly : false});
  // res.setHeader('Set-Cookie', `token=${formData?.token}`)


  // if(formData?.type === 'home'){
  //   res.redirect("/home")
  // }

  // if(formData?.type === '404'){
  //   res.redirect("/home")
  // }


  res.redirect('/home')
  // res.send('Your are logged in');

  // return res.redirect(`/404`)
  // res.redirect(`/home?t=${formData?.token}`)
})


app.get('*', function (req,res) {
  res.sendFile(path + "/index.html");
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
