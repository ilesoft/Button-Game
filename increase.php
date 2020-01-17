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
  // Queries in nice format
  $q1 = "LOCK TABLES counter WRITE";
  $q2 = "UPDATE counter SET value = value + 1";
  $q3 = "SELECT  value FROM counter";
  $q4 = "UNLOCK TABLES";

  if (  $connection->query($q1) === TRUE
        && $connection->query($q2) === TRUE) {
    $counter = $connection->query($q3)->fetch_assoc()["value"];
    $connection->query($q4);
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
