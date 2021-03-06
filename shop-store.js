var dbVersion = 1; //this is for migrations, everytime we change something for in the store file, we have to increase det version number.
var dbName = "shoplist"; // is the name of the IndexedDB database

/*Need to be wrrapped in functions so, we can call the CRUD operation from the index page.

what to do?

- Deleting items



*/

// pass a function reference
document.addEventListener(
  "DOMContentLoaded",
  function() {
    // your code goes here
    addObjectStores();
    fetchShoplist();
    fetchItemlist();
  },
  false
);

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
      db.createObjectStore("items", { keyPath: "timestamp" });
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
  var request = indexedDB.open(dbName, dbVersion);
  request.onsuccess = function(event) {
    var db = event.target.result;
    var transaction = db.transaction("shoplist", "readwrite");
    var store = transaction.objectStore("shoplist");
    var request = store.openCursor();
    var s = "";

    request.onsuccess = function(event) {
      var cursor = event.target.result;

      if (cursor) {
        //  console.log(cursor.key);

        for (var field in cursor.value.name) {
          s += cursor.value.name[field];
        }

        cursor.continue();
      }

      $("#shoplist-items").html(s);
    };
  };
};

var addItem = function(event) {
  var input = document.getElementById("addListItem").value;

  var request = indexedDB.open(dbName, dbVersion);
  request.onsuccess = function(event) {
    var db = event.target.result;
    var transaction = db.transaction(["items"], "readwrite");
    var store = transaction.objectStore("items");

    if (!input == "") {
      var item = {
        name: input,
        timestamp: new Date().getTime()
      };
    }

    store.add(item);
    return transaction.complete;
  };
};

var fetchItemlist = function() {
  var request = indexedDB.open(dbName, dbVersion);

  request.onsuccess = function(event) {
    var db = event.target.result;
    var transaction = db.transaction("items", "readwrite");
    var store = transaction.objectStore("items");
    var request = store.openCursor();
    var s = "";

    request.onsuccess = function(event) {
      var cursor = event.target.result;

      if (cursor) {
        for (var field in cursor.value.name) {
          s += cursor.value.name[field];
        }

        cursor.continue();
      }

      document.getElementById("todo-items").innerHTML = s;
    };
  };
};

var deleteItem = function() {
  var deleteItem = document.getElementById("delete").value;

  var request = indexedDB.open(dbName, dbVersion);
  request.onsuccess = function(event) {
    var db = event.target.result;
    db
      .transaction("items", "readwrite")
      .objectStore("items")
      .openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if (!cursor) {
        return;
      }
      var customer = cursor.value;
      if (customer.name === deleteItem) {
        cursor.delete();
      }
      cursor.continue();
    };
  };
};
