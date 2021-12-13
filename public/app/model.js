var MODEL = (function () {
  var _navToPage = function (pageName) {
    $.get(`pages/${pageName}/${pageName}.html`, (data) => {
      console.log(data);
      $("#app").html(data);
    });
  };

  return {
    navToPage: _navToPage,
  };
})();
