export interface CreateCommentRequestBody {
  post_id: string
  content: string
}

export interface UpdateCommentRequestBody {
  comment_id: string
  content: string
}

export interface DeleteCommentRequestBody {
  comment_id: string
}

export interface GetCommentRequestBody {
  post_id: string
}
