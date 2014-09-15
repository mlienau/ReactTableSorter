React Table Sorter
================

ReactTableSorter is my implementation of a table sorter built with React.js.

If you have an array of javascript items:
```
var movies = [
  {id: 1, name: 'The Matrix', releaseYear: 1999, imdbStars: 8.7},
  {id: 2, name: 'The Dark Knight', releaseYear: 2008, imdbStars: 9.0 }
];
```

You can create a table sorter by simply calling `<TableSorter items={movies} />`

Want custom control of the columns in the table? Fine, you twisted my arm.  Create your array of columns:

```
var columns = [
  {name: 'name', displayName: 'Movie Title'}, 
  {name: 'releaseYear', displayName: 'Release Year'}
];
```

`<TableSorter items={movies} columns={columns} />`

Future Features:

* Conditional table row expressions
* Better templating
* Remote Datasources
* Long Polling or WebSockets
