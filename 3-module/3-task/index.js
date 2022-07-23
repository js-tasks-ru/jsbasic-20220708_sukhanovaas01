function camelize(str) {
  let string = str
    .split("-")
    .map(function abstract(item, index) {
      if (index > 0) {
        return (item = item.charAt(0).toUpperCase() + item.slice(1));
      } else {
        return item;
      }
    })
    .join("");

  return string;
}
