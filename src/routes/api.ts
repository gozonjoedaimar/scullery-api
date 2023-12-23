import { Router } from 'express';
import registerRoute from '@/helpers/routes';
import kitchenController from '@/controllers/api/inventory/kitchen';
import stockroomController from '@/controllers/api/inventory/stockroom';

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


/**********************
 * Express API routes *
 **********************/

// Helpers
router.get(route('version').toString(), kitchenController.version()); // version

// KITCHEN
router.get(route('inventory-kitchen').toString(), kitchenController.index()); // index
router.get(route('inventory-menu').toString(), kitchenController.menu()); // menu 
router.get(route('inventory-menu-item').toString(), kitchenController.item()); // menu item

// STOCKROOM
router.get(route('inventory-stockroom').toString(), stockroomController.index()); // index

export default router;