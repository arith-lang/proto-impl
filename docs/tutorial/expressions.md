# Simple expressions

First, type "Hello, world" at the prompt. Don't forget the quotation marks!

You should see the shell repeat Hello, world (without the quotes) right back to you.

Next, type in your name. Again, it echoes your input right back to you.

Try a longer sentence. It can be anything you like.

You guessed it&mdash;the REPL again echoes the input straight back to you.

The REPL processes these values as **expressions**, which are complete, self-contained bits of code that are evaluated by the interpreter. That means the interpreter processes them so they produce, or **return** a value. Returning simply means the value produced by the expression is given to the interpreter for it to use in the program in some way.

The simplest expressions are simply values, which the interpreter will evaluate to the values themselves. You can do the same thing with numbers: try typing `21` into the REPL. Again, it should echo the number right back to you, just like it did with strings of text.

Now type `#t`. What does it print back to you? You'll learn more about this value later in the tutorial.

## Errors

Now try typing just Hello at the prompt, without quotation marks.

As you probably guessed based on the heading for this section, this will generate an error like this:

```
ArithReferenceError: Reference error: Symbol Hello is not defined at (1:0)
```

The interpreter will attempt to give you an error message that clearly describes what's gone wrong, along with the point in the code where the error occurred. That way you can easily find and solve the problem.

Well, solving the problem isn't always easy, but the interpreter does try to help.

In this case, it's pretty straightforward: you need to define a value for the symbol "Hello." We'll talk about variable definitions shortly, but first let's do some simple expressions with numbers.

# Numbers and numeric expressions

You've seen Arith evaluate values as expressions, including numbers. Let's look at some more numeric operations.

You're used to seeing arithmetic expressions written in **infix notation**, which means the operator comes between its operands like this: `5 + 3`.

Lisps use **prefix notation**, where the operator comes *before* its operands: `(+ 5 3)`. Also, unlike many other programming languages, you don't use a comma between arguments to your functions &ndash; just a space.

It may take some getting used to, but you'll find this notation is extremely powerful especially when it comes to composing programs with functions.

Also unlike other languages, in Arith and other Lisps `+` isn't just an operator; it's a function. The same goes for the other arithmetic operators: `-`, `*`, `/`, `//`, and `%`. If you've never programmed before, the last two might be new to you. That's ok! I'll explain them as we use them.

When you use Arith's arithmetic functions with prefix notation, you can use them with any number of arguments.

They'll be evaluated from left to right, so `(+ 1 2 3 4 5 6)` will add its 6 arguments starting with the `1` and ending with the `6`. Add the numbers from 1-6 in your REPL and see what you get back.

You can also nest a function call inside another function call, like so:

```scheme
(+ 12 (- 6 2) (* 8 2 2 (/ 10 2)) 5) ; -> 181
```

Composing expressions by nesting them is an extremely powerful technique that will allow you to write complex programs with considerably less effort than it often takes in other languages.

## Floor division and modulo

Let's look at those other two arithmetic operator functions: `//` and `%`.

If you know Python, the former will be familiar to you: it's floor division, also sometimes called integer division.

Regular division can give you a result either as a decimal or integer, depending on its operands. Floor division will always give you an integer. It takes the result of dividing its operands and then rounds it down, or floors it.

To see what I mean, first run `(/ 10 3)` in your REPL. The result is `3.3333333333333333333`.

Then run `(// 10 3)`. It should return `3` as its result.

Floor division is useful when you're doing operations and you only need an integer result.

`%` is the modulo operator, which gives you the integer remainder of a division operation. Run `(% 10 3)`. You should get `1` as a result.

These two functions are very powerful when used together. If you need to work with multiples of 10, for example, you can get the number of 100s in a large number by taking the floor division result of that number divided by 100. This is very helpful for doing things like turning a decimal number into a string.

## Exercise: additional numeric operations

Arith has several other functions that work on numbers. Try using `max`, `min`, `ceil`, and `floor` with different combinations of arguments and see what you get! Try composing them with the arithmetic functions. Use the constant `PI` (always upper-case) in calculations. Don't worry about making a mistake! You won't break your computer. The worst-case scenario when using the Arith REPL is that you'll need to close the REPL (CTRL/CMD+C or CTRL/CMD+D) and restart it.

## A note about numbers in Arith

If you're an experienced programmer, you're probably familiar with the quirks of floating-point numbers and the problems this can cause with mathematical operations.

Arith uses exact-precision numbers, so you don't have to worry about any of that. If you give Arith a piece of numeric data it will read it as exactly the number it is, not as a binary approximation of a decimal number. You can even give it binary, hexadecimal, or octal numbers (prefixed with `#b`, `#x`, and `#o`) and Arith will store them as their exact decimal value.

If you don't know what any of this means, it's enough to know that when you give Arith a number it will behave exactly as you expect that number to behave.

<p style="text-align: center"><a href="https://jasonsbarr.github.io/arith/#/tutorial/basics">&lt;&lt; CLI Basics | <a href="https://jasonsbarr.github.io/arith/#/tutorial/strings">  &gt;&gt; Strings &amp; Text</p>
