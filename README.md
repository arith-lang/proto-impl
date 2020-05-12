# Arith Programming Language

Arith is a Lisp-like programming language implemented in JavaScript, designed for use in either a browser or server-side (via NodeJS) environment.

## The story

Arith started with simple intentions: I would build a Lisp-like interpreter and transpiler for simple arithmetic functions just to see if I could make it work. Then I decided to add strings and Booleans.

One thing led to another, and suddenly I had a Turing-complete language with lambda functions, pairs and lists, and built-in data structures.

Now I'm on a mission to bring the power and elegance of Lisp to the web, while also taking advantage of recent innovations in the JavaScript ecosystem and functional development techniques. This isn't yet another Scheme clone, but I hope to capture what makes languages like Scheme and Common Lisp special while also building elegant modern applications that are fun for developers too.

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
