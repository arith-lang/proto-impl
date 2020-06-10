# Variable Definitions

All the elements of Arith you've seen so far in this tutorial have been built into the language as **primitive operations** and **standard library** functions.

## Primitives, combining mechanisms, and means of abstraction

All programming languages have their own primitives and built-in building blocks for programmers to use and combine together.

As you saw in some of the exercises from the last section, you can combine these building blocks together to build compound operations and accomplish more complex tasks. All languages provide a means to combine operations for this purpose.

The third and perhaps most important thing all programming languages give their users is methods of abstraction. Abstraction allows you to give names to compound operations and use them in your programs in exactly the same way you can use built-in primitives, which lets you create ever more complex operations while keeping the complexity manageable for yourself and other programmers who might use your code.

The simplest means of abstraction in the Arith language is the **definition**.

Definition is giving a name to a piece of data or operation so you can reference it later, in another part of your program.

It binds the name to the value so you can use the name anywhere you need the value.

This is significant because if you need to change the value you can now make the change in only one place, instead of having to change the value in several different parts of your code.

You can also combine your defined names to build up more complex operations, in just the same way you can combine primitives and built-in operations.

## Defining your first variables

The syntax for defining a variable is simple: simply use the `define` symbol, then provide a name and an expression. The value of the expression will be bound to the name.

```scheme
(define greeting "Hello, world")
(define meaning-of-life 42)
(define you-are-awesome #t)
```

Then use the name anywhere you would use the value bound to it:

```scheme
(print greeting) ; -> Hello, world
(+ meaning-of-life 10) ; -> 52
```

You can also use an existing name as part of the expression to bind a new name:

```scheme
(define meaning-of-life-incremented (+ meaning-of-life 1)) ; -> 43
```

Since everything in Arith is an expression, a variable definition returns the value bound to the name. That means you can do this:

```scheme
(define returned-value (define bound-value 21)) ; both are 21
```

You *can* do that, but you probably shouldn't.

## Variables and environments

When you bind a variable, it has to be stored somewhere. That somewhere is called an **environment**.

An environment is the context in which code is executed, and it includes memory to keep track of which names are bound to which values.

Every Arith program starts with two environments defined: the global environment, which is where all the language built-ins and standard library functions are defined, and the module environment. That's where the names you define in your programs are stored. The global environment is the parent of the module environment, which is the parent of any environments created during the execution of your code.

When you execute a function, this creates an additional environment nested inside the module environment. We'll talk more about how this works when you start creating your own functions.

## Mutating variables

If you really, *really* need to change a variable's value, you can do so like this:

```scheme
(define greet "Hello")
; ...
(set! greet "Hi")
```

Note that the `!` is part of the expression symbol. Lisp languages use exclamation points to indicate that an expression is unsafe due to mutating a value.

You *can* do this if you need to. You should generally try to avoid it unless you have a *really* good reason for it.

### Exercises:

1. Define several different variables with number values and use them with the math functions from section 2 of this tutorial.
2. Define a variable with a string value, preferably with more than one word. Apply various string functions from the previous section to it. Define another string variable and use them both with `string-append`.
3. Use `string-insert` to replace the spaces in your multi-word string with underscores.
4. Now do the same thing, but use a combination of `substring` and `string-append`.
5. Finally, apply the function `string-snakecase` to get the same result. As you can see, there's often more than one way to accomplish the same task!

<p style="text-align: center"><a href="https://jasonsbarr.github.io/arith/#/tutorial/strings"> &laquo; Strings &amp; Text</a> | <a href="https://jasonsbarr.github.io/arith/#/tutorial/input">Basic Input &amp; Output &raquo;</p>
