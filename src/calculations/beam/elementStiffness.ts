export type Matrix4=[number[],number[],number[],number[]];
/** Euler–Bernoulli element, DOF order [v1, theta1, v2, theta2], N-mm. */
export function elementStiffness(EI:number,L:number):Matrix4{const a=EI/L**3;return[[12*a,6*L*a,-12*a,6*L*a],[6*L*a,4*L**2*a,-6*L*a,2*L**2*a],[-12*a,-6*L*a,12*a,-6*L*a],[6*L*a,2*L**2*a,-6*L*a,4*L**2*a]]}