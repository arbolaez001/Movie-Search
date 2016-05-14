/// <reference path="typings/jquery.d.ts" />

interface AjaxOptions {
  url: string;
  type: string;
  dataType: string;
  data: any;
}

namespace Services {
  export class Http {

    static loadAjax(options: AjaxOptions) {
      $.ajax({
        url: options.url,
        type: options.data,
        dataType: options.dataType,
        data: options.data
      })
      .done(function(movies){
        if (movies.Response === "True") {
          $("#omdb .grid .row").find("*").remove();
          $.each(movies.Search, function(i, movie) {
            $('#omdb .grid .row').append(new WrapResponse().html(movie));
          });
        } else {
          $('#omdb .grid .row').find("*").remove();
        }
      })
      .fail( function() {
        console.log("Error!");
      });
    }
  }
}

class CheckPoster {
  constructor(public movie: any){
    this.valid();
  }
  valid(){
    if(this.movie.Poster !== "N/A"){
      return `<img class="card-img-top img-rounded" alt="${this.movie.Title}" src="${this.movie.Poster}">`;
    }else{
      return `<h4 class="text-xs-center lead" alt="${this.movie.Title}"> No Poster </h4>`;
    }
  }
}

class WrapResponse {
  html(movie: any) {
    return `<div class="grid-item col-sm-6 col-md-4">
      <div class="card">
        ${new CheckPoster(movie)}
        <div class="card-block">
          <h6 class="card-title"> ${movie.Title} </h6>
          <p class="card-text"> Year: <span>${movie.Year}</span></p>
        </div>
      </div>
    </div>
    `;
  }
}

$(function() {
  $("input").on("keyup", function () {
    let test = $(this).val();
    new Services.Http.loadAjax(
      {
        url: "http://www.omdbapi.com/",
        type: "GET",
        dataType: "JSON",
        data: { s: test }
      }
    );
  });
});
