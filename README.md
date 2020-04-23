# Arith Programming Language

After working through a few tutorials on writing interpreters and compilers, I decided to build one of my own.

Arith is a very simple language that will evaluate basic arithmetic operations.

I'm taking the incremental approach recommended by Abdulaziz Ghuloum in "[An Incremental Approach to Compiler Construction](http://scheme2006.cs.uchicago.edu/11-ghuloum.pdf)" and implementing one small piece at a time from input to code generation.

## Usage

Start by cloning the repo: `git clone https://github.com/jasonsbarr/arith.git <directory>`.

You'll need to run `npm link` from the project directory if you want the commands to be available in your global path.

To see all commands and options, use `arith help`.

To start interactive mode, use `arith` or `arith i`.

To evaluate a program and print its output to the terminal, use `arith run <filename>`.

To transpile a program to JavaScript, use `arc <filename>`.

## API

For now, the interpreter merely reads integers and floats as input and evaluates them to their literal value. Any other input should cause an error.

## Credits

Heavily influenced by Steve Kinney's [programming language workshop on FrontEnd Masters](https://frontendmasters.com/courses/programming-language/) ([repository](https://github.com/stevekinney/dropbear)).
