# Input Validation

Validate builder inputs before rendering an image.

- Trim required text fields and reject empty values.
- Apply sensible limits to long names and descriptions.
- Validate image files and supported formats.
- Handle missing optional fields consistently.
- Show field-specific errors and preserve safe input after failure.

Keep client-side validation for usability and repeat important checks on the server when one is involved.
