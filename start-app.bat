<<<<<<< HEAD
@echo off
echo ========================================
echo Legal Contract Dashboard - Startup
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [1/2] Installing dependencies...
    echo This may take a few minutes...
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo ERROR: Failed to install dependencies
        echo Please make sure Node.js is installed
        pause
        exit /b 1
    )
    echo.
    echo Dependencies installed successfully!
    echo.
) else (
    echo [1/2] Dependencies already installed
    echo.
)

echo [2/2] Starting development server...
echo.
echo The application will open at: http://localhost:5173
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause
=======
@echo off
echo ========================================
echo Legal Contract Dashboard - Startup
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [1/2] Installing dependencies...
    echo This may take a few minutes...
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo ERROR: Failed to install dependencies
        echo Please make sure Node.js is installed
        pause
        exit /b 1
    )
    echo.
    echo Dependencies installed successfully!
    echo.
) else (
    echo [1/2] Dependencies already installed
    echo.
)

echo [2/2] Starting development server...
echo.
echo The application will open at: http://localhost:5173
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause
>>>>>>> 4f8baf0415f89a52abfadc144972d03a757d5f82
