@component('mail::message')

{{ $user_name }}  様

この度は、会員のご登録をいただき誠にありがとうございます。

下記が今回登録された情報でございます。

この情報は大切に保管してください。

※ログインの際に、メールアドレスとパスワードが必要です。

@component('mail::panel')
ご登録情報
@endcomponent

### お名前
{{ $user_name }}

### メールアドレス
{{ $user_email }}

### パスワード
{{ $user_password }}

### 組織名
{{ $user_organization_name }}


{{ config('app.name') }}
@endcomponent
