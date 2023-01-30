@component('mail::message')

## Welcome to {{ config('app.name') }}

{{ $user_name }}  様

{{ config('app.name') }}へようこそ！

チームのシームレスマネジメントを始めましょう！

{{ config('app.name') }}
@endcomponent
