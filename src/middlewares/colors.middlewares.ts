import { Request, Response, NextFunction } from 'express'
import { ColorType } from '~/constants/colors.constants'
import HTTPSTATUS from '~/constants/httpStatus.constants'
import { MESSAGE } from '~/constants/message.constants'
import { RESPONSE_CODE } from '~/constants/responseCode.constants'
import { isValidHexColor } from '~/utils/color.utils'

export const colorValidator = (req: Request, res: Response, next: NextFunction) => {
  const body = req.body

  if (!body.colorType) {
    res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
      code: RESPONSE_CODE.COLOR_INVALID,
      message: MESSAGE.COLOR_MESSAGE.COLOR_TYPE_IS_REQUIRED
    })
    return
  }

  if (
    body.colorType === ColorType.COLOR_BASIC &&
    (!body.basicColor || typeof body.basicColor !== 'string' || isValidHexColor(body.basicColor))
  ) {
    res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
      code: RESPONSE_CODE.COLOR_INVALID,
      message: MESSAGE.COLOR_MESSAGE.BASIC_COLOR_IS_REQUIRED
    })
    return
  }

  if (
    body.colorType === ColorType.COLOR_GRADIENT_2 &&
    (!body.gradient2Color1 ||
      !body.gradient2Color2 ||
      typeof body.gradient2Color1 !== 'string' ||
      typeof body.gradient2Color2 !== 'string' ||
      !isValidHexColor(body.gradient2Color1) ||
      !isValidHexColor(body.gradient2Color2))
  ) {
    res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
      code: RESPONSE_CODE.COLOR_INVALID,
      message: MESSAGE.COLOR_MESSAGE.GRADIENT_2_COLOR_IS_REQUIRED
    })
    return
  }

  if (
    body.colorType === ColorType.COLOR_GRADIENT_3 &&
    (!body.gradient3Color1 ||
      !body.gradient3Color2 ||
      !body.gradient3Color3 ||
      typeof body.gradient3Color1 !== 'string' ||
      typeof body.gradient3Color2 !== 'string' ||
      typeof body.gradient3Color3 !== 'string' ||
      !isValidHexColor(body.gradient3Color1) ||
      !isValidHexColor(body.gradient3Color2) ||
      !isValidHexColor(body.gradient3Color3))
  ) {
    res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
      code: RESPONSE_CODE.COLOR_INVALID,
      message: MESSAGE.COLOR_MESSAGE.GRADIENT_3_COLOR_IS_REQUIRED
    })
    return
  }

  next()
}

export const colorTextValidator = (req: Request, res: Response, next: NextFunction) => {
  const body = req.body

  if (!body.textColorType) {
    res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
      code: RESPONSE_CODE.COLOR_INVALID,
      message: MESSAGE.COLOR_MESSAGE.COLOR_TYPE_IS_REQUIRED
    })
    return
  }

  if (
    body.textColorType === ColorType.COLOR_BASIC &&
    (!body.textBasicColor || typeof body.textBasicColor !== 'string' || isValidHexColor(body.textBasicColor))
  ) {
    res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
      code: RESPONSE_CODE.COLOR_INVALID,
      message: MESSAGE.COLOR_MESSAGE.BASIC_COLOR_IS_REQUIRED
    })
    return
  }

  if (
    body.textColorType === ColorType.COLOR_GRADIENT_2 &&
    (!body.textGradient2Color1 ||
      !body.textGradient2Color2 ||
      typeof body.textGradient2Color1 !== 'string' ||
      typeof body.textGradient2Color2 !== 'string' ||
      !isValidHexColor(body.textGradient2Color1) ||
      !isValidHexColor(body.textGradient2Color2))
  ) {
    res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
      code: RESPONSE_CODE.COLOR_INVALID,
      message: MESSAGE.COLOR_MESSAGE.GRADIENT_2_COLOR_IS_REQUIRED
    })
    return
  }

  if (
    body.textColorType === ColorType.COLOR_GRADIENT_3 &&
    (!body.textGradient3Color1 ||
      !body.textGradient3Color2 ||
      !body.textGradient3Color3 ||
      typeof body.textGradient3Color1 !== 'string' ||
      typeof body.textGradient3Color2 !== 'string' ||
      typeof body.textGradient3Color3 !== 'string' ||
      !isValidHexColor(body.textGradient3Color1) ||
      !isValidHexColor(body.textGradient3Color2) ||
      !isValidHexColor(body.textGradient3Color3))
  ) {
    res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).json({
      code: RESPONSE_CODE.COLOR_INVALID,
      message: MESSAGE.COLOR_MESSAGE.GRADIENT_3_COLOR_IS_REQUIRED
    })
    return
  }

  next()
}
