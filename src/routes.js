const router = require('express').Router();
const json2xml = require('json2xml');
const validator = require('./helpers');
const logs = require('./logs');

const covid19ImpactEstimator = require('./estimator');

const respond = (req, res) => {
  const { date, outResponse } = req.params;

  const data = covid19ImpactEstimator(req.body);

  outResponse(date, req, 200);
  return res.json(data);
};

router
  .route('/on-covid-19')
  .post(logs.inRequest, validator, respond);

router
  .route('/on-covid-19/json')
  .post(logs.inRequest, validator, respond);

router
  .route('/on-covid-19/xml')
  .post(logs.inRequest, validator, (req, res) => {
    const { date, outResponse } = req.params;
    const data = covid19ImpactEstimator(req.body);
    res.set('Content-Type', 'application/xml');
    outResponse(date, req, 200);
    return res.send(json2xml(data));
  });

router
  .route('/on-covid-19/logs')
  .get(logs.inRequest, logs.dataLog);

module.exports = router;
