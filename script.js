var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
    return query_string;
};

var params = QueryString();
if (params.inputName == undefined) {
    $("#name").text('Joke for Chuck Noriss');
    $.ajax({
        url: 'http://api.icndb.com/jokes/random?limitTo=[nerdy]&escape=javascript',
        type: 'GET',
        success: function(response) { $("#joke").text(response.value.joke); }
    });
} else {
  $("#name").text('Joke for ' + params.inputName.replace('+',' '));
  $.ajax({
      url: 'http://api.icndb.com/jokes/random?firstName='+params.inputName+'&lastName=&limitTo=[nerdy]&escape=javascript',
      type: 'GET',
      success: function(response) { $("#joke").text(response.value.joke); }
  });
}

$(document).ready(function(){
  $('#shareText').text(' it if you like IT!');
});