function logResponse(response) {
  if (console && console.log) {
    console.log('The response was', response);
  }
}

function getPhoto(el){
  console.log($(el.target).attr("src"));
  return  $(el.target).attr("src");
}

function openAlbums(el) {
  var id_ = $(el.target).data("id");
  var ul_list = $('<ul/>', {
    id: 'photos_list'
  });

  FB.api('/' + id_ + '/?fields=photos', function(response) {
    $("#goback").removeClass('visuallyhidden');
    $("#albums").fadeOut(500);
    $("#photos").fadeIn(500);
    $("#photos_list").remove();
    $.each(response.photos.data, function(index, el) {
      var content = $('<div/>', {
        id: el.id
      });
      var li = $('<li/>', {
        id: "photos-" + el.id,
        class:"photo-facebook"
      });
      var img = $('<img/>', {
        src: el.images[0].source,
        alt: 'picture' 
      }).appendTo(content);

      var title = $('<p/>', {
        html: el.name
      }).appendTo(content);

      content.appendTo(li);

      li.appendTo(ul_list);
      img.click(function(el) {
            getPhoto(el);
      });
    });
    ul_list.appendTo("#photos");
  });


}

$(function() {
  $("#goback").click(function(){
    $("#photos").fadeOut("500");
    $("#albums").fadeIn("500");
    $(this).addClass("visuallyhidden");
  });
  var ul_list = $('<ul/>', {
    id: 'albums_list'
  });

  $("#getAlbums").click(function() {
    FB.api('/me?fields=name,albums', function(response) {
      $.each(response.albums.data, function(index, el) {
        FB.api('/' + el.cover_photo, function(response) {
          var id_ = el.id,
            content = $('<div/>', {
              id: id_,
              'data-id': id_,
              class: "albums_content"
            });
            var li = $('<li/>', {
              id: "cover-el-" + el.id,
              class:"album-photos"
            });
            var img = $('<img/>', {
              src: response.picture,
              alt: 'cover',
              'data-id': id_
            }).appendTo(content);

            var title = $('<p/>', {
              html: el.name,
              'data-id': id_
            }).appendTo(content);

          content.appendTo(li);

          li.appendTo(ul_list);

          content.click(function(el) {
            openAlbums(el);
          });
        });
      });
    });
    ul_list.appendTo("#albums");
  });
});