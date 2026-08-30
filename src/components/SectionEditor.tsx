import type {SectionInput,SectionType} from '../types/beam';
import {sectionRegistry,withShapeType} from '../sections/registry';
import {sectionProperties,validateSection} from '../sections/properties';
import {SectionDiagram} from '../sections/SectionDiagram';
import {formatNumber} from '../utils/units';
import {Num} from './InputPanel';

export function SectionEditor({section,onChange}:{section:SectionInput;onChange:(s:SectionInput)=>void}){
 const errors=validateSection(section),props=sectionProperties(section);
 return <fieldset><legend>4. 断面</legend>
  <label><span>断面形状</span><select value={section.type} onChange={e=>onChange(withShapeType(section,e.target.value as SectionType))}>
   {Object.entries(sectionRegistry).map(([type,def])=><option key={type} value={type}>{def.label}</option>)}
   <option value="custom">任意断面</option>
  </select></label>
  <SectionDiagram section={section}/>
  <div className="two-col">
   {section.type==='custom'?<>
    <Num label="断面積 A" value={section.area??0} onChange={v=>onChange({...section,area:v})} unit="mm²"/>
    <Num label="断面二次モーメント I" value={section.inertia??0} onChange={v=>onChange({...section,inertia:v})} unit="mm⁴"/>
    <Num label="断面係数 Z" value={section.modulus??0} onChange={v=>onChange({...section,modulus:v})} unit="mm³"/>
   </>:sectionRegistry[section.type].fields.map(f=><Num key={f.key} label={`${f.label} ${f.symbol}`} value={section[f.key]??0} onChange={v=>onChange({...section,[f.key]:v})} unit={f.unit}/>)}
  </div>
  {errors.length?<div className="warning"><ul>{errors.map(e=><li key={e}>{e}</li>)}</ul></div>:section.type!=='custom'&&<div className="section-summary"><dl>
   <div><dt>断面積 A</dt><dd>{formatNumber(props.area)}<small>mm²</small></dd></div>
   <div><dt>断面二次モーメント I</dt><dd>{formatNumber(props.inertia)}<small>mm⁴</small></dd></div>
   <div><dt>断面係数 Z</dt><dd>{formatNumber(props.modulus)}<small>mm³</small></dd></div>
  </dl></div>}
 </fieldset>;
}
