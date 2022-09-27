"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_decode = require('jwt-decode');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer();
dotenv.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
const path = require('path').join(__dirname, './frontend/build');
app.use(express_1.default.static(path));
app.get('/api', (req, res) => {
    res.status(200).send('Hello World, this is API route');
});
app.post('/api/post', (req, res) => {
    console.log(req.body);
    res.status(200).send({
        message: 'OK',
        data: req.body
    });
});
app.post('/f2e/Login', upload.array(), (req, res) => {
    let formData = req.body;
    console.log('form data', formData);
    if (!(formData === null || formData === void 0 ? void 0 : formData.token)) {
        res.redirect('/home');
        return;
    }
    try {
        const decoded = jwt_decode(formData === null || formData === void 0 ? void 0 : formData.token);
        console.log('decoded');
        console.log(decoded);
        const isTokenExpired = new Date(decoded.exp * 1000) < new Date();
        console.log(isTokenExpired);
        if (isTokenExpired || !(decoded === null || decoded === void 0 ? void 0 : decoded.account) || !(decoded === null || decoded === void 0 ? void 0 : decoded.lang) || !(decoded === null || decoded === void 0 ? void 0 : decoded.uid)) {
            res.redirect('/home');
        }
        res.cookie('logt', formData === null || formData === void 0 ? void 0 : formData.token, { expires: new Date(Date.now() + 60 * 1000) });
        res.redirect('/home');
    }
    catch (err) {
        res.redirect('/home');
    }
});
app.get('*', function (req, res) {
    res.sendFile(path + "/index.html");
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
