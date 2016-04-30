$(function() {
  function checkPosterValid(movie){
    if(movie.Poster !== "N/A") {
      return '<img class="card-img-top img-rounded" alt="' + movie.Title +'" src="' + movie.Poster +'">';
    }else {
      return '<h4 class="text-xs-center lead" alt="' + movie.Title +'"> No Poster </h4>';
    }
  }
  var wrapAll = function(movie){
    var html = '' +
    '<div class="grid-item col-sm-6 col-md-4">' +
      '<div class="card">'+
        checkPosterValid(movie) +
        '<div class="card-block">' +
          '<h6 class="card-title">'+ movie.Title +'</h6>' +
          '<p class="card-text"> Year: '+ '<sapn>' + movie.Year + '</span></p>' +
        '</div>' +
      '</div>' +
    '</div>';
    return html;
  };
  var options = $("#selectpicker option:selected").text();
  var omdb;
  if (options === "Title"){
    omdb = "http://www.omdbapi.com/?t=" + getSearch();
    ajaxOmdb(omdb);
  }else if (options === "Year"){
    omdb = "http://www.omdbapi.com/?y=" + getSearch();
    ajaxOmdb(omdb);
  }else {
    omdb = "http://www.omdbapi.com/?s=" + getSearch();
    ajaxOmdb(omdb);
  }

  function getSearch(){
    $('input').on('keyup', function () {
      var test = $(this).val();
    });
  }

  function ajaxOmdb(omdb){
    $.ajax({
      url: omdb,
      type: 'GET',
      dataType: 'json'
    })
    .done(function(movies) {
      console.log(movies);
      if (movies.Response == "True") {
        $('#omdb .grid .row').find("*").remove();
        $.each(movies.Search, function(i, movie) {
            $('#omdb .grid .row').append( wrapAll(movie));
        });
      }else{
        $('#omdb .grid .row').find("*").remove();
      }
    });
  }
});
