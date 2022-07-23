function getMinMax(str) {
  let sortedString = str.split(" ").filter((item) => isFinite(item));

  return (result = {
    min: Math.min(...sortedString),
    max: Math.max(...sortedString),
  });
}
