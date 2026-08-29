import type {BeamCase} from '../types/beam';

/** Old JSON/localStorage cases used a separate `overhang` support identifier. */
export function normalizeBeamCase(value:BeamCase):BeamCase{
 const legacySupport=(value as unknown as{support:string}).support;
 const length=Number(value.length)||1000;
 const customSupports=Array.isArray(value.customSupports)?value.customSupports:[{id:'support-a',name:'A',position:0,type:'pin' as const},{id:'support-b',name:'B',position:length/2,type:'roller' as const},{id:'support-c',name:'C',position:length,type:'roller' as const}];
 return{...value,version:2,customSupports,support:legacySupport==='overhang'?'simply-supported':value.support};
}

export type SimpleSupportState='通常の単純支持梁'|'左オーバーハング'|'右オーバーハング'|'両側オーバーハング';

export function simpleSupportState(length:number,a:number,b:number):SimpleSupportState{
 const tolerance=Math.max(length,1)*1e-9;
 const left=a>tolerance;
 const right=b<length-tolerance;
 if(left&&right)return'両側オーバーハング';
 if(left)return'左オーバーハング';
 if(right)return'右オーバーハング';
 return'通常の単純支持梁';
}