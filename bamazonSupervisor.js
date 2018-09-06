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
                "View Product Sales by Department",
                "Go Back" 
            ]
        }])
        .then(function (answer) {
            switch (answer.action) {
                case "View Product Sales by Department":
                    viewProductSales();
                    break;
                case "Go Back":
                    start();
                    break;
    
            };
        });
};



    function viewProductSales() {
    console.log("product sales");
    var query = "SELECT P.ID AS ID, price, stock_quantity"
    //query+= "SUM(P.product.price * P.stock_quantity) AS over_head_costs"
    query+= " FROM [products] P product_name"// JOIN products P ON D.department_name = P.department_name",
    //query+= "GROUP BY department_name"
    //query+= "ORDER BY over_head_costs DESC"

            connection.query(query,
            
              function (err, res) {
                  console.log(err)
                console.table(res);
                start();
              })
          };
