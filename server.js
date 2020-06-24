const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const { response } = require('express');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');

const db = knex({
    client:'pg',
    connection:{
        connectionString: 'process.env.DATABASE_URL',
       ssl: true
    }
});

console.log(db.select('*').from('users'));

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {res.send('It is Working!!')})

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/image', (req, res) => {image.handleApiCall(req, res)})

// const DATABASE_URL = process.env.DATABASE_URL

app.listen(process.env.PORT || 3000, () =>{
    console.log(`Server is running on port ${process.env.PORT}`);
})


