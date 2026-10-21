# Image Upload Security

- Validate file size and allowed formats.
- Do not trust a filename or client-provided MIME type alone.
- Handle decode failures safely.
- Avoid storing uploaded files in executable locations.
- Use generated filenames when saving uploads.
- Do not log image contents or sensitive metadata.

Test corrupt files and files that exceed configured limits.