;
var Services;
(function (Services) {
    var Http = (function () {
        function Http() {
        }
        Http.loadAjax = function (options) {
            return $.ajax({
                url: options.url,
                dataType: options.dataType,
                data: options.data
            });
        };
        ;
        return Http;
    }());
    Services.Http = Http;
    ;
})(Services || (Services = {}));
;
/// <reference path="services.ts"/>
/**
 * WrapResponse
 */
var WrapResponse = (function () {
    function WrapResponse() {
    }
    WrapResponse.prototype.html = function (movie, index) {
        return "<div class=\"col s12 m6 l4\">\n      <div class=\"card\">\n        <div class=\"card-image\">\n          " + this.valid(movie) + "\n        </div>\n        <div class=\"card-content\">\n          <p class=\"card-title\"> " + movie.Title + " </p>\n          <p> Year: <strong>" + movie.Year + "</strong></p>\n        </div>\n        <div class=\"card-action\">\n          <a class=\"waves-effect waves-light btn\" href=\"http://www.imdb.com/title/" + movie.imdbID + "\" target=\"_blank\">View on IMDB</a>\n        </div>\n      </div>\n    </div>";
    };
    WrapResponse.prototype.valid = function (movie) {
        if (movie.Poster !== "N/A") {
            return "<img\n                class=\"card-img-top img-rounded materialboxed\"\n                alt=\"" + movie.Title + "\"\n                data-caption=\"" + movie.Title + "\"\n                src=\"" + movie.Poster + "\">";
        }
        else {
            return "<h4 class=\"text-xs-center lead\" alt=\"" + movie.Title + "\"> No Poster </h4>";
        }
    };
    ;
    return WrapResponse;
}());
/**
 * LoadModal
 */
var LoadModal = (function () {
    function LoadModal() {
    }
    LoadModal.modalHtml = function (id) {
        return "\n    <button data-target=\"modal" + id + "\" class=\"btn modal-trigger\">Modal</button>\n    <!-- Modal Structure -->\n    <div id=\"modal" + id + "\" class=\"modal\">\n      <div class=\"modal-content\">\n        <h4>" + id + "</h4>\n      </div>\n    </div>";
    };
    ;
    return LoadModal;
}());
;
/// <reference path="../typings/jquery.d.ts" />
/// <reference path="services.ts"/>
/// <reference path="htmlResponse.ts"/>
/// <reference path="modal.ts"/>
$(function () {
    $("input").on("keyup", function () {
        var input_value = $(this).val();
        Services.Http.loadAjax({
            url: "http://www.omdbapi.com/",
            dataType: "JSON",
            data: { s: input_value }
        })
            .done(function (movies) {
            if (movies.Response === "True") {
                $("#omdb .grid .row").find("*").remove();
                movies.Search.forEach(function (movie, index) {
                    $("#omdb .grid .row").append(new WrapResponse().html(movie, index));
                    $('.modal-trigger').leanModal();
                    $('.materialboxed').materialbox();
                });
            }
            else {
                $("#omdb .grid .row").find("*").remove();
            }
        })
            .fail(function () {
            console.log("Error!");
        });
    });
});
