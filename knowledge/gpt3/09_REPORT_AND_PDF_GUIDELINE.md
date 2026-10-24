# Report and PDF Guideline

## Purpose
Generate professional engineering reports from the Report Specification.

## Rules
- Follow Agent 1 Report Specification.
- Use Agent 2 calculation results.
- Allow free preview.
- Require authentication and active subscription for official PDF download.
- Enforce authorization on the server.

## Report Contents
- Project information
- Inputs
- Section properties
- Engineering checks
- Utilization ratios
- Governing check
- Warnings
- Code references
- Summary

## Core v0.5 migration addendum

- Use current GitHub Core v0.5 contracts, not uploaded v0.4 snapshots; direct GitHub Connector only, no Gateway.
- GPT-2 owns calculation and PyNite adapter logic; GPT-3 consumes verified canonical inputs/results; GPT-4 owns architecture and production acceptance.
- Preserve standalone behavior, canonical IDs, units, coordinate conventions, typed materials/sections, support DOFs, explicit load primitives, load combinations, and provenance where relevant.
- Solver-dependent production release is blocked until the GPT-2 evidence is accepted by GPT-4 under `orchestration/PYNITE_ADAPTER_VERIFICATION_GATE.md`. Non-solver-dependent work may continue.
