function route() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#/", "");
  let homeID = "home";

  if (pageID == "") {
    pageID = homeID;
  } else {
    pageID = pageID;
  }

  MODEL.navToPage(pageID);
}

function initListeners() {
  route();
  $(window).on("hashchange", route);
}

function loop() {
  $.getJSON("data/data.json", (coffee) => {
    $.each(coffee.COFFEEMAKERS, function (index, coffee) {
      console.log("Recipe:" + coffee.name);
      $("#coffeecont").append(
        `<div id="insideCoffeeCont"><div class="coffee-image"><img src="${coffee.image}" alt=""></div><div class="coffee-info"><h1 class="coffee-name">${coffee.name}</h1><h1 class="coffee-price">Price:  ${coffee.price}</h1><div class="coffee-shipping-icon"><img src="${coffee.shippingicon}"></div></div></div>`
      );
    });
  }).fail((error) => {
    console.log(error);
  });
}

//reads page, loads everything to be used.
$(document).ready(() => {
  console.log("loading...");
  initListeners();
  loop();
});
