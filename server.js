const express = require('express')
const path = require('path')
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express()
const PORT = 8080

const errorHandler = require('./middlewares/errorHandler')


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(helmet({
    contentSecurityPolicy: false, 
}));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

const apiRoutes = require('./api/apiRoutes')
app.use('/api', apiRoutes)

app.get('/', (req, res) => {
    res.render('login');
})

<<<<<<< HEAD
app.get('/dashboard', (req, res) => {
    res.render('dashboard', { currentPage: 'home' });
=======
app.get('/index', (req, res) => {
    res.render('index', { currentPage: 'home' });
>>>>>>> fd19789a6af9dfff622dee21a2593e52e89d5999
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.get('/course', (req, res) => {
    res.render('course', { currentPage: 'course' });
})

app.get('/about', (req, res) => {
    res.render('about', { currentPage: 'about' });
})

app.get('/review', (req, res) => {
    res.render('review', { currentPage: 'review' });
})

app.get('/contact', (req, res) => {
    res.render('contact', { currentPage: 'contact' });
})

app.get('/faq', (req, res) => {
    res.render('faq', { currentPage: 'faq' });
})

app.get('/blog', (req, res) => {
    res.render('blog', { currentPage: 'blog' });
})

app.get('/ourteam', (req, res) => {
    res.render('ourteam', { currentPage: 'ourteam' });
})

app.get('/event', (req, res) => {
    res.render('event', { currentPage: 'event' });
})

app.get('/form', (req, res) => {
    res.render('form', { currentPage: 'form' });
})

app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
<<<<<<< HEAD
})
=======
})
>>>>>>> fd19789a6af9dfff622dee21a2593e52e89d5999
