var mysql = require("mysql")
var inquirer =  require("inquirer")
var Table = require("cli-table");
var table = new Table({head: ['ID', 'Product Name', 'Department Name', 'Price'], style: {head:[], border:[], 'padding-left':1, 'padding-right': 1 }})

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "bamazon_DB"
});
  
connection.connect(function(err) {
    if (err) throw err;
    productSearch();
});

function productSearch() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price]);
        }
        console.log(table.toString());
        purchaseProduct();
    });
}

function purchaseProduct() {
    inquirer
        .prompt([
            {
                name:"id",
                type:"input",
                message:"What is the ID of the item you want to purchase? ",
                validate: function(value) {
                    num=parseFloat(value)-1;
                    if (isNaN(value) === false && num === Math.floor(num) && -1 < num && num < 10) {
                        return true;
                    } 
                    console.log(" - Error: Not a valid ID");
                    return false; 
                    connection.end();  
                }  
            },
            {
                name:"quantity",
                type: "input",
                message: "How many units of the chosen item do you want to buy?",
                validate: function(value) {
                    num=parseFloat(value);
                    if (isNaN(value) === false && num === Math.floor(num) && 0 < num) {
                        return true;
                    } else if (num === 0){
                    console.log(" - Error: Please type in a whole number that is greater than 0");
                    return false;
                    }
                    console.log(" - Error: Please type in a whole number");
                    return false; 
                    connection.end(); 
                }
            }
        ])
        .then(function(answer) {
            var query = "SELECT*FROM products WHERE item_id = ?";
            connection.query(query, [answer.id], function(err,res) {
                if (answer.quantity <= res[0].stock_quantity){
                    var total = answer.quantity*res[0].price;
                    console.log("You're in luck! There are " + res[0].stock_quantity + " left in stock.");
                    console.log("The price of the item is $" + res[0].price);
                    console.log("Your total will be $" + parseFloat(total).toFixed(2) + " before tax and shipping costs.");

                    var new_stock = res[0].stock_quantity-answer.quantity;
                    var sql = "UPDATE products SET ? WHERE ?";

                    connection.query(sql, [{stock_quantity : new_stock}, {item_id : answer.id}], function (err) {
                        if (err) throw err;
                        console.log("Stock has been updated. There are " + new_stock + " units left.");
                        connection.end();
                    });
                } else {
                    console.log("Insufficient quantity! There are only " + res[0].stock_quantity + " in stock.");
                    connection.end();
                }
            });
        });
        
}