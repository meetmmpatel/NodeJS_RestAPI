const express = require("express");
const bodyparser = require("body-parser");
const port = process.env.PORT || 3200;

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// let define the resource of the api that we want to user CRUD for
const orders = [
	{
		food_name: "Rice Dish",
		customer_name: "TestUserOne",
		food_qty: 2,
		id: "1",
		date: "14012020"
	}
];

// Home page
app.get("/", (request, response) => {
	response.json("Welcome to Lunch menu");
});

// return list of orders
app.get("/get_orders", (request, response) => {
	response.status(200).send(orders);
});

// how to add new order ....using POST

app.post("/new_order", (request, response) => {
	const order = request.body;

	if (order.food_name && order.customer_name && order.food_qty) {
		orders.push({
			...order,
			id: `${orders.length + 1}`,
			date: Date.now().toString()
		});
		response.status(200).json({
			message: "Order created successfully"
		});
	} else {
		response.status(401).json({
			message: "Invalid Order please modify"
		});
	}
});

// How to update the orders  (we should be able to update name, qty and dish name..  ID or Date)

app.put("/order/:id", (request, response) => {
	const order_id = request.param.id;
	const order_update = request.body;

	for (const order of orders) {
		if (orders.id == order_id) {
			if (order_update.food_name != null || undefined) {
				order.food_name = order_update.food_name;
			}
			if (order_update.food_qty != null || undefined) {
				order.food_qty = order_update.food_qty;
			}
			if (order_update.customer_name != null || undefined) {
				order.customer_name = order_update.customer_name;
			}
			return response.status(200).json({
				message: "Updated Order Successfully",
				data: order
			});
		} else {
			response.status(404).json({ message: "Invalid ID to Update " });
		}
	}
});

// Delete Orders from the list..
app.delete("/order/:id", (request, response) => {
	const order_id = request.param.id;
	for (const order of orders) {
		if (orders.id == order_id) {
			orders.splice(orders.indexOf(order), 1);

			return response.status(200).json({
				message: "Order Removed!!"
			});
		}
	}
	response.status(404).json({ message: "Invalid Order ID " });
});

app.listen(port, () => {
	console.log("====================================");
	console.log(`Running the application at ${port}`);
	console.log("====================================");
});
