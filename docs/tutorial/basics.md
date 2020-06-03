# Installing Arith

To install Arith, follow the directions in the [Quick Start Guide](/getting-started/quick-start.md).

# Using the Arith CLI

The Arith CLI is quite simple. Assuming you have Arith installed globally (using `npm link`), as explained in the [Quick Start Guide](/getting-started/quick-start.md), start by typing `arith help` into your shell. You should see something like the following set of instructions (your version number may be different):

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

## The Arith REPL

Upon opening the Arith REPL you should see something like the following prompt:

```
(arith v0.11.0-alpha3): >
```

Again, your version number may be different.

The `>` is what's known as the *prompt*, which prompts you for input.

The REPL is perfect for testing short snippets of code or for getting used to writing code in the Lisp style.

## The Read-Eval-Print Loop

REPL is an acronym for "Read-Eval-Print Loop," which describes exactly what it does:

1. It reads the input you give it as Arith code
2. It evaluates the expression you've just typed
3. It prints the value your code produces on the screen
4. It does this forever, looping until you decide to close the program.

You can't (or at least shouldn't) write a long program in your REPL, but it's a fantastic tool for trying out little snippets like what we're doing here.

<p style="text-align: center"><a href="https://jasonsbarr.github.io/arith/#/tutorial/">&lt;&lt; Introduction</a> | <a href="https://jasonsbarr.github.io/arith/#/tutorial/expressions"> Expressions and Numbers &gt;&gt;</p>
