var dbVersion = 1; //this is for migrations, everytime we change something for in the store file, we have to increase det version number.
var dbName = "shoplist"; // is the name of the IndexedDB database

/*Need to be wrrapped in functions so, we can call the CRUD operation from the index page.

what to do?


*/

$(document).ready(function() {
  // Handler for .ready() called.
  addObjectStores();
});

var addObjectStores = function() {
  // var shoppinglistInput = document.getElementById("shoppinglistInput").value;

  //opening the database
  var request = indexedDB.open(dbName, dbVersion);

  request.onupgradeneeded = function(event) {
    var db = event.target.result;

    //if the object store do not exist create it. In-line keys...
    if (!db.objectStoreNames.contains("shoplist")) {
      db.createObjectStore("shoplist", { keyPath: "list_number" });
    }

    if (!db.objectStoreNames.contains("items")) {
      db.createObjectStore("items", { keyPath: "item_number" });
    }
  };
};

var addShoplistItem = function(event) {
  //trying to add item to the objectstore, in this case the shoplist
  var shoppinglistInput = document.getElementById("shoppinglistInput").value;

  var request = indexedDB.open(dbName, dbVersion);
  request.onsuccess = function(event) {
    var db = event.target.result;
    var transaction = db.transaction("shoplist", "readwrite");
    var store = transaction.objectStore("shoplist");
    var item = {
      list_number: "1", // static...
      name: shoppinglistInput,

      created: new Date().getTime()
    };
    store.add(item);
    return transaction.complete;
  };

  //fire the fetchShoplist function
};

var fetchShoplist = function(event) {
  //dont think it works...
  var db = event.target.result;
  let transaction = db.transaction("shoplist");
  let books = transaction.objectStore("shoplist");

  let request = books.openCursor();

  // called for each book found by the cursor
  request.onsuccess = function() {
    let cursor = request.result;
    if (cursor) {
      let key = cursor.key; // book key (id field)
      let value = cursor.value; // book object
      console.log(key, value);
      cursor.continue();
    } else {
      console.log("No more books");
    }
  };
};
