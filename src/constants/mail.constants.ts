export const MAIL = {
  WELCOME: {
    subject: `Chào mừng bạn đến với ${process.env.TRADEMARK_NAME}`,
    html: `
      <div style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <tr>
                  <td style="background-color: #2c3e50; padding: 20px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Chào mừng bạn đến với ${process.env.TRADEMARK_NAME}!</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px; text-align: center;">
                    <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 0 0 20px;">
                      Cảm ơn bạn đã tham gia <strong>${process.env.TRADEMARK_NAME}</strong> - cộng đồng thảo luận sôi động dành cho những người đam mê lập trình!
                    </p>
                    <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 0 0 20px;">
                      Tại ${process.env.TRADEMARK_NAME}, bạn sẽ tìm thấy các cuộc thảo luận chuyên sâu, chia sẻ kiến thức, và kết nối với những lập trình viên từ khắp nơi. Hãy bắt đầu bằng cách khám phá các chủ đề, đặt câu hỏi hoặc chia sẻ dự án của bạn!
                    </p>
                    <a href="${process.env.APP_URL}" style="display: inline-block; padding: 12px 24px; background-color: #3498db; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">
                      Khám phá Forum ngay
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #f4f4f4; padding: 20px; text-align: center;">
                    <p style="font-size: 14px; color: #666666; margin: 0 0 10px;">
                      Theo dõi chúng tôi trên:
                      <a href="${process.env.GITHUB_URL}" style="color: #3498db; text-decoration: none;">GitHub</a>
                    </p>
                    <p style="font-size: 14px; color: #666666; margin: 0;">
                      © ${new Date().getFullYear()} ${process.env.TRADEMARK_NAME}. Tất cả quyền được bảo lưu.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>`
  },
  VERIFY_ACCOUNT: (url: string) => ({
    subject: `Xác thực tài khoản ${process.env.TRADEMARK_NAME} của bạn`,
    html: `
    <div style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <tr>
                <td style="background-color: #2c3e50; padding: 20px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Xác thực tài khoản ${process.env.VERIFICATION_URL} của bạn</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 30px; text-align: center;">
                  <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 0 0 20px;">
                    Cảm ơn bạn đã đăng ký tài khoản tại <strong>${process.env.VERIFICATION_URL}</strong> - cộng đồng thảo luận sôi động dành cho những người đam mê lập trình!
                  </p>
                  <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 0 0 20px;">
                    Để hoàn tất quá trình đăng ký, vui lòng xác thực tài khoản của bạn bằng cách nhấn vào nút dưới đây:
                  </p>
                  <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #3498db; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">
                    Xác thực tài khoản
                  </a>
                  <p style="font-size: 14px; color: #666666; line-height: 1.6; margin: 20px 0 0;">
                    Nếu nút trên không hoạt động, bạn có thể sao chép và dán liên kết sau vào trình duyệt của mình: <br>
                    <a href="${process.env.url}" style="color: #3498db; text-decoration: none;">${process.env.url}</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td style="background-color: #f4f4f4; padding: 20px; text-align: center;">
                  <p style="font-size: 14px; color: #666666; margin: 0 0 10px;">
                    Theo dõi chúng tôi trên:
                    <a href="${process.env.GITHUB_URL}" style="color: #3498db; text-decoration: none;">GitHub</a>
                  </p>
                  <p style="font-size: 14px; color: #666666; margin: 0;">
                    © ${new Date().getFullYear()} ${process.env.TRADEMARK_NAME}. Tất cả quyền được bảo lưu.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>`
  })
}
