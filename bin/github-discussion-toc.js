#!/usr/bin/env node

import main from "../index.js";

import Octokit from "../lib/octokit.js";

if (!process.env.GITHUB_TOKEN) {
  console.log("GITHUB_TOKEN is not set");
  process.exit(1);
}

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const discussionUrl = process.argv[2];
if (!discussionUrl) {
  console.log("Usage: npx github-discussion-toc <discussion-url>");
  process.exit(1);
}

const [, owner, repo, discussionNumber] =
  discussionUrl.match(
    /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/discussions\/(\d+)$/
  ) || [];

if (!owner || !repo || !discussionNumber) {
  console.log("Invalid discussion URL: %s", discussionUrl);
  process.exit(1);
}

main(octokit, "hearts", "team", 10).catch(console.log);
