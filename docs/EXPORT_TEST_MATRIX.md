# Export Test Matrix

| Scenario | Expected check |
|---|---|
| Default input | Export opens and contains expected content |
| Long text | Text remains readable without clipping |
| Missing optional field | Layout remains valid |
| Unsupported image | Clear validation error |
| Invalid filename input | Safe filename is generated |
| Export failure | Failure is reported accurately |

Run these checks against the actual export implementation before marking them complete.