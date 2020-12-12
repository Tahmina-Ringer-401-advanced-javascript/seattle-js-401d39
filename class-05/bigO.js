// BigO
// n = number of times something is going to happen

const { listIndexes } = require("../class-04/demo/mongo/models/food-model");

// worst case, this will happen 10 times
// O(1)
for(let i=0; i<9; i++){
  console.log(i);
}

// worse case, this will happen an unknown number of times
// O(n)
for(let i=0; i<n; i++){
  console.log(n);
}

// worst case, this will be O(log n)
let binarySearch = (arr, value) => {
  let start = 0;
  let end = arr.length - 1;
  let middle = 0;

  while( start <= end ){
    middle = Math.floor( (start + end) / 2);

    if (value === arr[middle]){
      return middle;
    }

    else if( value > arr[middle] ){
      start = middle + 1;
    }

    else {
      end = middle -1;
    }
  }

  return -1;
}

// this will give you O(n)^2
for(let i = 0; i<list.length; i++){
  for(let j=0; j<list.length; j++){
    console.log(i); console.log(j);
  }
}