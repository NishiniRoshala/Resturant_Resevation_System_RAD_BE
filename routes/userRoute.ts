import express from 'express'
import { adminLogin } from '../controllers/userControllers'


const userRouter = express.Router();

userRouter.post('/admin', adminLogin)

export default userRouter