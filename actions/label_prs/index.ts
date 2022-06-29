import core from "@actions/core";
import github from "@actions/github";

try {
  // `who-to-greet` input defined in action metadata file
  const label = core.getInput("label");
  const prs = core.getInput("prs");
  console.log(`Label: "${label}"`);
  console.log(`PRs: "${prs}"`);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
