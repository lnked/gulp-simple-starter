<?php

// Yandex
// $mail->Host = 'ssl://smtp.yandex.ru';
// $mail->Port = 465;
// $mail->Username = 'Логин@yandex.ru';
// $mail->Password = 'Пароль';

// Mail
// $mail->Host = 'ssl://smtp.mail.ru';
// $mail->Port = 465;
// $mail->Username = 'Логин@mail.ru';
// $mail->Password = 'Пароль';

// Gmail
// $mail->Host = 'ssl://smtp.gmail.com';
// $mail->Port = 465;
// $mail->Username = 'Логин@gmail.com';
// $mail->Password = 'Пароль';

// Rambler
// $mail->Host = 'ssl://smtp.rambler.ru';
// $mail->Port = 465;
// $mail->Username = 'Логин@rambler.ru';
// $mail->Password = 'Пароль';

// iCloud
// $mail->Host = 'ssl://smtp.mail.me.com';
// $mail->Port = 587;
// $mail->Username = 'Логин@icloud.com';
// $mail->Password = 'Пароль';

// Timeweb
// $mail->Host = 'ssl://smtp.timeweb.ru';
// $mail->Port = 465;
// $mail->Username = 'Логин@домен.ru';
// $mail->Password = 'Пароль';

// Reg.ru
// $mail->Host = 'ssl://serverXXX.hosting.reg.ru';
// $mail->Port = 465;
// $mail->Username = 'Логин@домен.ru';
// $mail->Password = 'Пароль';

return [
  'sender' => [
    'email' => 'message.from@gmail.com',
    'password' => 'emailpassword',
    'host' => 'smtp.gmail.com',
  ],
  'emails' => [
    'message.to1@gmail.com',
    'message.to2@gmail.com',
  ],
  'fields' => [
    'lang'  => [ 'lang' => 'Язык', 'require' => false ],
    'name'  => [ 'title' => 'Имя', 'require' => true ],
    'phone'  => [ 'title' => 'Телефон', 'require' => false ],
    'email'  => [ 'title' => 'Электронная почта', 'require' => false ],
    'message'  => [ 'title' => 'Сообщение', 'require' => false ],
  ],
  'subject' => 'Новое сообщение с сайта',
  'message' => [
    'ru' => [
      'title' => 'Отправка заявки',
      'success' => 'Заявка отправлена!',
      'failure' => 'Заявка не отправлена, произошла ошибка!',
      'empty' => 'Заполните поле',
      'empty_correct' => 'Заполните поле, корректно',
    ],
    'en' => [
      'title' => 'Submitting an application',
      'success' => 'Application sent!',
      'failure' => 'The application is not sent, an error occurred!',
      'empty' => 'Fill in the',
      'empty_correct' => 'Fill in the field correctly',
    ],
  ],
];
