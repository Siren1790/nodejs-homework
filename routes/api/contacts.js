const express = require('express')
const Joi = require("joi");
const ContactRequests = require("../../models/index.js")
const HttpError = require("../../helpers/index.js");


const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const result = await ContactRequests.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.get('/:id', async (req, res, next) => {
  
  try {
    const { id } = req.params;
    const result  = await ContactRequests.getContactById(id);
    if(!result){
      throw HttpError(404, `Contact with ${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }

})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
