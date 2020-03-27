var dbVersion = 1; //this is for migrations, everytime we change something for in the store file, we have to increase det version number.
var dbName = "shoplist"; // is the name of the IndexedDB database

if (self.IndexedDB) {
  console.log("IndexedDB is supported");
}
