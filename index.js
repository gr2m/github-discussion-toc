// @ts-check

/**
 *
 * @param {import("octokit").Octokit} octokit
 * @param {string} owner
 * @param {string} repo
 * @param {number} discussionNumber
 */
export default async function main(octokit, owner, repo, discussionNumber) {
  const { repository } = await octokit.graphql.paginate(
    `
      query paginate($owner:String!,$repo:String!,$discussionNumber:Int!, $cursor: String) {
        repository(owner:$owner, name:$repo) {
          discussion(number:$discussionNumber) {
            id
            body
            url
            comments(first: 100, after: $cursor) {
              nodes {
                databaseId
                body
              }
              pageInfo {
                hasNextPage
                endCursor
              }
            }
          }
        }
      }
    `,
    {
      owner,
      repo,
      discussionNumber,
    }
  );

  const tocMarkdown = toTocMarkdown(repository.discussion.comments.nodes);
  const bodyWithNewToc = replaceToc(repository.discussion.body, tocMarkdown);

  await octokit.graphql(
    `
      mutation updateDiscussionBody($discusionId:ID!, $body:String!) {
        updateDiscussion(input:{discussionId:$discusionId, body:$body}) {
          clientMutationId
        }
      }
    `,
    {
      discusionId: repository.discussion.id,
      body: bodyWithNewToc,
    }
  );

  console.log("Updated discussion body at %s", repository.discussion.url);
}

function toTocMarkdown(nodes) {
  return nodes
    .map((node) => {
      const title = node.body.split("\n")[0].replace(/^#+/, "").trim();
      return `1. [${title}](#discussioncomment-${node.databaseId})`;
    })
    .join("\n");
}

/**
 * Finds a numbered list at the end of the body and replaces it with the new TOC
 *
 * @param {string} body
 * @param {string} newToc
 * @returns {string}
 */
function replaceToc(body, newToc) {
  const lines = body.split("\n");
  const listStartIndex = lines.findIndex((line) => /^1\. /.test(line));
  const bodyWithoutList = lines.slice(0, listStartIndex).join("\n").trim();

  return bodyWithoutList + "\n\n" + newToc;
}
