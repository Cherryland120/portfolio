const GITHUB_API = 'https://api.github.com';

function getHeaders() {
  return {
    Authorization: `token ${process.env.GITHUB_PAT}`,
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'portfolio-blog-cms',
  };
}

function getRepoBase() {
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
  return { repo, branch };
}

export async function getManifest() {
  const { repo, branch } = getRepoBase();
  const url = `${GITHUB_API}/repos/${repo}/contents/content/posts/manifest.json?ref=${branch}`;
  const res = await fetch(url, { headers: getHeaders() });
  if (res.status === 404) return { sha: null, posts: [] };
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const data = await res.json();
  const content = Buffer.from(data.content, 'base64').toString('utf-8');
  return { sha: data.sha, posts: JSON.parse(content) };
}

export async function saveManifest(posts, sha) {
  const { repo, branch } = getRepoBase();
  const url = `${GITHUB_API}/repos/${repo}/contents/content/posts/manifest.json`;
  const content = Buffer.from(JSON.stringify(posts, null, 2)).toString('base64');
  const body = { message: 'cms: update manifest', content, branch, ...(sha ? { sha } : {}) };
  const res = await fetch(url, { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`GitHub save manifest failed: ${JSON.stringify(err)}`);
  }
  return res.ok;
}

export async function getPostFile(slug) {
  const { repo, branch } = getRepoBase();
  const url = `${GITHUB_API}/repos/${repo}/contents/content/posts/${slug}.md?ref=${branch}`;
  const res = await fetch(url, { headers: getHeaders() });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const data = await res.json();
  const content = Buffer.from(data.content, 'base64').toString('utf-8');
  return { sha: data.sha, content };
}

export async function savePostFile(slug, content, sha, commitMsg) {
  const { repo, branch } = getRepoBase();
  const url = `${GITHUB_API}/repos/${repo}/contents/content/posts/${slug}.md`;
  const encoded = Buffer.from(content).toString('base64');
  const body = {
    message: commitMsg || `cms: save post "${slug}"`,
    content: encoded,
    branch,
    ...(sha ? { sha } : {}),
  };
  const res = await fetch(url, { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`GitHub save post failed: ${JSON.stringify(err)}`);
  }
  return true;
}

export async function deletePostFile(slug, sha) {
  const { repo, branch } = getRepoBase();
  const url = `${GITHUB_API}/repos/${repo}/contents/content/posts/${slug}.md`;
  const body = { message: `cms: delete post "${slug}"`, sha, branch };
  const res = await fetch(url, { method: 'DELETE', headers: getHeaders(), body: JSON.stringify(body) });
  return res.ok;
}
