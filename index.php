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

    <!-- Its clever to use inline styles and favicons for this one page site
         because there sould not be need for several loads-->
    <link rel="icon" href="data:image/x-icon;base64,<?php include "favicon.base64"; ?>">
    <style><?php require "style.min.css";?></style>
  </head>
  <body>
    <div id="app"></div>
    <noscript>
      <p>Well, I'm not going to work without JavaScript.</p>
    </noscript>
    <div id="footer">
      <p>Check how that works
        <a href="https://github.com/ilesoft/Button-Game">GitHub/Ilesoft</a>
        and check my <a href="http://ilesoft.dy.fi:8000/">CV</a></p>
    </div>

    <!--development version-->
    <!--script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script-->
    <!-- production version -->
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.11"></script>

    <script><?php require "public.min.js"; ?></script>
  </body>
</html>
