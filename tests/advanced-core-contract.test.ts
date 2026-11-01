import test from "node:test";
import assert from "node:assert/strict";
import type { Member, MemberEndConnection, NodalLink, MultiPointConstraint, ShellAnalysisResult, SurfaceLocalAxes, SurfaceVectorLoad, StructuralModel } from "../typescript/index.js";

const unit = (value: number, unit: string) => ({ value, unit });
const dot = (a:{x:number;y:number;z:number}, b:{x:number;y:number;z:number}) => a.x*b.x+a.y*b.y+a.z*b.z;
const cross = (a:{x:number;y:number;z:number},b:{x:number;y:number;z:number}) => ({x:a.y*b.z-a.z*b.y,y:a.z*b.x-a.x*b.z,z:a.x*b.y-a.y*b.x});
const close=(a:number,b:number)=>Math.abs(a-b)<1e-10;
const validAxes=(a:SurfaceLocalAxes)=>close(dot(a.axis1,a.axis1),1)&&close(dot(a.axis2,a.axis2),1)&&close(dot(a.normal,a.normal),1)&&close(dot(a.axis1,a.axis2),0)&&close(dot(cross(a.axis1,a.axis2),a.normal),1);
const axes:SurfaceLocalAxes={axis1:{x:1,y:0,z:0},axis2:{x:0,y:1,z:0},normal:{x:0,y:0,z:1},convention:"right-handed",positiveFace:"normal"};

test("legacy v0.5 model remains structurally valid",()=>{
 const model:StructuralModel={schemaVersion:"0.5",project:{id:"p",name:"legacy",units:"SI"},levels:[],grids:[],nodes:[],members:[],surfaces:[],diaphragms:[],materials:[],sections:[],supports:[],loadCases:[],loads:[],loadCombinations:[]};
 assert.equal(JSON.parse(JSON.stringify(model)).schemaVersion,"0.5");assert.equal(model.nodalLinks,undefined);
});
test("joist identity and unverified capacity survive JSON roundtrip",()=>{
 const m:Member={id:"j",type:"joist",startNodeId:"a",endNodeId:"b",sectionId:"s",materialId:"steel",joist:{series:"K",designation:"K-test",analyticalRepresentation:"preserve-only",capacityVerification:"unverified"}};
 assert.equal(JSON.parse(JSON.stringify(m)).type,"joist");assert.equal(m.joist?.capacityVerification,"unverified");
});
test("end connection separates releases and stiffness",()=>{
 const c:MemberEndConnection={release:{RZ:true},stiffness:{RY:unit(100,"kN*m/rad")}};
 assert.equal(c.release?.RZ,true);assert.equal(c.stiffness?.RY?.unit,"kN*m/rad");
});
test("coupled link preserves mixed stiffness dimensions",()=>{
 const link:NodalLink={id:"l",startNodeId:"a",endNodeId:"b",coordinateSystem:"global",coupledStiffness:{dofs:["DX","RZ"],values:[[unit(1,"kN/m"),unit(2,"kN/rad")],[unit(2,"kN*m/m"),unit(3,"kN*m/rad")]]}};
 assert.equal(link.coupledStiffness?.values.length,2);assert.equal(link.coupledStiffness?.values[1][0].unit,"kN*m/m");
});
test("MPC preserves master/slave identities",()=>{
 const m:MultiPointConstraint={id:"c",masterNodeId:"a",slaveNodeIds:["b"],constrainedDofs:["DX","DY"],coordinateSystem:"global",behavior:"preserve-only"};
 assert.deepEqual(m.slaveNodeIds,["b"]);
});
test("shell axes are right handed",()=>{
 assert.equal(validAxes(axes),true);assert.equal(validAxes({...axes,normal:{x:0,y:0,z:-1}}),false);
});
test("shell results preserve units and component identity",()=>{
 const r:ShellAnalysisResult={surfaceId:"s",localAxes:axes,location:"element-center",units:{membraneForcePerLength:"kN/m",bendingMomentPerLength:"kN*m/m",transverseShearPerLength:"kN/m"},components:{F11:1,M22:2}};
 assert.equal(r.components.M22,2);
});
test("surface vector loads carry force per area",()=>{
 const l:SurfaceVectorLoad={id:"l",loadCaseId:"dead",type:"surface-vector",surfaceId:"s",coordinateSystem:"global",distribution:"force-per-area",components:{FZ:unit(-2,"kN/m^2")}};
 assert.equal(l.components.FZ?.unit,"kN/m^2");
});
