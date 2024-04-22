import express from 'express'
const router = express.Router();
import authController from './controllers/authController.js'
import taskController from './controllers/taskController.js'
import adminController from './controllers/adminController.js'
import { verifyAdmin } from './utils/verifyAdmin.js';

router.post('/api/signin',authController().signin)
router.post('/api/signup', authController().signup)
router.post('/api/signout',authController().signout)
router.get('/api/user/:id',authController().getUser)

// task controllers

router.post('/api/newTask', taskController().newTask)
router.get('/api/getTask/:id', taskController().getTask)
router.delete('/api/deleteTask/:id', taskController().deleteTask)
router.put('/api/editTask/:id', taskController().editTask)

// router.get('/api/edit', taskController().edit)

// admin routes
router.get('/api/users',verifyAdmin, adminController().getUsers)
router.get('/api/getTask/:id',verifyAdmin, adminController().getUserTask)
router.put('/api/completeTask/:id', adminController().completeTask)
router.delete('/api/deleteUser/:id',verifyAdmin, adminController().deleteUser)
router.put('/api/reAssignTask/:id',verifyAdmin, adminController().reAssignTask)

export default router