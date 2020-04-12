let logString = '';

const outResponse = (date, req, status) => {
  const path = req.originalUrl;

  const diff = `${new Date() - date}`.length === 1 ? `0${new Date() - date}` : `${new Date() - date}`;
  logString += `${req.method} \t\t ${path} \t\t ${status} \t\t ${diff}ms\n`;
};

const inRequest = (req, res, next) => {
  req.params.date = new Date();
  req.params.outResponse = outResponse;
  next();
};


const dataLog = (req, res) => {
  const { date, outResponse: Response } = req.params;
  res.set('Content-Type', 'text/plain');
  Response(date, req, 200);
  return res.send(logString);
};

module.exports = {
  logString,
  inRequest,
  outResponse,
  dataLog
};
