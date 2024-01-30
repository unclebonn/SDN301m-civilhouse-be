import { Router } from 'express';
import { changeUserRole, getUserRole } from '~/controllers';

const router = Router();

router.route('/:id').get(getUserRole).put(changeUserRole);

export default router;
