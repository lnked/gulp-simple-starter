import Cookies from 'cookies-js';

if (Cookies.enabled) {
  Cookies.set('key', 'value');
}


Cookies.defaults = {
  path: '/',
  secure: true
};

Cookies.set('key', 'value'); // Will be secure and have a path of '/'
Cookies.expire('key'); // Will expire the cookie with a path of '/'


// First set a cookie
Cookies.set('key', 'value');

// Get the cookie value
Cookies.get('key'); // "value"

// Using the alias
Cookies('key'); // "value"



// First set a cookie and get its value
Cookies.set('key', 'value').get('key'); // "value"

// Expire the cookie and try to get its value
Cookies.expire('key').get('key'); // undefined

// Using the alias
Cookies('key', undefined);



// Setting a cookie value
Cookies.set('key', 'value');

// Chaining sets together
Cookies.set('key', 'value').set('hello', 'world');

// Setting cookies with additional options
Cookies.set('key', 'value', { domain: 'www.example.com', secure: true });

// Setting cookies with expiration values
Cookies.set('key', 'value', { expires: 600 }); // Expires in 10 minutes
Cookies.set('key', 'value', { expires: '01/01/2012' });
Cookies.set('key', 'value', { expires: new Date(2012, 0, 1) });
Cookies.set('key', 'value', { expires: Infinity });

// Using the alias
Cookies('key', 'value', { secure: true });
