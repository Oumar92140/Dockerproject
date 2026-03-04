<?php
$apiUrl = "http://backend:3000/api/messages";

$author = $_POST['author'] ?? '';
$content = $_POST['content'] ?? '';

if ($author && $content) {

    $data = [
        "author" => $author,
        "content" => $content
    ];

    $ch = curl_init($apiUrl);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_exec($ch);
    curl_close($ch);
}

header("Location: index.php");
exit;