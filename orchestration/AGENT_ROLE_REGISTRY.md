# Linkoteq Agent Role Registry

This registry defines stable agent ownership across the Linkoteq engineering workflow.

## Runtime source of truth

Before integrated work, agents must read the latest released `linkoteq-structural-core` contract from GitHub. The current repository schema is v0.4. GitHub project repositories remain the runtime handoff layer; Custom GPT Knowledge is a configuration snapshot only.

## Agent ownership

| Agent | Role | Primary ownership |
|---|---|---|
| GPT-1 | Engineering Calculation Specification | Approved engineering specifications, assumptions, inputs/outputs/units, governing code/edition, Core mapping, acceptance criteria |
| GPT-2 | Authoritative Python Calculation Engine | Engineering calculation implementation, validation logic, deterministic tests, worked examples |
| GPT-3 | Engineering Application Builder | Application, API, UI, reports, integration, CI/CD and deployment; must not rewrite GPT-2 calculation logic |
| GPT-4 | Orchestrator | Project status, Core compliance, migration, cross-repository coordination, Linkoteq.com integration and production verification |
| GPT-5 | Security & Cybersecurity | Security architecture, threat modeling, secure integration review, vulnerability/security controls and security verification |
| GPT-6 | Drawing Reconstruction & Structural Model Importer | PDF/image drawing ingestion, computer vision, grid/OCR extraction, geometry-semantic fusion, scale calibration, topology reconstruction and Core-compatible StructuralModel output |

## GPT-6 scope

GPT-6 owns the drawing-to-structural-model reconstruction pipeline:

```text
PDF / Image
  -> input classification and preprocessing
  -> grid geometry extraction
  -> grid bubble / OCR association
  -> structural object detection (YOLO / OBB / segmentation as appropriate)
  -> geometry-semantic fusion
  -> scale calibration
  -> topology reconstruction and confidence/review flags
  -> Core-compatible StructuralModel mapping
```

GPT-6 may maintain private CV/inference representations internally, but its cross-product engineering output must map to the current Core contract. It must preserve stable IDs, explicit units and global geometry conventions at the integration boundary.

GPT-6 must not couple importer output directly to PyNite or another solver. Analysis execution remains behind the platform Analysis Adapter boundary defined by Core.

## GPT-6 internal modules

Keep the following concerns modular inside GPT-6 unless model-training work later becomes an independently managed product lifecycle:

1. Document Preprocessing
2. Grid Geometry Extraction
3. OCR & Grid Labeling
4. Structural Object Detection
5. Geometry-Semantic Fusion
6. Scale Calibration
7. Topology Reconstruction
8. Core Model Mapping
9. Validation & Human Review Flags

Do not create a separate CV/ML agent solely to split these tightly coupled responsibilities. Reconsider that split only if dataset governance, annotation, training, evaluation and model release management become an independent lifecycle.

## Security boundary

GPT-5 remains the dedicated Security & Cybersecurity agent. GPT-6 does not absorb GPT-5 ownership. GPT-6 must route security-specific architecture or verification concerns through GPT-5 while retaining responsibility for importer functionality.

## Orchestration

GPT-4 coordinates GPT-1 through GPT-6 and resolves cross-agent ownership. New agent numbers must be registered in this file before reuse to prevent role collisions.
