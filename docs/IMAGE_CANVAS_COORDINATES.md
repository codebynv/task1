# Image Canvas Coordinate Checks

When placing text or images on a generated canvas, verify:

- the coordinate origin and axis directions,
- scaling between preview and export,
- behavior when source images have different aspect ratios,
- clipping at canvas boundaries,
- text wrapping and font fallback,
- consistent output dimensions.

Use a small set of known dimensions and compare the exported image with expected placement. Avoid assuming preview coordinates map directly to export pixels.