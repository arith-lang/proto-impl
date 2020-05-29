# Welcome to Arith

Arith is a Lisp-like programming language implemented in JavaScript. It's designed for use in either the browser or on the server (via Node.js).

It's *very* early in the development process, so everything in these docs is subject to change without notice. With that disclaimer out of the way, let's dive into the language itself so you can see how it works!

## The story

Arith started with modest intentions: I would build a Lisp-like interpreter and transpiler for simple arithmetic functions just to see if I could make it work. Then I decided to add strings and Booleans.

One thing led to another, and suddenly I had a Turing-complete language with lambda functions, pairs and lists, and built-in data structures.

Now we, the developers of Arith, are on a mission to bring the power and elegance of Lisp to the web, while also taking advantage of recent innovations in the JavaScript ecosystem and functional programming languages. This isn't yet another Scheme clone, but we hope to capture what makes languages like Scheme and Common Lisp special while also building elegant modern applications that are fun for developers too.

## Language features

*Note: this section includes features that are still under development*

- Lisp-style syntax, programs as data, and macros
- The best features of both functional and object-oriented programming paradigms
- Proper Unicode string handling with characters based on graphemes, which are what the reader perceives as a character
- Exact-precision numbers for calculations and mathematical operations
- Built-in list and stream primitives with lazy evaluation
- Gradual typing with type inference
- Easy interoperability with JavaScript
- Built-in collection types with mutable and immutable versions
- Variant (tagged union) types with pattern matching
- User-defined data types, including structs, objects, and sum types
- Monadic types for handling handling nullable data, errors, and other tasks
- Automatically curried functions and partial application
- Function pipelining and composition
- Direct access to DOM and web APIs (browser) and I/O and system APIs (NodeJS)
- Batteries-included standard library that includes a fully-featured set of functionality out of the box
- Lexical scoping for functions, objects, and let expressions
- Traits and interfaces for user-defined types
- Assertions and contract-driven development for better runtime safety
- Robust support for concurrent and asynchronous operations

## How to use Arith

Start by cloning the repo: `git clone https://github.com/jasonsbarr/arith.git <directory>`.

Install dependencies with `npm install`.

You'll need to run `npm link` from the project directory if you want the commands to be available in your global path.

To see all commands and options, use `arith help`.

To start interactive mode, use `arith` or `arith i`.

To evaluate a program and print its output to the terminal, use `arith run <filename>`.

To transpile a program to JavaScript, use `arc <filename>`.

## A brief FAQ

### What do you mean, a Lisp-like language?

Lisp is one of the oldest programming language families. It was first developed by the venerable John McCarthy at MIT in 1958.

It's the second-oldest programming language still in common use, after Fortran which was invented in 1957.

Lisp code is easily recognizable due to its unique syntax: nearly everything is enclosed in parentheses. Lisp uses what are called *S-expressions* to achieve homoiconicity. That means Lisp code is equivalent to a Lisp data structure, which makes it simple to write programs that manipulate themselves. This makes Lisp possibly the most flexible and powerful programming language in existence.

Arith is a Lisp-like language, meaning it uses Lisp syntax and certain conventions found in other Lisp languages, but we're ultimately not all that concerned about consistency with any particular Lisp dialect that's out there. We borrow from other Lisps when it fits what we're trying to do, but otherwise we're doing our own thing.

### Why are you writing this Lisp in JavaScript?

First, JavaScript is itself quite an accessible language. It's simple to find tutorials and other information to learn JavaScript, and you can become a solid programmer just by learning from and practicing with materials that are freely available online. That means just about anyone who wants to help with Arith development can learn to do so without having to pay.

Second, and perhaps more importantly, JavaScript is the dominant programming language used in web development, on both the server and client, and it can also be used to program desktop apps and more. Making Arith interact with JavaScript gives us the ability to use it on any platform where JavaScript runs, which is just about everywhere!

Finally, making the language interact with JavaScript gives us immediate access to the hundreds of thousands of packages available on NPM, the JavaScript package registry, which means if there's a functionality you need that's not baked into Arith itself but *is* available in a package you can still access and use it.

As an added bonus, JavaScript itself was heavily influenced by a Lisp. Brendan Eich, the original designer of the JavaScript language, took heavy inspiration from Scheme when he defined the first feature set for JavaScript.
