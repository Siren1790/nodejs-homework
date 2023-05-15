const express = require("express");
const Joi = require("joi");
const ContactRequests = require("../../models/index.js");
const { HttpError } = require("../../helpers/index.js");

const router = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `name must be exist`,
  }),
  email: Joi.string().required().messages({
    "any.required": `email must be exist`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `phone must be exist`,
  }),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await ContactRequests.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await ContactRequests.getContactById(id);
    if (!result) {
      throw HttpError(404, `Contact with id: ${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await ContactRequests.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await ContactRequests.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id: ${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await ContactRequests.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Contact with id: ${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
