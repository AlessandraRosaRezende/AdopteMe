import { Router } from 'express';
import viewsController from '../controllers/views.controller.js';

const router = Router();

router.get('/', viewsController.homeView);
router.get('/usuarios', viewsController.allUsersView);
router.get('/pets', viewsController.allPetsView);

export default router;