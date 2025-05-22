export interface CreatePostRequestBody {
  refresh_token: string
  title: string
  content: string
  can_comment: boolean
}

export interface UpdatePostRequestBody {
  refresh_token: string
  post_id: string
  title: string
  content: string
  can_comment: boolean
}

export interface DeletePostRequestBody {
  refresh_token: string
  post_id: string
}
