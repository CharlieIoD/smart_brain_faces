const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex'); 

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const imageurl = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : 'postgresql-cubic-42275',
      user : 'postgres',
      password : 'postgres',
      database : 'smartbrain'
    }
  });

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {res.send("It is working");
})

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', (req, res) => {register.handleRegister(db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})
