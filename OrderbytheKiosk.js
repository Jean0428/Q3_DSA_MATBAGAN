// Function to authenticate user
function authenticate(username, password, users) {
  return users.some(user => user.username === username && user.password === password);
}

// Function to sort items alphabetically
function sortItems(items) {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}

// Function to display items in a category
function displayItems(category) {
  console.log(`Category: ${category.name}`);
  for (let item of sortItems(category.items)) {
    console.log(`Item: ${item.name}, Price: ${item.price}`);
  }
}

// Initialize categories and items
let categories = [
  {
    name: 'Pasta',
    items: [{name: 'Spaghetti', price: 50}, {name: 'Carbonara', price: 60}, {name: 'Penne', price: 55}]
  },
  {
    name: 'Desserts',
    items: [{name: 'Cake', price: 40}, {name: 'Ice Cream', price: 30}, {name: 'Brownie', price: 35}]
  },
  {
    name: 'Drinks',
    items: [{name: 'Soda', price: 20}, {name: 'Juice', price: 25}, {name: 'Coffee', price: 30}]
  }
];

// Initialize users
let users = [
  { username: 'seller1', password: 'password123' },
  { username: 'seller2', password: 'password456' }
];

// Cart for customer orders
let cart = [];

// Start program
while (true) {
  let userType = prompt("Are you a SELLER or CUSTOMER? (Enter 'exit' to quit)");

  if (userType.toLowerCase() === 'exit') break;

  // Seller operations
  if (userType.toLowerCase() === 'seller') {
    let username = prompt("Enter username:");
    let password = prompt("Enter password:");

    if (authenticate(username, password, users)) {
      while (true) {
        let action = prompt("Do you want to LOGOUT, ADD or REMOVE an item?");

        if (action.toLowerCase() === 'logout') break;

        if (action.toLowerCase() === 'add') {
          let category = prompt("Which category do you want to update? (Pasta, Desserts, Drinks)");

          let categoryObj = categories.find(c => c.name.toLowerCase() === category.toLowerCase());
          if (!categoryObj) {
            alert("Category not found!");
            continue;
          }

          while (true) {
            let itemName = prompt("Enter the name of the item to add:");
            let itemPrice = parseFloat(prompt("Enter the price of the item:"));
            categoryObj.items.push({name: itemName, price: itemPrice});

            let continueAdd = prompt("Do you want to continue adding items? (yes/no)");
            if (continueAdd.toLowerCase() === 'no') break;
          }
        }

        if (action.toLowerCase() === 'remove') {
          let category = prompt("Which category do you want to update? (Pasta, Desserts, Drinks)");

          let categoryObj = categories.find(c => c.name.toLowerCase() === category.toLowerCase());
          if (!categoryObj) {
            alert("Category not found!");
            continue;
          }

          while (true) {
            let itemName = prompt("Enter the name of the item to remove:");
            let itemIndex = categoryObj.items.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
            if (itemIndex !== -1) {
              categoryObj.items.splice(itemIndex, 1);
            } else {
              alert("Item not found!");
            }

            let continueRemove = prompt("Do you want to continue removing items? (yes/no)");
            if (continueRemove.toLowerCase() === 'no') break;
          }
        }
      }
    } else {
      alert("Invalid username or password!");
    }
  }

  // Customer operations
  if (userType.toLowerCase() === 'customer') {
    while (true) {
      let action = prompt("Do you want to ORDER, view CART, or CANCEL?");

      if (action.toLowerCase() === 'cancel') break;

      if (action.toLowerCase() === 'order') {
        let category = prompt("Which category do you want to order from? (Pasta, Desserts, Drinks)");

        let categoryObj = categories.find(c => c.name.toLowerCase() === category.toLowerCase());
        if (!categoryObj) {
          alert("Category not found!");
          continue;
        }

        displayItems(categoryObj);
        let itemName = prompt("Enter the name of the item you want to order:");
        let itemQuantity = parseInt(prompt("Enter the quantity:"));

        let item = categoryObj.items.find(item => item.name.toLowerCase() === itemName.toLowerCase());
        if (!item) {
          alert("Item not found!");
          continue;
        }

        cart.push({name: item.name, price: item.price, quantity: itemQuantity});
        alert("Item added to cart!");
      }

      if (action.toLowerCase() === 'cart') {
        while (true) {
          let cartAction = prompt("Do you want to PRINT, ADD, REMOVE, or CANCEL?");

          if (cartAction.toLowerCase() === 'cancel') break;

          if (cartAction.toLowerCase() === 'print') {
            console.log("Cart contents:");
            let totalPrice = 0;
            for (let item of cart) {
              console.log(`Item: ${item.name}, Price: ${item.price}, Quantity: ${item.quantity}, Total: ${item.price * item.quantity}`);
              totalPrice += item.price * item.quantity;
            }
            console.log(`Total Price: ${totalPrice}`);
          }

          if (cartAction.toLowerCase() === 'add') break;

          if (cartAction.toLowerCase() === 'remove') {
            let itemName = prompt("Enter the name of the item to remove from cart:");
            let itemIndex = cart.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
            if (itemIndex !== -1) {
              cart.splice(itemIndex, 1);
              alert("Item removed from cart!");
            } else {
              alert("Item not found in cart!");
            }
          }
        }
      }
    }
  }
}
