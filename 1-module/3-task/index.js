function ucFirst(str) {

  let str1 = str.charAt(0).toUpperCase() + str.slice(1);

  return str1;
  // alert( str.slice(1) ); добавит нам все буквы после первой
  // alert( 'name'[0].toUpperCase() ); // 'n'
  // alert( str.charAt(1000) ); // '' (пустая строка)
}
console.log( ucFirst('к') );