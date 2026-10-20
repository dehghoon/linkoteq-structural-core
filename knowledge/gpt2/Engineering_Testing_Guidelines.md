# Engineering Testing Guidelines

## Test Categories

-   Unit tests
-   Boundary tests
-   Invalid input tests
-   Regression tests
-   Benchmark verification

## Requirements

-   One test for every important formula.
-   Compare outputs against approved benchmark calculations.
-   Use deterministic inputs.
-   Test warning and error conditions.
-   Record numerical tolerances.

## Naming

`test_<module>_<behavior>.py`
