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

//reads page, loads everything to be used.
$(document).ready(() => {
  console.log("loading...");
  initListeners();
});
