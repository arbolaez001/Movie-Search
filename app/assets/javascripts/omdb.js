/// <reference path="typings/jquery.d.ts" />
var Services;
(function (Services) {
    var Http = (function () {
        function Http() {
        }
        Http.loadAjax = function (options) {
            $.ajax({
                url: options.url,
                type: options.data,
                dataType: options.dataType,
                data: options.data
            })
                .done(function (movies) {
                if (movies.Response === "True") {
                    $("#omdb .grid .row").find("*").remove();
                    $.each(movies.Search, function (i, movie) {
                        $('#omdb .grid .row').append(new WrapResponse().html(movie));
                    });
                }
                else {
                    $('#omdb .grid .row').find("*").remove();
                }
            })
                .fail(function () {
                console.log("Error!");
            });
        };
        return Http;
    }());
    Services.Http = Http;
})(Services || (Services = {}));
var CheckPoster = (function () {
    function CheckPoster(movie) {
        this.movie = movie;
        this.valid();
    }
    CheckPoster.prototype.valid = function () {
        if (this.movie.Poster !== "N/A") {
            return "<img class=\"card-img-top img-rounded\" alt=\"" + this.movie.Title + "\" src=\"" + this.movie.Poster + "\">";
        }
        else {
            return "<h4 class=\"text-xs-center lead\" alt=\"" + this.movie.Title + "\"> No Poster </h4>";
        }
    };
    return CheckPoster;
}());
var WrapResponse = (function () {
    function WrapResponse() {
    }
    WrapResponse.prototype.html = function (movie) {
        return "<div class=\"grid-item col-sm-6 col-md-4\">\n      <div class=\"card\">\n        " + new CheckPoster(movie) + "\n        <div class=\"card-block\">\n          <h6 class=\"card-title\"> " + movie.Title + " </h6>\n          <p class=\"card-text\"> Year: <span>" + movie.Year + "</span></p>\n        </div>\n      </div>\n    </div>\n    ";
    };
    return WrapResponse;
}());
$(function () {
    $("input").on("keyup", function () {
        var test = $(this).val();
        new Services.Http.loadAjax({
            url: "http://www.omdbapi.com/",
            type: "GET",
            dataType: "JSON",
            data: { s: test }
        });
    });
});
