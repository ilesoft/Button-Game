<?php
  declare(strict_types=1);

  // force https
  if ($_SERVER['HTTPS'] != "on") {
    $url = "https://". $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
    header("Location: $url");
    exit();
  }
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>Button Game</title>
        <link rel="stylesheet" type="text/css" href="style.css">
    </head>
    <body>
        <div id="app"></div>

        <!--TODO: Change to production version-->
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

        <script src="public.js"></script>
    </body>
</html>
