"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordResetEmail = void 0;
const passwordResetEmail = (name, link) => `
<body>
  <p>Hello ${name},</p>
  <br />
  <p>Your password reset link:
    <b><a href='${link}' target='_blank'>here</a></b></p>
  <p>Or go to this link: ${link}</p>
  <p><small>This link will expire in 30 minutes.</small></p>
  <br />
  <p>Best regards,</p>
  <p>[Your app] Team</p>
</body>
`;
exports.passwordResetEmail = passwordResetEmail;
//# sourceMappingURL=password-reset.js.map