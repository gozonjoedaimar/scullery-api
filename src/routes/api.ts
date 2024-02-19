import { Router } from 'express';
import registerRoute from 'app/helpers/routes';
import * as kitchenController from 'app/controllers/api/inventory/kitchen';
import * as stockroomController from 'app/controllers/api/inventory/stockroom';
import * as ItemController from 'app/controllers/api/inventory/item'
import * as configController from 'app/controllers/api/config';
import * as menuController from 'app/controllers/api/menu';
import { useAuth } from 'app/middlewares/auth';

/**
 * Api routes
 */
const routes = {
	// NOTE: format => name: 'path'
	// helpers
	version: "version",

	// menu
	menu: "menu",
	"menu-item": "menu/:id",
	"menu-item-add": "menu/add",
	"menu-item-edit": "menu/edit/:id",
	"menu-item-delete": "menu/delete/:id",

	// inventory kitchen
	"inventory-kitchen": "inventory/kitchen",

	// inventory stockroom
	"inventory-stockroom": "inventory/stockroom",

	// inventory item
	"inventory-item": "inventory/item",
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

// MENU
router.get(route('menu').path(), menuController.menu()); // menu 
router.get(route('menu-item').path(), menuController.menuItem()); // menu item
router.post(route('menu-item-add').path(), menuController.addMenuItem()); // add menu item
router.post(route('menu-item-edit').path(), menuController.editMenuItem()); // add menu item
router.delete(route('menu-item-delete').path(), menuController.deleteMenuItem()); // add menu item

// KITCHEN
router.get(route('inventory-kitchen').path(), kitchenController.index()); // menu

// STOCKROOM
router.get(route('inventory-stockroom').path(), stockroomController.index()); // index

// INVENTORY ITEM
router.get(route('inventory-item').path(), ItemController.index()); // index

export default router;