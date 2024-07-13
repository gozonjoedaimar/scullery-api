import { Router } from 'express';
import registerRoute from 'app/helpers/routes';
import * as DashboardController from 'app/controllers/api/dashboard';
import * as kitchenController from 'app/controllers/api/inventory/kitchen';
import * as stockroomController from 'app/controllers/api/inventory/stockroom';
import * as ItemController from 'app/controllers/api/inventory/item'
import * as configController from 'app/controllers/api/config';
import * as menuController from 'app/controllers/api/menu';
import * as ordersController from 'app/controllers/api/orders';
import { useAuth } from 'app/middlewares/auth';

/**
 * Api routes
 */
const routes = {
	// NOTE: format => name: 'path'
	// helpers
	version: "version",

	//dashboard
	"best-seller": "dashboard/best-seller",
	"most-used": "dashboard/most-used",

	// menu
	menu: "menu",
	"menu-item": "menu/:id",
	"menu-item-add": "menu/add",
	"menu-item-edit": "menu/edit/:id",
	"menu-item-delete": "menu/delete/:id",

	// orders
	orders: "orders",
	"orders-add": "order/add",
	"orders-edit": "order/edit/:id",
	"orders-remove": "order/remove/:id",
	"orders-info": "order/:id",

	// inventory kitchen
	"inventory-kitchen": "inventory/kitchen",

	// inventory stockroom
	"inventory-stockroom": "inventory/stockroom",

	// inventory item
	"inventory-item": "inventory/item",
	"inventory-item-info": "inventory/item/:id",
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

// DASHBOARD
router.get(route('best-seller').path(), DashboardController.bestSeller()); // best seller
router.get(route('most-used').path(), DashboardController.mostUsed()); // most used

// MENU
router.get(route('menu').path(), menuController.menu()); // menu 
router.get(route('menu-item').path(), menuController.menuItem()); // menu item
router.post(route('menu-item-add').path(), menuController.addMenuItem()); // add menu item
router.post(route('menu-item-edit').path(), menuController.editMenuItem()); // add menu item
router.delete(route('menu-item-delete').path(), menuController.deleteMenuItem()); // add menu item

// ORDERS
router.get(route('orders').path(), ordersController.orders()); // orders
router.post(route('orders-add').path(), ordersController.add()); // add order
router.post(route('orders-edit').path(), ordersController.edit()); // edit order
router.delete(route('orders-remove').path(), ordersController.remove()); // remove order
router.get(route('orders-info').path(), ordersController.order()); // order

// KITCHEN
router.get(route('inventory-kitchen').path(), kitchenController.index()); // menu

// STOCKROOM
router.get(route('inventory-stockroom').path(), stockroomController.index()); // index

// INVENTORY ITEM
router.get(route('inventory-item').path(), ItemController.index()); // index
router.get(route('inventory-item-info').path(), ItemController.item()); // index

export default router;
