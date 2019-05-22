
// Get ALL Headlines as json ================
$.getJSON("/headlines", function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#headlines").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  }
});

// MODAL box for comments
// $("#commentModal").on("click", "p", function() {
//   $("#comments").empty();
// });

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
    $("#comments").append("<button data-id='" + data._id + "' id='deletecomment'>Delete Comment</button>");
    
// Show anyprevious Comment ===================
    if (data.comment) {
      $("#titleinput").val(data.comment.title);
      $("#bodyinput").val(data.comment.body);
    }
  });
});

// POST request to add/change Comment =======
$(document).on("click", "#savecomment", function() {
  var thisId = $(this).attr("data-id");

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

// REMOVE request to add/change comment =======
$(document).on("click", "#deletecomment", function() {

  $("#titleinput").val("");
  $("#bodyinput").val("");

    var thisId = $(this).attr("data-id");

    $.ajax({
      method: "REMOVE",
      url: "/delete/" + thisId,

      success: function(response) {
        thisId.remove();
      }
    })
});

      // $.ajax({
      //   method: "PUT",
      //   url: "/headlines/" + thisId,
      //   data: {
      //     title: $("#titleinput").val(""),
      //     body: $("#bodyinput").val("")
      //   },
      //   success: function() {
      //     console.log("Comment Deleted");
      //   }
      // })
