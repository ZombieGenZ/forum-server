export interface CreatePostRequestBody {
  refresh_token: string
  title: string
  content: string
  topic_id: string
}

export interface UpdatePostRequestBody {
  refresh_token: string
  post_id: string
  title: string
  content: string
  topic_id: string
}

export interface DeletePostRequestBody {
  refresh_token: string
  post_id: string
}

export interface CheckEditPostRequestBody {
  refresh_token: string
  post_id: string
}
