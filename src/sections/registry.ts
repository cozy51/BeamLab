import type {SectionInput,SectionType} from '../types/beam';
export interface SectionFieldDef{key:'b'|'h'|'d'|'D'|'B'|'H'|'t'|'flangeWidth'|'flangeThickness'|'webThickness';label:string;symbol:string;unit:string;default:number}
export interface SectionShapeDef{label:string;fields:SectionFieldDef[];compute:(s:SectionInput)=>{A:number;I:number;c:number;label:string};extraErrors:(s:SectionInput)=>string[]}
export const sectionRegistry:Record<Exclude<SectionType,'custom'>,SectionShapeDef>={
 rectangle:{label:'長方形',fields:[{key:'b',label:'幅',symbol:'b',unit:'mm',default:20},{key:'h',label:'高さ',symbol:'h',unit:'mm',default:40}],compute:s=>{const b=s.b??0,h=s.h??0;return{A:b*h,I:b*h**3/12,c:h/2,label:`長方形 ${b}×${h} mm`}},extraErrors:()=>[]},
 circle:{label:'円形',fields:[{key:'d',label:'直径',symbol:'d',unit:'mm',default:30}],compute:s=>{const d=s.d??0;return{A:Math.PI*d**2/4,I:Math.PI*d**4/64,c:d/2,label:`円形 φ${d} mm`}},extraErrors:()=>[]},
 'hollow-circle':{label:'中空円形',fields:[{key:'D',label:'外径',symbol:'D',unit:'mm',default:40},{key:'d',label:'内径',symbol:'d',unit:'mm',default:30}],compute:s=>{const D=s.D??0,d=s.d??0;return{A:Math.PI*(D**2-d**2)/4,I:Math.PI*(D**4-d**4)/64,c:D/2,label:`中空円形 φ${D}−φ${d}`}},extraErrors:s=>(s.d??0)>=(s.D??0)?['内径は外径より小さくしてください。']:[]},
 'hollow-rectangle':{label:'中空長方形',fields:[{key:'B',label:'外幅',symbol:'B',unit:'mm',default:40},{key:'H',label:'外高さ',symbol:'H',unit:'mm',default:60},{key:'t',label:'板厚',symbol:'t',unit:'mm',default:3}],compute:s=>{const B=s.B??0,H=s.H??0,t=s.t??0;return{A:B*H-(B-2*t)*(H-2*t),I:(B*H**3-(B-2*t)*(H-2*t)**3)/12,c:H/2,label:`中空長方形 ${B}×${H} t${t}`}},extraErrors:s=>{const B=s.B??0,H=s.H??0,t=s.t??0,e:string[]=[];if(2*t>=B)e.push('板厚は外幅の半分未満にしてください。');if(2*t>=H)e.push('板厚は外高さの半分未満にしてください。');return e}},
 'i-section':{label:'H形・I形',fields:[{key:'flangeWidth',label:'全幅',symbol:'B',unit:'mm',default:40},{key:'H',label:'全高',symbol:'H',unit:'mm',default:60},{key:'webThickness',label:'ウェブ厚',symbol:'tw',unit:'mm',default:4},{key:'flangeThickness',label:'フランジ厚',symbol:'tf',unit:'mm',default:5}],compute:s=>{const H=s.H??0,bf=s.flangeWidth??0,tf=s.flangeThickness??0,tw=s.webThickness??0,hw=H-2*tf;return{A:2*bf*tf+tw*hw,I:2*(bf*tf**3/12+bf*tf*(H/2-tf/2)**2)+tw*hw**3/12,c:H/2,label:`I形 H${H}×B${bf}`}},extraErrors:s=>{const H=s.H??0,bf=s.flangeWidth??0,tf=s.flangeThickness??0,tw=s.webThickness??0,e:string[]=[];if(2*tf>=H)e.push('フランジ厚の合計は全高さ未満にしてください。');if(tw>=bf)e.push('ウェブ厚はフランジ幅未満にしてください。');return e}}
};
const customDefaults:Partial<SectionInput>={area:800,inertia:106666.7,modulus:5333.3};
export function withShapeType(section:SectionInput,type:SectionType):SectionInput{
 if(type==='custom')return{...section,type,...customDefaults};
 const def=sectionRegistry[type];
 return{...section,type,...Object.fromEntries(def.fields.map(f=>[f.key,f.default]))};
}
