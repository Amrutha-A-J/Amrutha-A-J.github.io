#!/usr/bin/env node
// Regenerates the downloadable resume PDF from public/assets/files/json/resumeData.json.
// Run with: npm run resume:pdf

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_PATH = path.join(ROOT, 'public/assets/files/json/resumeData.json');
const OUTPUT_PATH = path.join(ROOT, 'public/assets/files/pdf/Amrutha_Adiyath_Resume.pdf');

const ICONS = {
    home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
};

const icon = (name) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`;

const STATE_ABBR = {
    Saskatchewan: 'SK',
    Alberta: 'AB',
    'British Columbia': 'BC',
    Manitoba: 'MB',
    Ontario: 'ON',
    Quebec: 'QC',
};

const escapeHtml = (str = '') =>
    str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const stripUrl = (url = '') => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

const monthDiff = (from, to) => (to.getMonth() - from.getMonth() + 12 * (to.getFullYear() - from.getFullYear())) / 12;

function buildHtml(data) {
    const { main, resume } = data;
    const { education, work, skills, volunteer, certifications } = resume;

    const experience = Math.round(monthDiff(new Date(2018, 3), new Date()));
    const summary = escapeHtml(main.description.replace('{{EXPERIENCE}}', experience.toString()));

    const stateAbbr = STATE_ABBR[main.address.state] || main.address.state;
    const addressLine = `${escapeHtml(main.address.city)}, ${escapeHtml(stateAbbr)} ${escapeHtml(main.address.zip)}`;

    const findSocial = (name) => main.social.find((s) => s.name === name)?.url ?? '';

    const workHtml = work
        .map((job) => {
            const bullets = job.bullets && job.bullets.length ? job.bullets : [job.description];
            return `
      <div class="entry">
        <div class="entry-meta">
          <h3>${escapeHtml(job.title)}</h3>
          <p class="org">${escapeHtml(job.company)}</p>
          <p class="date">${escapeHtml(job.years)}</p>
        </div>
        <ul class="bullets">
          ${bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}
        </ul>
      </div>`;
        })
        .join('');

    const skillsByCategory = skills.reduce((acc, skill) => {
        const category = skill.category || 'Other';
        (acc[category] ??= []).push(skill.name);
        return acc;
    }, {});
    const categoryOrder = ['Language', 'Library', 'Framework', 'Database', 'Tool', 'Other'];
    const pluralize = (category) => (category.endsWith('y') ? `${category.slice(0, -1)}ies` : `${category}s`);
    const skillsHtml = Object.keys(skillsByCategory)
        .sort((a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b))
        .map(
            (category) => `
      <p class="skill-line"><span class="skill-category">${escapeHtml(pluralize(category))}:</span> ${skillsByCategory[
                category
            ]
                .map(escapeHtml)
                .join(', ')}</p>`
        )
        .join('');

    const educationHtml = education
        .map(
            (edu) => `
      <div class="entry">
        <div class="entry-meta">
          <h3>${escapeHtml(edu.degree)}</h3>
          <p class="date">${escapeHtml(edu.graduated)}</p>
          <p class="org">${escapeHtml(edu.school)}</p>
        </div>
      </div>`
        )
        .join('');

    const certificationsHtml = certifications
        .map(
            (cert) => `
      <div class="entry">
        <div class="entry-meta">
          <h3>${escapeHtml(cert.name)}</h3>
          <p class="date">${escapeHtml(cert.year)}</p>
        </div>
        <p class="cert-desc">${escapeHtml(cert.description)}</p>
      </div>`
        )
        .join('');

    const volunteerHtml = volunteer
        .map(
            (vol) => `
      <div class="entry">
        <div class="entry-meta">
          <h3>${escapeHtml(vol.role)}</h3>
          <p class="org">${escapeHtml(vol.organization)}</p>
          <p class="date">${escapeHtml(vol.year)}</p>
        </div>
        <p class="cert-desc">${escapeHtml(vol.description)}</p>
      </div>`
        )
        .join('');

    return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  :root {
    --plum: #402036;
    --plum-dark: #24121f;
    --gold: #c69a5f;
    --text: #201c1e;
    --muted: #6b6067;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    color: var(--text);
    font-size: 10.5px;
    line-height: 1.5;
  }
  header.banner {
    background: var(--plum);
    color: #fff;
    padding: 26px 40px 20px;
  }
  header.banner h1 {
    margin: 0;
    font-size: 26px;
    font-weight: 700;
    letter-spacing: 0.01em;
  }
  header.banner .occupation {
    margin: 2px 0 12px;
    color: var(--gold);
    font-size: 13px;
    font-weight: 600;
  }
  header.banner .summary {
    margin: 0;
    font-size: 10px;
    line-height: 1.6;
    color: #ece6ea;
    max-width: 720px;
  }
  .contact-bar {
    background: var(--plum-dark);
    color: #fff;
    padding: 12px 40px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px 24px;
    font-size: 9.5px;
  }
  .contact-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .contact-item svg {
    width: 12px;
    height: 12px;
    color: var(--gold);
    flex-shrink: 0;
  }
  main.body {
    padding: 22px 40px 30px;
    column-count: 2;
    column-gap: 34px;
  }
  section { margin-bottom: 16px; }
  .section-title {
    color: var(--gold);
    text-transform: uppercase;
    font-weight: 700;
    font-size: 11.5px;
    letter-spacing: 0.05em;
    margin: 0 0 10px;
    padding-bottom: 4px;
    border-bottom: 2px solid var(--gold);
    break-after: avoid;
    break-inside: avoid;
  }
  .entry { margin-bottom: 12px; }
  .entry-meta { break-inside: avoid; }
  .entry h3 {
    margin: 0;
    font-size: 10.5px;
    font-weight: 700;
  }
  .entry .org {
    margin: 1px 0;
    font-size: 10px;
    color: var(--text);
  }
  .entry .date {
    margin: 1px 0 5px;
    font-size: 9.5px;
    font-weight: 700;
    color: var(--gold);
  }
  ul.bullets {
    margin: 0;
    padding-left: 14px;
  }
  ul.bullets li {
    margin-bottom: 4px;
    font-size: 10px;
    line-height: 1.45;
  }
  .skill-line {
    margin: 0 0 8px;
    font-size: 10px;
    line-height: 1.5;
  }
  .skill-category {
    font-weight: 700;
  }
  .cert-desc {
    margin: 0;
    font-size: 10px;
    color: var(--muted);
  }
</style>
</head>
<body>
  <header class="banner">
    <h1>${escapeHtml(main.name)}</h1>
    <p class="occupation">${escapeHtml(main.occupation)}</p>
    <p class="summary">${summary}</p>
  </header>
  <div class="contact-bar">
    <div class="contact-item">${icon('home')}<span>${addressLine}</span></div>
    <div class="contact-item">${icon('phone')}<span>${escapeHtml(main.phone)}</span></div>
    <div class="contact-item">${icon('mail')}<span>${escapeHtml(main.email)}</span></div>
    <div class="contact-item">${icon('linkedin')}<span>${escapeHtml(stripUrl(findSocial('linkedin')))}</span></div>
    <div class="contact-item">${icon('globe')}<span>${escapeHtml(stripUrl(main.website))}</span></div>
    <div class="contact-item">${icon('github')}<span>${escapeHtml(stripUrl(findSocial('github')))}</span></div>
  </div>
  <main class="body">
    <section>
      <h2 class="section-title">Work Experience</h2>
      ${workHtml}
    </section>
    <section>
      <h2 class="section-title">Skills</h2>
      ${skillsHtml}
    </section>
    <section>
      <h2 class="section-title">Education</h2>
      ${educationHtml}
    </section>
    <section>
      <h2 class="section-title">Certifications</h2>
      ${certificationsHtml}
    </section>
    <section>
      <h2 class="section-title">Volunteer Experience</h2>
      ${volunteerHtml}
    </section>
    <section>
      <h2 class="section-title">References</h2>
      <p class="cert-desc">Available on Request</p>
    </section>
  </main>
</body>
</html>`;
}

async function main() {
    const raw = await readFile(DATA_PATH, 'utf-8');
    const data = JSON.parse(raw);
    const html = buildHtml(data);

    const browser = await puppeteer.launch({ headless: true });
    try {
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });
        await page.pdf({
            path: OUTPUT_PATH,
            format: 'Letter',
            printBackground: true,
            margin: { top: 0, bottom: 0, left: 0, right: 0 },
        });
    } finally {
        await browser.close();
    }

    console.log(`Resume PDF written to ${path.relative(ROOT, OUTPUT_PATH)}`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
