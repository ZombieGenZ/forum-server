export default class GeminiAIPrompt {
  static summary(content: string) {
    return `
      Dưới đây là nội dung của một bài viết được trình bày dưới dạng HTML.
      Hãy đọc và hiểu nội dung văn bản trong đoạn HTML này (bỏ qua các thẻ, mã script, và style nếu có).
      Sau đó, tóm tắt bài viết thành một đoạn mô tả ngắn gọn, súc tích, có độ dài từ 200 đến 300 từ.
      Chỉ trả về chuỗi văn bản, không bao gồm bất kỳ thẻ HTML nào.
      Viết bằng tiếng Việt, đảm bảo dễ hiểu, đúng trọng tâm và giữ lại các ý chính của bài viết.
      Nếu đoạn HTML không chứa nội dung nào, hãy trả về nội dung đó không kèm theo các thẻ HTML.

      nội dung HTML:
      ${content}
    `.trim()
  }
}
