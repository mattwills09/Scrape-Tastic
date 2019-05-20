
// Get ALL Headlines as json ================
$.getJSON("/headlines", function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#headlines").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  }
});

$(document).on("click", "p", function() {
  $("#comments").empty();
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/headlines/" + thisId
  })
  .then(function(data) {
    console.log(data);
    $("#comments").append("<h2>" + data.title + "</h2>");
    $("#comments").append("<input id='titleinput' name='title' >");
    $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
    $("#comments").append("<button data-id='" + data._id + "' id='savecomment'>Add New Comment</button>");

// If there is a Comment ===================
    if (data.comment) {
      $("#titleinput").val(data.comment.title);
      $("#bodyinput").val(data.comment.body);
    }
  });
});

$(document).on("click", "#savecomment", function() {
  var thisId = $(this).attr("data-id");

// POST request to change the comment
  $.ajax({
    method: "POST",
    url: "/headlines/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })
    .then(function(data) {
      console.log(data);
      $("#comments").empty();
    });

    $("#titleinput").val("");
    $("#bodyinput").val("");
});
