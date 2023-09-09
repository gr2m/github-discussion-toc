# `github-discussion-toc`

A script to generate a table of contents for a GitHub discussion.

The script finds all comments that begin with a level 3 heading (`### My heading`) and adds a table of contents with links to those headings to the top of the discussion.

## Usage

You need a [GitHub personal access token](https://github.com/settings/tokens/new?scopes=public_repo&description=github-discussion-toc) with the `public_repo` scope for public repositories or the `repo` scope for private repositories.

```
GITHUB_TOKEN="<personal access token>" npx github-discussion-toc <discussion-url>
```

## License

[ISC](license.md)
