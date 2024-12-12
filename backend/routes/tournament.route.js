import express from 'express';
import { protectRoute } from "../middleware/auth.middleware.js";
import { 
  createTournament, 
  getAllTournaments, 
  joinTournament,
  getUserTournaments
} from '../controllers/tournament.controller.js';

const router = express.Router();

router.use(protectRoute);

router.post('/create', createTournament);
router.get('/', getAllTournaments);
router.post('/:id/join', joinTournament);
router.get('/my-tournaments', getUserTournaments);

export default router;