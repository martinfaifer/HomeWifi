<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'HomeWifi') }}</title>

    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/pageNotFound.css') }}" rel="stylesheet">
    <!-- scripts -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
</head>
<body>
    <div class="flex-center position-ref full-height">
        <div class="code">
            :-(
        </div>

        <div  style="padding: 10px;">
            Zařízení není podporováno
        </div>
        <div class="code"> </div>
        <div style="padding: 10px;">
            <a class="odkaz" href="/">Zkusit se opětovně připojit</a>
        </div>
    </div>
</body>
<footer>

</footer>
</html>
