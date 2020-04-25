# Spec for conditionals

## Lisp if expr form:

```lisp
(if test trueExpr falseExpr)
```

### Process:

- Define handler function that takes 3 arguments, one for each expression
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
