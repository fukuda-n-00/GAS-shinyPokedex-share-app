# GAS-shinyPokedex-share-app
いろちがいポケモンの入手状況をスプレッドシートを用いて共有するアプリ<br>
(ポケットモンスター・ポケモン・Pokémonは任天堂・クリーチャーズ・ゲームフリークの登録商標です。 当Webアプリは個人ファンツールであり、 株式会社ポケモン他企業様とは一切関係ありません。また、便宜上一部に「原種」などの非公式の用語や名称を含む場合がございます。)<br>

## もくじ
- [アプリURL（サンプル）](#アプリurlサンプル)
- [アプリ概要](#アプリ概要)
- [機能](#機能)
- [データベース](#データベース)
  - [各シート（テーブル）の説明](#各シートテーブルの説明)
- [こだわりポイント](#こだわりポイント)
- [課題](#課題)
- [今後の展望](#今後の展望)

## アプリURL（サンプル）
アプリ： [https://script.google.com/macros/s/AKfycbzgyZPorK2vECqgRQsjldP01-O2zReNWGhmRhOlhehW/dev](https://script.google.com/macros/s/AKfycbxi9VAG8WH7moY-mJUZnyJf0eD5tm672NvlLrVzoI4htneODo1y4Y-DRdJJv3Jv_LfcJA/exec)
<br>
アプリからの通知がくるLINEアカウント登録用QRコード: https://qr-official.line.me/sid/L/855amudr.png

## アプリ概要
友人が、友人の友人と2人でいろちがいのポケモンをすべてずかんに登録するために、いろちがいのポケモンを協力して集めていました。(ポケモンは、一度入手するとずかんに登録することができます。「いろちがい」という珍しいポケモンも存在し、それも一度入手すると登録できます。)<br>
Googleスプレッドシートを用いて入手状況を共有していたようですが、スプレッドシートを直接編集することで誤って入力してしまうことが多く、1000種類を超えるポケモンから入手したポケモンを毎回探し出すのも少し面倒だったようです。
また、いろちがいポケモンを入手した際にリアルタイムで共有する機能が欲しいようでした。
そこで、GASを使っていろちがいポケモンの入手状況を容易に登録できるWebアプリを作成することにしました。

## 機能
- 検索
  - 検索したポケモンの、各ポケモントレーナーの入手状況を表形式で表示する
  - 検索したポケモンの進化系列の入手状況も表示できる
  - 検索結果から、入手状況の登録・削除ができる
- 登録
  - 入手したいろちがいポケモンの名前を入力し、入手状況を登録する
- 削除
  - 誤って登録した色違いポケモンの入手状況を削除する
- いろちがいポケモンを入手し、登録した時LINEでメッセージを送信する

## データベース
https://docs.google.com/spreadsheets/d/13VlFqPcHwj_9n0GFZhEGaqetreB63Oj6KPQ-NyZ1cWE/edit?usp=sharing <br>
上記の設計のスプレッドシートをデータベースとして使用しています。なお、上記はデータベースのサンプルであり、GASのコードは付属していません。<br>

### 各シート（テーブル）の説明
- pokemons_normalシート
  - ずかん番号順に全てのポケモンを記述している
  - 進化系列や、同じポケモンで違う姿をもつかどうかも記述している
    - pokedex : 図鑑番号
    - name : ポケモンの名前
    - hasDifferentForms : すがたちがいがあるかどうか(例: ライチュウはふつうのすがた(本アプリでは便宜上「原種」と呼んでいる)と「アローラのすがた」が存在する)
    - generation : そのポケモンが登場する世代(本アプリではいまのところ使っていない情報であるが、今後のアップデートで世代でポケモンを検索する機能の追加を検討しているため残している)
    - species : 同じ進化系列のなかで、いちばんポケモンのずかん番号が若いポケモンのずかん番号（たとえば、ピカチュウ[ずかん番号25]はピチュー[ずかん番号172]から進化し、ライチュウ[ずかん番号26]に進化するため、ピチューとピカチュウとライチュウのspeciesの値は25としている）
- pokemons_differentForms
  - すがたちがいがあるポケモンの、すがたの名前を記述している
    - id : 全てのすがたちがいがあるポケモンのそれぞれのすがたに対してつけた連番
    - pokedex : ずかん番号
    - name : ポケモンの名前
    - form : すがたの名前
- status_normal
  - すがたちがいがないポケモンの入手状況を管理（ゲットした時、アプリから「〇」を登録する）
  - 1行目にユーザーを追加し、htmlに軽微な修正を加えることでユーザー（ポケモントレーナー）を増やすこともできる
  - サンプルではなく友人に渡したアプリでは、トレーナー1とトレーナー2は友人とその友人のニックネームにしている
    - pokedex : ずかん番号
    - トレーナー1 : 1人目のユーザー（ポケモントレーナー）の色違いポケモン入手状況
    - トレーナー2 : 2人目のユーザー（ポケモントレーナー）の色違いポケモン入手状況
    - テスト用（削除済み） : 開発・修正時に動作確認するための予備のユーザー
- status_differentForms
  - すがたちがいがあるポケモンの入手状況を管理（ゲットした時、アプリから「〇」を登録する）
  - 1行目にユーザーを追加し、htmlに軽微な修正を加えることでユーザー（ポケモントレーナー）を増やすこともできる
  - サンプルではなく友人に渡したアプリでは、トレーナー1とトレーナー2は友人とその友人のニックネームにしている
    - id : 全てのすがたに対してつけた連番（pokemons_differentFormsと同じもの）
    - トレーナー1 : 1人目のユーザー（ポケモントレーナー）の色違いポケモン入手状況
    - トレーナー2 : 2人目のユーザー（ポケモントレーナー）の色違いポケモン入手状況
    - テスト用（削除済み） : 開発・修正時に動作確認するための予備のユーザー 
- もとのスプレッドシート
  - アプリを作成する前、もともと使われていたスプレッドシート
  - アプリ作成後、アプリ用の上記のシート（テーブル）からこちらにも情報が転記されるように関数を入れた

## こだわりポイント
- ポケモンは1000種類以上存在していて、進化するものや、同じポケモンでも別の姿をもつものがあり複雑だが、漏れがないようにデータベースを設計した（かなり大きいにも関わらずデータベースの設計を一緒に考え、作成してくれた友人に感謝申し上げます！）
- 友人にとって便利なアプリになるように、友人がどのように使いたいかをしっかりヒヤリングした
  - 基本的にスマートフォンで使うとのことなので、スマートフォンでの動作確認をしっかり行なったり、片手でも操作しやすいようにメニューを画面上部ではなく画面下部に配置したりした
  - お互いが入手したいろちがいのポケモンをリアルタイムで把握したいとのことなので、入手状況登録時にLINEでメッセージを送信する機能をつけた
  - すばやく入手状況を登録したいという要望と、2人だけで使うアプリである点を踏まえ、毎回ログインするのは手間であると考えたのでログイン機能をつけずに情報登録時にユーザーを選択する形式をとった
  - 最初は登録・削除の画面のみで、登録用ページをこのWebアプリのホーム画面としていたが、友人はつかまえたいろちがいポケモンを交換して進化させてまた交換するという方式で集めていたため、最もよく使う画面として同じ進化系列のポケモンを検索できる機能を作り、それをこのアプリのホームに変更した
- 「登録」と「削除」の画面が似ているため、誤って操作しないよう画面の色を別のものにした

## 課題
- スプレッドシートをデータベースがわりにしているが、データベースが大きいため動作が遅くなってしまった
- アプリケーションの規模が想像より大きくなり、事前にしっかり設計をしなかったためコードが読みにくくなってしまった
- ポケモンの複雑なシステムを説明するのが難しく、このREADME.mdがわかりにくくなっている

## 今後の展望
- アプリの設計を見直し、コードの可読性・保守性を向上させる
- データベースへのアクセス回数を少なくするよう意識したコードに書き換えることで、より素早く動作するようにする
- 特定の操作をすると画面が見にくくなってしまうケースが発見されたので主にCSSに修正を加える
- 実際にアプリを使っている友人からのフィードバックを受けながらブラッシュアップを続ける
