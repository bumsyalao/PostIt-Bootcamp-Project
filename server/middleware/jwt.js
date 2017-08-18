import jwt from 'jsonwebtoken';

const secret = process.env.SECRET;

export default {
  checkToken(req, res, next) {
    const token = req.body.token
      || req.query.token
      || req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({ message: 'User not authorized' });
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Token authentication failed' });
      }
      req.decoded = decoded;
      return next();
    });
  }
};
