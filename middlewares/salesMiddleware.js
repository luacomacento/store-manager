const Joi = require('joi');
const BadRequestError = require('../errors/BadRequestError');
const UnprocessableError = require('../errors/UnprocessableError');

const validateBody = (req, res, next) => {
  const schema = Joi.array().items(
    Joi.object({
      productId: Joi.number().required().integer(),
      quantity: Joi.number().required().integer().min(1),
    }),
  );

  const { error } = schema.validate(req.body);

  if (error) {
    // error.message = error.details[0].message.replace(/\[.\]\./, '');
    // throw error;
    const {
      details: {
        0: { type, message },
      },
    } = error;
    const returnMessage = message.replace(/\[.\]\./, '');
    if (type.includes('.min')) throw new UnprocessableError(returnMessage);
    throw new BadRequestError(returnMessage);
    // return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

module.exports = { validateBody };
