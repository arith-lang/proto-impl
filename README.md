# Arith Programming Language

After working through a few tutorials on writing interpreters and compilers, I decided to build one of my own.

Arith is a very simple language with a Lisp-like syntax that will evaluate basic arithmetic operations, perform string operations, and generally do a little bit of everything you expect a programming language to do.

I'm taking the incremental approach recommended by Abdulaziz Ghuloum in "[An Incremental Approach to Compiler Construction](http://scheme2006.cs.uchicago.edu/11-ghuloum.pdf)" and implementing one small piece at a time from input to code generation.

## Usage

Start by cloning the repo: `git clone https://github.com/jasonsbarr/arith.git <directory>`.

You'll need to run `npm link` from the project directory if you want the commands to be available in your global path.

To see all commands and options, use `arith help`.

To start interactive mode, use `arith` or `arith i`.

To evaluate a program and print its output to the terminal, use `arith run <filename>`.

To transpile a program to JavaScript, use `arc <filename>`.

## Evaluating the language

The evaluator/transpiler can currently process numeric and float literals, strings, and booleans as well as function calls and nested function calls for library functions. You can also declare variable bindings using `define`. As one would expect for a Lisp, you can define identifier names with certain special characters (e.g. -, =).

The standard library currently includes arithmetic, string manipulation, and comparison functions. Most functions are variadic, so you can use them with any number of arguments. You can also create lambda functions, define them as a variable, and call them.

See the [standard library code](./src/stdlib.js) for a complete list of available functions and constants.

## Credits

Inspired by Steve Kinney's [programming language workshop on FrontEnd Masters](https://frontendmasters.com/courses/programming-language/) ([repository](https://github.com/stevekinney/dropbear)).

## Todo list:

- [x] String evaluation and processing
- [x] Booleans and boolean expressions
- [x] Ability to parse and evaluate/transpile multiple top-level expressions
- [x] Lambda functions
- [x] Branching construct
- [x] Defining variables
- [x] Defining functions
- [ ] Proper pairs and lists
- [ ] Iteration construct (for)
- [ ] I/O primitives
