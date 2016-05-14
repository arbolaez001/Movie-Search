/// <reference path="services.ts"/>

/**
 * WrapResponse
 */

class WrapResponse {
  html(movie: any, index?: any) {
   return `<div class="col s12 m6 l4">
      <div class="card">
        <div class="card-image">
          ${this.valid(movie)}
        </div>
        <div class="card-content">
          <p class="card-title"> ${movie.Title} </p>
          <p> Year: <strong>${movie.Year}</strong></p>
        </div>
        <div class="card-action">
          <a class="waves-effect waves-light btn" href="http://www.imdb.com/title/${movie.imdbID}" target="_blank">View on IMDB</a>
        </div>
      </div>
    </div>`;
  }

  private valid(movie: any) {
    if (movie.Poster !== "N/A") {
      return `<img
                class="card-img-top img-rounded materialboxed"
                alt="${movie.Title}"
                data-caption="${movie.Title}"
                src="${movie.Poster}">`;
    }else {
      return `<h4 class="text-xs-center lead" alt="${movie.Title}"> No Poster </h4>`;
    }
  };
}