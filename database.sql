-- ============================================
-- Pride Mugala Portfolio — Contact Form Database
-- ============================================
-- Simple local setup: matches includes/database.php exactly
--   $host    = "localhost";
--   $db_user = "root";
--   $db_pass = "";
--   $db_name = "pride_portfolio_db";
--
-- Just run this whole file in phpMyAdmin (or via the mysql CLI) —
-- root already has full access to everything on localhost by
-- default, so no CREATE USER / GRANT needed.

CREATE DATABASE IF NOT EXISTS pride_portfolio_db
    CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE pride_portfolio_db;

CREATE TABLE IF NOT EXISTS messages (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100)  NOT NULL,
    email      VARCHAR(150)  NOT NULL,
    phone      VARCHAR(30)   NOT NULL,
    message    TEXT          NULL,
    is_read    TINYINT(1)    NOT NULL DEFAULT 0,
    created_at TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
