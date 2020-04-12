/* eslint-disable consistent-return */
const Joi = require('@hapi/joi');

const raiseError = (req, error, res, next) => {
  const { date, outResponse } = req.params;
  if (error) {
    const data = [];
    const { details } = error;
    details.forEach((detail) => {
      const obj = { field: detail.path[0], msg: detail.context.label };
      data.push(obj);
    });

    outResponse(date, req, 400);
    return res.status(400).json({ data, status: 400, code: 0 });
  }
  next();
};

const validateInputData = (req, res, next) => {
  const schema = Joi.object().keys({
    region: Joi.object().required().keys({
      name: Joi.string()
        .required()
        .label('Enter valid region name')
        .trim(),
      avgAge: Joi.number()
        .required()
        .label('Enter valid average age'),
      avgDailyIncomeInUSD: Joi.number()
        .required()
        .label('Enter valid avgDailyIncomeInUSD'),
      avgDailyIncomePopulation: Joi.number()
        .required()
        .label('Enter valid avgDailyIncomePopulation')
    }).label('Should be an object'),
    periodType: Joi.string()
      .required()
      .valid('days', 'weeks', 'months')
      .label('Please enter a valid periodType')
      .trim(),
    timeToElapse: Joi.number()
      .required()
      .label('Enter a valid timeToElapse'),
    reportedCases: Joi.number()
      .required()
      .label('Enter valid reportedCaes'),
    population: Joi.number()
      .required()
      .label('Enter valid population'),
    totalHospitalBeds: Joi.number()
      .required()
      .label('Enter valid total hospital beds')
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  /* Joi validation errors */
  raiseError(req, error, res, next);
};

module.exports = validateInputData;
