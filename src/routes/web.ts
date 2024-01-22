import registerRoute from 'app/helpers/routes';
import { Router } from 'express';
const router = Router();

/**
 * Frontend Routes
 */
const routes = {
	// NOTE: format => name: 'path'
	home: "/",
};

// register home
export const route = registerRoute(routes);

/**
 * Express routes
 */

// HOME
router.get(route('home').path(), (req, res) => {
    res.send('Sculleryflow API');
})

export default router;