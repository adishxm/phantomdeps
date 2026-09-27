# TaskForge

TaskForge is a command-line task management service designed with JSON import/export, schema validation, and reporting. It acts as the validation target for PhantomDeps.

## Commands
- `taskforge create <title>`
- `taskforge list`
- `taskforge complete <id>`
- `taskforge import <path>`
- `taskforge report [--json]`

## Installation & Build
```bash
npm install --ignore-scripts
npm run build
npm test
```
