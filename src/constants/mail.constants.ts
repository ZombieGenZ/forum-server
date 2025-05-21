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
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Chào mừng bạn đến với diển đàn ${process.env.TRADEMARK_NAME}!</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px; text-align: center;">
                    <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 0 0 20px;">
                      Cảm ơn bạn đã tham gia <strong>${process.env.TRADEMARK_NAME}</strong> - cộng đồng thảo luận sôi động dành cho những người đam mê lập trình!
                    </p>
                    <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 0 0 20px;">
                      Tại diển đàn, bạn sẽ tìm thấy các cuộc thảo luận chuyên sâu, chia sẻ kiến thức, và kết nối với những lập trình viên từ khắp nơi. Hãy bắt đầu bằng cách khám phá các chủ đề, đặt câu hỏi hoặc chia sẻ dự án của bạn!
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
  }),
  FORGOT_PASSWORD: (url: string) => ({
    subject: `Yêu cầu đặt lại mật khẩu - ${process.env.TRADEMARK_NAME}`,
    html: `
      <div style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <tr>
                  <td style="background-color: #2c3e50; padding: 20px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Đặt lại mật khẩu tài khoản ${process.env.TRADEMARK_NAME}</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px; text-align: center;">
                    <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 0 0 20px;">
                      Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình trên <strong>${process.env.TRADEMARK_NAME}</strong> - cộng đồng thảo luận sôi động dành cho những người đam mê lập trình.
                    </p>
                    <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 0 0 20px;">
                      Vui lòng nhấp vào nút dưới đây để xác thực tài khoản và đặt lại mật khẩu. Liên kết này sẽ hết hạn sau <strong>12 tiếng</strong>.
                    </p>
                    <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #3498db; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">
                      Đặt lại mật khẩu
                    </a>
                    <p style="font-size: 14px; color: #666666; line-height: 1.6; margin: 20px 0 0;">
                      Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này. Tài khoản của bạn vẫn an toàn.
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
  }),
  CHANGE_PASSWORD: (time: string, location: string, ip: string, browser: string, os: string) => ({
    subject: `Thông Báo Thay Đổi Mật Khẩu - ${process.env.TRADEMARK_NAME}`,
    html: `
      <div style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <tr>
                  <td style="background-color: #2c3e50; padding: 20px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Thông Báo Thay Đổi Mật Khẩu</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px; text-align: left;">
                    <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 0 0 20px;">
                      Chào bạn,
                    </p>
                    <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 0 0 20px;">
                      Mật khẩu tài khoản <strong>${process.env.TRADEMARK_NAME}</strong> của bạn đã được thay đổi. Dưới đây là thông tin chi tiết về hoạt động này:
                    </p>
                    <ul style="font-size: 16px; color: #333333; line-height: 1.6; margin: 0 0 20px; padding-left: 20px;">
                      <li><strong>Thời gian:</strong> ${time}</li>  
                      <li><strong>Địa điểm:</strong> ${location}</li>
                      <li><strong>Địa chỉ IP:</strong> ${ip}</li>
                      <li><strong>Trình duyệt:</strong> ${browser}</li>
                      <li><strong>Hệ điều hành:</strong> ${os}</li>
                    </ul>
                    <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 0 0 20px;">
                      Nếu bạn thực hiện thay đổi này, bạn không cần làm gì thêm. Nếu bạn không thực hiện thay đổi này, vui lòng bảo mật tài khoản của bạn ngay lập tức bằng cách <a href="${process.env.APP_URL}/forgot-password" style="color: #3498db; text-decoration: none;">đặt lại mật khẩu</a> và liên hệ với chúng tôi.
                    </p>
                    <p style="font-size: 16px; color: #333333; line-height: 1.6; margin: 0 0 20px;">
                      <strong>${process.env.TRADEMARK_NAME}</strong> là nơi kết nối các lập trình viên, chia sẻ kiến thức và thảo luận về lập trình. Hãy tiếp tục khám phá và tham gia các cuộc thảo luận sôi động!
                    </p>
                    <a href="${process.env.APP_URL}" style="display: inline-block; padding: 12px 24px; background-color: #3498db; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">
                      Truy cập ${process.env.TRADEMARK_NAME}
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
  })
}
