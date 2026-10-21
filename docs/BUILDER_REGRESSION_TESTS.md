# Builder Regression Test Plan

After changing the builder, verify:

- default values render correctly,
- required fields reject empty input,
- long text does not overlap other elements,
- optional fields can be omitted safely,
- generated output matches the selected configuration,
- download output opens and has the expected file type,
- errors are visible and actionable.

Use representative synthetic data and verify the downloaded artifact, not just the preview.