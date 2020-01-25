// This Google Sheets script will post to a Flock channel when a user submits data to a Google Forms Spreadsheet
// Don't forget to change the required Flock information below.

// Source: 

// Alter this to match the incoming webhook url provided by Flock
var flockIncomingWebhookUrl = 'https://api.flock.com/hooks/sendMessage/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx';

// In the Script Editor, run initialize() at least once to make your code execute on form submit
function initialize() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i in triggers) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  ScriptApp.newTrigger("submitValuesToFlock")
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onFormSubmit()
    .create();
}

// Running the code in initialize() will cause this function to be triggered on every Form Submit
function submitValuesToFlock(e) {
  var textValue = constructText(e.values);
  
  var payload = {
    "text": textValue
  };
  
  var options = {
    'method': 'post',
    'contentType':'application/json',
    'payload': JSON.stringify(payload)
  };
  
  var response = UrlFetchApp.fetch(flockIncomingWebhookUrl, options);
}

// Creates Flock message which contain the data from the Google Form
// submission, which is passed in as a parameter
var constructText = function(values) {
  var columnNames = getColumnNames();
  
  var textValue = "";
  
  for (var i = 0; i < columnNames.length; i++) {
    var colName = columnNames[i];
    var val = values[i];
    if(val != undefined)
    textValue+=(colName+": "+val+"\n");
  }
  
  return textValue;
}

// Extracts the column names from the first row of the spreadsheet
var getColumnNames = function() {
  var sheet = SpreadsheetApp.getActiveSheet();

  // Get the header row using A1 notation
  var headerRow = sheet.getRange("1:1");

  // Extract the values from it
  var headerRowValues = headerRow.getValues()[0];

  return headerRowValues;
}
