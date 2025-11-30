<<<<<<< HEAD
# Quick Start Guide

## Getting Started in 3 Steps

### Step 1: Install Dependencies

Open Command Prompt (cmd) or PowerShell and run:

```bash
npm install
```

**If you encounter errors on Windows:**
- Use Command Prompt (cmd) instead of PowerShell
- Or run `install.bat` by double-clicking it
- Or run this in PowerShell as Administrator:
  ```powershell
  Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
  npm install
  ```

### Step 2: Start the Development Server

```bash
npm run dev
```

You should see output like:
```
VITE v5.4.1  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 3: Open in Browser

Navigate to: **http://localhost:5173**

## Using the Application

### 1. Upload a Document
- Click the upload area or drag and drop a file
- Supported formats: PDF, DOCX
- Maximum size: 10 MB

### 2. Wait for Analysis
The system will automatically:
- ✓ Validate your file
- ✓ Extract text
- ✓ Detect clauses
- ✓ Assess risks
- ✓ Check compliance
- ✓ Calculate complexity
- ✓ Generate timeline
- ✓ Analyze costs
- ✓ Create summary

This typically takes 5-15 seconds depending on document size.

### 3. Explore Results

**Document Information**
- File name, size, and type

**Contract Summary**
- Purpose and key parties
- Contract length
- Payment highlights
- Top risks
- Key points

**Complexity Score**
- Overall score (0-100)
- Complexity label (Simple/Moderate/Complex)
- Detailed metrics

**Risk Assessment**
- High/Medium/Low risk counts
- Top high-risk items
- Color-coded visualization

**Clause List**
- All detected clauses
- Filter by category
- Expandable content
- 12 clause categories

**Compliance Findings**
- Missing or problematic clauses
- Severity levels
- Recommendations

## Example Documents

To test the application, you can use:
- Any PDF or DOCX contract you have
- Sample contracts from online legal resources
- Employment agreements
- Service agreements
- NDAs
- Lease agreements

## Troubleshooting

### "npm: command not found"
- Install Node.js from https://nodejs.org/
- Restart your terminal after installation

### "Cannot find module"
- Run `npm install` again
- Delete `node_modules` folder and `package-lock.json`, then run `npm install`

### "Port 5173 is already in use"
- Stop other Vite dev servers
- Or change the port in `vite.config.ts`

### File upload fails
- Check file size (must be < 10 MB)
- Check file format (must be PDF or DOCX)
- Try a different file

### Analysis takes too long
- Large documents (40-50 pages) may take 15-20 seconds
- Check browser console for errors (F12)

## Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

To preview the production build:
```bash
npm run preview
```

## Running Tests

```bash
npm test
```

For watch mode:
```bash
npm run test:watch
```

## Need Help?

- Check `README.md` for detailed documentation
- Check `PROJECT_SUMMARY.md` for implementation details
- Review the spec documents in `.kiro/specs/legal-contract-dashboard/`

## What's Next?

After getting the application running, you can:
1. Upload and analyze your own contracts
2. Explore the codebase in `src/`
3. Add new clause detection patterns
4. Customize risk assessment rules
5. Implement PDF export functionality
6. Add document comparison features
7. Write property-based tests

Enjoy analyzing contracts! 📄✨
=======
# Quick Start Guide

## Getting Started in 3 Steps

### Step 1: Install Dependencies

Open Command Prompt (cmd) or PowerShell and run:

```bash
npm install
```

**If you encounter errors on Windows:**
- Use Command Prompt (cmd) instead of PowerShell
- Or run `install.bat` by double-clicking it
- Or run this in PowerShell as Administrator:
  ```powershell
  Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
  npm install
  ```

### Step 2: Start the Development Server

```bash
npm run dev
```

You should see output like:
```
VITE v5.4.1  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 3: Open in Browser

Navigate to: **http://localhost:5173**

## Using the Application

### 1. Upload a Document
- Click the upload area or drag and drop a file
- Supported formats: PDF, DOCX
- Maximum size: 10 MB

### 2. Wait for Analysis
The system will automatically:
- ✓ Validate your file
- ✓ Extract text
- ✓ Detect clauses
- ✓ Assess risks
- ✓ Check compliance
- ✓ Calculate complexity
- ✓ Generate timeline
- ✓ Analyze costs
- ✓ Create summary

This typically takes 5-15 seconds depending on document size.

### 3. Explore Results

**Document Information**
- File name, size, and type

**Contract Summary**
- Purpose and key parties
- Contract length
- Payment highlights
- Top risks
- Key points

**Complexity Score**
- Overall score (0-100)
- Complexity label (Simple/Moderate/Complex)
- Detailed metrics

**Risk Assessment**
- High/Medium/Low risk counts
- Top high-risk items
- Color-coded visualization

**Clause List**
- All detected clauses
- Filter by category
- Expandable content
- 12 clause categories

**Compliance Findings**
- Missing or problematic clauses
- Severity levels
- Recommendations

## Example Documents

To test the application, you can use:
- Any PDF or DOCX contract you have
- Sample contracts from online legal resources
- Employment agreements
- Service agreements
- NDAs
- Lease agreements

## Troubleshooting

### "npm: command not found"
- Install Node.js from https://nodejs.org/
- Restart your terminal after installation

### "Cannot find module"
- Run `npm install` again
- Delete `node_modules` folder and `package-lock.json`, then run `npm install`

### "Port 5173 is already in use"
- Stop other Vite dev servers
- Or change the port in `vite.config.ts`

### File upload fails
- Check file size (must be < 10 MB)
- Check file format (must be PDF or DOCX)
- Try a different file

### Analysis takes too long
- Large documents (40-50 pages) may take 15-20 seconds
- Check browser console for errors (F12)

## Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

To preview the production build:
```bash
npm run preview
```

## Running Tests

```bash
npm test
```

For watch mode:
```bash
npm run test:watch
```

## Need Help?

- Check `README.md` for detailed documentation
- Check `PROJECT_SUMMARY.md` for implementation details
- Review the spec documents in `.kiro/specs/legal-contract-dashboard/`

## What's Next?

After getting the application running, you can:
1. Upload and analyze your own contracts
2. Explore the codebase in `src/`
3. Add new clause detection patterns
4. Customize risk assessment rules
5. Implement PDF export functionality
6. Add document comparison features
7. Write property-based tests

Enjoy analyzing contracts! 📄✨
>>>>>>> 4f8baf0415f89a52abfadc144972d03a757d5f82
