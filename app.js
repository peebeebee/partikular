function getPageHash() {
  return location.hash.substring(1);
}

function getPageUrl(id) {
  id = id || getPageHash();
  if( ! id ) id = 'home';
  var url = 'views/pages/' + id + '.html';
  return url
}

function getPage(url) {
  if(url) {
    $.get( url, function( data ) {
      $( "#page" ).html( data );
    })
    .fail(function() {
      url = getPageUrl('404');
      getPage(url);
    });
  }
}

function processTemplate() {
  $.getJSON( "config.json", function( data ) {
    var template, html;
    template = $('#template').html();
    html = Mustache.render( template, data );
    $('#template').html( html );
  })
  .fail(function() {
    alert("Could not get data");
  })
}


window.onhashchange = function () {
  url = getPageUrl();
  getPage(url);
}

$(function() {
  processTemplate();
  url = getPageUrl();
  getPage(url);
  $('#template').show();
});