'use strict'

import express, { Router } from 'express'
import { MM } from '../dao/mongo/messages.manager.js'
import { handleMessageSocket } from '../middleware/socket.js'

export const messageRouter = Router()

messageRouter.use(express.json())

messageRouter
  .route('/')
  .post(async (req, res, next) => {
    const response = await MM.addMessage(req.body)
    await handleMessageSocket()
    res.json({ rta: 'OK, informacion enviada', response })
  })
  .delete(async (req, res, next) => {
    const response = await MM.deleteMessages()
    await handleMessageSocket()
    res.json({ rta: 'OK, informacion enviada', response })
  })
