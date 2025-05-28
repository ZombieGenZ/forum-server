export const isValidHexColor = (colorCode: string) => {
  const hexColorRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/
  return hexColorRegex.test(colorCode)
}
