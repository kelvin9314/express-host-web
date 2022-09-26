const express = require('express')
const jwt_decode = require('jwt-decode');
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

// app.use(function(req, res, next) {
//   res.header('Content-Type', 'application/json;charset=UTF-8')
//   res.header('Access-Control-Allow-Credentials', true)
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   )
//   next()
// })

app.get('/api', (req, res) => {
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

// NOTE: multipart/form-data
app.post('/f2e/Login',upload.array(),  (req, res) => {
  let formData = req.body;
  console.log('form data', formData);

  if (!formData?.token){
    res.redirect('/home')
    return
  }

  try {
    const decoded = jwt_decode(formData?.token)
    console.log('decoded')
    console.log(decoded)

    const isTokenExpired = new Date(decoded.exp * 1000) < new Date()
    console.log(isTokenExpired)
    if (isTokenExpired || !decoded?.account || !decoded?.lang || !decoded?.uid) {
      res.redirect('/home')
    }
    // const diffInMins = Math.floor(Math.abs(decoded.exp * 1000 - new Date().getTime()) / (1000 * 60))
    // const diffInMins = 1
    // res.append('Set-Cookie', `token=${formData.token}`,{ expires: diffInMins, maxAge: diffInMins })


    // FIXME 先寫死 logt 這個cookie 有效時間為 1 分鐘
     res.cookie('logt', formData?.token, { expires: new Date(Date.now() + 60 * 1000)});
      //  res.cookie('logt', formData?.token, { expires: new Date(decoded.exp * 1000)});

    res.redirect('/home')
  } catch (err) {
    console.log(err?.message)
    res.redirect('/home')

  }


})

// app.get('/f2e/get-cookies', (req, res, next) => {
//   console.log(req)
//   console.log(req.cookies);
//   const token = req.cookies?.token
//   if(!token) {
//     res.clearCookie()
//     res.end()
//     return
//   }

//   try {
//     const decoded = jwt_decode(token)
//     console.log('decoded')
//     console.log(decoded)

//     const isTokenExpired = new Date(decoded.exp * 1000) < new Date()
//     if (isTokenExpired || !decoded?.account || !decoded?.lang || !decoded?.uid) {
//       // res.redirect('/home')
//       res.clearCookie()
//       res.end()
//     }

//   } catch (err) {
//     console.log(err?.message)
//   }

//   res.json({token });
// });

// app.get('/f2e/clear-cookies', (req, res, next) => {
//   console.log(req)

//   res.clearCookie()

//   res.json({
//     message: "ok"
//   })
// });



app.get('*', function (req,res) {
  res.sendFile(path + "/index.html");
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
