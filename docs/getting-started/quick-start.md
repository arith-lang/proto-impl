# How to use Arith

Start by cloning the repo: `git clone https://github.com/jasonsbarr/arith.git <directory>`.

`cd` into directory created by previous command.

Install dependencies with `npm install`.

You'll need to run `npm link` from the project directory if you want the commands to be available in your global path.

To see all commands and options, use `arith help`.

To start interactive mode, use `arith` or `arith i`.

## Your first Arith program

Printing "Hello, world" is simple:

```scheme
(print "Hello, world") ; -> "Hello, world"
```

To get used additional language features you can spice it up:

```scheme
(define message "Hello, world")
(print message) ; -> "Hello, world"
```

Since Lisp is famous for lists (the name is shorthand for "LISt Processing), you can also do it the hard way:

```scheme
(define message (list "H" "e" "l" "l" "o" "," " " "w" "o" "r" "l" "d"))
(print
  (reduce string-append "" message)) ; -> "Hello, world"
```

You can see many additional example programs [here](https://github.com/jasonsbarr/arith/tree/master/examples).

## Running or compiling Arith files

To evaluate a program and print its output to the terminal, use `arith run <filename>`.

To transpile a program to JavaScript, use `arc <filename>`.
