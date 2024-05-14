const express = require('express');
const app = express();
const port = 3000;

const usersRoutes = require('./routes/users');

app.use(express.json());
app.use(express.urlencoded({ extended: true })) 
app.use('/users', usersRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Express!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

