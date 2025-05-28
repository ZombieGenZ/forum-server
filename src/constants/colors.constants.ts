export enum ColorType {
  COLOR_BASIC,
  COLOR_GRADIENT_2,
  COLOR_GRADIENT_3,
  COLOR_RAMBOW
}

export interface ColorBasic {
  color: string
}

export interface ColorGradient2 {
  color1: string
  color2: string
}

export interface ColorGradient3 {
  color1: string
  color2: string
  color3: string
}

export interface ColorTypeFull {
  type: ColorType
  color: ColorBasic | ColorGradient2 | ColorGradient3 | null
}
