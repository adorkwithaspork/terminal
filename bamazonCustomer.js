var mysql = require("mysql");
var inquirer = require("inquirer");
var newAmount = 0;
var productSales = 0;

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
                "Buy an item",
                "Go back to the beginning"
            ]
        }])
        .then(function (answer) {
            switch (answer.action) {
                case "Buy an item":
                    buyItem();
                    break;
                case "Go back to the beginning":
                    start();
                    break;
            };
        });
};

function buyItem() {
    inquirer.prompt([{
            name: "itemId",
            type: "number",
            message: "What is the id of the item you would like to buy?"
        },
        {
            name: "units",
            type: "number",
            message: "How many units of the product would you like to buy?"
        }
    ])
.then(function (answer) {
            console.log("Checking Current Status\n");
            connection.query("SELECT * FROM products WHERE item_id=?", [answer.itemId], function (err, res) {
                        if (err) throw err;
                        var quantityOnHand = res[0].stock_quantity;
                        newAmount = quantityOnHand - answer.units;
                        var item_id = res[0].item_id;
                        var productPrice = res[0].price;
                        productSales = productPrice * answer.units;
                        console.log("Item ID = " + res[0].item_id + " | " + "Product Name = " + res[0].product_name + " |  " + "Department Name = " + res[0].department_name + " | " + "Price = " + res[0].price + " | " + "Stock Quantity = " + res[0].stock_quantity + " | " + "Product Sales Before = " + res[0].product_sales + " | ");
                        console.log("-----------------------------------");
                        
                        console.log("product sales", productSales)

        if (answer.units > quantityOnHand) {
        console.log("Sorry! We don't have that much product availible! \n", "You requested: " + answer.units + " & we only have " + quantityOnHand + " on hand!")
        } else {
            console.log("Updating quantities...");
            console.log("product sales2", productSales)
            connection.query("UPDATE products SET ?,? WHERE ?",

                [{
                        stock_quantity:newAmount
                    },
                    {
                        product_sales:productSales
                    },
                    {
                        item_id:answer.itemId
                    }
                ],
                
                
                
                function (error, res) {
                    if (error) throw err;
                    console.log("Quantities Updated!");
                    
                    console.table(res);
            
                    connection.end();
                    start();
                }
            );
        };
    
    });
   
        });
    };
        




