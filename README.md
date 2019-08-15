# README

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|
|password|string|null: false|
|message_id|integer|null: false, foreign_key: true|
|groups_user_id|integer|null: false, foreign_key: true|

### Association
- has_many :groups, through: :groups_users
- has_many :messages


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|title|string|null: false|
|message_id|integer|null: false, foreign_key: true|
|groups_user_id|integer|null: false, foreign_key: true|

### Association
- has_many :users, through: :groups_users
- has_many :messages


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|null: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

- belongs_to :user
- belongs_to :group