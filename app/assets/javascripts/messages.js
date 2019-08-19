$(function(){
  function buildHTML(message){
    if (message.content === undefined) {
      var content = ""
    } else {
      var content = `<p class="lower-message__content">${message.content}</p>`
    }
    if (message.image === null) {
      var image = ""
    } else {
      var image = `<img class="lower-message__image" src="${message.image}">`
    }
    var html = `<div class="message">
                <div class="upper-message">
                <div class="upper-message__user-name">
                ${message.user_name}
                </div>
                <div class="upper-message__date">
                ${dateFormat(message.date)}
                </div>
                </div>
                <div class="lower-message">
                ${content}
                ${image}
                </div>
                </div>`
    return html;
  }

  function dateFormat(date) {
    var date = new Date(date);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var min = date.getMinutes();
    if (m < 10) {
      m = '0' + m;
    }
    if (d < 10) {
      d = '0' + d;
    }
    if (h < 10) {
      h = '0' + h;
    }
    if (min < 10) {
      min = '0' + min;
    }
    return `${y}/${m}/${d} ${h}:${min}`;
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
      $('.form__message').val('');
      $('#message_image').val('');
      var height = $('.messages')[0].scrollHeight;
      $('.messages').animate({scrollTop: height}, 500, 'swing');
    })
    .fail(function(){
      alert('error');
    })
    return false;
  })
});