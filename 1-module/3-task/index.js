function ucFirst(str) {

  let strUpper = str
              .charAt(0)  
              .toUpperCase() + str.slice(1);

  return strUpper;
  // alert( str.slice(1) ); добавит нам все буквы после первой
  // alert( 'name'[0].toUpperCase() ); // 'n'
  // alert( str.charAt(1000) ); // '' (пустая строка)
}
console.log( ucFirst('петя') );

// в задаче применены методы