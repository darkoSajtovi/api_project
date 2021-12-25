<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel='stylesheet' href='styles/index.css'> 
    <title>Games stats</title>
</head>
<body>
    <header>
    <?php require_once('parts/header.php') ?>
    </header>

    <main>
        <div id='match_history'>
        <?php require_once('parts/main_history.php') ?>
        <div id="loaderDiv"><img  id='gif' src="../view/images/ajax-loader.gif" alt="loader_gif"></div>
    
        </div>

    </main>
</body>
</html>
<script src='../ajax/summonerName.js'></script>