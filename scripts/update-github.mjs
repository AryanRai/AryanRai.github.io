import fs from 'node:fs/promises'
const user = 'AryanRai'
const year = new Date().getUTCFullYear()
const path = 'public/data/github-activity.json'
const headers = {Accept:'application/vnd.github+json', 'User-Agent':'aryan-portfolio', ...(process.env.GH_TOKEN ? {Authorization:`Bearer ${process.env.GH_TOKEN}`} : {})}
async function api(path) {
 const response = await fetch(`https://api.github.com/${path}`, {headers})
 if(!response.ok) throw new Error(`GitHub ${response.status}: ${path}`)
 return response.json()
}
// Search only public commits: never publish private repository data.
const query = `author:${user} is:public committer-date:${year}-01-01..${year}-12-31`
let commits=[]
for(let page=1; ;page++) {
 const result=await api(`search/commits?q=${encodeURIComponent(query)}&per_page=100&page=${page}`)
 if(result.incomplete_results || result.total_count>1000) throw new Error('Incomplete search; preserve the last complete snapshot.')
 commits.push(...result.items)
 if(commits.length>=result.total_count) break
}
// A commit reachable in multiple repositories is counted once.
commits=[...new Map(commits.map(commit=>[commit.sha,commit])).values()]
let previous={}
try { previous=JSON.parse(await fs.readFile('scripts/github-stats-cache.json','utf8')) } catch {}
const cache={}
let next=0
await Promise.all(Array.from({length:5},async()=>{
 while(next<commits.length) {
  const commit=commits[next++]
  const stats=previous[commit.sha] || (await api(`repos/${commit.repository.full_name}/commits/${commit.sha}`)).stats
  if(!Number.isFinite(stats?.additions) || !Number.isFinite(stats?.deletions)) throw new Error('Missing commit statistics')
  cache[commit.sha]={additions:stats.additions,deletions:stats.deletions}
 }
}))
const values=Object.values(cache)
const snapshot={year,updatedAt:new Date().toISOString(),commits:commits.length,additions:values.reduce((n,v)=>n+v.additions,0),deletions:values.reduce((n,v)=>n+v.deletions,0),scope:'Public commits attributed to AryanRai and indexed by GitHub. Unique commit hashes; all file types, including generated files. Additions are cumulative changes, not unique lines or a measure of productivity.'}
await fs.mkdir('public/data',{recursive:true})
await fs.writeFile(path,JSON.stringify(snapshot,null,2)+'\n')
await fs.writeFile('scripts/github-stats-cache.json',JSON.stringify(cache)+'\n')
console.log(JSON.stringify(snapshot))
