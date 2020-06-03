# A Tutorial for the Arith Language

This brief tutorial will help you get used to programming in Arith and introduce some of its great features along the way! It is *not* a comprehensive guide to the language, but it will definitely help you gain at least basic familiarity with the Arith language and interpreter.

If you've never programmed before, the tutorial will also introduce you to several important concepts in programming and help you start your programming journey on the right foot.

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

### The Read-Eval-Print Loop

REPL is an acronym for "Read-Eval-Print Loop," which describes exactly what it does:

1. It reads the input you give it as Arith code
2. It evaluates the expression you've just typed
3. It prints the value your code produces on the screen
4. It does this forever, looping until you decide to close the program.

You can't (or at least shouldn't) write a long program in your REPL, but it's a fantastic tool for trying out little snippets like what we're doing here.

## Strings and text

First a bit of terminology: **string** is the computer science word for "text."

Arith has a large library of string functions, so we're only just going to scratch the surface here.

Type the following expressions in your REPL, making sure to hit `ENTER` after each one:

```scheme
(string-append "Hello," "world")
(string-append "Hello, " "world")
(string-upcase "hello")
(string-downcase "HELLO")
(string-reverse "hello")
(string-repeat 3 "hello")
(string-length "hello")
(string-swapcase "Hello")
(string-titlecase "hello")
(substring 1 3 "hello")
```

If you're new to programming, that last one might seem a bit confusing. Why does starting at `1` give you the *2nd* character in the string?

The answer is that programming languages mostly use **zero-based indexing**, which means when counting the items in a sequence, like a string, you start counting from `0`. That means the string "Hello" starts at index `0` and ends at index `4`.

This is important to remember when using functions like `substring` that use the index numbers.

### Exercise: using `string-ref`

Use the `string-ref` function 5 times, starting with `0`, to get each letter in the string "hello". Use the function like so: `(string-ref <index> <string>)`. What happens if you try to access an index that doesn't exist?

### A note about computers

If you look back at the list of string function calls above, you'll notice two different calls of `string-append`. The second has a space after "Hello,", but the first doesn't. How did this affect what you saw echoed back to you in the REPL?

That's right, in the first call the two strings were right up against each other with no space in between.

This demonstrates a very important thing to know about computers and programming:

The computer will always do *exactly* what you tell it to do, and not a bit more or less.

This can be a problem when what you mean for the computer to do and what you actually tell it to do aren't the same thing!

Unfortunately as programmers we have only ourselves to blame when the computer doesn't do what we wanted it to do; remember, it's doing exactly what you told it. It doesn't know any better!

### Additional exercises

1. Use the `print` function to print your full name. What other value do you see printed in the REPL besides your own name? What do you think it means?
2. Use `string-upcase` to convert your name to uppercase.
3. Use `string-downcase` to convert your name to lowercase.
4. Use `string-append` to combine your first, middle, and last names into one string. `string-append` can take any number of strings as arguments.
5. Use `string-length` to find out how many characters are in your full name.
6. The `string-first` function takes a numeric position followed by a string, and then returns all the characters in the string up to the position you gave it. Try it with your name using different numbers and see what you get.
7. Apply the function `split-words` to your full name and see what happens. What do you think the value printed to the console represents?
8. `string-insert` takes a string to insert into the target string, a numeric position, and a target string which will have the first string inserted into it. Use it to insert an underscore (_) into your name after the 3rd character.
9. `substring` takes a starting position, and end position, and a string, then returns a string with the characters from start to end (non-inclusive of the end position) from the original string. Try a few different values for the starting and ending position and see how it works. Try it with other strings that aren't your name.
10. The `string-replace` function lets you replace part of a string with other text. Instead of using the built-in `string-replace` function, see if you can combine `string-append` and `substring` to replace the space between your first and last names with an underscore.

## Variable definitions

## Moving to a text editor

## Booleans, predicates, and the conditional expression

## Getting user input

## Basic lists

## Creating your own functions

## Recursion

## Higher-order functions

## Currying and partial application

## Lists in more depth

## Pipelines and function composition

## Vectors and Arrays

## Hash tables and Maps

## Defining your own data types

## Serializing data and working with files

## Putting it all together
