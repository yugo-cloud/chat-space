Chat Space
====
グループチャットアプリ。複数のグループに参加することができます。
画像、テキストの投稿が可能です。

## Description
1対多、多対多などを含む[データベース設計](#Database)。
haml記法、SASSによる、ビュー作成。
単体テスト、統合テストの実装。
ajaxを用いた、非同期通信による投稿、インクリメンタルサーチ、自動スクロール、自動更新機能の実装。
AWS EC2にデプロイ、画像ストレージにS3を使用。
Unicorn, Nginxの設定、Capistranoによる自動デプロイ。


## Demo
![demo](https://user-images.githubusercontent.com/52838441/63369601-39f26b80-c3bb-11e9-96b6-f56cc65f3f17.gif)

## Dependency
言語: Ruby 2.5.1
フレームワーク: Ruby on Rails
gem: 'haml-rails', 'font-awesome-rails', 'devise', 'carrierwave', 'mini_magick', 'fog-aws', 'capistrano', 'unicorn'など


# Database
## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|


### Association
- has_many :groups, through: :groups_users
- has_many :messages
- has_many :groups_users


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|


### Association
- has_many :users, through: :groups_users
- has_many :messages
- has_many :groups_users


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

- belongs_to :user
- belongs_to :group


## Author
[tetzng](https://github.com/tetzng)