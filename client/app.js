// get requests data
// post submits data
// TODO  DO I even need a form OR a prevent submit button??
// angular is doing a post. Figure out what it's posting and where, assemble that data to send,
// and send it. Most likely the ajax call.
// Find out if the ajax is built into jquery.
// I want to experiment with not doing a form.
// in document ready, set up a listener for the add cat button.
// on the add cat click, do an ajax call. Get the string from the text box and send it as
// a get request.
// catch the submit event
// on submit collect the form data
// serialize array
// document ready?
// The very first thing I want to do is capture the submit event
// then get all the data from the form
// then send it all to the db via post
// once that succesfully posts I want to fetch ALL the cats from the db
// on success of post do the get then draw to the form

    var debug = false;
    // var debug = true;



$(document).ready(function(){

    //--------------
    //listcats here test
    listCats();
    //-----------
    //on submit, prevent page refresh.
    $("#catForm").on("submit", function(event){
    event.preventDefault();

    //initialize variables
    var values = {};
    var empData = false;
    var strCheck = "";

    //fetch form values by stepping through the form object, storing each key value
    // pair in an object.
    $.each($("#catForm").serializeArray(), function(i, field){
        values[field.name] = field.value;
    });

    if (debug){
        console.log("local log",values.catName);
    }
    var objCat = {
        "catName" : values.catName
    }

    //do a get call with values.catname
    $.ajax({
        type: "POST",
        url: "/cats",
        data: objCat,
        success: function(data){

            if (debug){
            console.log("Hey we got some data", data);
            }
            // try and retreive cats
            listCats()

        }
    });
  });
});

function listCats(){
    // let the cats out
    $('.cat-container').empty();
    // clear the input
    $('#catName').val("");

    // send a get to the server saying hey we want all the cats in the db

    $.ajax({
        type: "GET",
        url: "/cats",
        // it worked list the cats
        success: function(data){

            // loop through the data object. This looks teribble I want a better way
            // to step through the result. getRows?
            $.each(data, function(key, value) {
                    // console.log(key, value);
                    if (debug){
                        console.log(value.name);
                    }
                    $('.cat-container').append("<p>Cat Name:   " + value.name + "</p>");
            });
        }
    });
}
// --------------------- old code for reference
// var app = angular.module('app', []);
//
// app.controller("IndexController", ['$scope', '$http', function($scope, $http){
//     $scope.cat = {};
//     $scope.cats = [];
//
//     $scope.scott = {};
//
//     var fetchCats = function(){
//       $http.get("/cats").then(function(response){
//           $scope.cats = response.data;
//           $scope.cat = {};
//       });
//     };
//
//     $scope.add = function(kitty){
//         return $http.post("/cats", kitty).then(fetchCats());
//     };
//
//     fetchCats();
// }]);

// $.ajax({
//     type: "POST",
//     url: "/data",
//     data: kitty,
//     success: function(data){
//
//     }
// });
