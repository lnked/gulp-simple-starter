<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

if( !session_id() ) {
  session_start();
}

defined('DS') || define('DS', DIRECTORY_SEPARATOR);
defined('PATH_ROOT') || define('PATH_ROOT', dirname((__DIR__)));

// $parse_url = parse_url($_SERVER["REQUEST_URI"]);
// $path = preg_split('/\/+/', $parse_url['path'], -1, PREG_SPLIT_NO_EMPTY);
// $controller = isset($path[1]) ? $path[1] : '';

$config = require __DIR__ . DS . 'config.php';

require_once  __DIR__ . DS . 'helpers.php';
require_once  __DIR__ . DS . 'class.phpmailer.php';
require_once  __DIR__ . DS . 'class.smtp.php';
require_once  __DIR__ . DS . 'class.phpmaileroauth.php';
require_once  __DIR__ . DS . 'class.phpmaileroauthgoogle.php';

$model = 'message';

$response = [];

if (count($_POST)) {
  $data = $_POST;
} else {
  $request_body = file_get_contents('php://input');
  $data = json_decode($request_body, true);
}

$data = ['name' => 'edik', 'phone' => '+7 988 666 77 66'];

if (count($data)) {
  unset($_SESSION[$model]);

  $validate = validate($model, $config['fields'], $data);

  $lang = isset($data['lang']) ? $data['lang'] : 'ru';

  $empty = $config['message'][$lang]['empty'];
  $empty_correct = $config['message'][$lang]['empty_correct'];

  if (!empty($_SESSION[$model]['error'])) {
    $response = [
      'status' => false,
      'title'  => $config['message'][$lang]['title'],
      'errors' => $_SESSION[$model]['error']
    ];
  } else {
    $body = message($config['fields'], $data);

    if ($body) {
      $result = send(
        $config['subject'],
        $body,
        $config['sender']['email'],
        $config['sender']['password'],
        $config['sender']['host'],
        $config['emails']
      );

      echo '<pre>';
      exit(print_r($result));

      if ($result) {
        unset($_SESSION[$model]);

        $response = [
          'status'	=> true,
          'title'		=> $config['message'][$lang]['title'],
          'message'   => $config['message'][$lang]['success']
        ];
      } else {
        $response = [
          'status'	=> false,
          'title'		=> $config['message'][$lang]['title'],
          'message'   => $config['message'][$lang]['failure']
        ];
      }
    } else {
      $response = [
        'status'	=> false,
        'title'		=> $config['message'][$lang]['title'],
        'message'   => $config['message'][$lang]['failure']
      ];
    }
  }
}

exit(json_encode($response, 64 | 256));

