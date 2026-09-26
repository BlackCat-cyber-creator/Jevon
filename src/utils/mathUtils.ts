const SIN_LUT_SIZE = 4096;
const SIN_LUT = new Float32Array(SIN_LUT_SIZE);
for (let i = 0; i < SIN_LUT_SIZE; i++) {
  SIN_LUT[i] = Math.sin((i / SIN_LUT_SIZE) * Math.PI * 2);
}

const INV_TWO_PI = 1 / (Math.PI * 2);

export function fastSin(t: number): number {
  let val = t * INV_TWO_PI;
  val -= Math.floor(val);
  return SIN_LUT[Math.floor(val * SIN_LUT_SIZE)];
}

export function fastCos(t: number): number {
  let val = t * INV_TWO_PI + 0.25;
  val -= Math.floor(val);
  return SIN_LUT[Math.floor(val * SIN_LUT_SIZE)];
}
