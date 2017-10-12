/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
 console.log("TOP OF FILE--------");
  var config = {
    apiKey: "AIzaSyAO60JcUqrbqBkRq94ib7VNWYYU_yLdVnM",
    authDomain: "train-project-bace0.firebaseapp.com",
    databaseURL: "https://train-project-bace0.firebaseio.com",
    projectId: "train-project-bace0",
    storageBucket: "train-project-bace0.appspot.com",
    messagingSenderId: "389206188656"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// firebase variables
var trainNameInput ="";
var destinationInput ="";
var firstTrainInput ="";
var frequencyInput ="";


 console.log("right before click--------");

// 2. Button for adding Trains
$("#addTrainBtn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  trainNameInput = $("#trainNameInput").val().trim();
  destinationInput = $("#destinationInput").val().trim();
  firstTrainInput = $("#firstTrainInput").val().trim();
  frequencyInput = $("#frequencyInput").val().trim();

  console.log("#trainNameInput");

  // Creates local "temporary" object for holding train data
  var newTrain = {
    trainNameInput: trainNameInput,
    destinationInput: destinationInput,
    firstTrainInput: firstTrainInput,
    frequencyInput: frequencyInput,
  };

  console.log("train about to be saved------", newTrain);

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);



  // Clears all of the text-boxes
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainInput").val("");
  $("#frequencyInput").val("");
});

// 3. Create Firebase event for adding Train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainNameInput = childSnapshot.val().trainNameInput;
  var destinationInput = childSnapshot.val().destinationInput;
  var firstTrainInput = moment(childSnapshot.val().firstTrainInput, "HH:mm");
  var frequencyInput = childSnapshot.val().frequencyInput;
  

  // train Info
  console.log(trainNameInput);
  console.log(destinationInput);
  console.log(firstTrainInput);
  console.log(frequencyInput);


  // next train
  var newTime = moment().diff(firstTrainInput,"minutes");
  var timeRemainder = moment().diff(firstTrainInput, "minutes") % frequencyInput;
  var minAway = frequencyInput - timeRemainder;

  var nextTrain = moment().add(minAway, "m").format("HH:mm")
  
  console.log(timeRemainder);
  console.log(minAway);
  console.log(nextTrain);


  // Add each train's data into the table
  $("#train-table > tbody").append(
    "<tr><td>" + trainNameInput + 
    "</td><td>" + destinationInput + 
    "</td><td>" + frequencyInput +  " min" + 
    "</td><td>" + nextTrain + 
    "</td><td>" + minAway + "</td></tr>");
});

