# Spec for conditionals

## Lisp if expr form:

```lisp
(if test trueExpr falseExpr)
```

### Process:

- Define handler function that takes 3 arguments, one for each expression
- If first not false return 2nd, else return 3rd
- Add `maybeCall` to parser with check for keyword identifiers
- Add `parseKw` to parser for keyword identifiers to map keyword to right expression type
- Parse rest of if expression as normal - could be call, could be anything
- For evaluator, map expression type to handler scheme - e.g. "IfExpression" to ifExpr function then continue evaluation as normal
- For transpiler, follow same plan as evaluator but emit handler function name

## Lisp cond expr form:

```lisp
(cond
  (maybeTrue1 expr1)
  (maybeTrue2 expr2)
  (maybeTrue3 expr3)
  (else defaultExpr))
```

### Process:

- Define handler function that takes n args, 2 for each clause (including 2 for else and the else expression)
- Use `for` loop to process args, incrementing counter by 2 each time through the loop
- If first arg not false, return 2nd arg
- Use `maybeCall` and `parseKw`, follow from there
