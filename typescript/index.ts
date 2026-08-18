export type MemberType = "beam" | "column" | "brace";
export type SurfaceType = "slab" | "wall";
export type DiaphragmType = "rigid" | "semi-rigid";
export type LoadType = "nodal" | "point" | "line" | "area";

export interface Vec3 { x: number; y: number; z: number; }

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

export interface Member {
  id: string;
  type: MemberType;
  startNodeId: string;
  endNodeId: string;
  sectionId?: string;
  materialId?: string;
  levelId?: string;
}

export interface Surface {
  id: string;
  type: SurfaceType;
  boundaryNodeIds: string[];
  levelId?: string;
  thickness?: number;
  materialId?: string;
}

export interface Diaphragm {
  id: string;
  type: DiaphragmType;
  levelId: string;
  surfaceIds: string[];
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
}

export interface Support {
  id: string;
  nodeId: string;
  restraints: {
    ux: boolean; uy: boolean; uz: boolean;
    rx: boolean; ry: boolean; rz: boolean;
  };
}

export interface LoadCase {
  id: string;
  name: string;
  category: "dead" | "live" | "snow" | "wind" | "seismic" | "other";
}

export interface Load {
  id: string;
  type: LoadType;
  targetId: string;
  loadCaseId: string;
  direction: Vec3;
  magnitude: number;
  unit: string;
  position?: number;
  endMagnitude?: number;
}

export interface LoadCombination {
  id: string;
  name: string;
  factors: Record<string, number>;
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
  loadCombinationId: string;
  stations: MemberResultStation[];
}

export interface StructuralModel {
  schemaVersion: "0.1";
  project: { id: string; name: string; units: "SI" | "US"; };
  levels: Level[];
  grids: GridLine[];
  nodes: Node[];
  members: Member[];
  surfaces: Surface[];
  diaphragms: Diaphragm[];
  materials: Material[];
  sections: Section[];
  supports: Support[];
  loadCases: LoadCase[];
  loads: Load[];
  loadCombinations: LoadCombination[];
  analysisResults?: MemberAnalysisResult[];
}
