import { Octokit } from "octokit";

export default Octokit.defaults({
  userAgent: "gr2m/github-discussion-toc",
});
