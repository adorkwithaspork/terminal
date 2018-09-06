var mysql = require("mysql");
var inquirer = require("inquirer");
var newAmount = 0;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});
  
function start() {
    inquirer
        .prompt([{
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product" 
            ]
        }])
        .then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    viewProducts();
                    break;
                case "View Low Inventory":
                    viewLowInventory();
                    break;
                case "Add to Inventory":
                    addToInventory();
                    break;
                case "Add New Product":
                    createProduct();
                    break;
            };
        });
};

function viewProducts() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, res) {
            console.table(res)

        }),
        start();
    };

    function viewLowInventory() {
    console.log("Viewing All products less than 10 \n");
            connection.query(
              "SELECT * FROM products WHERE stock_quantity < 10",
            
              function(err, res) {
                console.table(res);
            
                start();
              }
            );
          };

function addToInventory() {
    inquirer.prompt([{
                name: "itemId",
                type: "number",
                message: "What is the item_id that you'd like to add quantity too?"
            },
            {
                name: "units",
                type: "number",
                message: "How many units of the product would you like to add?"
            }
        ])
        .then(function (answer) {
                console.log("Updating quantities1\n");
                // connection.query("UPDATE products SET stock_quantity " + answer.itemId, +" WHERE stock_quantity " + answer.units, function (err, res) {
                //     if (err) throw err;
            console.log("Updating quantities2...");
            connection.query("UPDATE products SET ? WHERE ?",
            [{
             stock_quantity: answer.units
            },
            {
            item_id: answer.itemId
            }
              ],

            function (error, res) {
            if (error) throw err;
            console.log("Quantities Updated!" + answer.item_id + "has been updated with " + answer.units);
            start();
                            
                    });
                });
        };

function createProduct() {
    inquirer.prompt([{
                name: "productName",
                type: "input",
                message: "What is the product name that you'd like to add to inventory?"
            },
            {
                name: "departmentName",
                type: "input",
                message: "What department does this product fall under?"
            },
            {
                name: "price",
                type: "number",
                message: "How much does it cost?"
            },
            {
                name: "units",
                type: "number",
                message: "How many units of the product would you like to add?"
            }
        ])
        .then(function (answer) {
                console.log("Adding product to inventory\n");
                // connection.query("UPDATE products SET stock_quantity " + answer.itemId, +" WHERE stock_quantity " + answer.units, function (err, res) {
                //     if (err) throw err;
            
            connection.query("INSERT INTO products SET ?",
            {
            product_name: answer.productName,
            department_name: answer.departmentName,
            price: answer.price,
            stock_quantity: answer.units
            },

            function (error, res) {
            if (error) throw err;
            console.log("Quantities Updated!" + answer.item_id + "has been updated with " + answer.units);
            start();
            connection.end();
            });
        })
    };
        