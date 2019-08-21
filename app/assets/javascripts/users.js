$(function(){
  var search_list = $("#user-search-result");
  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);
  }

  var add_list = $("#add-users-list");

  function addUser(userId, userName) {
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${userId}'>
                  <p class='chat-group-user__name'>${userName}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    add_list.append(html);
  }

  $('#user-search-field').on('keyup', function(){
    var input = $('#user-search-field').val();

    $.ajax({
      type: "GET",
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      var addedUserId = $(".add-already-user").attr('value');
      if (users.length !== 0 && input !== "") {
        users.forEach(function(user){
          if(user.id != addedUserId){
          appendUser(user);
          }
        });
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました')
    })
  });

  $(document).on("click", ".user-search-add", function () {
    $(this).parent().remove();
    var userId = $(this).data('user-id');
    var userName = $(this).data('user-name');
    addUser(userId, userName);
  });

  $(document).on("click", ".user-search-remove", function() {
    $(this).parent().remove();
  });
});