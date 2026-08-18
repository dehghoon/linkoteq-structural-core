export type MemberType = "beam" | "column" | "brace";
export type SurfaceType = "slab" | "wall";
export type DiaphragmType = "rigid" | "semi-rigid";
export type LoadType = "nodal" | "point" | "line" | "area" | "level" | "diaphragm";
export type LoadCategory = "dead" | "live" | "snow" | "wind" | "seismic" | "other";
export type LoadTransfer = "one-way" | "two-way" | "shell" | "manual";

export interface Vec3 { x: number; y: number; z: number; }

export interface ProjectInfo {
  id: string;
  name: string;
  units: "SI" | "US";
  designCode?: string;
  jurisdiction?: string;
  metadata?: Record<string, string | number | boolean | null>;
}

export interface Level {
  id: string;
  name: string;
  elevation: number;
}

export interface GridLine {
  id: string;
  label: string;
  start: Vec3;
  end: Vec3;
}

export interface Node {
  id: string;
  position: Vec3;
  levelId?: string;
}

export interface MemberEndRelease {
  ux?: boolean; uy?: boolean; uz?: boolean;
  rx?: boolean; ry?: boolean; rz?: boolean;
}

export interface Member {
  id: string;
  type: MemberType;
  startNodeId: string;
  endNodeId: string;
  sectionId?: string;
  materialId?: string;
  levelId?: string;
  startRelease?: MemberEndRelease;
  endRelease?: MemberEndRelease;
  metadata?: Record<string, string | number | boolean | null>;
}

export interface SurfaceLoadTransfer {
  method: LoadTransfer;
  direction?: Vec3;
  supportingMemberIds?: string[];
  notes?: string;
}

export interface Surface {
  id: string;
  type: SurfaceType;
  boundaryNodeIds: string[];
  levelId?: string;
  thickness?: number;
  materialId?: string;
  loadTransfer?: SurfaceLoadTransfer;
  metadata?: Record<string, string | number | boolean | null>;
}

export interface Opening {
  id: string;
  hostSurfaceId: string;
  boundaryNodeIds: string[];
}

export interface Diaphragm {
  id: string;
  type: DiaphragmType;
  levelId: string;
  surfaceIds: string[];
  nodeIds?: string[];
}

export interface Material {
  id: string;
  type: "steel" | "concrete" | "timber" | "other";
  name: string;
  properties: Record<string, number | string | boolean | null>;
}

export interface Section {
  id: string;
  family: string;
  materialType: string;
  designation?: string;
  geometry: Record<string, number | string | null>;
  properties: Record<string, number | string | null>;
  libraryRef?: { library: string; version?: string; recordId?: string };
}

export interface Support {
  id: string;
  nodeId: string;
  restraints: {
    ux: boolean; uy: boolean; uz: boolean;
    rx: boolean; ry: boolean; rz: boolean;
  };
}

export interface LoadSource {
  id: string;
  category: LoadCategory;
  name: string;
  calculator?: "manual" | "snow" | "wind" | "seismic" | "self-weight" | "other";
  calculatorVersion?: string;
  codeEdition?: string;
  jurisdiction?: string;
  status?: "manual" | "generated" | "stale" | "error";
  inputs?: Record<string, unknown>;
  summary?: Record<string, unknown>;
  generatedAt?: string;
}

export interface LoadCase {
  id: string;
  name: string;
  category: LoadCategory;
  sourceId?: string;
  analysisType?: "static" | "response-spectrum" | "other";
}

export interface LoadProvenance {
  sourceId?: string;
  calculatorRunId?: string;
  formulaRef?: string;
  note?: string;
}

export interface Load {
  id: string;
  type: LoadType;
  targetId: string;
  targetType?: "node" | "member" | "surface" | "level" | "diaphragm";
  loadCaseId: string;
  direction: Vec3;
  magnitude: number;
  unit: string;
  position?: number;
  endMagnitude?: number;
  distribution?: Array<{ position: number; magnitude: number }>;
  provenance?: LoadProvenance;
}

export interface LoadCombination {
  id: string;
  name: string;
  limitState?: "ULS" | "SLS" | "ASD" | "other";
  factors: Record<string, number>;
  codeRef?: string;
}

export interface AnalysisRequest {
  id: string;
  solver?: string;
  loadCaseIds?: string[];
  loadCombinationIds?: string[];
  settings?: Record<string, number | string | boolean | null>;
}

export interface MemberResultStation {
  x: number;
  axial?: number;
  shearY?: number;
  shearZ?: number;
  torsion?: number;
  momentY?: number;
  momentZ?: number;
  displacementY?: number;
  displacementZ?: number;
}

export interface MemberAnalysisResult {
  memberId: string;
  loadCaseId?: string;
  loadCombinationId?: string;
  stations: MemberResultStation[];
}

export interface NodeAnalysisResult {
  nodeId: string;
  loadCaseId?: string;
  loadCombinationId?: string;
  displacement?: Vec3;
  rotation?: Vec3;
  reaction?: Vec3;
  reactionMoment?: Vec3;
}

export interface AnalysisRun {
  id: string;
  solver: string;
  solverVersion?: string;
  status: "pending" | "ok" | "warning" | "error";
  startedAt?: string;
  completedAt?: string;
  warnings?: string[];
  errors?: string[];
}

/**
 * Canonical exchange model used by the 3D editor, load calculators and analysis engines.
 * Core stores engineering facts; it does not calculate snow/wind/seismic loads and it does
 * not perform member design. External calculators read/write this contract directly.
 */
export interface StructuralModel {
  schemaVersion: "0.1" | "0.2";
  project: ProjectInfo;
  levels: Level[];
  grids: GridLine[];
  nodes: Node[];
  members: Member[];
  surfaces: Surface[];
  openings?: Opening[];
  diaphragms: Diaphragm[];
  materials: Material[];
  sections: Section[];
  supports: Support[];
  loadSources?: LoadSource[];
  loadCases: LoadCase[];
  loads: Load[];
  loadCombinations: LoadCombination[];
  analysisRequests?: AnalysisRequest[];
  analysisRuns?: AnalysisRun[];
  analysisResults?: MemberAnalysisResult[];
  nodeAnalysisResults?: NodeAnalysisResult[];
}

export interface CalculatorEnvelope<TInputs = Record<string, unknown>> {
  modelSchemaVersion: StructuralModel["schemaVersion"];
  projectId: string;
  runId: string;
  calculator: string;
  calculatorVersion?: string;
  targetIds: string[];
  inputs: TInputs;
}

export interface CalculatorWriteback {
  runId: string;
  modelSchemaVersion: StructuralModel["schemaVersion"];
  loadSources?: LoadSource[];
  loadCases?: LoadCase[];
  loads?: Load[];
  sections?: Section[];
  warnings?: string[];
  errors?: string[];
  trace?: Array<Record<string, unknown>>;
}
