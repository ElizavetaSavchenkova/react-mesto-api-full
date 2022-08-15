const allowedCors = [
  'http://mestoliza.students.nomoredomains.sbs',
  'https://mestoliza.students.nomoredomains.sbs',
  'http://mestoliza.students.nomoredomains.sbs',
  'http://mestoliza.students.nomoredomains.sbs/cards',
  'https://mestoliza.students.nomoredomains.sbs/cards',
  'http://localhost:3001',
  'http://localhost:3000',
  'https://localhost:3001',
  'https://localhost:3000',
];

module.exports = (req, res, next) => {
  const DEF_METH = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const { origin } = req.headers;
  const { method } = req;
  const request = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEF_METH);
    res.header('Access-Control-Allow-Headers', request);
    res.end();
    return;
  }
  next();
};
