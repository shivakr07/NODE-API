const express = require('express');
const app = express();

PORT = 3000;

//routes

app.get('/', (req,res) => {
    res.send('Hello Rest');
})

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT} `)
})

