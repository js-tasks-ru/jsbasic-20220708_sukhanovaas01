function truncate(str, maxlength) {
  

  if (str.length < maxlength) {
    return str; 
  } else {
    return (str.slice(0, --maxlength) + "…");
  }

}
console.log( truncate('Вот, что мне хотелось бы сказать на эту тему:', 20) );

// сравнивать можно в пределах одного типа, поэтому использован str.length, дающий тип число
// str.slice(start [, end]) Если аргумент end отсутствует, slice возвращает символы до конца строки:
// str.slice(0);