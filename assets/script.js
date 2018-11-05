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
$(document).ready(function(){
  updateDisplay();
});

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
  updateDisplay();
});
// When database is updated then update the table to relect the changes
var updateDisplay = function() {
  database.ref().on('child_added', function(snapshot) {
    var data = snapshot.val();
    console.log(snapshot.val());
    var row = $("<tr>");
    var c1 = data.train_name;
    var c2 = data.destination;
    var c3 = data.first_train_time;
    var c4;
    var c5;
  });
}