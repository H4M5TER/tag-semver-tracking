import * as github from '@actions/github'
import * as core from '@actions/core'
import semver from 'semver'

const getRequiredInput = (name: string) => core.getInput(name, { required: true })
const tag = getRequiredInput('tag')
const token = getRequiredInput('token')

const { repo } = github.context
const octokit = github.getOctokit(token)

function updateRef(ref: string, sha: string) {
  octokit.rest.git.getRef({
    ...repo,
    ref: ref
  }).then(() => {
    // if 200
    octokit.rest.git.updateRef({
      ...repo,
      ref: ref,
      sha: sha,
    })
  }).catch((e) => {
    if (e.status !== 404) {
      throw e
    }
    octokit.rest.git.createRef({
      ...repo,
      ref: ref,
      sha: sha
    })
  })
}

async function run() {
  if (!tag)
    return
  const [, prefix = '', version, minor, major] = tag.match(/(.*)(((\d+)\.\d+)\.\d+)/)
  if (!version)
    return
  const resp = await octokit.rest.git.getRef({
    ...repo,
    ref: 'tags/' + tag
  })
  const { sha } = resp.data.object
  updateRef('refs/tags/' + prefix + major, sha)
  updateRef('refs/tags/' + prefix + minor, sha)
}

try {
  run()
} catch (error) {
  core.error(JSON.stringify(error))
}
