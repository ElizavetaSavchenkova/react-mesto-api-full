const allowedCors = [
  'https://mestoliza.students.nomoredomains.sbs',
  'http://mestoliza.students.nomoredomains.sbs',
  'http://api.mestoliza.students.nomoredomains.sbs',
  'https://api.mestoliza.students.nomoredomains.sbs',
  'https://api.mestoliza.students.nomoredomains.sbs/cards',
  'http://api.mestoliza.students.nomoredomains.sbs/cards',
  'https://mestoliza.students.nomoredomains.sbs/cards',
  'https://mestoliza.students.nomoredomains.sbs/cards',
  'https://api.mestoliza.students.nomoredomains.sbs/users/me',
  'https://api.mestoliza.students.nomoredomains.sbs/users/me',
  'http://api.mestoliza.students.nomoredomains.sbs/ussers/me',
  'https://mestoliza.students.nomoredomains.sbs/users/me',
  'https://mestoliza.students.nomoredomains.sbs/users/me',
  'http://localhost:3000',
  'https://localhost:3000',
  'https://localhost:3001',
];

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
};
