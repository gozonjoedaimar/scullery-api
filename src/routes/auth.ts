import { Router } from 'express';
const router = Router();

import { login, logout, getUser } from '@/controllers/auth';

import registerRoute from '@/helpers/routes';

/**
 * Auth Routes
 */
const routes = {
    login: "login",
    logout: "logout",
    user: "user",
};

export const route = registerRoute(routes, "auth");

/*****************
 * Expres routes *
 *****************/

// POST /auth/login
router.post(route('login').toString(), login);

// POST /auth/logout
router.post(route('logout').toString(), logout);

// POST /auth/user
router.post(route('user').toString(), getUser);

export default router;