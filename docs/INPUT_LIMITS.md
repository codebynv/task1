# Input Limits

Define and validate reasonable limits for uploaded images and text fields.

- Reject unsupported file types.
- Handle oversized files with a clear message.
- Set sensible maximum lengths for names and roles.
- Keep validation consistent between client and server when a server exists.
- Avoid starting expensive rendering work for invalid input.

Document the actual supported limits in the interface when they are known.
