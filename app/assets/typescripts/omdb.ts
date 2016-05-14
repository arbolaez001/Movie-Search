/// <reference path="../typings/jquery.d.ts" />
/// <reference path="services.ts"/>
/// <reference path="htmlResponse.ts"/>
/// <reference path="modal.ts"/>

$(function() {
  $("input").on("keyup", function () {
    let input_value = $(this).val();

    Services.Http.loadAjax({
      url: "http://www.omdbapi.com/",
      dataType: "JSON",
      data: { s: input_value }
    })
    .done(function(movies){
      if (movies.Response === "True") {
        $("#omdb .grid .row").find("*").remove();
         movies.Search.forEach ((movie: any, index: any ) => {
          $("#omdb .grid .row").append( new WrapResponse().html (movie, index ));
          $('.modal-trigger').leanModal();
          $('.materialboxed').materialbox();
        });
      } else {
        $("#omdb .grid .row").find("*").remove();
      }
    })
    .fail( function() {
      console.log("Error!");
    });
  });
});
