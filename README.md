# OVERKILL

**The math platform that refuses to be just a calculator.**

> Made by **777** ("seven sete") · Discord: `777.imt`

[Leia em português](README.pt-BR.md) · Live demo: https://webprojects77.github.io/overkill/

## What is OVERKILL?

OVERKILL is a modular computational math platform. A traditional calculator is only the front door: the long-term goal is a single environment that brings together numeric computing, symbolic algebra, graphing, statistics, unit conversion, simulations, programmer tools, computational notebooks and third-party extensions, all sharing the same expression engine, unit system, variables and history.

The product promise is not "solve any problem imaginable". It is a broad, consistent and extensible toolbox with explainable results, coherent units, configurable precision and honestly documented limits.

## Principles

- **Accuracy over spectacle.** A pretty animation never compensates for a wrong result.
- **Explainability.** Show formula, unit, method, precision and relevant limitations.
- **Composition.** Every module shares the same engine, units, variables and history.
- **Privacy by default.** Calculations and files stay local unless the user explicitly shares them.
- **Safe extensibility.** Plugins never get unrestricted system access.
- **Accessibility.** Keyboard, screen readers, contrast, visible focus, reduced motion.
- **Progressive delivery.** Each version is useful on its own.

## Security model of the engine

Expressions are never executed as JavaScript. Input goes through a tokenizer and a recursive-descent parser with a fixed whitelist of operations and functions. Syntax errors and domain errors (division by zero, negative square root, logarithm out of domain, overflow) are reported with the kind of error and the position in the expression, and the engine never silently returns a plausible-looking value when a calculation fails.

## Current status: Phase 1 done, Phase 2 in progress

Implemented today:

- Safe expression parser with operator precedence and right-associative power
- Operators `+ - * / ^ ! %`, parentheses, implicit multiplication (`2pi`, `3(4)`)
- Constants `pi`, `e`, `phi`, `tau` and `ans` (previous result)
- Functions: `sin cos tan asin acos atan sinh cosh tanh sqrt cbrt ln log log2 exp abs floor ceil round trunc fact mod pow min max`
- DEG / RAD angle modes and configurable precision (8, 12 or 15 significant digits)
- Physical keyboard, on-screen keypad, persistent history, copy result
- Dark graphite theme with violet and cyan accents, plus light theme following the system
- Runs entirely offline in the browser, no account, no server

Phase 2 so far:

- Variables (`x=5`) and named formulas with parameters (`f(x,y)=x^2+y`), saved locally and removable from a panel
- Numeric root solving with `solve(f, guess)` (Newton, numeric derivative) and `solve(f, a, b)` (bisection), always reporting method, iterations, residual and tolerance
- Matrices module: determinant, inverse (with condition number and ill-conditioning warning), transpose, rank, product, and linear systems `Ax = b` by Gauss-Jordan elimination with partial pivoting and a reported residual. Matrix entries accept expressions, so the module shares the same engine

Not implemented yet (see [docs/ROADMAP.md](docs/ROADMAP.md)): exact rationals, decimals and complex numbers, symbolic algebra, Graph Studio, notebook, specialized labs, plugin SDK, Oracle (AI assistant), PWA.

## Running

No build step is needed. Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

## Project layout

```
index.html        entry point
src/engine.js     parser, evaluator, variables, formulas, solver, UI logic
src/matrix.js     linear algebra module (matrices, systems)
src/style.css     styles and theme tokens
docs/ROADMAP.md   phases, status and decisions
```

## Known limitations

- Floating-point (binary) arithmetic only; exact rationals, arbitrary-precision integers and decimals are planned
- No symbolic computation yet; user formulas cannot be recursive
- Matrices are limited to 12×12; systems must be square
- Numeric input uses `.` as the decimal separator and `,` or `;` as the argument separator
- The history is stored in the browser's local storage

## About the AI ("Oracle")

The planned assistant is an interpretation and orchestration layer, not an authority on numbers. It will translate statements into expressions, ask for missing units or assumptions, and call the deterministic engine to compute. Results will be labeled as verified, approximate, hypothesis or AI-generated. It will be optional, clearly marked as requiring a connection, and every local module will keep working with it disabled.

## Credits

Designed and built by **777** (pronounced "seven sete"), Discord `777.imt`.

The project is under active development and is public so the demo can be served with GitHub Pages.
