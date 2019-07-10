<?php

function validate($model = 'message', $fields = [], $data = [])
{
    $_status = true;

    if (!empty($data))
    {
        foreach ($data as $name => $value) {
            if (!isset($fields[$name]) || (!$value && $fields[$name]['require'] === true))
            {
                $_status = false;
                $_SESSION[$model]['error'][$name] = true;
            }
        }
    }

    return $_status;
}

function message($fields = [], $data = [])
{
    $html = "";

    if (!empty($data))
    {
        $m = '';

        foreach ($data as $name => $value)
        {
            if (isset($fields[$name]) && $value)
            {
                $m .= '<p><strong>' . $fields[$name]['title'] . ':</strong> '. stripslashes($value).'</p>';
            }
        }

        if ($m)
        {
            $html .= '<html><body>';
            $html .= '<table width="100%" cellspacing="0" cellpadding="0" border="0">';
            $html .= '<tr>';
            $html .= '<td align="center">';
            $html .= '<table width="600" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">';
            $html .= '<tr>';
            $html .= '<td colspan="3"><img src="/images/logo.png" width="215" /></td>';
            $html .= '</tr>';
            $html .= '<tr>';
            $html .= '<td colspan="3" height="15"></td>';
            $html .= '</tr>';
            $html .= '<tr>';
            $html .= '<td colspan="3" align="center">';
            $html .= '<table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size: 13px; line-height: 17px; font-family: sans-serif;">';
            $html .= '<tr>';
            $html .= '<td>';

            $html .= '<p>Здравствуйте!</p>';
            $html .= '<p>Новое сообщение с сайта</p>';
            $html .= '<p>Дата отправки: <b>'. date( 'd.m.Y H:i:s' ) .'</b></p>';

            $html .= $m;

            $html .= '</td>';
            $html .= '</tr>';
            $html .= '</table>';
            $html .= '</td>';
            $html .= '</tr>';
            $html .= '</table>';
            $html .= '</td>';
            $html .= '</tr>';
            $html .= '</table>';
            $html .= '</body></html>';
        }
    }

    return $html;
}

function send(
    $subject,   # Тема сообщения
    $message,   # Текст сообщения
    $user,      # Электронная почта отправителя
    $password,  # Пароль отправителя
    $host,      # Хост отправителя
    $to         # Адреса для отправления
)
{
    $mail = new PHPMailer;

    try {
        if (!empty($to)) {
            $mail->isSMTP();

            $mail->Host             = $host;            // sets the SMTP server

            $mail->Username   = $user;                  // SMTP account username
            $mail->Password   = $password;              // SMTP account password

            $mail->SMTPOptions = [
              'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
              ],
            ];

            $mail->SMTPDebug    = 0;                    // enables SMTP debug information (for testing)
            $mail->Debugoutput  = 'html';

            $mail->Port             = 465;
            $mail->SMTPSecure       = 'ssl';
            $mail->SMTPAuth         = true;             // enable SMTP authentication
            $mail->SMTPKeepAlive    = true;

            // $mail->SMTPSecure = 'tls';
            // $mail->Host = 'smtp.yandex.ru';
            // $mail->Port = 587;
            // //or more succinctly:
            // $mail->Host = 'tls://smtp.yandex.ru:587';

            // or

            // $mail->SMTPSecure = 'ssl';
            // $mail->Host = 'smtp.yandex.ru';
            // $mail->Port = 465;
            // //or more succinctly:
            // $mail->Host = 'ssl://smtp.yandex.ru:465';

            $mail->setFrom($user, $user);

            if (file_exists(PATH_ROOT . '/images/logo.png'))
            {
                $mail->addAttachment(PATH_ROOT.'/images/logo.png', '/images/logo.png');
            }

            if (is_array($to))
            {
                foreach ($to as $key => $email)
                {
                    if (filter_var($email, FILTER_VALIDATE_EMAIL))
                    {
                        $mail->AddAddress(trim($email));
                    }
                }
            }
            elseif (filter_var($to, FILTER_VALIDATE_EMAIL))
            {
                $mail->AddAddress(trim($to));
            }

            $mail->CharSet = 'utf-8';
            $mail->Subject = $subject;

            $mail->isHTML(true);
            $mail->msgHTML($message);

            if ($mail->send())
            {
                return true;
            }
            else {
                echo "Mailer Error: " . $mail->ErrorInfo;
            }

            $mail->ClearAddresses();
            $mail->ClearAttachments();
        }

        return false;
    }
    catch (phpmailerException $e)
    {
        echo $e->errorMessage();
    }
    catch (Exception $e)
    {
        echo $e->getMessage();
    }
}
