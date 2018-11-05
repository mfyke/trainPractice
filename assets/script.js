// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
  apiKey: "AIzaSyD8L-oaaA8jIZH4fldj7C_AQFOZZxjJFjM",
  authDomain: "trainpractice-8b22d.firebaseapp.com",
  databaseURL: "https://trainpractice-8b22d.firebaseio.com",
  projectId: "trainpractice-8b22d",
  storageBucket: "trainpractice-8b22d.appspot.com",
  messagingSenderId: "368296124858"
}; 
// Get a reference to the database service
firebase.initializeApp(config);

var database = firebase.database();
// When form is submitted take the data and push it to the database

function writeUserData(name, dest, firstT, freq) {
  firebase.database().ref().push({
    train_name: name,
    destination: dest,
    first_train_time: firstT,
    frequency: freq
  });
}

$("#addButton").click(function() {
  event.preventDefault();
  console.log("button function initiated!!");
  var name = $("#trainName").val().trim();
  var dest = $("#destination").val().trim();
  var firstT = $("#firstTime").val().trim();
  var freq = $("#frequency").val().trim();
  console.log(name, dest, firstT, freq);
  writeUserData(name, dest, firstT, freq);
  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTime").val("");
  $("#frequency").val("");
  $("trainsInfo").empty();

});
// When database is updated then update the table to relect the changes
    database.ref().on('child_added', function(snapshot) {
    var data = snapshot.val();

    var firstTimeConverted = moment(data.first_train_time, "hh:mm").subtract(1, "day");

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var remainder =  diffTime%data.frequency;

    var timeRemaining = data.frequency-remainder;

    var nextTime = moment().add(timeRemaining, "minutes").format("hh:mm");
    
    var row = $("<tr>");
    var c1 = $("<td>").text(data.train_name);
    var c2 = $("<td>").text(data.destination);
    var c3 = $("<td>").text(data.frequency);
    var c4 = $("<td>").text(nextTime);
    var c5 = $("<td>").text(timeRemaining);
    $(row).append(c1, c2, c3, c4, c5);
    $("#trainsInfo").append(row);

  });
