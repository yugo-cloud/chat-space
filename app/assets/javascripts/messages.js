$(function(){
  function buildHTML(message){
    var content = message.content ? `<p class="lower-message__content">${message.content}</p>` : "";
    var image = message.image ? `<img class="lower-message__image" src="${message.image}">` : "";

    var html = `<div class="message" data-id=${message.id}>
                <div class="upper-message">
                <div class="upper-message__user-name">
                ${message.user_name}
                </div>
                <div class="upper-message__date">
                ${message.created_at}
                </div>
                </div>
                <div class="lower-message">
                ${content}
                ${image}
                </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      var height = $('.messages')[0].scrollHeight;
      $('.messages').animate({scrollTop: height}, 500, 'swing');
    })
    .fail(function(){
      alert('error');
    })
    return false;
  })

  var reloadMessages = function() {
    last_message_id = $('.message:last').data('id')
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){

        if(message.id > last_message_id){
        insertHTML += buildHTML(message);
        }
      })
      $('.messages').append(insertHTML);
      var height = $('.messages')[0].scrollHeight;
      $('.messages').animate({scrollTop: height}, 500, 'swing');
    })
    .fail(function() {
      alert('error');
    });
  };
  $(window).on('load',function(){
    if(document.URL.match("messages")) {
      setInterval(reloadMessages, 5000);
    }
  });
});