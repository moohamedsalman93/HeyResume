import handler from './api/compile.js';

const preData = {
  selectedTemplate: 1,
  basics: { name: 'Test User', email: 'test@example.com', phone: '123', address: 'Somewhere', website: 'example.com', summary: 'Summary text' },
  education: [],
  work: [],
  skills: [],
  projects: [],
  awards: [],
  headings: { education: 'Education', work: 'Experience', skills: 'Skills', projects: 'Projects', awards: 'Awards' },
  sections: ['profile', 'education', 'work', 'skills', 'projects', 'awards']
};

const req = { method: 'POST', body: preData };
const fs = await import('fs');

const res = {
  statusCode: 200,
  headers: {},
  status(code) { this.statusCode = code; return this; },
  setHeader(k, v) { this.headers[k] = v; },
  json(obj) { console.log('json', obj); },
  send(data) { fs.writeFileSync('test-output.pdf', data); console.log('wrote pdf bytes', data?.length, 'headers', this.headers); },
};

await handler(req, res);
