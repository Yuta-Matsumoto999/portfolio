@component('mail::message')

{{ $user_name }}  様

パスワードの再設定が完了いたしました。

再設定いただいたパスワードは大切に保管してください。

{{ config('app.name') }}
@endcomponent
