import type {Material} from '../types/beam';
export const materials:Material[]=[
 {id:'ss400',name:'SS400',youngModulus:205000,poisson:.30,density:7.85e-6,yieldStrength:245},
 {id:'s45c',name:'S45C',youngModulus:205000,poisson:.30,density:7.85e-6,yieldStrength:345},
 {id:'scm435',name:'SCM435',youngModulus:205000,poisson:.30,density:7.85e-6,yieldStrength:785,note:'調質材の参考値'},
 {id:'sus304',name:'SUS304',youngModulus:193000,poisson:.29,density:7.93e-6,yieldStrength:205},
 {id:'sus316',name:'SUS316',youngModulus:193000,poisson:.30,density:7.98e-6,yieldStrength:205},
 {id:'a5052',name:'A5052-H34',youngModulus:70300,poisson:.33,density:2.68e-6,yieldStrength:215},
 {id:'a6061',name:'A6061-T6',youngModulus:68900,poisson:.33,density:2.70e-6,yieldStrength:275},
 {id:'a7075',name:'A7075-T6',youngModulus:71700,poisson:.33,density:2.81e-6,yieldStrength:505},
 {id:'fc250',name:'FC250',youngModulus:110000,poisson:.26,density:7.20e-6,yieldStrength:250,note:'引張強さを評価基準に使用'},
 {id:'custom',name:'任意材料',youngModulus:205000,poisson:.30,density:7.85e-6,yieldStrength:245}
];