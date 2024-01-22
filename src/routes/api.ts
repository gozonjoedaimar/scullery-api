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
	// NOTE: format => name: 'path'
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
router.get(route('version').path(), configController.version()); // version

// KITCHEN
router.get(route('inventory-menu').path(), kitchenController.menu()); // menu 
router.get(route('inventory-menu-item').path(), kitchenController.menuItem()); // menu item
router.post(route('inventory-menu-item-add').path(), kitchenController.addMenuItem()); // add menu item
router.post(route('inventory-menu-item-edit').path(), kitchenController.editMenuItem()); // add menu item
router.post(route('inventory-menu-item-delete').path(), kitchenController.deleteMenuItem()); // add menu item

// STOCKROOM
router.get(route('inventory-stockroom').path(), stockroomController.index()); // index

export default router;