# Python Engineering Coding Standards

## Purpose

This document defines the coding standards for the **Structural
Calculation Engineer** GPT. The objective is to produce
production-quality, maintainable, testable, and traceable structural
engineering software.

------------------------------------------------------------------------

# 1. General Principles

-   Correctness is more important than brevity.
-   Readability is more important than cleverness.
-   Never sacrifice engineering accuracy for optimization.
-   Preserve traceability from specification to implementation.
-   Write reusable, modular code.

------------------------------------------------------------------------

# 2. Project Structure

Use a modular package structure.

``` text
project/
├── calculations/
├── models/
├── validation/
├── utils/
├── tests/
├── docs/
└── examples/
```

Each engineering calculation should be isolated in its own module.

------------------------------------------------------------------------

# 3. Naming Conventions

-   Classes: `PascalCase`
-   Functions: `snake_case`
-   Variables: `snake_case`
-   Constants: `UPPER_CASE`
-   Modules: `snake_case.py`

Use descriptive engineering names.

Example:

``` python
axial_resistance
effective_length
section_area
```

Avoid abbreviations unless they are standard engineering notation.

------------------------------------------------------------------------

# 4. Type Hints

All public functions must include type hints.

Example:

``` python
def calculate_axial_resistance(
    fy: float,
    area: float
) -> float:
    ...
```

------------------------------------------------------------------------

# 5. Documentation

Every public function should include a docstring describing:

-   Purpose
-   Parameters
-   Returns
-   Units
-   Assumptions
-   Exceptions

------------------------------------------------------------------------

# 6. Validation

Validate:

-   Required inputs
-   Numeric types
-   Value ranges
-   Invalid combinations
-   Division by zero
-   Unit consistency where applicable

Raise informative exceptions instead of silently correcting data.

------------------------------------------------------------------------

# 7. Error Handling

Use Python exceptions.

Never hide engineering errors.

Example exceptions:

-   ValueError
-   TypeError
-   ZeroDivisionError
-   NotImplementedError

Error messages should explain the engineering issue.

------------------------------------------------------------------------

# 8. Engineering Traceability

Maintain the chain:

Engineering Specification → Formula ID → Python Function → Unit Test

Reference the Formula ID from the specification in function docstrings
when available.

------------------------------------------------------------------------

# 9. Units

Do not silently convert units.

Document:

-   Expected input units
-   Internal calculation units
-   Output units

------------------------------------------------------------------------

# 10. Testing

Every calculation module requires tests for:

-   Typical values
-   Boundary values
-   Invalid inputs
-   Published benchmark examples
-   Regression cases

Tests must be deterministic.

------------------------------------------------------------------------

# 11. Dependencies

Prefer the Python standard library.

Use:

-   NumPy for numerical arrays and math
-   SciPy only when required
-   SymPy only for symbolic work

Avoid unnecessary dependencies.

------------------------------------------------------------------------

# 12. Performance

Optimize only after correctness has been verified.

Avoid premature optimization.

------------------------------------------------------------------------

# 13. Code Style

Follow PEP 8.

Keep functions focused on a single responsibility.

Avoid duplicated logic.

Prefer composition over inheritance unless inheritance is clearly
beneficial.

------------------------------------------------------------------------

# 14. Prohibited Practices

Never:

-   Invent engineering formulas
-   Hard-code unexplained constants
-   Mix design code editions
-   Ignore failed validation
-   Skip unit tests
-   Couple calculations to UI, FastAPI, databases, or frontend
    frameworks

------------------------------------------------------------------------

# 15. Deliverables

Each completed calculation module should include:

-   Python source code
-   Type hints
-   Docstrings
-   Unit tests
-   Example usage
-   Technical documentation
-   Validation summary
