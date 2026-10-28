<?php
// ============================================
// send_message.php
// Handles the contact form submission (AJAX POST from contact.js)
// ============================================

require_once __DIR__ . '/includes/database.php'; // provides $conn

header('Content-Type: text/plain');

// 1. GET + VALIDATE FORM DATA
$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$phone   = trim($_POST['phone'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $phone === '') {
    echo "error";
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "error";
    exit;
}

// 2. SAVE TO DATABASE (prepared statement — safe from SQL injection)
$stmt = $conn->prepare("INSERT INTO messages (name, email, phone, message) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $email, $phone, $message);

if (!$stmt->execute()) {
    error_log("Insert failed: " . $stmt->error);
    echo "error";
    $stmt->close();
    $conn->close();
    exit;
}
$stmt->close();

// 3. SEND EMAIL TO YOU
$to      = "mugalapride@gmail.com";
$subject = "New Message from Pride Mugala Website";
$body    = "New contact from your website:\n\n"
         . "Name: $name\n"
         . "Email: $email\n"
         . "Phone: $phone\n"
         . "Message: $message\n";

$safeEmail = str_replace(["\r", "\n"], '', $email); // header injection guard
$headers   = "From: no-reply@" . ($_SERVER['HTTP_HOST'] ?? 'localhost') . "\r\n"
           . "Reply-To: $safeEmail\r\n";

@mail($to, $subject, $body, $headers);

// 4. RETURN SUCCESS
echo "success";

$conn->close();
