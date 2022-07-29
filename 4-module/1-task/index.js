function makeFriendsList(friends) {
  let newUl = document.createElement("Ul"); // первично создадим ul
  for (let friend of friends) {
    newUl.insertAdjacentHTML(
      "beforeEnd",
      `<li>${friend.firstName} ${friend.lastName}</li>`
    );
  }

  return newUl;
}
