import{describe,expect,it}from'vitest';
import{sampleCase}from'./defaults';
import{normalizeBeamCase,simpleSupportState}from'./caseNormalization';

describe('support case normalization',()=>{
 it('normalizes legacy overhang without changing positions',()=>{const legacy={...structuredClone(sampleCase),support:'overhang',supportA:200,supportB:800} as unknown as typeof sampleCase;const normalized=normalizeBeamCase(legacy);expect(normalized.support).toBe('simply-supported');expect(normalized.supportA).toBe(200);expect(normalized.supportB).toBe(800)});
 it('classifies support positions',()=>{expect(simpleSupportState(1000,0,1000)).toBe('通常の単純支持梁');expect(simpleSupportState(1200,0,1000)).toBe('右オーバーハング');expect(simpleSupportState(1200,200,1200)).toBe('左オーバーハング');expect(simpleSupportState(1400,200,1200)).toBe('両側オーバーハング')});
});