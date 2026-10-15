# Generation Failure Handling

If image generation fails:

- Show a clear error message.
- Preserve entered details when safe.
- Prevent accidental duplicate submissions.
- Avoid displaying a stale result as if it were newly generated.
- Allow retry after the cause is addressed.
- Keep internal error details out of the public interface.

Test failures at input validation, rendering, preview, and download stages.
