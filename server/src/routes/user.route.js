import express from 'express'
import trimRequest from 'trim-request'
import authMiddleware from '../middlewares/authMiddleware.js'
import {searchUsers} from "../controllers/user.controller.js"

const router = express.Router()

router.route("/").get(authMiddleware,searchUsers)



export default router      