

    var debug = true;

    var companyName="";
    var frontEndReq = 0;
    var clientReq = 0;
    var serverReq = 0;
    var randomNumber = function(min, max){
        return Math.floor(Math.random()*(1 + max - min) + min);
    };

    function createCompanyName(){

        //set string to empty
        companyName="";

        console.log("company was called");

        var alphabet="abcdefghijklmnopqrstuvwxyz";

        for(i=0;i<randomNumber(0,6);i++){
            companyName+=alphabet.charAt(randomNumber(0,25))
        }

        companyName+="ion";
        companyName=companyName[0].toUpperCase()+companyName.slice(1);

        console.log(companyName);

    }




$(document).ready(function(){

    //prevent form submission
    $("#projectForm").on("submit", function(event){
    event.preventDefault();

    })

    initialize();


})

function assignStaff(){

    //console.log("we are totally assignig staff");

    var gotFront = false;
    var gotClient = false;
    var gotServer = false;

    var objSkillBox ={
        "skills": ["Front End","Clientside Logic", "Serverside Logic"]

    }

    // ask the server for unfilled roles

    //var arrSkillsNeed = ["F","C"]


    // ask server for employees until team is built.

    // while any roles unfilled

        // give me one of these employees for these unfilled roles
    while(objSkillBox.length>0){

        $.ajax({
            type: "POST",
            url: "/emps",
            data: objSkillBox,
            success: function(data){

                if (debug){
                console.log("Hey we got some data", data.name);
                }
                // try and retreive cats
                listEmps(data);
                for (var i=0; i>objSkillBox.skills.length; i++){
                    if(data.skill == objSkillBox.skills[i]){
                        objSkillBox.skills.splice(i,1);
                    }
                }
            }
        });

    }



}

function listEmps(data){
    // we can do stuff with returned object
    console.log("we are client side looking at returned data",data.name);
}

function initialize(){

    createListeners();


}
function makeProject(){

    console.log("we are in make project");
    createCompanyName();
    setRequirements();

    //after we have all the project bits
    displayProject();
    addStaffButton();
    addStaffListener();


}
function addStaffListener(){

    $('.company-name').on('click', '.assign-staff', assignStaff);



}
function addStaffButton(){


    $('.company-name').append('<button class="assign-staff">Assign Staff</button>');



}
function setRequirements(){


    frontEndReq = randomNumber(10,60);
    clientReq = randomNumber(10,60);
    serverReq = randomNumber(10,60);



}

function displayProject(){

    //display the project on the screen
    $('.company-name').empty();

    $('.company-name').append('<p>Company Name:  ' + companyName + '</p>');

    $('.company-name').append('<p>Front End Requirements:  ' + frontEndReq + '</p>');

    $('.company-name').append('<p>Clientside Logic Requirements:  ' + clientReq + '</p>');
    $('.company-name').append('<p>Serverside Logic Requirements:  ' + serverReq + '</p>');




        // frontEndReq = randomNumber(10,60);
        // clientReq = randomNumber(10,60);
        // serverReq = randomNumber(10,60);



}

function createListeners(){

    $('.project').on('click', '.make-project', makeProject);



}

    //---------------



// $(document).ready(function(){
//
//     //--------------
//     //listcats here test
//     listCats();
//     //-----------
//     //on submit, prevent page refresh.
//     $("#catForm").on("submit", function(event){
//     event.preventDefault();
//
//     //initialize variables
//     var values = {};
//     var empData = false;
//     var strCheck = "";
//
//     //fetch form values by stepping through the form object, storing each key value
//     // pair in an object.
//     $.each($("#catForm").serializeArray(), function(i, field){
//         values[field.name] = field.value;
//     });
//
//     if (debug){
//         console.log("local log",values.catName);
//     }
//     var objCat = {
//         "catName" : values.catName
//     }
//
//     //do a get call with values.catname
//     $.ajax({
//         type: "POST",
//         url: "/cats",
//         data: objCat,
//         success: function(data){
//
//             if (debug){
//             console.log("Hey we got some data", data);
//             }
//             // try and retreive cats
//             listCats()
//
//         }
//     });
//   });
// });
//
// function listCats(){
//     // let the cats out
//     $('.cat-container').empty();
//     // clear the input
//     $('#catName').val("");
//
//     // send a get to the server saying hey we want all the cats in the db
//
//     $.ajax({
//         type: "GET",
//         url: "/cats",
//         // it worked list the cats
//
//
//         /// TODO here I would like to experiment with popping this object into an array
//
//
//         success: function(data){
//
//             // loop through the data object. This looks teribble I want a better way
//             // to step through the result. getRows?
//             $.each(data, function(key, value) {
//                     // console.log(key, value);
//                     if (debug){
//                         console.log(value.name);
//                     }
//                     $('.cat-container').append("<p>Cat Name:   " + value.name + "</p>");
//             });
//         }
//     });
// }
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
