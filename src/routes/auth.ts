import { Router } from 'express';
const router = Router();

import { login, logout, getUser, register } from 'app/controllers/auth';

import registerRoute from 'app/helpers/routes';

/**
 * Auth Routes
 */
const routes = {
    login: "login",
    logout: "logout",
    user: "user",
    register: "register",
};

export const route = registerRoute(routes, "auth");

/*****************
 * Expres routes *
 *****************/

// POST /auth/login
router.post(route('login').get(), login);

// POST /auth/logout
router.post(route('logout').get(), logout);

// POST /auth/user
router.post(route('user').get(), getUser);

// POST /auth/register
router.post(route('register').get(), register);

export default router;