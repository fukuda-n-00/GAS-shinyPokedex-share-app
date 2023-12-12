// LINEでメッセージ送信
function postLineMessage(trainerName, pokemonName, form="default") {
  // // テスト用変数
  // var trainerName = "テストトレーナー";
  // var pokemonName = "テストポケモン";

  if(form == "default"){
    var messageText = trainerName + "が" + pokemonName + "のいろちがいを登録したよ！";
  }else{
    var messageText = trainerName + "が" + pokemonName + "の" + form +"のいろちがいを登録したよ！";
  }

  // const url = 'https://api.line.me/v2/bot/message/push';     // プッシュメッセージの場合こちらを使う
  const url = 'https://api.line.me/v2/bot/message/broadcast';   // ブロードキャストメッセージ
  // 以下1行をコメント解除してチャネルアクセストークンを記入
  // const token = 'ここにチャネルアクセストークンを記入';            // チャネルアクセストークン

  const payload = {
    // to: "xxxx",                                              // プッシュメッセージの宛先(xxxx:ユーザーID)
    messages: [
      { type: 'text', text: messageText }
    ]
  };

  const params = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + token
    },
    payload: JSON.stringify(payload)
  };

  UrlFetchApp.fetch(url, params);
}
