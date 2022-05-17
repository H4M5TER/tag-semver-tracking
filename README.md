# Semantic Versioning Tag Tracking

Keep major (v1) and minor (v1.1) tags current to the latest appropriate patch (v1.1.3) tag.

## Usage

This action use itself to keep major and minor version refer to the latest patch.
Check `.github/workflows/build.yml` for detailed example.

```yaml
    - name: Tag Tracking
      uses: H4M5TER/tag-semver-tracking@v1
      with:
        tag: ${{ github.ref_name }}
        token: ${{ secrets.GITHUB_TOKEN }}
```

## Inputs

### `tag` *required*

Tag need to be synced. It should end with x.y.z format.

### token *required*

GitHub Token. Just use ${{ secrets.GITHUB_TOKEN }}

## More Context

GitHub suggested to maintain semver tag of action.
In <https://docs.github.com/en/actions/creating-actions/releasing-and-maintaining-actions>.

> We recommend creating releases using semantically versioned tags – for example, v1.1.3 – and keeping major (v1) and minor (v1.1) tags current to the latest appropriate commit.
> It also suggested to use [Build and Tag action](https://github.com/marketplace/actions/build-and-tag) to auto commit and update tag.

But I prefer to use [GitHub Pages Action](https://github.com/marketplace/actions/github-pages-action) so that I could put dist on a standalone branch and maybe contains more files. (I wanted to use source map but I can't send `--enable-source-maps` to node in action.yml.)
This is why I made this.
