import express from 'express';
import { bookletRequest } from '../../controller/Raise/RaiseBooklet.controller.js';
import { footerSignUp } from '../../controller/Raise/RaiseFooter.controller.js';
import { signUp } from '../../controller/Raise/RaiseSignUp.controller.js';
import { verifyRaiseToken } from '../../middleware/authorization.middleware.js';

const RaiseSignUp = express.Router();

// POST /raise/sign-up - Protected route for sign-up
RaiseSignUp.post('/sign-up', verifyRaiseToken, signUp);
RaiseSignUp.post('/footer-sign-up', verifyRaiseToken, footerSignUp);
RaiseSignUp.post('/booklet/:schoolLevel', verifyRaiseToken, (req, res) => {
  const { schoolLevel } = req.params;
  return bookletRequest(req, res, schoolLevel);
});

export default RaiseSignUp;