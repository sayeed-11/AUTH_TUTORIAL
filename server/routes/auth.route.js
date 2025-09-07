import express from 'express'

import {login, signup, logout, verifyEmail} from '../controllers/auth.controller.js'

const route = express.Router();

route.post('/login', login)
route.post('/signup', signup)
route.post('/logout', logout)
route.post('/verify-email', verifyEmail)

export default route;