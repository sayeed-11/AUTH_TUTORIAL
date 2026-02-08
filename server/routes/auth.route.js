import express from 'express'

import {login, signup, logout, verifyEmail, isAuth} from '../controllers/auth.controller.js'
import { isAuthMiddleware } from '../middlewares/isAuth.middleware.js';


const route = express.Router();

route.post('/login', login)
route.post('/signup', signup)
route.post('/logout', logout)
route.post('/verify-email', verifyEmail)
route.get('/isAuth', isAuthMiddleware, isAuth)

export default route;