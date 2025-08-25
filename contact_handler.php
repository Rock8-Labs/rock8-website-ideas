<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get and sanitize form data
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$company = isset($_POST['company']) ? trim($_POST['company']) : '';
$role = isset($_POST['role']) ? trim($_POST['role']) : '';
$company_size = isset($_POST['company-size']) ? trim($_POST['company-size']) : '';
$budget = isset($_POST['budget']) ? trim($_POST['budget']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$timezone = isset($_POST['timezone']) ? trim($_POST['timezone']) : '';
$detailed_timezone = isset($_POST['detailed-timezone']) ? trim($_POST['detailed-timezone']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
$timeline = isset($_POST['timeline']) ? trim($_POST['timeline']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validate required fields
$errors = [];
if (empty($name)) $errors[] = 'Name is required';
if (empty($email)) $errors[] = 'Email is required';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Invalid email format';
if (empty($company)) $errors[] = 'Company name is required';
if (empty($timezone)) $errors[] = 'Timezone is required';
if (empty($subject)) $errors[] = 'Subject is required';
if (empty($message)) $errors[] = 'Message is required';

// Check if detailed timezone is required
if ($timezone === 'other' && empty($detailed_timezone)) {
    $errors[] = 'Please specify your timezone';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['error' => implode(', ', $errors)]);
    exit;
}

// Determine final timezone
$final_timezone = ($timezone === 'other') ? $detailed_timezone : $timezone;

// Create email content
$email_subject = "New Contact Form Submission from {$company}";
$email_body = "<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <title>Contact Form Submission</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #6c63ff; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .field { margin-bottom: 15px; }
        .field strong { color: #6c63ff; }
        .message-box { background-color: white; padding: 15px; border-left: 4px solid #6c63ff; margin-top: 15px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>New Contact Form Submission</h1>
        </div>
        <div class='content'>
            <div class='field'><strong>Company:</strong> {$company}</div>
            <div class='field'><strong>Name:</strong> {$name}</div>
            <div class='field'><strong>Email:</strong> <a href='mailto:{$email}'>{$email}</a></div>
            " . (!empty($role) ? "<div class='field'><strong>Role:</strong> {$role}</div>" : "") . "
            " . (!empty($company_size) ? "<div class='field'><strong>Company Size:</strong> {$company_size}</div>" : "") . "
            " . (!empty($budget) ? "<div class='field'><strong>Budget:</strong> {$budget}</div>" : "") . "
            " . (!empty($phone) ? "<div class='field'><strong>Phone:</strong> <a href='tel:{$phone}'>{$phone}</a></div>" : "") . "
            <div class='field'><strong>Timezone:</strong> {$final_timezone}</div>
            <div class='field'><strong>Subject:</strong> {$subject}</div>
            " . (!empty($timeline) ? "<div class='field'><strong>Timeline:</strong> {$timeline}</div>" : "") . "
            <div class='message-box'>
                <strong>Message:</strong><br>
                " . nl2br(htmlspecialchars($message)) . "
            </div>
        </div>
    </div>
</body>
</html>";

// Create temporary files for msmtp
$temp_email_file = tempnam(sys_get_temp_dir(), 'rock8_email_');
$temp_headers_file = tempnam(sys_get_temp_dir(), 'rock8_headers_');

// Write email headers
$headers = "From: {$name} <{$email}>\n";
$headers .= "Reply-To: {$email}\n";
$headers .= "To: sales@rock8.io\n";
$headers .= "Subject: {$email_subject}\n";
$headers .= "Content-Type: text/html; charset=UTF-8\n";
$headers .= "Content-Transfer-Encoding: 8bit\n";
$headers .= "\n";

file_put_contents($temp_headers_file, $headers);
file_put_contents($temp_email_file, $email_body);

// Combine headers and body
$full_email = $headers . $email_body;
file_put_contents($temp_email_file, $full_email);

// Send email using msmtp
$msmtp_command = "msmtp -t < " . escapeshellarg($temp_email_file) . " 2>&1";
$output = shell_exec($msmtp_command);
$exit_code = shell_exec("echo $?");

// Clean up temporary files
unlink($temp_email_file);
unlink($temp_headers_file);

// Check if email was sent successfully
if (trim($exit_code) == 0) {
    // Log successful submission (optional)
    $log_entry = date('Y-m-d H:i:s') . " - Contact form submission from {$email} ({$company})\n";
    file_put_contents('/var/log/rock8_contact.log', $log_entry, FILE_APPEND | LOCK_EX);
    
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your inquiry. We will respond within 24 hours.'
    ]);
} else {
    // Log error
    $error_log = date('Y-m-d H:i:s') . " - Error sending email from {$email}: {$output}\n";
    file_put_contents('/var/log/rock8_contact_errors.log', $error_log, FILE_APPEND | LOCK_EX);
    
    http_response_code(500);
    echo json_encode([
        'error' => 'Sorry, there was an error sending your message. Please try again or contact us directly at sales@rock8.io'
    ]);
}
?>