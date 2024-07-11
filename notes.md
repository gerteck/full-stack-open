## Shortcuts for Productivity

**Create New Application**:

New Vite React App: 
```bash
# npm 7+, extra double-dash is needed:
npm create vite@latest <name> -- --template react
cd <name>
npm install
npm run dev
```

New npm package:
```bash
npm init
```

**User code Snippets**
* Config file is at `/.vscode/user.code-snippets`
```
log: console.log('');
rc: React Component
rce: React Class Component  
```

**JSON Server**
* Run on port 3001, `--watch` option looks for saved changes to db.json.
```
npm install json-server --save-dev

json-server --port 3001 --watch db.json
```

Add into `package.json` for `scripts`
```
{
  // ... 
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "server": "json-server -p3001 --watch db.json"
  },
}
```

**Dependencies**
* E.g. installing `axios`:
```
npm install axios
```
* run cli command in root directory of project