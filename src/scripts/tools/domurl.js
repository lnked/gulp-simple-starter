import Url from 'domurl';

let u = new Url(); // curent document URL will be used
// or we can instantiate as
let u2 = new Url('http://example.com/some/path?a=b&c=d#someAnchor');
// it should support relative URLs also
let u3 = new Url('/my/site/doc/path?foo=bar#baz');

// get the value of some query string parameter
alert(u2.query.a);
// or
alert(u3.query.foo);

// Manupulating query string parameters
u.query.a = [1, 2, 3]; // adds/replaces in query string params a=1&a=2&a=3
u.query.b = 'woohoo'; // adds/replaces in query string param b=woohoo

if (u.query.a instanceof Array) {
  // the way to add a parameter
  u.query.a.push(4); // now it's "a=1&a=2&a=3&a=4&b=woohoo"
} else {
  // if not an array but scalar value here is a way how to convert to array
  u.query.a = [u.query.a];
  u.query.a.push(8);
}

// The way to remove the parameter:
delete u.query.a;
// or:
delete u.query.a;

// If you need to remove all query string params:
u.clearQuery();
alert(u);

// Lookup URL parts:
alert(
  'protocol = ' +
    u.protocol +
    '\n' +
    'user = ' +
    u.user +
    '\n' +
    'pass = ' +
    u.pass +
    '\n' +
    'host = ' +
    u.host +
    '\n' +
    'port = ' +
    u.port +
    '\n' +
    'path = ' +
    u.path +
    '\n' +
    'query = ' +
    u.query +
    '\n' +
    'hash = ' +
    u.hash,
);

// Manipulating URL parts
u.path = '/some/new/path'; // the way to change URL path
console.log(u.paths());
u.paths(['some', 'new', 'path']); // change path by array of strings
console.log(u.path);
u.protocol = 'https'; // the way to force https protocol on the source URL

// inject into string
// let str = '<a href="' + u + '">My Cool Link</a>';

// or use in DOM context
let a = document.createElement('a');
a.href = u;
a.innerHTML = 'test';
document.body.appendChild(a);

// Stringify
u += '';
String(u);
u.toString();
// NOTE, that usually it will be done automatically, so only in special
//       cases direct stringify is required
