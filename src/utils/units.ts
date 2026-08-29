export type LengthUnit='mm'|'m'; export type ForceUnit='N'|'kN'|'kgf'; export type MomentUnit='Nmm'|'Nm'|'kNm'; export type DistributedUnit='N/mm'|'N/m'|'kN/m';
export const toMm=(v:number,u:LengthUnit)=>u==='m'?v*1000:v;
export const fromMm=(v:number,u:LengthUnit)=>u==='m'?v/1000:v;
export const toN=(v:number,u:ForceUnit)=>u==='kN'?v*1000:u==='kgf'?v*9.80665:v;
export const fromN=(v:number,u:ForceUnit)=>u==='kN'?v/1000:u==='kgf'?v/9.80665:v;
export const toNmm=(v:number,u:MomentUnit)=>u==='Nm'?v*1000:u==='kNm'?v*1e6:v;
export const fromNmm=(v:number,u:MomentUnit)=>u==='Nm'?v/1000:u==='kNm'?v/1e6:v;
export const toNPerMm=(v:number,u:DistributedUnit)=>u==='N/m'?v/1000:u==='kN/m'?v:v;
export const formatNumber=(v:number,d=3)=>Number.isFinite(v)?new Intl.NumberFormat('ja-JP',{maximumFractionDigits:d}).format(v):'—';