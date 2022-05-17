# Semantic Versioning Tag Tracking

Keep tag vx and vx.y update with vx.y.z

## Usage

```yaml
name: Tag Tracking

on:
  push:
    branches:
    - 'dist'
    tags:
      - 'release/v*.*.*'

jobs:
  tag:
    runs-on: ubuntu-20.04
    steps:
      - uses: H4M5TER/tag-semver-tracking@v1
```
