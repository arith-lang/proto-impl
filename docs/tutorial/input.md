# Basic Input and Output

Arith comes with several functions for input and output, letting you do such things as work with files, network connections, and more.

The simplest IO involves printing text to and getting user input from the terminal, which lets us write interactive programs.

## Printing output

To print to the terminal you use the `print` function. You can use it to print any data type to its textual representation. Here are some examples for you to print in the REPL:

```scheme
(print "Hello, world!")
(print 12345)
(print (list 1 2 3 4 5))
```

The last one creates a list of the numbers from 1 to 5. Lists are a fundamental data structure used in Lisp, and you'll see a lot more about them in this tutorial. As you can see, lists print to the terminal in parentheses: `'(1 2 3 4 5)`.

You can pass any number of arguments to the `print` function, and you can mix the types of your arguments:

```scheme
(print "hello" 23 #t (list "this" "is" "a" "list" "of" "words"))
```

## Getting user input

Use the `input` function to get user input from the terminal. This lets you personalize your programs:

```scheme
(input "What is your name? ")
```

### The REPL and multi-line expressions

For the following example programs, you should enter them exactly as they are written here - including line breaks.

You'll see that, when you have an open parenthesis without a matching closing parenthesis, the Arith REPL lets you continue typing the expression on the next line. It will continue letting you enter line breaks until the number of opening and closing parentheses are equal.

You can enter any number of spaces and line breaks between expressions and function arguments&mdash;Arith ignores any extra whitespace characters.

### Hello, `name`!

You can rewrite the "Hello, world" program to print the user's name:

```scheme
(define name
  (input "What is your name? "))
(print "Hello, " name "!")
```

You can even get more than one bit of information about your users:

```scheme
(define name
  (input "What is your name? "))
(define quest
  (input "What is your quest? "))
(define velocity
  (input "What is the airspeed velocity of an unladen swallow? "))
```

### Remember: computers do exactly what you tell them

You probably noticed that I left a space after all the question marks in the above calls to `input`. If I hadn't done that, the typed responses would start right up against the prompt likethis. That would make it harder for the user to read their own comment.

Remember that the computer will only print *exactly* what you give it as a prompt or as output, and nothing more.

## Input and numbers

Another thing to remember when getting user input is that it always comes back as a string. That means if you want to get a number from your users you'll need to use a *conversion function*.

Conversion functions all have a similar syntax: `from-type->to-type`.

Numbers in Arith have the type `decimal`, so to convert the string you get back from input you'll use the `string->decimal` function.

Here's an example:

```scheme
(define age-str
  (input "How old are you? "))
(define age (string->decimal age-str))

(print "In 5 years you'll be " (+ age 5) " years old!")
```

## Exercises

1. Write a program that prompts the user for their name, then prints back "Hello, {name}, how are you today?"
2. Prompt the user for the length of a side of a square, and then print back the perimeter and area of the square. You probably remember from geometry class that the perimeter of a square is 4 times the length of its side, and the area is the length of the side times itself. Don't forget to convert the input from string to decimal!
3. Write a program that gets at least 3 pieces of information from a user. It could be their name, age, where they went to school, their hair color, or anything. Then print it back to them in a sentence.
4. Write a program that asks for a number, then prints back the value of that number cubed.

<p style="text-align: center"><a href="https://jasonsbarr.github.io/arith/#/tutorial/definitions">&laquo; Variable Definitions</a> |</p>
