<?php

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
