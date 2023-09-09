# `github-discussion-toc`

A script to generate a table of contents for a GitHub discussion.

The script finds all comments that begin with a level 3 heading (`### My heading`) and adds a table of contents with links to those headings to the top of the discussion.

## CLI Usage

You need a [GitHub personal access token](https://github.com/settings/tokens/new?scopes=public_repo&description=github-discussion-toc) with the `public_repo` scope for public repositories or the `repo` scope for private repositories.

```
GITHUB_TOKEN="<personal access token>" npx github-discussion-toc <discussion-url>
```

## Module usage

```js
import addTocToGitHubDiscussion from "github-discussion-toc";
import { Octokit } from "octokit";

const myOctokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});
const myOwner = "octocat";
const myRepo = "hello-world";
const myDiscussionNumber = 123;

await addTocToGitHubDiscussion(myOctokit, myOwner, myRepo, myDiscussionNumber);
```

## License

[ISC](license.md)
