import postService from '~/services/posts.services'
import { convertUrl } from './string.utils'
import { randomNumber } from './random.utils'

export async function generateUrl(str: string, post_old_url?: string) {
  const firstUrl = convertUrl(str)

  if (post_old_url) {
    if (post_old_url === firstUrl) {
      return post_old_url
    }
  }

  if (!firstUrl || firstUrl.length === 0) {
    return randomNumber().toString()
  }

  if (!(await postService.checkUrl(firstUrl))) {
    return firstUrl
  }

  const secondUrl = firstUrl + `-${new Date().getFullYear()}`

  if (!(await postService.checkUrl(secondUrl))) {
    return secondUrl
  }

  const finalUrl = secondUrl + `-${randomNumber()}`

  return finalUrl
}
