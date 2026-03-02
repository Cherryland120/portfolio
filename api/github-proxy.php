<?php
// api/github-proxy.php - Production Version with cURL + ENV VARS

error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php_errors.log');

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

/**
 * ENVIRONMENT VARIABLES
 * ---------------------
 * Prefer getenv(), fallback to $_ENV for compatibility
 */
$token = getenv('GITHUB_PERSONAL_TOKEN') ?: ($_ENV['GITHUB_PERSONAL_TOKEN'] ?? null);
$username = getenv('GITHUB_USERNAME') ?: ($_ENV['GITHUB_USERNAME'] ?? null);

if (!$token || !$username) {
    error_log('Missing GITHUB_PERSONAL_TOKEN or GITHUB_USERNAME env variables');
    http_response_code(500);
    echo json_encode([
        'error' => 'Server configuration error'
    ]);
    exit;
}

// Get input from JavaScript
$input = json_decode(file_get_contents('php://input'), true);

// Validate input
if (
    !isset($input['variables']['from']) ||
    !isset($input['variables']['to'])
) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required parameters']);
    exit;
}

// Locked-down GraphQL query
$query = <<<GQL
query(\$username: String!, \$from: DateTime!, \$to: DateTime!) {
    user(login: \$username) {
        contributionsCollection(from: \$from, to: \$to) {
            contributionCalendar {
                weeks {
                    contributionDays {
                        date
                        contributionCount
                    }
                }
            }
        }
    }
}
GQL;

$variables = [
    'username' => $username,
    'from' => $input['variables']['from'],
    'to' => $input['variables']['to']
];

$requestBody = json_encode([
    'query' => $query,
    'variables' => $variables
]);

$ch = curl_init('https://api.github.com/graphql');

curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $requestBody,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'User-Agent: PHP-Server-Proxy',
        'Authorization: Bearer ' . $token
    ],
    CURLOPT_TIMEOUT => 30,
    CURLOPT_SSL_VERIFYPEER => true
]);

$result = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($result === false) {
    error_log("cURL Error: " . $curlError);
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to connect to GitHub API'
    ]);
    exit;
}

if ($httpCode !== 200) {
    error_log("GitHub API HTTP $httpCode: " . $result);
    http_response_code($httpCode);
    echo $result;
    exit;
}

echo $result;
