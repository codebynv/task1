# Task 1 Test Cases

## Input validation

| Case | Expected result |
|---|---|
| Valid photo + name + role | Builder ID generates |
| Missing photo | Clear validation message |
| Missing name | Clear validation message |
| Missing role | Clear validation message |
| Very long name | Layout remains readable |
| Unsupported image | Graceful error |

## Team Frame

| Case | Expected result |
|---|---|
| Two builders | Team Frame generates |
| Three builders | Team Frame generates |
| Missing builder photo | Clear validation |
| Long builder names | Text remains within layout |

## Output

- [ ] PNG downloads successfully.
- [ ] Generated image is visually complete.
- [ ] Mobile layout remains usable.
- [ ] X sharing includes #FrameInGoa.
