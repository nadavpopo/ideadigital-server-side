const express = require('express');
const router = express.Router();
const {usersModel,validUser} = require("../models/users_model");
const { date } = require('@hapi/joi');

router.get('/', (req, res) =>
{
    usersModel.find({})	
    .sort({_id:-1})
    .then(data =>
    {
        res.json(data)
    })
});

router.post("/add" , async(req,res) =>
{
    let dataBody = req.body;

    if(req.body.phone.length == 10 && req.body.phone[0]=="0")
    {
      req.body.phone = req.body.phone . substring(1);
    }

    let user = await validUser(dataBody);
    if(user.error)
    {
      res.status(400).json(user.error.details[0]);
    }
    else
    {
        try
        {
            let saveData = await usersModel.insertMany([req.body]);
            res.json(saveData[0])     
        }
        catch
        {
            res.status(400).json({ message: "Error insert new users, already in data" })
        }
    }
})

router.get('/single/:id', (req, res) =>
{
  usersModel.findOne({_id:req.params.id})
  .then(data =>
  {
    res.json(data)   
  })
  .catch(err =>
  {
    res.status(400).json(err)
  })
});

router.post("/edit",async(req,res) =>
{
    let dataBody = req.body;
    let contact = await validUser(dataBody);
    if(contact.error)
    {
        res.status(400).json(contact.error.details[0])
    }
    else
    {
        try
        {
            let updateData = await usersModel.updateOne({_id:req.body.id},req.body);
            usersModel.find({})
            .then(data =>
            {
                res.json(data);
            })       
        }
        catch
        {
            res.status(400).json({ message: "error cant find id" })
        }
    }
})

router.post("/del",(req,res) =>
{
    let delId = req.body.del;

    usersModel.deleteOne({_id:delId})
    .then(data =>
    {
        if(data.deletedCount > 0 )
        {
          usersModel.find({})
          .then(data =>
          {
            res.json(data);
          })  
        }
        else
        {
          res.status(400).json({error:"error id not found"});
        }
    })
})

module.exports = router;