# Legal Contract Dashboard

A web-based application that allows users to upload legal documents (PDF/DOCX) and receive automated analysis including simplified summaries, visual representations of key contract elements, risk assessments, and compliance checks.

## Features

- **Document Upload & Extraction**: Support for PDF and DOCX files (max 10 MB)
- **Clause Detection**: Automatically identifies and categorizes contract clauses
- **Quick Summary**: 60-second overview of contract key points
- **Timeline Visualization**: Visual representation of contract duration and milestones
- **Risk Assessment**: Color-coded risk levels for contract clauses
- **Cost Breakdown**: Visual charts showing financial obligations
- **Compliance Checker**: Validates presence of critical clauses
- **Document Comparison**: Compare two contract versions with diff view
- **Complexity Score**: Rates contract complexity (0-100)
- **Interactive Dashboard**: Modern, responsive UI with filtering and search
- **PDF Export**: Download comprehensive summary reports

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Steps

1. Install dependencies:
```bash
npm install
```

**Note for Windows users**: If you encounter PowerShell execution policy errors, you can:
- Run the command in Command Prompt (cmd) instead of PowerShell
- Or run: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` in PowerShell (as Administrator)
- Or use the provided `install.bat` file

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

4. Build for production:
```bash
npm run build
```

The production build will be in the `dist/` directory.

## Usage

1. Open the application in your browser
2. Upload a legal document (PDF or DOCX format, max 10MB).
3. Select the file: **rental_agreement.docx**
4. Wait for the automated analysis to complete
5. Explore the interactive dashboard with:
   - Key insights and summary cards
   - Risk assessment visualization
   - Cost breakdown charts
   - Timeline view
   - Clause list with filtering
   - Compliance findings
6. Download the PDF report for sharing or archiving

## Testing

Run unit tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Document Processing**: pdf.js, mammoth.js
- **Visualization**: Recharts
- **PDF Generation**: jsPDF with html2canvas
- **State Management**: Zustand
- **Testing**: Jest, React Testing Library, fast-check

## Project Structure

```
src/
├── components/       # React components
├── services/         # Business logic services
├── utils/            # Utility functions
├── types/            # TypeScript type definitions
├── properties/       # Property-based tests
└── main.tsx          # Application entry point
```

## Sample Documents

Sample contract documents for testing are available as 'rental_agreement.docx'.

## Security

- File type validation with magic byte verification
- File size limits (10MB max)
- Script sanitization for uploaded files
- Client-side processing (no server storage)
- Content Security Policy implementation

## Performance

- Document extraction: < 10 seconds for 50-page documents
- Clause detection: < 2 seconds for typical contracts
- Dashboard rendering: < 500ms initial render
- PDF generation: < 5 seconds

## License

MIT
