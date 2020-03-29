var dbVersion = 2; //this is for migrations, everytime we change something for in the store file, we have to increase det version number.
var dbName = "shoplist"; // is the name of the IndexedDB database

/*Need to be wrrapped in functions so, we can call the CRUD operation from the index page.

what to do?


*/

$(document).ready(function() {
  //adding objectstore: shoplist
  addShoplist();
});

var showShoplist = function() {
  //show div
  document.getElementById("showdiv").style.display = "block";
  var x = document.getElementById("shoppinglistInput").value;
};

var addShoplist = function() {
  // var shoppinglistInput = document.getElementById("shoppinglistInput").value;

  //opening the database
  var request = indexedDB.open(dbName, dbVersion);

  request.onupgradeneeded = function(event) {
    var db = event.target.result;

    //if the object store do not exist create it.
    if (!db.objectStoreNames.contains("shoplist")) {
      db.createObjectStore("shoplist", { keyPath: "list_number" });
    }
  };
};

var addShoplistItem = function() {
  //trying to add item to the objectstore, in this case the shoplist
  var shoppinglistInput = document.getElementById("shoppinglistInput").value;

  var request = indexedDB.open(dbName, dbVersion);
  request.onsuccess = function(event) {
    var db = event.target.result;
    var tx = db.transaction("shoplist", "readwrite");
    var store = tx.objectStore("shoplist");
    var item = {
      list_number: "1",
      name: shoppinglistInput,
      price: 4.99,
      description: "A very tasty sandwich",
      created: new Date().getTime()
    };
    store.add(item);
    return tx.complete;
  };
};

var fetchShoplist = function() {};

// request.onupgradeneeded = function(event) {
//   var db = event.target.result;

//   //items object store
//   if (!db.objectStoreNames.contains("items")) {
//     db.createObjectStore("items", { keyPath: "item_number" });
//   }

//   //shoplist object store
//   if (!db.objectStoreNames.contains("shoppinglist")) {
//     var shoppinglistStore = db.createObjectStore("shoppinglist", {
//       autoIncrement: true
//     });
//     shoppinglistStore.createIndex("from_idx", "shoplist_name", {
//       unique: false
//     });
//   }
// };

// request.onsuccess = function(event) {
//   var db = event.target.result;
//   //the dummydata
//   var dummyData = [
//     { item_number: "01", product_name: "Iphone 7", product_color: "Black" },
//     { item_number: "02", product_name: "Iphone 8", product_color: "Black" },
//     {
//       item_number: "03",
//       product_name: "Samsung Galaxy A10",
//       product_color: "Black"
//     }
//   ];

//   //transaction
//   var itemTransaction = db.transaction("items", "readwrite"); // gives permission to read and write..
//   itemTransaction.onerror = function(event) {
//     console.log("Error: ", event.target.error);
//   };

//   // the store were we parse the data
//   var itemStore = itemTransaction.objectStore("items");

//   for (var i = 0; i < dummyData.length; i++) {
//     itemStore.add(dummyData[i]);
//   }
// };
