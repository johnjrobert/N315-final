function initFirebase() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      firebase
        .auth()
        .currentUser.updateProfile({})
        .then(() => {
          UpdateSiteWithInfo();
        });
      $(".pName").css("display", "block");
      $(".pName").html(user.fName);
      loadUserRecipe();
    } else {
      loadPublicRecipes();
      console.log("user is not there");
      $(".pName").css("display", "none");
      _db = "";
    }
  });
}

function createUser() {
  let password = "password"; //$("#password").val();
  let email = "johnjrobert@gmail.com";
  let firstName = "John";
  let lastName = "Robert";
  fullName = firstName + " " + lastName;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
}

function loginUser() {
  let email = "johnjrobert@gmail.com";
  let password = "password";
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      console.log("Logged in!");
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
}

function signoutUser() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("Signed out");
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}

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
  addToCart();
}

function loop() {
  $.getJSON("data/data.json", (coffee) => {
    $.each(coffee.COFFEEMAKERS, function (index, coffee) {
      console.log("Recipe:" + coffee.name);
      $("#coffeecont").append(
        `<div id="insideCoffeeCont"><div class="coffee-image"><img src="${coffee.image}" alt=""></div><div class="coffee-info"><h1 class="coffee-name">${coffee.name}</h1><h1 class="coffee-price">Price:  ${coffee.price}</h1><div class="coffee-shipping-icon"><img src="${coffee.shippingicon}"></div><button class="addCart">Add to Cart</button></div></div>`
      );
    });
  }).fail((error) => {
    console.log(error);
  });
}

function addToCart() {
  $(".addCart").on("click", () => {
    console.log("Hello");
  });
}

//reads page, loads everything to be used.
$(document).ready(() => {
  console.log("loading...");
  initListeners();
  loop();
});
