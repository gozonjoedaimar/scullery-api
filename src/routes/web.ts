import registerRoute from '@/helpers/routes';
import { Router } from 'express';
const router = Router();

/**
 * Frontend Routes
 */
const routes = {
    home: '/',
}

// register home
export const route = registerRoute(routes);

/**
 * Express routes
 */

// HOME
router.get(route('home').get(), (req, res) => {
    res.send('Sculleryflow API');
})

export default router;