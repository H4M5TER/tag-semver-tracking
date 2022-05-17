import * as github from '@actions/github'
import * as core from '@actions/core'
import semver from 'semver'

const context: typeof github.context & { token?: string } = github.context
const { payload, repo, ref, sha, token } = context
const octokit = github.getOctokit(token)
// const { action, issue, milestone } = payload

async function updateRef(ref: string) {
  const resp = await octokit.rest.git.getRef({
    ...repo,
    ref: ref
  })
  if (resp.status === 200) {
    octokit.rest.git.updateRef({
      ...repo,
      ref: ref,
      sha: sha,
    })
  } else {
    octokit.rest.git.updateRef({
      ...repo,
      ref: ref,
      sha: sha
    })
  }

}

async function run() {
  if (!ref.includes('tags')) {
    core.info('invalid usage with a branch ref')
    return
  }
  const [, prefix = '', version] = ref.match(/refs\/tags\/(.*)(\d+\.\d+\.\d+)/)
  const major = 'tags/' + prefix + semver.major(version)
  const minor = 'tags/' + prefix + semver.minor(version)
  updateRef(major)
  updateRef(minor)
}

try {
  run()
} catch (error) {
  core.error(JSON.stringify(error))
}
