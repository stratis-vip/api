const express = require('express')
const router = express.Router()

router.get('/', (req,res,next)=>{
    res.render('login', {title: 'Σύνδεση', error: null, layout:'apiResponse'})
})

module.exports = router