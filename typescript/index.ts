export type MemberType = "beam" | "column" | "brace" | "other";
export type SurfaceType = "slab" | "wall" | "plate" | "other";
export type MaterialType = "steel" | "concrete" | "wood" | "other";
export type DiaphragmType = "rigid" | "semi-rigid";
export type LoadCategory = "dead" | "live" | "roof-live" | "snow" | "rain" | "wind" | "seismic" | "temperature" | "construction" | "other";
export type LoadTransfer = "one-way" | "two-way" | "shell" | "manual";
export type RunStatus = "pending" | "ok" | "warning" | "error";
export type DesignStatus = "pass" | "fail" | "warning" | "not-checked";
export type LoadCoordinateSystem = "global" | "member-local";
export type MemberForceCoordinateSystem = "member-local";
export type AnalysisType = "linear-static" | "elastic-iterative" | "p-delta";
export type StructuralDOF = "DX" | "DY" | "DZ" | "RX" | "RY" | "RZ";
export type ForceDirection = "FX" | "FY" | "FZ";
export type MomentDirection = "MX" | "MY" | "MZ";
export type LocalForceDirection = "Fx" | "Fy" | "Fz";
export type LocalMomentDirection = "Mx" | "My" | "Mz";
export type MemberLoadDirection = ForceDirection | MomentDirection | LocalForceDirection | LocalMomentDirection;

export interface Vec3 { x: number; y: number; z: number; }
export interface UnitValue { value: number; unit: string; }
export interface ProjectInfo { id: string; name: string; units: "SI" | "US"; designCode?: string; jurisdiction?: string; metadata?: Record<string, string | number | boolean | null>; }
export interface Level { id: string; name: string; elevation: number; }
export interface GridLine { id: string; label: string; start: Vec3; end: Vec3; }
export interface Node { id: string; position: Vec3; levelId?: string; }

export interface MaterialAnalysisProperties { E: UnitValue; G: UnitValue; nu: number; rho: UnitValue; fy?: UnitValue; }
export interface SteelMaterialProperties { grade?: string; Fu?: UnitValue; thermalExpansion?: UnitValue; }
export interface ConcreteMaterialProperties { fc?: UnitValue; densityClass?: "normal" | "lightweight" | "other"; }
export interface WoodMaterialProperties { species?: string; grade?: string; productType?: string; }
export interface Material { id: string; type: MaterialType; name: string; analysis: MaterialAnalysisProperties; steel?: SteelMaterialProperties; concrete?: ConcreteMaterialProperties; wood?: WoodMaterialProperties; metadata?: Record<string, unknown>; }

export interface SectionAnalysisProperties { A: UnitValue; Iy: UnitValue; Iz: UnitValue; J: UnitValue; Ay?: UnitValue; Az?: UnitValue; Sy?: UnitValue; Sz?: UnitValue; Zy?: UnitValue; Zz?: UnitValue; ry?: UnitValue; rz?: UnitValue; }
export interface Section { id: string; family: string; designation?: string; geometry?: Record<string, UnitValue | number | string | null>; analysis: SectionAnalysisProperties; design?: Record<string, unknown>; libraryRef?: { library: string; version?: string; recordId?: string }; metadata?: Record<string, unknown>; }

export interface MemberEndRelease { DX?: boolean; DY?: boolean; DZ?: boolean; RX?: boolean; RY?: boolean; RZ?: boolean; }
export interface MemberLocalAxes { x: Vec3; y: Vec3; z: Vec3; convention: "right-handed"; }
export interface Member { id: string; type: MemberType; startNodeId: string; endNodeId: string; sectionId: string; materialId: string; levelId?: string; rotationDeg?: number; localAxes?: MemberLocalAxes; startRelease?: MemberEndRelease; endRelease?: MemberEndRelease; tensionOnly?: boolean; compressionOnly?: boolean; metadata?: Record<string, string | number | boolean | null>; }

export interface SupportRestraints { DX: boolean; DY: boolean; DZ: boolean; RX: boolean; RY: boolean; RZ: boolean; }
export interface Support { id: string; nodeId: string; restraints: SupportRestraints; }
export interface SupportSpring { id: string; nodeId: string; dof: StructuralDOF; stiffness: UnitValue; behavior?: "two-way" | "tension-only" | "compression-only"; }
export interface EnforcedNodeDisplacement { id: string; nodeId: string; dof: StructuralDOF; magnitude: UnitValue; loadCaseId?: string; }

export interface SurfaceLoadTransfer { method: LoadTransfer; direction?: Vec3; supportingMemberIds?: string[]; notes?: string; }
export interface Surface { id: string; type: SurfaceType; boundaryNodeIds: string[]; levelId?: string; thickness?: UnitValue; materialId?: string; loadTransfer?: SurfaceLoadTransfer; metadata?: Record<string, string | number | boolean | null>; }
export interface Opening { id: string; hostSurfaceId: string; boundaryNodeIds: string[]; }
export interface Diaphragm { id: string; type: DiaphragmType; levelId: string; surfaceIds: string[]; nodeIds?: string[]; }

export interface LoadSource { id: string; category: LoadCategory; name: string; calculator?: "manual" | "snow" | "wind" | "seismic" | "self-weight" | "other"; calculatorVersion?: string; codeEdition?: string; jurisdiction?: string; status?: "manual" | "generated" | "stale" | "error"; inputs?: Record<string, unknown>; summary?: Record<string, unknown>; generatedAt?: string; }
export interface LoadCase { id: string; name: string; category: LoadCategory; sourceId?: string; analysisType?: "static" | "response-spectrum" | "other"; tags?: string[]; }
export interface LoadProvenance { sourceId?: string; calculatorRunId?: string; formulaRef?: string; note?: string; }
interface BaseLoad { id: string; loadCaseId: string; provenance?: LoadProvenance; }
export interface NodalLoad extends BaseLoad { type: "nodal"; nodeId: string; coordinateSystem: "global"; components: Partial<Record<ForceDirection | MomentDirection, UnitValue>>; }
export interface MemberPointLoad extends BaseLoad { type: "member-point"; memberId: string; coordinateSystem: LoadCoordinateSystem; direction: MemberLoadDirection; magnitude: UnitValue; x: UnitValue; }
export interface MemberDistributedLoad extends BaseLoad { type: "member-distributed"; memberId: string; coordinateSystem: LoadCoordinateSystem; direction: MemberLoadDirection; w1: UnitValue; w2: UnitValue; x1?: UnitValue; x2?: UnitValue; }
export interface SurfacePressureLoad extends BaseLoad { type: "surface-pressure"; surfaceId: string; pressure: UnitValue; convention?: "surface-normal"; }
export interface SelfWeightLoad extends BaseLoad { type: "self-weight"; globalDirection: ForceDirection; factor: number; targetMemberIds?: string[]; }
export interface LevelLoad extends BaseLoad { type: "level"; levelId: string; force: Vec3; moment?: Vec3; forceUnit: string; momentUnit?: string; }
export interface DiaphragmLoad extends BaseLoad { type: "diaphragm"; diaphragmId: string; force: Vec3; moment?: Vec3; forceUnit: string; momentUnit?: string; }
export type Load = NodalLoad | MemberPointLoad | MemberDistributedLoad | SurfacePressureLoad | SelfWeightLoad | LevelLoad | DiaphragmLoad;

export interface LoadCombination { id: string; name: string; limitState?: "ULS" | "SLS" | "ASD" | "other"; factors: Record<string, number>; tags?: string[]; codeRef?: string; }

export interface AnalysisRequest { id: string; solver?: "pynite" | string; analysisType: AnalysisType; loadCaseIds?: string[]; loadCombinationIds?: string[]; requestedStations?: number[]; settings?: Record<string, number | string | boolean | null>; }
export interface MemberResultStation { x: number; xRatio?: number; axial?: number; shearY?: number; shearZ?: number; torsion?: number; momentY?: number; momentZ?: number; displacementX?: number; displacementY?: number; displacementZ?: number; rotationX?: number; rotationY?: number; rotationZ?: number; }
export interface EnvelopeValue { value: number; x: number; xRatio?: number; loadCombinationId?: string; }
export interface ForceComponentEnvelope { min?: EnvelopeValue; max?: EnvelopeValue; }
export interface MemberForceEnvelope { axial?: ForceComponentEnvelope; shearY?: ForceComponentEnvelope; shearZ?: ForceComponentEnvelope; torsion?: ForceComponentEnvelope; momentY?: ForceComponentEnvelope; momentZ?: ForceComponentEnvelope; }
export interface MemberResultUnits { force: string; moment: string; length: string; displacement?: string; rotation?: string; }
export interface MemberAnalysisResult { memberId: string; analysisRunId?: string; loadCaseId?: string; loadCombinationId?: string; coordinateSystem: MemberForceCoordinateSystem; signConvention: "member-local-right-hand-v1"; units: MemberResultUnits; stations: MemberResultStation[]; envelope?: MemberForceEnvelope; }
export interface NodeAnalysisResult { nodeId: string; loadCaseId?: string; loadCombinationId?: string; displacement?: Vec3; rotation?: Vec3; reaction?: Vec3; reactionMoment?: Vec3; units?: { force: string; moment: string; length: string; rotation?: string }; }
export interface AnalysisRun { id: string; requestId?: string; solver: string; solverVersion?: string; status: RunStatus; startedAt?: string; completedAt?: string; warnings?: string[]; errors?: string[]; adapterVersion?: string; }

export interface DesignCheck { id: string; name: string; status: DesignStatus; demand?: number; capacity?: number; utilization?: number; unit?: string; codeClause?: string; loadCaseId?: string; loadCombinationId?: string; station?: number; notes?: string[]; }
export interface MemberDesignResult { id: string; runId: string; memberId: string; calculator: string; calculatorVersion?: string; code?: string; codeEdition?: string; status: DesignStatus; assignedSectionId?: string; recommendedSectionId?: string; governingCheckId?: string; utilization?: number; checks: DesignCheck[]; warnings?: string[]; trace?: Array<Record<string, unknown>>; }
export interface DesignRun { id: string; calculator: string; calculatorVersion?: string; modelSchemaVersion: StructuralModel["schemaVersion"]; targetIds: string[]; analysisRunId?: string; status: RunStatus; startedAt?: string; completedAt?: string; code?: string; codeEdition?: string; jurisdiction?: string; warnings?: string[]; errors?: string[]; }

export type ReportSectionType = "project" | "model" | "loads" | "analysis" | "design" | "assumptions" | "references" | "warnings" | "appendix" | "custom";
export interface ReportReference { id: string; title: string; code?: string; edition?: string; clause?: string; url?: string; }
export interface ReportFigure { id: string; title?: string; kind: "image" | "diagram" | "chart" | "model-view"; sourceRef?: string; caption?: string; }
export interface ReportSection { id: string; type: ReportSectionType; title: string; summary?: string; sourceIds?: string[]; figures?: ReportFigure[]; data?: Record<string, unknown>; }
export interface ReportRequest { id: string; projectId: string; title: string; analysisRunIds?: string[]; designRunIds?: string[]; loadSourceIds?: string[]; sections?: ReportSectionType[]; format?: "pdf" | "html" | "json"; }
export interface ReportRecord { id: string; requestId: string; status: RunStatus; title: string; generatedAt?: string; sections: ReportSection[]; references?: ReportReference[]; assumptions?: string[]; warnings?: string[]; artifactUrl?: string; }

export interface AIKnowledgeManifest { contractName: "linkoteq-structural-core"; schemaVersion: StructuralModel["schemaVersion"]; generatedAt?: string; canonicalTypes: string[]; requiredRules: string[]; terminology?: Record<string, string>; unitRules?: string[]; idRules?: string[]; integrationRules?: string[]; }
export interface AIGenerationEnvelope<T = Record<string, unknown>> { projectId: string; modelSchemaVersion: StructuralModel["schemaVersion"]; task: string; targetIds?: string[]; knowledgeVersion?: string; input: T; }
export interface AIGenerationResult<T = Record<string, unknown>> { modelSchemaVersion: StructuralModel["schemaVersion"]; status: RunStatus; output?: T; warnings?: string[]; errors?: string[]; trace?: Array<Record<string, unknown>>; }

export interface StructuralModel { schemaVersion: "0.5"; project: ProjectInfo; levels: Level[]; grids: GridLine[]; nodes: Node[]; members: Member[]; surfaces: Surface[]; openings?: Opening[]; diaphragms: Diaphragm[]; materials: Material[]; sections: Section[]; supports: Support[]; supportSprings?: SupportSpring[]; enforcedNodeDisplacements?: EnforcedNodeDisplacement[]; loadSources?: LoadSource[]; loadCases: LoadCase[]; loads: Load[]; loadCombinations: LoadCombination[]; analysisRequests?: AnalysisRequest[]; analysisRuns?: AnalysisRun[]; analysisResults?: MemberAnalysisResult[]; nodeAnalysisResults?: NodeAnalysisResult[]; designRuns?: DesignRun[]; memberDesignResults?: MemberDesignResult[]; reportRequests?: ReportRequest[]; reports?: ReportRecord[]; }

export interface CalculatorEnvelope<TInputs = Record<string, unknown>> { modelSchemaVersion: StructuralModel["schemaVersion"]; projectId: string; runId: string; calculator: string; calculatorVersion?: string; targetIds: string[]; inputs: TInputs; }
export interface CalculatorWriteback { runId: string; modelSchemaVersion: StructuralModel["schemaVersion"]; loadSources?: LoadSource[]; loadCases?: LoadCase[]; loads?: Load[]; sections?: Section[]; materials?: Material[]; designRun?: DesignRun; memberDesignResults?: MemberDesignResult[]; reportRequests?: ReportRequest[]; warnings?: string[]; errors?: string[]; trace?: Array<Record<string, unknown>>; }
