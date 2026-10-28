<?php
// ============================================
// includes/database.php
// Shared MySQL connection for the whole project.
// ============================================
// Simple local setup: default MySQL root user, no password,
// running on localhost (this is the default for XAMPP/WAMP/MAMP).
// See /database.sql for the matching CREATE TABLE statement.

$host    = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "pride_portfolio_db";

$conn = @new mysqli($host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    error_log("DB connection failed: " . $conn->connect_error);
    http_response_code(500);
    // Any script that includes this file can rely on $conn existing
    // and working from this point on — if it didn't connect, stop here
    // rather than letting every page crash with a raw mysqli error.
    die("Database connection error.");
}

$conn->set_charset("utf8mb4");
