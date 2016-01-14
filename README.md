# console.style
[![Build Status][build-image]][build-url]
[![Code GPA][gpa-image]][gpa-url]
[![Test Coverage][coverage-image]][coverage-url]
[![Dependency Status][depstat-image]][depstat-url]
[![Bower Version][bower-image]][bower-url]
[![NPM version][npm-image]][npm-url]
[![IRC Channel][irc-image]][irc-url]
[![Gitter][gitter-image]][gitter-url]

## About

`console.style` is 0.6kb standalone micro-library that facilitates intuitive styling of the browser developer tools console using HTML markup and CSS.

## The Problem

Styling text in a browser console is fun, but, unfortunately, has a pretty unfriendly `%c` token system. This is especially true when you need to do more than simply set a single CSS rule.

For example, lets say you want to style some text green, typically it would look something like this:

```JavaScript
console.log('%cThis text will all be green', 'color:green');
```

That wasn't too bad, but what if you want just a section of text green? Then you'd have to do something like the following to reset the color back to black.

```JavaScript
console.log('Only %cthis text%c will be green', 'color:green', 'color:black');
```

Of course, in a real-world use you'd probably need to take it a step further by setting and resetting multiple CSS rules.

```JavaScript
console.log('Some %ctext%c will be bold and %csome green%c, but not this', 'font-weight:bold;', 'font-weight:normal;', 'color:green;', 'color:black');
```

As you can see it quickly gets out of hand. You must explicitly reset each style, and remember what `%c` token goes with which console log method parameter so the styles will not bleed over into the next section.

## There is a better way!

With `console.style` first the CSS rules are applied, then all are automatically reset for you.

###[Check out some live examples](http://daniellmb.github.io/console.style/demo/index.html)

### Use &lt;b&gt; and &lt;i&gt; to quickly style text

```JavaScript
console.style('I <i>really</i> <b="color:red;">♥</b> console.style!');
```
![example console.style result](http://daniellmb.github.io/console.style/demo/b-and-i-tags.png)

### Use &lt;img&gt; add images to the console

```JavaScript
console.style('Have an awesome <img="background:url(http://goo.gl/EGlS7v);width:40px;height:40px"> day!');
```
![example console.style result](http://daniellmb.github.io/console.style/demo/img-tag.gif)

Note: This feature is not supported by all [browsers](#browser-support).

### Use &lt;css&gt; to set multiple CSS rules

```JavaScript
console.style('You <css="color:#c00;font-weight:bold;text-decoration:underline;">really ♥</css> console.style!');
```
![example console.style result](http://daniellmb.github.io/console.style/demo/multiple-css-rules.png)

Yes, you can do amazing things like this:

```JavaScript
var css = 'font-size:100px;color:#fff;text-shadow:0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);';
console.style('<css="' + css + '">I ♥ console.style</css>');
```
![example console.style result](http://daniellmb.github.io/console.style/demo/complex-css-rules.png)

### Use console.style.wrap to wrap text in a &lt;css&gt; tag

Don't like the look of the `<css>` tags in your JavaScript? No problem, you can always use the `console.style.wrap` method like this:

```JavaScript
var wrap = console.style.wrap;
console.style('Everyone ' + wrap('♥', 'color:#c00;font-weight:bold;') + ' console.style');
```
![example console.style result](http://daniellmb.github.io/console.style/demo/wrap-method.png)

### Use a console.colors method to quickly color text

 - black 
 - blue 
 - cyan 
 - gray 
 - green 
 - magenta 
 - red 
 - white 
 - yellow
 - bgBlack 
 - bgBlue 
 - bgCyan 
 - bgGray 
 - bgGreen 
 - bgMagenta 
 - bgRed 
 - bgWhite 
 - bgYellow

```JavaScript
var c = console.colors;
console.style(c.blue('console.style') + ' is so ' + c.bgYellow('great') + '!');
```
![example console.style result](http://daniellmb.github.io/console.style/demo/color-methods.png)

### Easily add your own style defaults

It's simple to extend console.colors with your own presets using `console.style.wrap`.

```JavaScript
console.colors.rainbow = function (text) {
  return console.style.wrap(text, 'box-sizing:content-box;font:normal normal bold 70px/normal Helvetica,sans-serif;color:transparent;text-align:center;text-shadow:3px 0 0 #d91f26,6px 0 0 #e25b0e,9px 0 0 #f5dd08,12px 0 0 #059444,15px 0 0 #0287ce,18px 0 0 #044d91,21px 0 0 #2a1571;transition:all 600ms cubic-bezier(.68,-.55,.265,1.55)');
}
console.style(console.colors.rainbow('Epic!'));
```
![example console.style result](http://daniellmb.github.io/console.style/demo/custom-colors.png)

## Why?

What, you mean beside the fact that it's **awesome**?! The sky is the limit... want to use the browser console on every page of your website to recruit front-end talent? Boom, done!

```JavaScript
console.style('<img="background:url(http://goo.gl/NnHhVZ);width:127px;height:38px">');
console.style('<b="color:#C20028;">LoopNet</b> is looking for exceptional front-end developers.');
console.log('Interested? Send an email to resume@loopnet.com, and check out our open positions at http://goo.gl/wO567a');
```
![example console.style result](http://daniellmb.github.io/console.style/demo/console-recruiter.png)

Pro Tip: Use a custom email address and url shortener to measure (and a/b test?) engagement and effectiveness.

## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Firefox (FireBug)](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Internet Explorer](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) 
--- | --- | --- | --- | --- |
☑ Yep¹ | ☑ Yep | ☑ Yep | ☑ Yep¹ | ☐ lol yeah right

¹ images [don't work](https://src.chromium.org/viewvc/blink/trunk/Source/devtools/front_end/console/ConsoleViewMessage.js?pathrev=197345#l797) ☹

## Install Choices

  - `bower install console.style`
  - [download the zip](https://github.com/daniellmb/console.style/archive/master.zip)

## Contributing

Nested tags will be supported as soon as you submit a pull request with the feature ;-) since it is not something I need.

## Tasks

All tasks can be run by simply running `gulp` or with the `npm test` command, or individually:

  * `gulp lint` will lint source code for syntax errors and anti-patterns.
  * `gulp gpa` will analyze source code against complexity thresholds.
  * `gulp test` will run the jasmine unit tests against the source code.
  * `gulp test-min` will run the jasmine unit tests against the minified code.

## License

(The MIT License)

Copyright (c) 2015 Daniel Lamb dlamb.open.source@gmail.com

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



[build-url]: https://travis-ci.org/daniellmb/console.style
[build-image]: http://img.shields.io/travis/daniellmb/console.style.png

[gpa-url]: https://codeclimate.com/github/daniellmb/console.style
[gpa-image]: https://codeclimate.com/github/daniellmb/console.style.png

[coverage-url]: https://codeclimate.com/github/daniellmb/console.style/code?sort=covered_percent&sort_direction=desc
[coverage-image]: https://codeclimate.com/github/daniellmb/console.style/coverage.png

[depstat-url]: https://david-dm.org/daniellmb/console.style
[depstat-image]: https://david-dm.org/daniellmb/console.style.png?theme=shields.io

[issues-url]: https://github.com/daniellmb/console.style/issues
[issues-image]: http://img.shields.io/github/issues/daniellmb/console.style.png

[bower-url]: http://bower.io/search/?q=console.style
[bower-image]: https://badge.fury.io/bo/console.style.png

[downloads-url]: https://www.npmjs.org/package/console.style
[downloads-image]: http://img.shields.io/npm/dm/console.style.png

[npm-url]: https://www.npmjs.org/package/console.style
[npm-image]: https://badge.fury.io/js/console.style.png

[irc-url]: http://webchat.freenode.net/?channels=console.style
[irc-image]: http://img.shields.io/badge/irc-%23console.style-brightgreen.png

[gitter-url]: https://gitter.im/daniellmb/console.style
[gitter-image]: http://img.shields.io/badge/gitter-daniellmb/console.style-brightgreen.png

[tip-url]: https://www.gittip.com/daniellmb
[tip-image]: http://img.shields.io/gittip/daniellmb.png
