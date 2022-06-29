import * as core from "@actions/core";
import * as github from "@actions/github";

async function run(): Promise<void> {
  try {
    const octokit = github.getOctokit(process.env.GITHUB_TOKEN!);

    const label = core.getInput("label");
    const prsStr = core.getInput("prs");
    console.info(`Label: "${label}"`);
    console.info(`PRs: "${prsStr}"`);

    const prs = prsStr.split(",");
    if (prsStr.length === 0 || prs.length === 0) {
      console.info("no PRs found");
      return;
    }

    await Promise.all(
      prs.map((pr) => {
        octokit.rest.issues.addLabels({
          ...github.context.repo,
          issue_number: parseInt(pr),
          labels: [label],
        });
      })
    );
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
