import type {SectionInput,SectionProperties} from '../types/beam';
import {sectionRegistry} from './registry';
export function sectionProperties(s:SectionInput):SectionProperties{
 if(s.type==='custom'){const A=s.area??0,I=s.inertia??0,c=I/(s.modulus??Infinity);return{area:A,inertia:I,modulus:s.modulus??0,outerFiber:c,label:'任意断面'}}
 const{A,I,c,label}=sectionRegistry[s.type].compute(s);
 return{area:A,inertia:I,modulus:I/c,outerFiber:c,label};
}
export function validateSection(s:SectionInput):string[]{
 const p=sectionProperties(s),e:string[]=[];
 if(!(p.area>0))e.push('断面積 A は0より大きくしてください。');
 if(!(p.inertia>0))e.push('断面二次モーメント I は0より大きくしてください。');
 if(!(p.modulus>0))e.push('断面係数 Z は0より大きくしてください。');
 if(s.type==='custom')return e;
 const def=sectionRegistry[s.type];
 for(const f of def.fields)if(!((s[f.key]??0)>0))e.push(`${f.label} ${f.symbol} は0より大きくしてください。`);
 e.push(...def.extraErrors(s));
 return e;
}
