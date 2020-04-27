# Arith Programming Language

After working through a few tutorials on writing interpreters and compilers, I decided to build one of my own.

Arith is a very simple language with a Lisp-like syntax that will evaluate basic arithmetic operations.

I'm taking the incremental approach recommended by Abdulaziz Ghuloum in "[An Incremental Approach to Compiler Construction](http://scheme2006.cs.uchicago.edu/11-ghuloum.pdf)" and implementing one small piece at a time from input to code generation.

## Usage

Start by cloning the repo: `git clone https://github.com/jasonsbarr/arith.git <directory>`.

You'll need to run `npm link` from the project directory if you want the commands to be available in your global path.

To see all commands and options, use `arith help`.

To start interactive mode, use `arith` or `arith i`.

To evaluate a program and print its output to the terminal, use `arith run <filename>`.

To transpile a program to JavaScript, use `arc <filename>`.

## Evaluating the language

The evaluator/transpiler can currently process numeric and float literals, strings, and booleans as well as function calls and nested function calls for library functions.

The standard library currently includes arithmetic functions, including `floorDiv` for floored division, `mod` for remainder operations, and `pow` for exponentiation. Most functions are variadic, so you can use them with any number of arguments.

See the [standard library code](./src/stdlib.js) for a complete list of available functions and constants.

## Credits

Heavily influenced by Steve Kinney's [programming language workshop on FrontEnd Masters](https://frontendmasters.com/courses/programming-language/) ([repository](https://github.com/stevekinney/dropbear)).

## Todo list:

- [x] String evaluation and processing
- [x] Booleans and boolean expressions
- [x] Ability to parse and evaluate/transpile multiple top-level expressions
- [ ] Lambda functions
- [x] Branching construct
- [ ] Defining variables
- [ ] Defining functions
- [ ] Proper pairs and lists
- [ ] Quoting and unquoting
- [ ] Iteration construct
- [ ] I/O primitives
- [ ] Ability to load files into REPL
- [ ] Ability to eval code strings from stdin
- [ ] Macros and macro expansion
- [ ] User-definable structs
