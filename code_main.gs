/* ページ遷移時に情報を保持するためのグローバル変数 */
// フラグ
var hasErrorFlag = false;
var hasDifferentFormsFlag = false;
var alreadyHaveFlag = false;
var dontHaveFlag = false;
var registered = false;
var deleted = false;
var searchAll = false;
// 変数
var postedPokemonId_global;
var postedPokemonName_global;
var postedTrainerName_global;
var postedForm_global;

/**
 * ページを開いた時に最初に呼ばれるルートメソッド
 */
function doGet(e) {
  // ログインページのHTMLを読み込み、表示
  let page = e.parameters.page;
  if(page){
    page = page.toString();
  }
  else{
    page = "view_search";
  }
  return templete(page, "色違いゲットだぜ！");
}

// HTMLテンプレートを読み込み、ウェブページとして返す
function templete(page, title){
  const template = HtmlService.createTemplateFromFile(page);

  return template
    .evaluate().addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setTitle(title);
}

// このアプリのURLを返す
function getAppUrl(e) {
  // console.log(ScriptApp.getService().getUrl());
  return ScriptApp.getService().getUrl();
}

/**
 * postで呼ばれる
 */
function doPost(e){
  /* 登録画面から入手情報が登録された時の処理 */
  if(e.parameters.action_type == "register_pokemons_normal"){
    // postされた情報を取得 
    let postedPokemonName = e.parameters.pokemon_name.toString();
    let postedTrainerName = e.parameters.trainer_name.toString();

    register(postedPokemonName, postedTrainerName);
    registered = true;

    // 検索結果の表から登録された場合の処理
    if(e.parameters.action_type_detail == "from_search_result"){
      postedPokemonName_global = e.parameters.searched_pokemon_name.toString();
      if(e.parameters.searchAll){
        searchAll = true;
      }
      // 検索結果ページのHTMLを読み込み、表示
      let page = "view_search_result";
      return templete(page, "色違いゲットだぜ！");      
    }

    // メインページのHTMLを読み込み、表示
    let page = "view_register";
    return templete(page, "色違いゲットだぜ！");
  }

  /*  登録するすがたちがいがいるポケモンのすがたが登録された時の処理 */
  if(e.parameters.action_type == "register_pokemons_differentForms"){
    hasDifferentFormsFlag = true;
    // postされた情報を取得 
    let postedPokemonId = e.parameters.pokemon_id.toString();
    let postedTrainerName = e.parameters.trainer_name.toString();
    let postedForm = e.parameters.form.toString(); 

    postedPokemonId_global = postedPokemonId;
    postedTrainerName_global = postedTrainerName;
    postedForm_global = postedForm; 

    registerDifferentForms(postedPokemonId, postedTrainerName, postedForm);
    registered = true;
    hasDifferentFormsFlag = true;

    // 検索結果の表から登録された場合の処理
    if(e.parameters.action_type_detail == "from_search_result"){
      if(e.parameters.searchAll){
        searchAll = true;
      }      
      postedPokemonName_global = e.parameters.searched_pokemon_name.toString();
      // 検索結果ページのHTMLを読み込み、表示
      let page = "view_search_result";
      return templete(page, "色違いゲットだぜ！");      
    }

    // メインページのHTMLを読み込み、表示
    let page = "view_register";
    return templete(page, "色違いゲットだぜ！");
  }

  /* 削除するデータの情報が登録された時の処理 */ 
  if(e.parameters.action_type == "delete_pokemons_normal"){
    // postされた情報を取得 
    let postedDeletePokemonName = e.parameters.delete_pokemon_name.toString();
    let postedDeleteTrainerName = e.parameters.trainer_name.toString();

    deletePokemonData(postedDeletePokemonName, postedDeleteTrainerName);
    deleted = true;

    // 検索結果の表から登録された場合の処理
    if(e.parameters.action_type_detail == "from_search_result"){
      if(e.parameters.searchAll){
        searchAll = true;
      }      
      postedPokemonName_global = e.parameters.searched_pokemon_name.toString();
      // 検索結果ページのHTMLを読み込み、表示
      let page = "view_search_result";
      return templete(page, "色違いゲットだぜ！");      
    }    

    // 削除用ページのHTMLを読み込み、表示
    let page = "view_delete";
    return templete(page, "色違いゲットだぜ！");
  }

  /* 削除するすがたちがいがいるポケモンのすがたが登録された時の処理 */
  if(e.parameters.action_type == "delete_pokemons_differentForms"){
    hasDifferentFormsFlag = true;
    // postされた情報を取得 
    let postedPokemonId = e.parameters.pokemon_id.toString();
    let postedTrainerName = e.parameters.trainer_name.toString();
    let postedForm = e.parameters.form.toString(); 

    postedPokemonId_global = postedPokemonId;
    postedTrainerName_global = postedTrainerName;
    postedForm_global = postedForm; 

    deleteDifferentForms(postedPokemonId, postedTrainerName, postedForm);
    deleted = true;
    hasDifferentFormsFlag = true;

    // 検索結果の表から登録された場合の処理
    if(e.parameters.action_type_detail == "from_search_result"){
      if(e.parameters.searchAll){
        searchAll = true;
      }      
      postedPokemonName_global = e.parameters.searched_pokemon_name.toString();
      // 検索結果ページのHTMLを読み込み、表示
      let page = "view_search_result";
      return templete(page, "色違いゲットだぜ！");      
    }    

    // メインページのHTMLを読み込み、表示
    let page = "view_delete";
    return templete(page, "色違いゲットだぜ！");
  }  

  /* 検索 */
  // そのポケモンのみ
  if(e.parameters.action_type == "search"){
    // 
    postedPokemonName_global = e.parameters.pokemon_name;
    // postedPokemonId_global = getPokedexNumber(postedPokemonName_global);

    // 検索用ページのHTMLを読み込み、表示
    let page = "view_search_result";
    return templete(page, "色違いゲットだぜ！");    
  }
  // そのポケモンと、同じ進化系列のポケモン
  if(e.parameters.action_type == "search_all"){
    // 
    searchAll = true;
    postedPokemonName_global = e.parameters.pokemon_name;
    // postedPokemonId_global = getPokedexNumber(postedPokemonName_global);

    // 検索用ページのHTMLを読み込み、表示
    let page = "view_search_result";
    return templete(page, "色違いゲットだぜ！");    
  }  

  /* 規定の情報が入力されていなかった場合 */
  hasErrorFlag = true;
  // メインページのHTMLを読み込み、表示
  let page = "view_search";
  return templete(page, "色違いゲットだぜ！");
}

/**
 * 動くが読みにくい
 * 時間があれば、図鑑番号を別の関数で持ってきて、図鑑番号を使って登録するように変更する？
 */
// すがたちがいのないポケモンならスプレッドシートに登録し、すがたちがいのあるポケモンならその旨を返す関数
function register(pokemonNameParameter, trainerNameParameter){
  // postされた情報を取得 
  let postedPokemonName = pokemonNameParameter;
  let postedTrainerName = trainerNameParameter;

  // // 開発用
  // postedPokemonName = "コラッタ";
  // postedTrainerName = "テスト用";

  // スプレッドシートの情報を取得
  var ss = SpreadsheetApp.getActive();          // このスプレッドシート
  var sheet_pokemons_normal = ss.getSheetByName("pokemons_normal");    // このスプレッドシートのpokemons_normalシート
  var data_pokemons_normal = sheet_pokemons_normal.getDataRange().getValues();  // pokemons_normalシートのデータ範囲から値を取得

  // データを走査し、ポケモン名が一致すれば所定のセルに「○」を記入
  hasErrorFlag = true;                              // 登録成功を確認するフラグ
  hasDifferentFormsFlag = false;                // すがたちがいを持つポケモンを識別するフラグ

  for(var i = 1; i < data_pokemons_normal.length; i++){
    var row = data_pokemons_normal[i];
    var pokemonId = row[0];
    var pokemonName = row[1];
    var hasDifferentForms = row[2];
    // console.log("hasDifferentForms(i = "+ i +")："+hasDifferentForms);

    // pokemons_normalシートから登録されたポケモン名と一致する場合
    if(postedPokemonName == pokemonName){
      postedPokemonId_global = pokemonId;
      postedTrainerName_global = postedTrainerName;

      // すがたちがいがいない場合
      if(hasDifferentForms !== true){
        // status_normalシートの情報を取得
        var sheet_status_normal = ss.getSheetByName("status_normal");    // このスプレッドシートのstatus_normalシート
        var data_status_normal = sheet_status_normal.getDataRange().getValues();  // status_normalシートのデータ範囲から値を取得
        var row = data_status_normal[0];

        // トレーナー名で走査して一致する場所に"〇"を登録
        for(var j = 1; j < row.length; j++){
          var trainerName = row[j];       
          if(trainerName == postedTrainerName){
            if(sheet_status_normal.getRange(i + 1, j + 1).getValue() !== "〇"){
              sheet_status_normal.getRange(i + 1, j + 1).setValue("〇");
              alreadyHaveFlag = false;
            }else{
              alreadyHaveFlag = true;
            }          
          }
        }      
        hasErrorFlag = false;
        break;
      }
      // すがたちがいがいるとき
      else{
        // console.log("すがたちがいがいる");
        hasDifferentFormsFlag = true;
        hasErrorFlag = false;
        break;
      }
    }
  }
}

function registerDifferentForms(pokemonIdParameter, trainerNameParameter, formParameter){
  hasDifferentFormsFlag = true;
  // // 開発用
  // pokemonIdParameter = "19";
  // trainerNameParameter = "テスト用";
  // formParameter = "アローラのすがた";

  let postedIdForDifferentForms = getPokemonInfo(pokemonIdParameter, "idForDifferentForms", formParameter);

  // スプレッドシートの情報を取得
  var ss = SpreadsheetApp.getActive();          // このスプレッドシート
  var sheet_status_differentForms = ss.getSheetByName("status_differentForms");    // このスプレッドシートのstatus_differentFormsシート
  var data_status_differentForms = sheet_status_differentForms.getDataRange().getValues();  // status_differentFormsシートのデータ範囲から値を取得
  // console.log("data_status_differentForms");
  // console.log(data_status_differentForms);


  for(var i = 1; i < data_status_differentForms.length; i++){
    var row = data_status_differentForms[i]
    var id = row[0];
    // console.log(id);
    // console.log(postedIdForDifferentForms);

    if(id == postedIdForDifferentForms){
      // トレーナー名で走査して一致する場所に"〇"を登録
      for(var j = 1; j < row.length; j++){
        var row = data_status_differentForms[0];
        var trainerName = row[j];       
        if(trainerName == trainerNameParameter){
          if(sheet_status_differentForms.getRange(i + 1, j + 1).getValue() !== "〇"){
            sheet_status_differentForms.getRange(i + 1, j + 1).setValue("〇");
            alreadyHaveFlag = false;
          }else{
            alreadyHaveFlag = true;
          }          
        }
      }
      hasErrorFlag = false; 
      break;  
    }      
  }
}

// スプレッドシートから削除する関数
function deletePokemonData(deletePokemonNameParameter, trainerNameParameter){
  // postされた情報を取得 
  let postedDeletePokemonName = deletePokemonNameParameter;
  let postedTrainerName = trainerNameParameter;

  // スプレッドシートの情報を取得
  var ss = SpreadsheetApp.getActive();          // このスプレッドシート
  var sheet_pokemons_normal = ss.getSheetByName("pokemons_normal");    // このスプレッドシートのpokemons_normalシート
  var data_pokemons_normal = sheet_pokemons_normal.getDataRange().getValues();  // pokemons_normalシートからデータ範囲から値を取得

  // データを走査し、ポケモン名が一致すれば所定のセルに「○」を記入
  hasErrorFlag = true;                              // 登録成功を確認するフラグ
  hasDifferentFormsFlag = false;                // すがたちがいを持つポケモンを識別するフラグ

  for(var i = 1; i < data_pokemons_normal.length; i++){
    var row = data_pokemons_normal[i];
    var pokemonId = row[0];
    var pokemonName = row[1];
    var hasDifferentForms = row[2];

    // pokemons_normalシートから登録されたポケモン名と一致するものを探す
    if(postedDeletePokemonName == pokemonName){
      postedPokemonId_global = pokemonId;
      postedTrainerName_global = postedTrainerName;

      // すがたちがいがいない場合
      if(hasDifferentForms !== true){    
        var sheet_status_normal = ss.getSheetByName("status_normal");    // このスプレッドシートのstatus_normalシート
        var data_status_normal = sheet_status_normal.getDataRange().getValues();  // status_normalシートのデータ範囲から値を取得
        var row = data_status_normal[0];
        for(var j = 1; j < row.length; j++){
          var trainerName = row[j];     
          if(trainerName == postedTrainerName){
            if(sheet_status_normal.getRange(i + 1, j + 1).getValue() !== ""){
              sheet_status_normal.getRange(i + 1, j + 1).setValue("");
              dontHaveFlag = false;
            }else{
              dontHaveFlag = true;
            }          
          }
        }      
        hasErrorFlag = false;
        break;
      }
      // すがたちがいがいる場合
      else{
        hasDifferentFormsFlag = true;
        hasErrorFlag = false;
        break;
      }
    }
  }
}

// すがたちがいがいるポケモンを削除
function deleteDifferentForms(pokemonIdParameter, trainerNameParameter, formParameter){
  hasDifferentFormsFlag = true;
  // // 開発用
  // pokemonIdParameter = "19";
  // trainerNameParameter = "テスト用";
  // formParameter = "アローラのすがた";

  let postedIdForDifferentForms = getPokemonInfo(pokemonIdParameter, "idForDifferentForms", formParameter);

  // スプレッドシートの情報を取得
  var ss = SpreadsheetApp.getActive();          // このスプレッドシート
  var sheet_status_differentForms = ss.getSheetByName("status_differentForms");    // このスプレッドシートのstatus_differentFormsシート
  var data_status_differentForms = sheet_status_differentForms.getDataRange().getValues();  // status_differentFormsシートのデータ範囲から値を取得

  for(var i = 1; i < data_status_differentForms.length; i++){
    var row = data_status_differentForms[i]
    var id = row[0];

    if(id == postedIdForDifferentForms){
      // トレーナー名で走査して一致する場所の"〇"を削除
      for(var j = 1; j < row.length; j++){
        var row = data_status_differentForms[0];
        var trainerName = row[j];       
        if(trainerName == trainerNameParameter){
          if(sheet_status_differentForms.getRange(i + 1, j + 1).getValue() == "〇"){
            sheet_status_differentForms.getRange(i + 1, j + 1).setValue("");
            dontHaveFlag = false;
          }else{
            dontHaveFlag = true;
          }          
        }
      }
      hasErrorFlag = false; 
      break;  
    }      
  }
}

// 登録されたことを検知する
function checkRegistered(){
  if(registered){
    return true;
  }
}

// 削除されたことを検知する
function checkDeleted(){
  if(deleted){
    return true;
  }
}

// 登録の失敗を検知する
function checkInputError(){
  if(hasErrorFlag){
    return true;
  }
}

// すでに持っているポケモンを登録しようとしたときtrueを返す
function checkAlreadyHave(){
  if(alreadyHaveFlag){
    return true;
  }
}

// 持っていないポケモンを削除しようとしたときtrueを返す
function checkDontHave(){
  if(dontHaveFlag){
    return true;
  }
}

// 図鑑番号を受け取ってすがたちがいがいるか確認する
function checkHasDifferentForms(){
  if(hasDifferentFormsFlag){
    return true;
  }
}

// 登録されたポケモンの図鑑番号を返す
function getRegisteredPokemonId(){
  return postedPokemonId_global;
}

// 登録されたポケモンの名前を返す
function getRegisteredPokemonName(){
  return postedPokemonName_global;
}

// 登録したトレーナーの名前を返す
function getTrainerName(){
  return postedTrainerName_global;
}

// 登録したポケモンのすがたを返す
function getForm(){
  return postedForm_global;
}

// 一匹のみの検索か、同じ進化系列全員の検索か判別する
function getSearchAll(){
  return searchAll;
}

// ポケモンの名前から図鑑番号を返す
function getPokedexNumber(pokemonName){
  // // 開発用
  // pokemonName = "どおちゃん";

  // スプレッドシートの情報を取得
  let ss = SpreadsheetApp.getActive();
  let sheet = ss.getSheetByName("pokemons_normal");
  let data = sheet.getDataRange().getValues();

  for(var i = 1; i < data.length; i++){
    var row = data[i];
    var pokedex = row[0];
    var name = row[1];

    // pokemons_normalシートのnameとこの関数に渡されたポケモン名が一致したとき
    if(pokemonName == name){
      // シートに記載された図鑑番号を返す
      // console.log(pokedex);
      return pokedex;
    }
  }
  // 一致するポケモン名がなかったときエラーを返す
  hasErrorFlag = true;
  return -1;
}




// ポケモンの名前で検索して情報をリストで返す
function getStatusList(pokemonName){
  // // 開発用
  // pokemonName = "コラッタ";

  // 変数宣言
  let pokedexId = getPokedexNumber(pokemonName);        // 図鑑番号
  let pokemonList = [];

  // エラー処理
  if(pokedexId == -1){
    hasErrorFlag = true;
    return -1;
  }

  pokemonList = getPokemonInfo(pokedexId, "statusList");
  return pokemonList;

  // ↓返されるリストの例
  // 23:41:58	情報	[ { pokedexId: 20,
  //     idForDifferentForms: 3,
  //     form: '原種',
  //     status: [ 'k', 'l', 'm' ] },
  //   { pokedexId: 20,
  //     idForDifferentForms: 4,
  //     form: 'アローラの姿',
  //     status: [ 1, 2, 3 ] } ]
  // 23:41:59	情報	[ { pokedexId: 25, status: [ '〇', '', '〇' ] } ]  
}

// 図鑑番号から同じ種族のポケモンの情報のリストを返す
// {'pokedexId':,'idForDifferentForms':, 'form':, 'status':}
function getSameSpeciesList(pokedexId){
  // // 開発用
  // pokedexId = 26;
  // let pokemonName = "ライチュウ";

  // 種族番号(同じ進化系列の未進化ポケモンのずかん番号)
  let speciesId = getPokemonInfo(pokedexId, "speciesId");
  let sameSpeciesList = [];

  // スプレッドシートの情報を取得
  var ss = SpreadsheetApp.getActive();                                  // このスプレッドシート
  var sheet_pokemons_normal = ss.getSheetByName("pokemons_normal");     // このスプレッドシートのpokemons_normalシート
  var data_pokemons_normal = sheet_pokemons_normal.getDataRange().getValues();          // pokemons_normalシートからデータ範囲から値を取得

  for(var i = 0; i < data_pokemons_normal.length; i++){
    var name = data_pokemons_normal[i][1];
    var species = data_pokemons_normal[i][4];
    if(species == speciesId){
      var statusList = getStatusList(name);
      sameSpeciesList = sameSpeciesList.concat(statusList);  // 結合
    }
  }
  // console.log(getStatusList("pokemonName"));
  // console.log(sameSpeciesList);
  return sameSpeciesList;
}

// ポケモンの図鑑番号から必要な情報を返す
// // neededInfo:
// // formいらない: "pokemonName”(文字列), "amountOfDifferentForms"(数値), "hasDifferentForms"(真偽値), "speciesId"(数値), "statusList"(リスト), 
// // formいる: "listOfDifferentForms"(リスト), "idForDifferentForms"(数値)
function getPokemonInfo(pokedexNumber, neededInfo, form="default"){
  // // 開発用
  // pokedexNumber = 25;
  // neededInfo = "statusList";

  // 入力エラー処理
  //(直接入力のエラーには対応していない。pokedexNumberがnullのときと別の関数でpokedexNumberを取得して-1になっているときに対応。)
  if(!pokedexNumber){
    pokedexNumber = -1;
  }
  if(pokedexNumber == -1){
    return -1;
  }

  // // スプレッドシートの情報を取得
  var ss = SpreadsheetApp.getActive();                  // このスプレッドシート

  // pokemons_normalシートから情報を得るとき
  if(neededInfo == "pokemonName" || "hasDifferentForms" || "speciesId"){
    var sheet = ss.getSheetByName("pokemons_normal");     // このスプレッドシートのpokemons_normalシート
    var data = sheet.getDataRange().getValues();          // pokemons_normalシートからデータ範囲から値を取得

    if(neededInfo == "pokemonName"){
      let neededPokemonName = data[pokedexNumber][1];
      return neededPokemonName;
    }
    if(neededInfo == "hasDifferentForms"){
      let hasDifferentForms = data[pokedexNumber][2];
      return hasDifferentForms;
    }
    if(neededInfo == "speciesId"){
      let speciesId = data[pokedexNumber][4];
      return speciesId;
    }    
  }

  // pokemons_differentFormsシートから得られる情報のとき
  if(neededInfo == "amountOfDifferentForms" || "listOfDifferentForms" || "idForDifferentForms"){
    // スプレッドシートの情報を取得
    var sheet = ss.getSheetByName("pokemons_differentForms");     // このスプレッドシートのpokemons_differentFormsシート
    var data = sheet.getDataRange().getValues();                  // pokemons_differentFormsシートからデータ範囲から値を取得
    var amountOfDifferentForms = 0;
    var listOfDifferentForms = [];
    var idForDifferentForms;

    // 走査
    for(var i = 1; i < data.length; i++){
      var row = data[i];
      var id = row[0];
      var pokemonId = row[1];
      // var pokemonName = row[2];
      var formName = row[3];

      if(pokedexNumber == pokemonId){
        amountOfDifferentForms ++;
        // console.log("pokedexNumber:"+pokedexNumber+",amountOfDifferentForms:"+amountOfDifferentForms);
        listOfDifferentForms.push({'idForDifferentForms':id, 'form':formName});
        if(form == formName){
          idForDifferentForms = id;
        }
        if(amountOfDifferentForms != 0 && pokedexNumber != pokemonId){
          break;
        }
      }
    }
    if(neededInfo == "amountOfDifferentForms"){
      // console.log(amountOfDifferentForms);
      return amountOfDifferentForms;
    }
    if(neededInfo == "listOfDifferentForms"){
      // console.log(listOfDifferentForms);
      return listOfDifferentForms;
    }
    if(neededInfo == "idForDifferentForms"){
      return idForDifferentForms;
    }
  }

  if(neededInfo =="statusList"){
    // 変数の宣言
    let status = [];
    let statusList = [];
    
    // 実行用
    let hasDifferentForms = getPokemonInfo(pokedexNumber, "hasDifferentForms");
    // // 開発用
    // let hasDifferentForms = false;

    // すがたちがいがいないポケモン
    if(!hasDifferentForms){
      // スプレッドシートの情報を取得
      let ss = SpreadsheetApp.getActive();
      let sheet = ss.getSheetByName("status_normal");
      let data = sheet.getDataRange().getValues();

      // console.log("トレーナーの数は"+(data[0].length - 1));

      // statusをつくる
      for(var i = 0; i < data[0].length - 1; i++){
        status[i] = data[pokedexNumber][i+1];
      }
      statusList.push({'pokedexId':pokedexNumber, 'status':status});
      return statusList;
    }
    // すがたちがいがいるポケモン
    else{
      let listOfDifferentForms = getPokemonInfo(pokedexNumber, "listOfDifferentForms");
      // console.log("listOfDifferentForms:");
      // console.log(listOfDifferentForms);
      let ss = SpreadsheetApp.getActive();
      let sheet = ss.getSheetByName("status_differentForms");
      let data = sheet.getDataRange().getValues();

      // すがたちがいの数だけ繰り返す
      for(var i = 0; i < listOfDifferentForms.length; i++){
        var idForDifferentForms = listOfDifferentForms[i]['idForDifferentForms'];
        var form = listOfDifferentForms[i]['form'];

        // statusをつくる
        // トレーナーの数だけくりかえす
        for(var j = 0; j < data[0].length - 1; j++){
          status[j] = data[idForDifferentForms][j+1];
        }

        // リストにプッシュ
        statusList.push({'pokedexId':pokedexNumber,'idForDifferentForms': idForDifferentForms, 'form': form, 'status':status.slice()});
      }
      // console.log(statusList[0]['form']);
      return statusList;
    }
  }
  // 
  return -1;
}

// LINEでメッセージ送信
function postLineMessage(trainerName, pokemonName) {
  // // テスト用変数
  // var trainerName = "テストトレーナー";
  // var pokemonName = "テストポケモン";

  var messageText = trainerName + "が" + pokemonName + "のいろちがいを登録したよ！";
  // console.log(messageText);

  // const url = 'https://api.line.me/v2/bot/message/push';     // プッシュメッセージ
  const url = 'https://api.line.me/v2/bot/message/broadcast';   // ブロードキャストメッセージ
  // const token = 'xxxx';                                      // チャネルアクセストークン

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
