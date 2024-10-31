const express = require('express');
const router = express.Router();
const multer = require('multer')
const csvQueue = require('../config/queue')


const upload = multer({dest:'uploads/'});

router.post('/upload',upload.single('file'),async(req,res)=>{
    try{
        const filePath = req.file.path
        await csvQueue.add({filePath})
        res.json({message:'File uploaded successfully'})
    }
    catch(error){
        console.log("Error in uploading: ",error)
        res.status(500).json({message:error.message})
    }
})

module.exports = router;