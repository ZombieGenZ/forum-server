export interface CreateTopicRequest {
  topic: string
  colorType: number
  basicColor?: string
  gradient2Color1?: string
  gradient2Color2?: string
  gradient3Color1?: string
  gradient3Color2?: string
  gradient3Color3?: string
  textColorType: number
  textBasicColor?: string
  textGradient2Color1?: string
  textGradient2Color2?: string
  textGradient3Color1?: string
  textGradient3Color2?: string
  textGradient3Color3?: string
}

export interface UpdateTopicRequest {
  topic_id: string
  topic: string
  colorType: number
  basicColor?: string
  gradient2Color1?: string
  gradient2Color2?: string
  gradient3Color1?: string
  gradient3Color2?: string
  gradient3Color3?: string
  textColorType: number
  textBasicColor?: string
  textGradient2Color1?: string
  textGradient2Color2?: string
  textGradient3Color1?: string
  textGradient3Color2?: string
  textGradient3Color3?: string
}

export interface DeleteTopicRequest {
  topic_id: string
}
