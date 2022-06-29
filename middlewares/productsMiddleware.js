const Joi = require('joi');
const BadRequestError = require('../errors/BadRequestError');
const UnprocessableError = require('../errors/UnprocessableError');

const validateBody = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().min(5),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    const {
      details: {
        0: { type, message },
      },
    } = error;
    if (type.includes('.min')) throw new UnprocessableError(message);
    throw new BadRequestError(message);
  }

  next();
};

module.exports = { validateBody };
