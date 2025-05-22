export const convertUrl = (str: string) => {
  let result = str.toLowerCase()

  result = result.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  result = result.replace(/\s+/g, '-')
  result = result.replace(/[^a-z0-9-]/g, '')

  return result
}
