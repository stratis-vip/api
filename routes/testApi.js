const express = require('express')
const router = express.Router()

router.get('/', (req,res,next)=>{
    res.render('api', {title: 'Πληροφορία', text: 'Το Api λειτουργεί άψογα', layout:'apiResponse'})
})

module.exports = router