# A Tutorial for the Arith Language

This brief tutorial will help you get used to programming in Arith and introduce some of its great features along the way! It is *not* a comprehensive guide to the language, but it will definitely help you gain at least basic familiarity with the Arith language and interpreter.

## Using the Arith CLI

The Arith CLI is quite simple. Assuming you have Arith installed globally (using `npm link`), as explained in the [Quick Start Guide](getting-started/quick-start.md), start by typing `arith help` into your shell. You should see something like the following set of instructions (your version number may be different):

```
Welcome to Arith - a simple, Lisp-like programming language.

You are using Arith 0.11.0-alpha3
Here are the valid commands:

COMMAND                 DESCRIPTION
<none>, i               Open the interpreter in interactive/REPL mode
help                    Print this help message
version                 Print the version of Arith you're using
run                     Execute the contents of a valid Arith file

Use the command 'arc <file>' to transpile its contents to JavaScript.
```

Only four simple commands, five if you count the compiler, and one of them can be invoked by simply typing `arith` into the shell. Go ahead and do that now to open the Arith REPL.

### The Arith REPL

Upon opening the Arith REPL you should see something like the following prompt:

```
(arith v0.11.0-alpha3): >
```

Again, your version number may be different.

The `>` is what's known as the *prompt*, which prompts you for input.

The REPL is perfect for testing short snippets of code or for getting used to writing code in the Lisp style.

## Simple expressions

First, type "Hello, world" at the prompt. Don't forget the quotation marks!

You should see the shell repeat Hello, world (without the quotes) right back to you.

Next, type in your name. Again, it echoes your input right back to you.

Try a longer sentence. It can be anything you like.

You guessed it&mdash;the REPL again echoes the input straight back to you.

The simplest expressions are simply values, which the interpreter will evaluate to the values themselves. You can do the same thing with numbers: try typing `21` into the REPL. Again, it should echo the number right back to you, just like it did with text.

Now type `#t`. What does it print back to you? I'll talk more about this value later in the tutorial.

### The Read-Eval-Print Loop

REPL is an acronym for "Read-Eval-Print Loop," which describes exactly what it does:

1. It reads the input you give it as Arith code
2. It evaluates the expression you've just typed
3. It prints the value your code produces on the screen
4. It does this forever, looping until you decide to close the program.

You can't (or at least shouldn't) write a long program in your REPL, but it's a fantastic tool for trying out little snippets like what we're doing here.

### Errors

Now try typing just Hello at the prompt, without quotation marks.

As you probably guessed based on the heading for this section, this will generate an error:

```
ArithReferenceError: Reference error: Symbol Hello is not defined at (1:0)
```

The interpreter will attempt to give you an error message that clearly describes what's gone wrong, along with the point in the code where the error occurred. That way you can easily find and solve the problem.

Well, solving the problem isn't always easy, but the interpreter does try to help.

In this case, it's pretty straightforward: you need to define a value for the symbol "Hello." We'll talk about variable definitions shortly, but first let's do some simple expressions with numbers.

### Numbers and numeric expressions

You've seen Arith evaluate values as expressions, including numbers. Let's look at some more numeric operations.

You're used to seeing arithmetic expressions written in **infix notation**, which means the operator comes between its operands like this: `5 + 3`.

Lisps use **prefix notation**, where the operator comes *before* its operands: `(+ 5 3)`.

It may take some getting used to, but you'll find this notation is extremely powerful especially when it comes to composing programs with functions.

Also unlike other languages, in Arith and other Lisps `+` isn't just an operator; it's a function. The same goes for the other arithmetic operators: `-`, `*`, `/`, `//`, and `%`. If you've never programmed before, the last two might be new to you. That's ok! I'll explain them as we use them.

When you use Arith's arithmetic functions with prefix notation, you can use them with any number of arguments.

They'll be evaluated from left to right, so `(+ 1 2 3 4 5 6)` will add its 6 arguments starting with the `1` and ending with the `6`. Add the numbers from 1-6 in your REPL and see what you get back.

You can also nest a function call inside another function call, like so:

```scheme
(+ 12 (- 6 2) (* 8 2 2 (/ 10 2)) 5) ; -> 181
```

Composing expressions by nesting them is an extremely powerful technique that will allow you to write complex programs with considerably less effort than it often takes in other languages.
