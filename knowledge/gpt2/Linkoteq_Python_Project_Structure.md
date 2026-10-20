# Linkoteq Python Project Structure

## Objective

Define a consistent architecture for all engineering calculation
packages.

## Recommended Layout

``` text
project/
├── calculations/
├── models/
├── validation/
├── utils/
├── tests/
├── docs/
├── examples/
├── __init__.py
└── pyproject.toml
```

## Folder Responsibilities

-   calculations/: engineering algorithms only
-   models/: dataclasses/Pydantic models
-   validation/: input validation and error rules
-   utils/: shared helpers
-   tests/: unit and regression tests
-   docs/: technical documentation
-   examples/: sample scripts

## Principles

-   One calculation per module
-   No UI, FastAPI, database, or frontend code
-   Clear public API
-   Independent, reusable modules
