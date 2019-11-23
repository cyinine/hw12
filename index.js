var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "root",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("error connecting " + err.stack + "\n");
  createProduct();
});

function loadProducts() {

  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    console.table(res);

    promptCustomerForItem(res);
  });
  function promptCustomerForItem(inventory)
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "What is the ID of the item you're here to buy? [to exit hit q]",
        validate: function (val) {
          return !isNaN(val) || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function (val) {
      checkIfShouldExit(val.choice);
      var choiceId = parseInt(val.choice);
      var product = checkInventory(choiceId, inventory);
      if (product) {
        promptCustomerForQuantity(product);
      }
      else {
        console.log("\nThat item is not in the inventory.");
        loadProducts();
      });
}

function askHowMany(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many do you need? [to exit hit q]",
        validate: function (val) {
          return val > 0 || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function (val) {
      checkIfShouldExit(val.quantity);
      var quantity = parseInt(val.quantity);
      if (quantity > product.stock) {
        console.log("\nthere is not enough of that item in stock we apologize for the inconvenience");
        loadProducts();
      }
      else {
        makeSale(product, quantity);
      }
    });
}

function makeSale(product, quantity) {
  connection.query(
    "UPDATE products SET stock = stock - ? WHERE id = ?",
    [quantity, product.id],
    function (err, res) {
      console / log("\ncongrats your new purchase of" + quantity + " " + prouct.item + "'s");
      loadProducts();
    }
  );
}
function checkInventory(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      return inventory[i];
    }
  }
  return null;
}

function checkIfShouldExit(choice) {
  if (choice.toLowerCase() === "q") {
    console.log("Goodbye!");
    process.exit(0);
  }
}