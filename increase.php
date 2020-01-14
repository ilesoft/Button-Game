<?php
  declare(strict_types=1);

  if (!isset($_SERVER["HTTPS"])) { // We should not get these
    header("HTTP/1.0 404 Not Found");
    exit();
  } elseif ($_SERVER["REQUEST_METHOD"] !== "POST") { // allow only POST
    header("HTTP/1.0 405 Method Not Allowed");
    exit();
  }


  $connection = new mysqli($_SERVER["MYSQL_HOST"],
                           $_SERVER["MYSQL_USER"],
                           $_SERVER["MYSQL_PASSWD"],
                           "button");
  // Check connection
  if ($connection->connect_error) {
    // TODO: Some logging would be nice
    header("HTTP/1.0 500 We fucked up");
    exit();
  }

  $sql = "UPDATE counter SET value = value + 1";

  if ($connection->query($sql) === TRUE) {
      $counter = $connection->query("SELECT value FROM counter")->fetch_assoc()["value"];
      $data = array("points"=>0);

      // Vheck if user wins
      if ($counter % 10 === 0) {
        $data["points"] = 5;
      }
      if ($counter % 100 === 0) {
        $data["points"] = 40;
      }
      if ($counter % 500 === 0) {
        $data["points"] = 250;
      }

      header("content-type application/json");
      echo json_encode($data);

  } else {
      header("HTTP/1.0 500 We fucked up");
      // TODO: Some logging would be nice
  }

  $connection->close();
?>
