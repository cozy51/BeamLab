export type VerticalDirection='up'|'down'|'zero';
export type RotationDirection='counterclockwise'|'clockwise'|'zero';
export type DiagramTextAnchor='start'|'middle'|'end';
export const verticalDirection=(value:number):VerticalDirection=>value>0?'up':value<0?'down':'zero';
export const rotationDirection=(value:number):RotationDirection=>value>0?'counterclockwise':value<0?'clockwise':'zero';
export const signedNumber=(value:number,format:(n:number)=>string):string=>`${value>0?'+':''}${format(value)}`;
/** Keep labels at beam ends inside the SVG viewport. */
export const diagramTextAnchor=(position:number,length:number):DiagramTextAnchor=>position<=length*.12?'start':position>=length*.88?'end':'middle';