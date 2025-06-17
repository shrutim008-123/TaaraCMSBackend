import express from 'express';
import { getRaiseToken } from '../../controller/Raise/RaiseAuth.controller.js';

const RaiseAuth = express.Router();

// GET /auth/raise-token - Get token for raise routes
RaiseAuth.get('/raise-token', getRaiseToken);

export default RaiseAuth;