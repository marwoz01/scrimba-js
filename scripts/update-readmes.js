import { readdirSync, existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

const user = 'marwoz01';
const repo = 'scrimba-js';
const base = `https://${user}.github.io/${repo}/projects/`;

const projectsDir = 'projects';
const readmeNames = [
  'README.md','Readme.md','README.MD','Readme.MD',
  'readme.md','readme','Readme','README'
];

const projects = readdirSync(projectsDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

let changed = 0, skipped = 0;

projects.forEach(name => {
  const url = base + encodeURIComponent(name) + '/';
  const dir = path.join(projectsDir, name);
  const readmePath = readmeNames
    .map(n => path.join(dir, n))
    .find(p => existsSync(p));

  if (!readmePath) { skipped++; return; }

  let txt = readFileSync(readmePath, 'utf8');

  // 1) Podmień dowolny poprzedni link do github.io na poprawny
  const ghIoRe = /https?:\/\/[a-z0-9-]+\.github\.io\/[^\s)\]]+/ig;
  txt = txt.replace(ghIoRe, url);

  // 2) Jeśli nie ma wprost sekcji "Live demo", dodaj ją na górze
  if (!/\*\*Live demo:\*\*/i.test(txt)) {
    txt = `**Live demo:** ${url}\n\n` + txt;
  }

  writeFileSync(readmePath, txt);
  changed++;
  console.log('Updated:', readmePath, '->', url);
});

console.log(`Done. Changed ${changed}, skipped (no README) ${skipped}.`);
