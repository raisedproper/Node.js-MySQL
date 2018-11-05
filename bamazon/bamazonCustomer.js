var mysql = require("mysql");
var  = require("inquirer");
var cTable = require('console.table');

//Creates connection info for mysql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", 
    password: "",
    database: "bamazon_db"
}); 
//Connect to database
connection.connect(function (err) {
    if (err) throw err; 
    console.log("connected as id " + connection.threadId + "\n");
    //Display Products for sale
    displayProducts();
});


//Function to display ids, names and prices of products for sale
function displayProducts() {
    console.log("Welcome to Bamazon!!!\n");

    var tableItems = [];
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            tableItems.push(
                {
                ID: res[i].item_id,
                Product_Name: res[i].product_name,
                Department: res[i].department_name,
                Price: res[i].price,
                Quantity: res[i].stock_quantity
                }
            );
        }
        const table = cTable.getTable(tableItems);
        console.log(table);

        buyItems();
    });
}

function buyItems() {
    inquirer.prompt([
        {
            type:"input",
            name:"itemID",
            message:"Enter the ID of the item you want to purchase"
        },
        {
            type:"input",
            name:"Quantity",
            message:"How many would you like to purchase?"
        }
    ]).then(function(answer) {
        var id = answer.itemID;
        var quantity = answer.Quantity;
        console.log("\nYour order: " + JSON.stringify(answer));
        checkInventory(id, quantity);
    });
}

//Checks inventory if there are enough units the user wants to purchase
function checkInventory(id, quantity) {
    connection.query("SELECT * FROM products WHERE item_id = ?", id, function(err, res) {
        if (err) throw err;
        var res = res[0];
        if(quantity > res.stock_quantity) {
            console.log("\nSorry, this item is temporarily out of stock.");
            repeat();
        } else {
            //Log total of user's total if there are enough units available
            console.log("\nThe total for your order is: $" + (quantity * res.price) +
            "\nThank you! Come again!\n");
            updateInventory(id, res.stock_quantity, quantity);
            repeat();
        } 
    });    
}
function updateInventory(id, stock, quantity) {
    var newStock = stock - quantity;
    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newStock, id], function(err) {
        if(err) throw err;
    });
}


function repeat() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to place another order?",
            name: "confirm",
            default: true
        }
    ]).then(function(answer) {
        if(answer.confirm) {
            displayProducts();
        } else {
            console.log("Thank you! Come again!");
            connection.end();
        }
    });
}