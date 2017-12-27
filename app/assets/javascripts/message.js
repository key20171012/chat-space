$(function() {
  function new_message(data) {
    var chatImage = '';
    if (data.image.url) {
      chatImage = `<img src="${data.image.url}">`;
    }
    var new_message = $('<div class="main-content__center__chatinfo">' +
                '<div class = "main-content__center__chatinfo__username">' + '<p>' + data.name + '<p>' + '</div>' +
                '<div class = "main-content__center__chatinfo__date">' + '<p>' + data.time + '<p>' + '</div>' +
                '<div class = "main-content__center__chatinfo__message">' + '<p>' + data.content + '<p>' + chatImage + '</div>' +
                '</div>');
    return new_message;
  }
  $('.js-form').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData($(this).get(0));
    var chat_url = $(this).attr("action")
    $.ajax({
      type: 'POST',
      url: chat_url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data) {
      var html = new_message(data);
      $('.main-content__center').append(html);
      $('.js-form__text-field').val('');
      $('.js-form__image').val('');
      $('.main-content__bottom__send-button').prop('disabled', false);
      $('.main-content__center').animate({scrollTop: $('.main-content__center')[0].scrollHeight}, 'fast');
    })
    .fail(function(data) {
      alert('メッセージを入力してください');
    });
  });

  function buildHTML(message) {
    var insertImage = '';
    if (message.image.url) {
      insertImage = `<img src="${message.image.url}">`;
    };
    var html = `
      <div class="main-content__center__chatinfo">
        <div class="main-content__center__chatinfo__username"><p>${message.name}</p></div>
        <div class="main-content__center__chatinfo__date"><p>${message.time}</p></div>
        <div class="main-content__center__chatinfo__message"><p>${message.content}</p>${insertImage}</div>
      </div>`;
    return html
  };

  var interval = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        type: 'GET',
        url: location.href,
        dataType: 'json',
        processData: false,
        contentType: false,
      })

      .done(function(json) {
        var insertHTML = '';
        var $chatspace = $('.main-content__center')
        json.messages.forEach(function(message) {
          insertHTML += buildHTML(message);
        });
        $chatspace.html(insertHTML);
        $chatspace.animate({scrollTop: $chatspace[0].scrollHeight}, 'fast');
      })

      .fail(function(data) {
        alert('自動更新に失敗しました');
      });
    } else {
      clearInterval(interval);
    }
  }, 5000 );
});

// $(function(){
//   // function buildHTML(message){  //テンプレートリテラル記法（受信後の処理）
//   //   var html = `<div class = message >
//   //                 <div class = upper-message >
//   //                   <div class = upper-message__user-name >
//   //                     ${message.user.name}
//   //                   <div class = upper-message__date >
//   //                     ${message.created_at}
//   //                 <div class = lower-message >
//   //                   <div class = lower-message__content >
//   //                     ${message.content}`
//   //   return html;
//   // }
//   $('.form').on('submit', function(e){ //SENT押した時にid=new_commentとclass=textboxにより反応
//     e.preventDefault(); //イベント発火する（処理をこちら側へ）
//     var formData = new FormData(this);  //フォームのデータを受信(引数はthis)
//     var url = $(this).attr('action')
//     $.ajax({  //ajaxによる非同期通信
//       url: url,
//       type: "POST",
//       data: formData,
//       dataType: 'json',
//       processData: false, //デフォルトではtrueになっている
//       contentType: false   //
//     })
//     console.log(this)
//     //jsonをdoneメソッドで受け取り
//     // .done(function(data){ //create.json.jbuilderからのデータをdataで引き継ぐ
//     //   var html = buildHTML(data);
//     //   $('.message').append(html)
//     //   $('.textbox').val('')
//     // })
//     // .fail(function(){
//     //   alert('error');
//     // })
//   })
// })
