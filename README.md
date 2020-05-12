# Arith Programming Language

After working through a few tutorials on writing interpreters and compilers, I decided to build one of my own.

Arith is a very simple language with a Lisp-like syntax that will evaluate basic arithmetic operations, perform string and list operations, and generally do a little bit of everything you expect a programming language to do.

I'm taking the incremental approach recommended by Abdulaziz Ghuloum in "[An Incremental Approach to Compiler Construction](http://scheme2006.cs.uchicago.edu/11-ghuloum.pdf)" and implementing one small piece at a time from input to code generation.

## Using the interpreter and transpiler

Start by cloning the repo: `git clone https://github.com/jasonsbarr/arith.git <directory>`.

You'll need to run `npm link` from the project directory if you want the commands to be available in your global path.

To see all commands and options, use `arith help`.

To start interactive mode, use `arith` or `arith i`.

To evaluate a program and print its output to the terminal, use `arith run <filename>`.

To transpile a program to JavaScript, use `arc <filename>`.

## Using the language

The interpreter and transpiler can handle many basic string, numeric, list, (immutable) vector, and (mutable) array operations. You can also define lambda functions and either pass them to higher-order functions like `map`, `reduce`, and `filter` or use `define` statements to give them names.

The standard library has many of the functions one would expect from a Lisp. There is currently no documentation, but the code in the files in the [stdlib](./src/stdlib) directory should be fairly self-documenting.

## Credits

Inspired by Steve Kinney's [programming language workshop on FrontEnd Masters](https://frontendmasters.com/courses/programming-language/) ([repository](https://github.com/stevekinney/dropbear)).
