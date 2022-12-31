@component('mail::message')

{{ $user_name }}  様

パスワードの再設定が完了いたしました。

再設定いただいたパスワードは大切に保管してください。

@component('mail::panel')
ご登録情報
@endcomponent

### お名前
{{ $user_name }}

### メールアドレス
{{ $user_email }}

### 新しいパスワード
{{ $user_password }}


{{ config('app.name') }}
@endcomponent
