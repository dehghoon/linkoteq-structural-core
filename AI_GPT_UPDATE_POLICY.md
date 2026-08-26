# Linkoteq AI / GPT Core Update Policy

## Purpose

This file defines the mandatory update policy for every Linkoteq engineering GPT and AI-assisted workflow. The `linkoteq-structural-core` repository is the single source of truth for cross-product engineering contracts.

The objective is to prevent calculator-specific schemas, duplicated engineering definitions, inconsistent terminology, incompatible units, and stale GPT knowledge when the Core Contract changes.

## Mandatory rule

Before generating or modifying an integrated Linkoteq calculator, 3D-model integration, analysis adapter, design module, report module, importer, exporter, or engineering API, every GPT must use the latest released Core Contract as its canonical integration boundary.

GPTs must not invent a competing integration schema when a canonical Core type already exists.

## Source-of-truth files

At minimum, GPT knowledge must be synchronized with:

1. `CORE_CONTRACT.md`
2. `typescript/index.ts`
3. `README.md`
4. this file: `AI_GPT_UPDATE_POLICY.md`

If additional versioned schemas, examples, migration notes, validation rules, or manifests are added to Core, they become part of the canonical knowledge set.

## Version synchronization

Every integrated artifact must declare or carry the applicable Core schema version where the contract requires it.

When Core advances from one schema version to another:

- new GPT-generated integrations must target the latest Core version;
- existing integrations should be migrated rather than independently redesigned;
- backward compatibility may be retained temporarily when required;
- canonical writeback should use the current Core version after migration;
- migration must not silently change engineering calculation logic unless the Core revision explicitly requires an engineering change;
- stale knowledge files must not override the current Core repository.

## GPT-1: specification generation

GPT-1 must use Core to define integration requirements before producing a calculator specification.

GPT-1 must:

- reuse canonical terminology and IDs;
- identify which Core records the calculator consumes and produces;
- distinguish standalone calculator inputs from integrated Core inputs;
- define calculator-specific engineering inputs without duplicating shared structural-model data;
- preserve provenance, units, code edition, jurisdiction and traceability requirements;
- specify whether loads/results use global or member-local coordinates according to Core;
- define canonical writeback expectations.

GPT-1 must not redefine shared objects such as Member, Node, Section, Load, AnalysisRun, MemberAnalysisResult, DesignRun or MemberDesignResult with conflicting meanings.

## GPT-2: calculation/code generation

GPT-2 must preserve the calculator's engineering engine while implementing a Core-compatible boundary.

GPT-2 must:

- keep calculation logic separate from integration mapping;
- validate incoming Core-compatible data;
- map canonical inputs into calculator-private calculation inputs only inside the calculator boundary;
- return canonical writeback records;
- preserve stable IDs and source references;
- avoid copying or reimplementing another module's engineering calculation;
- keep standalone execution available when required by the product specification.

For design calculators, internal member forces supplied by Core v0.4 are interpreted in member-local axes unless a later Core revision explicitly changes that rule.

## GPT-3: integration, UI and release

GPT-3 must integrate and release the calculator without creating a second engineering data contract.

GPT-3 must:

- connect UI/API boundaries to the canonical calculator/Core envelope;
- keep UI state separate from canonical engineering records;
- verify that integrated and standalone modes use the same calculation engine;
- verify canonical result/writeback structures;
- check deployment configuration without embedding deployment-specific concerns into Core engineering types;
- run or update contract tests for the active Core version;
- document temporary compatibility behavior and remove it when no longer required.

## Coordinate-system rules for Core v0.4

For v0.4 integrations:

- structural geometry is represented in the global coordinate system;
- external loads are global by default, with member-local loads allowed when explicitly declared;
- member internal forces used for design are canonical in member-local axes;
- member result stations are not restricted by Core to a fixed count;
- station position is measured from the member start along local +x;
- `xRatio`, when supplied, represents normalized position along the member;
- solver/3D-model settings may choose default stations such as start, midspan and end, but that sampling policy does not belong in Core;
- sign conventions and local-axis definitions must follow the active Core Contract.

## Duplication prevention

A field or engineering fact should have one canonical owner.

Examples:

- geometry belongs to the structural model;
- generated load provenance belongs to LoadSource/Load records;
- solver results belong to canonical analysis-result records;
- design calculation results belong to DesignRun/MemberDesignResult/DesignCheck;
- reports consume canonical facts and must not become an independent engineering database.

Calculator-private intermediate variables are allowed internally, but they must not become competing platform-level schemas.

## Existing calculators

A calculator that is already complete does not need to be regenerated from GPT-1 through GPT-3 solely because Core changes.

Instead:

1. review the existing integration boundary against the latest Core version;
2. migrate only the affected contract mappings, validation models, tests and documentation;
3. preserve verified calculation logic unless an engineering requirement changed;
4. verify standalone mode still works if the calculator supports it;
5. verify canonical integrated writeback against the latest Core contract.

This migration-first rule applies to W-Section, Snow, Wind, Seismic, Wood and future Linkoteq calculators.

## Required release check

Before an integrated calculator or structural module is considered Core-compatible, confirm:

- active Core schema version is correct;
- canonical IDs/references are preserved;
- units and coordinate systems are explicit and correct;
- input ownership is not duplicated;
- output/writeback uses canonical records;
- provenance and traceability are retained;
- standalone and integrated modes share the same engineering engine where both modes exist;
- contract tests cover the active Core version;
- documentation and GPT knowledge files are synchronized.

## Conflict rule

If a GPT instruction, old knowledge file, calculator repository, UI implementation or previous generated specification conflicts with the current released Core Contract, the current Core Contract wins for cross-product integration.

Engineering calculation standards and code requirements remain authoritative for calculation logic; Core standardizes how engineering information is exchanged, not the engineering formulas themselves.
