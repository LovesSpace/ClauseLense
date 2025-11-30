<<<<<<< HEAD
# Troubleshooting Guide

## Common Issues and Solutions

### Issue 1: PostCSS/Tailwind Error

**Error Message:**
```
Failed to load PostCSS config: Cannot find module 'tailwindcss'
```

**Solution:**
1. Make sure you're in the **root directory** (where `package.json` is located)
2. Run `npm install` to install all dependencies
3. If the error persists, delete `node_modules` folder and `package-lock.json`, then run `npm install` again

**Quick Fix:**
Run the `start-app.bat` file which will automatically install dependencies and start the server.

### Issue 2: Wrong Directory

**Problem:** You're in the nested `legal-contract-dashboard` directory instead of the root.

**Solution:**
```cmd
cd ..
```
Then run `npm install` and `npm run dev` from the root directory.

### Issue 3: PowerShell Execution Policy

**Error Message:**
```
cannot be loaded because running scripts is disabled on this system
```

**Solution:**
Use Command Prompt (cmd) instead of PowerShell:
1. Press `Win + R`
2. Type `cmd`
3. Navigate to project directory
4. Run commands

**Alternative:**
Run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### Issue 4: Port Already in Use

**Error Message:**
```
Port 5173 is already in use
```

**Solution:**
1. Stop other Vite dev servers
2. Or kill the process using port 5173:
```cmd
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F
```

### Issue 5: npm Command Not Found

**Error Message:**
```
'npm' is not recognized as an internal or external command
```

**Solution:**
1. Install Node.js from https://nodejs.org/
2. Restart your terminal/command prompt
3. Verify installation: `node --version` and `npm --version`

### Issue 6: Module Not Found Errors

**Error Message:**
```
Cannot find module 'react' or 'pdfjs-dist' etc.
```

**Solution:**
```cmd
npm install
```

If that doesn't work:
```cmd
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Issue 7: File Upload Fails

**Problem:** Cannot upload PDF or DOCX files

**Possible Causes:**
1. File is too large (> 10MB)
2. File is corrupted
3. File is not actually PDF/DOCX

**Solution:**
- Check file size
- Try a different file
- Check browser console (F12) for error messages

### Issue 8: Analysis Takes Too Long

**Problem:** Document processing seems stuck

**Solution:**
- Large documents (40-50 pages) can take 15-20 seconds
- Check browser console for errors
- Try a smaller document first
- Refresh the page and try again

### Issue 9: Blank Screen

**Problem:** Application loads but shows nothing

**Solution:**
1. Check browser console (F12) for errors
2. Make sure all dependencies are installed: `npm install`
3. Clear browser cache
4. Try a different browser

### Issue 10: TypeScript Errors

**Error Message:**
```
TS2307: Cannot find module or its corresponding type declarations
```

**Solution:**
```cmd
npm install --save-dev @types/react @types/react-dom
```

## Step-by-Step Fresh Start

If nothing works, try this complete reset:

1. **Close all terminals and browsers**

2. **Delete these if they exist:**
   - `node_modules` folder
   - `package-lock.json` file
   - `.vite` folder (if exists)

3. **Open Command Prompt (cmd) as Administrator**

4. **Navigate to project directory:**
   ```cmd
   cd C:\Users\Jyoti\OneDrive\Desktop\clause_lens
   ```

5. **Install dependencies:**
   ```cmd
   npm install
   ```

6. **Start the server:**
   ```cmd
   npm run dev
   ```

7. **Open browser:**
   ```
   http://localhost:5173
   ```

## Checking Your Setup

Run these commands to verify your environment:

```cmd
node --version
npm --version
cd
dir package.json
```

Expected output:
- Node version: v18.x.x or higher
- npm version: 9.x.x or higher
- Current directory should contain `package.json`

## Getting Help

If you're still having issues:

1. Check the error message in the terminal
2. Check the browser console (F12 → Console tab)
3. Look for similar errors in the documentation
4. Make sure you're in the correct directory (root, not nested)

## Quick Commands Reference

```cmd
REM Check if you're in the right directory
dir package.json

REM Install dependencies
npm install

REM Start development server
npm run dev

REM Build for production
npm run build

REM Run tests
npm test

REM Clean install
rmdir /s /q node_modules
del package-lock.json
npm install
```

## Directory Structure Check

Your directory should look like this:

```
clause_lens/                    ← You should be HERE
├── src/
│   ├── components/
│   ├── services/
│   ├── store/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── node_modules/              ← Created after npm install
├── package.json               ← Must exist
├── vite.config.ts
├── tsconfig.json
└── README.md
```

NOT here:
```
clause_lens/
└── legal-contract-dashboard/  ← NOT here!
    └── ...
```

## Still Not Working?

Try the automated startup script:
```cmd
start-app.bat
```

This will automatically:
1. Check for dependencies
2. Install if needed
3. Start the development server
=======
# Troubleshooting Guide

## Common Issues and Solutions

### Issue 1: PostCSS/Tailwind Error

**Error Message:**
```
Failed to load PostCSS config: Cannot find module 'tailwindcss'
```

**Solution:**
1. Make sure you're in the **root directory** (where `package.json` is located)
2. Run `npm install` to install all dependencies
3. If the error persists, delete `node_modules` folder and `package-lock.json`, then run `npm install` again

**Quick Fix:**
Run the `start-app.bat` file which will automatically install dependencies and start the server.

### Issue 2: Wrong Directory

**Problem:** You're in the nested `legal-contract-dashboard` directory instead of the root.

**Solution:**
```cmd
cd ..
```
Then run `npm install` and `npm run dev` from the root directory.

### Issue 3: PowerShell Execution Policy

**Error Message:**
```
cannot be loaded because running scripts is disabled on this system
```

**Solution:**
Use Command Prompt (cmd) instead of PowerShell:
1. Press `Win + R`
2. Type `cmd`
3. Navigate to project directory
4. Run commands

**Alternative:**
Run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### Issue 4: Port Already in Use

**Error Message:**
```
Port 5173 is already in use
```

**Solution:**
1. Stop other Vite dev servers
2. Or kill the process using port 5173:
```cmd
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F
```

### Issue 5: npm Command Not Found

**Error Message:**
```
'npm' is not recognized as an internal or external command
```

**Solution:**
1. Install Node.js from https://nodejs.org/
2. Restart your terminal/command prompt
3. Verify installation: `node --version` and `npm --version`

### Issue 6: Module Not Found Errors

**Error Message:**
```
Cannot find module 'react' or 'pdfjs-dist' etc.
```

**Solution:**
```cmd
npm install
```

If that doesn't work:
```cmd
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Issue 7: File Upload Fails

**Problem:** Cannot upload PDF or DOCX files

**Possible Causes:**
1. File is too large (> 10MB)
2. File is corrupted
3. File is not actually PDF/DOCX

**Solution:**
- Check file size
- Try a different file
- Check browser console (F12) for error messages

### Issue 8: Analysis Takes Too Long

**Problem:** Document processing seems stuck

**Solution:**
- Large documents (40-50 pages) can take 15-20 seconds
- Check browser console for errors
- Try a smaller document first
- Refresh the page and try again

### Issue 9: Blank Screen

**Problem:** Application loads but shows nothing

**Solution:**
1. Check browser console (F12) for errors
2. Make sure all dependencies are installed: `npm install`
3. Clear browser cache
4. Try a different browser

### Issue 10: TypeScript Errors

**Error Message:**
```
TS2307: Cannot find module or its corresponding type declarations
```

**Solution:**
```cmd
npm install --save-dev @types/react @types/react-dom
```

## Step-by-Step Fresh Start

If nothing works, try this complete reset:

1. **Close all terminals and browsers**

2. **Delete these if they exist:**
   - `node_modules` folder
   - `package-lock.json` file
   - `.vite` folder (if exists)

3. **Open Command Prompt (cmd) as Administrator**

4. **Navigate to project directory:**
   ```cmd
   cd C:\Users\Jyoti\OneDrive\Desktop\clause_lens
   ```

5. **Install dependencies:**
   ```cmd
   npm install
   ```

6. **Start the server:**
   ```cmd
   npm run dev
   ```

7. **Open browser:**
   ```
   http://localhost:5173
   ```

## Checking Your Setup

Run these commands to verify your environment:

```cmd
node --version
npm --version
cd
dir package.json
```

Expected output:
- Node version: v18.x.x or higher
- npm version: 9.x.x or higher
- Current directory should contain `package.json`

## Getting Help

If you're still having issues:

1. Check the error message in the terminal
2. Check the browser console (F12 → Console tab)
3. Look for similar errors in the documentation
4. Make sure you're in the correct directory (root, not nested)

## Quick Commands Reference

```cmd
REM Check if you're in the right directory
dir package.json

REM Install dependencies
npm install

REM Start development server
npm run dev

REM Build for production
npm run build

REM Run tests
npm test

REM Clean install
rmdir /s /q node_modules
del package-lock.json
npm install
```

## Directory Structure Check

Your directory should look like this:

```
clause_lens/                    ← You should be HERE
├── src/
│   ├── components/
│   ├── services/
│   ├── store/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── node_modules/              ← Created after npm install
├── package.json               ← Must exist
├── vite.config.ts
├── tsconfig.json
└── README.md
```

NOT here:
```
clause_lens/
└── legal-contract-dashboard/  ← NOT here!
    └── ...
```

## Still Not Working?

Try the automated startup script:
```cmd
start-app.bat
```

This will automatically:
1. Check for dependencies
2. Install if needed
3. Start the development server
>>>>>>> 4f8baf0415f89a52abfadc144972d03a757d5f82
