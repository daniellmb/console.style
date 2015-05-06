/**
 * @file
 *
 * ### Responsibilities
 * - unit test console.style.js
 *
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */
'use strict';

/*global console*/
describe('console.style.js', function () {

  it('should have a working test harness', function () {
    // arrange
    // act
    // assert
    expect(true).not.toBe(false);
  });

  describe('console.colors', function () {
    var colors;
    beforeEach(function () {
      // supported color list
      colors = 'Black Blue Cyan Gray Green Magenta Red White Yellow'.split(' ');
    });

    it('should exist', function () {
      // arrange
      // act
      // assert
      expect(typeof console.colors).toBe('object');
    });

    it('should create color shortcut methods', function () {
      // arrange
      // act
      // assert
      colors.forEach(function(color){
        expect(typeof console.colors[color.toLowerCase()]).toBe('function');
        expect(typeof console.colors['bg' + color]).toBe('function');
      });
    });

    it('should call console.style with the color', function () {
      // arrange
      colors.forEach(function(color){
        // act
        var result = console.colors[color.toLowerCase()]('test');
        // assert
        expect(result).toBe('<css="color:' + color + '">test</css>');
      });
    });

    it('should call console.style with the background color', function () {
      // arrange
      colors.forEach(function(color){
        // act
        var result = console.colors['bg' + color]('test text');
        // assert
        expect(result).toBe('<css="background-color:' + color + '">test text</css>');
      });
    });

  });

  describe('console.style', function () {
    beforeEach(function () {
      // add spies
      spyOn(console, 'log');
    });

    it('should exist', function () {
      // arrange
      // act
      // assert
      expect(typeof console.style).toBe('function');
    });

    it('should return nothing', function () {
      // arrange
      // act
      var result = console.style();
      // assert
      expect(result).toBeUndefined();
    });

    it('should log boolean values', function () {
      // arrange
      var data = false;
      // act
      console.style(data);
      // assert
      expect(console.log).toHaveBeenCalledWith(data);
    });

    it('should log numeric values', function () {
      // arrange
      var data = 1337;
      // act
      console.style(data);
      // assert
      expect(console.log).toHaveBeenCalledWith(data);
    });

    it('should log normal text', function () {
      // arrange
      var text = 'nothing special here';
      // act
      console.style(text);
      // assert
      expect(console.log).toHaveBeenCalledWith(text);
    });

    it('should handle no css rules', function () {
      // arrange
      var text = 'this <css>is a</css> test';
      // act
      console.style(text);
      // assert
      expect(console.log).toHaveBeenCalledWith('this %cis a%c test', '', '');
    });

    it('should handle empty css rules', function () {
      // arrange
      var text = 'this <css="">is a</css> test';
      // act
      console.style(text);
      // assert
      expect(console.log).toHaveBeenCalledWith('this %cis a%c test', '', '');
    });

    it('should replace the css tags and rules with %c', function () {
      // arrange
      var text = 'this <css="color:red;">is a</css> test';
      // act
      console.style(text);
      // assert
      expect(console.log).toHaveBeenCalledWith('this %cis a%c test', 'color:red;', '');
    });

    it('should replace the css tags with single quote rules', function () {
      // arrange
      var text = 'this <css=\'color:blue\'>is a</css> test';
      // act
      console.style(text);
      // assert
      expect(console.log).toHaveBeenCalledWith('this %cis a%c test', 'color:blue', '');
    });

    it('should replace multiple css tags', function () {
      // arrange
      var text = '<css="color:red;">red</css> <css="color:green;">green</css> refactor';
      // act
      console.style(text);
      // assert
      expect(console.log).toHaveBeenCalledWith(
        '%cred%c %cgreen%c refactor',
        'color:red;', '',
        'color:green;', ''
      );
    });

    it('should replace multiple rules in a single tag', function () {
      // arrange
      var text = '<css="color:red;font-weight:bold">bold red text</css>';
      // act
      console.style(text);
      // assert
      expect(console.log).toHaveBeenCalledWith(
        '%cbold red text%c',
        'color:red;font-weight:bold', ''
      );
    });

    it('should handle inconsistent css tag format', function () {
      // arrange
      var data = 'Testing <css="color: green;font-weight:bold ">bold green text!</css> 1 2 3 <css="color:red;">now red text!</css> The end!';
      // act
      console.style(data);
      // assert
      expect(console.log).toHaveBeenCalledWith(
        'Testing %cbold green text!%c 1 2 3 %cnow red text!%c The end!',
        'color: green;font-weight:bold ', '',
        'color:red;', '');
    });

    it('should ignore all format specifiers except %c', function () {
      // arrange
      var text = '<css="color:green">green %s %d %i %f %o %O text</css>';
      // act
      console.style(text);
      // assert
      expect(console.log).toHaveBeenCalledWith(
        '%cgreen       text%c',
        'color:green', ''
      );
    });

    it('should support the <b> tag with styles', function () {
      // arrange
      var text = 'test <b="color:green">bold</b> tag';
      // act
      console.style(text);
      // assert
      expect(console.log).toHaveBeenCalledWith(
        'test %cbold%c tag',
        'color:green;font-weight:bold',
        '');
    });

    it('should support the <b> tag without styles', function () {
      // arrange
      var text = 'test <b>bold</b> tag';
      // act
      console.style(text);
      // assert
      expect(console.log).toHaveBeenCalledWith(
        'test %cbold%c tag',
        ';font-weight:bold',
        '');
    });

    it('should support the <i> tag with styles', function () {
      // arrange
      var text = 'test <i="color:pink">italic</i> tag';
      // act
      console.style(text);
      // assert
      expect(console.log).toHaveBeenCalledWith(
        'test %citalic%c tag',
        'color:pink;font-style:italic',
        '');
    });

    it('should support the <i> tag without styles', function () {
      // arrange
      var text = 'test <i>italic</i> tag';
      // act
      console.style(text);
      // assert
      expect(console.log).toHaveBeenCalledWith(
        'test %citalic%c tag',
        ';font-style:italic',
        '');
    });

    it('should support the <img> tag', function () {
      // arrange
      var text = 'test <img="background:url(http:/example.com/img.gif);width:175px;height:50px"> tag';
      // act
      console.style(text);
      // assert
      expect(console.log).toHaveBeenCalledWith(
        'test %c%c tag',
        'font-size:1px;background:url(http:/example.com/img.gif);background-repeat:no-repeat;line-height:50px;background-size:175px 50px;padding:25px 88px',
        ''
      );
    });

    it('should support multiple arguments', function () {
      // arrange
      var text1 = '<b>bold text</b>';
      var text2 = 'normal text';
      // act
      console.style(text1, text2);
      // assert
      expect(console.log).toHaveBeenCalledWith(
        '%cbold text%c',
        ';font-weight:bold', '',
        text2
      );
    });

    // need this? submit a pull request :)
    xit('should support nested css tags', function () {
      // arrange
      var text = 'So, <css="color:green;">this text will be green, and <css="font-weight:bold;">this text will be bold and green</css></css>, but not this text';
      // act
      console.style(text);
      // assert
      expect(console.log).toHaveBeenCalledWith(
        'So, %cthis text will be green, and %cthis text will be bold and green%c, but not this text',
        'color:green;',
        'font-weight:bold;color:green;', // <-- needs to inherit all css from the containing tag(s)
        '');
    });

  });

  describe('console.style.wrap', function () {

    it('should exist', function () {
      // arrange
      // act
      // assert
      expect(typeof console.style.wrap).toBe('function');
    });

    it('should wrap the text with a <css> tag', function () {
      // arrange
      var text = 'this is a test';
      var css = 'color:blue;font-weight:bold';
      // act
      var result = console.style.wrap(text, css);
      // assert
      expect(result).toBe('<css="color:blue;font-weight:bold">this is a test</css>');
    });

  });

});
