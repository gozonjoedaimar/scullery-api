import { Router } from 'express';
import registerRoute from '@/helpers/routes';
import * as kitchenController from '@/controllers/api/inventory/kitchen';
import * as stockroomController from '@/controllers/api/inventory/stockroom';
import * as configController from '@/controllers/api/config';
import { useAuth } from '@/middlewares/auth';

/**
 * Api routes
 */
const routes = {
    // helpers
    version: "version",

    // inventory kitchen
    "inventory-kitchen": "inventory/kitchen",
    "inventory-menu": "inventory/kitchen/menu",
    "inventory-menu-item": "inventory/kitchen/menu/item",

    // inventory stockroom
    "inventory-stockroom": "inventory/stockroom",
};
// Register route
export const route = registerRoute(routes, "api");
// Express route
const router = Router();

/**
 * Use auth
 */
router.use(useAuth());

/**********************
 * Express API routes *
 **********************/

// Helpers
router.get(route('version').get(), configController.version()); // version

// KITCHEN
router.get(route('inventory-kitchen').get(), kitchenController.index()); // index
router.get(route('inventory-menu').get(), kitchenController.menu()); // menu 
router.get(route('inventory-menu-item').get(), kitchenController.item()); // menu item

// STOCKROOM
router.get(route('inventory-stockroom').get(), stockroomController.index()); // index

export default router;