"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginConfirmationEmail = void 0;
const loginConfirmationEmail = (name, code) => `
<body>
  <p>Hello ${name},</p>
  <br />
  <p>Welcome back to [Your app],</p>
  <p>
    Here's your login code:
    <b>${code}</b>
  </p>
  <p>
    <small>This code will expire in 5 minutes.</small>
  </p>
  <br />
  <p>Best regards,</p>
  <p>[Your app] Team</p>
</body>
`;
exports.loginConfirmationEmail = loginConfirmationEmail;
//# sourceMappingURL=login-confirmation.js.map