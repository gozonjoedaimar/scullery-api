import { Router } from 'express';
import registerRoute from 'app/helpers/routes';
import * as kitchenController from 'app/controllers/api/inventory/kitchen';
import * as stockroomController from 'app/controllers/api/inventory/stockroom';
import * as configController from 'app/controllers/api/config';
import { useAuth } from 'app/middlewares/auth';

/**
 * Api routes
 */
const routes = {
    // helpers
    version: "version",

    // inventory kitchen
    "inventory-menu": "inventory/kitchen/menu",
    "inventory-menu-item": "inventory/kitchen/menu/:id",
    "inventory-menu-item-add": "inventory/kitchen/menu/add",
    "inventory-menu-item-edit": "inventory/kitchen/menu/edit/:id",
    "inventory-menu-item-delete": "inventory/kitchen/menu/delete/:id",

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
router.get(route('inventory-menu').get(), kitchenController.menu()); // menu 
router.get(route('inventory-menu-item').get(), kitchenController.menuItem()); // menu item
router.post(route('inventory-menu-item-add').get(), kitchenController.addMenuItem()); // add menu item
router.post(route('inventory-menu-item-edit').get(), kitchenController.editMenuItem()); // add menu item
router.post(route('inventory-menu-item-delete').get(), kitchenController.deleteMenuItem()); // add menu item

// STOCKROOM
router.get(route('inventory-stockroom').get(), stockroomController.index()); // index

export default router;