# Error States

The Builder ID flow should explain failures in plain language.

- Missing photo: ask the user to upload an image.
- Missing required details: identify the field that needs attention.
- Unsupported image: explain which formats are accepted.
- Generation failure: allow a safe retry without losing entered details.
- Download failure: keep the preview available when possible.

Avoid displaying raw stack traces or internal service errors.
