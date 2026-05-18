# Pradeepa S - Portfolio

Welcome to the source code for my professional portfolio website. This is a fully responsive, static web project built with modern web technologies (HTML, CSS, and vanilla JavaScript). It features 3D scroll animations, a particle canvas system, and a dynamic developer theme.

## How to Run This Project

Since this is a static site without a complex backend, running it locally is very simple.

### Option 1: Using VS Code Live Server (Recommended)
1. Open this project folder (`portfolio`) in Visual Studio Code.
2. Install the **Live Server** extension by Ritwick Dey from the extensions marketplace.
3. Open `index.html` in your editor.
4. Click the **"Go Live"** button at the bottom right corner of your VS Code window (or right-click anywhere in `index.html` and select **"Open with Live Server"**).
5. The portfolio will automatically open in your default browser at `http://127.0.0.1:5500`.

### Option 2: Using Node.js / npx
If you have Node.js installed, you can start a local development server via terminal:
1. Open your terminal and navigate to this project folder.
2. Run the following command:
   ```bash
   npx http-server -p 8000
   ```
3. Open your browser and navigate to `http://localhost:8000`.

### Option 3: Using Python
If you have Python installed, you can use its built-in HTTP server:
1. Open your terminal and navigate to this project folder.
2. Run the following command:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and navigate to `http://localhost:8000`.

### Option 4: Direct File Open
You can also simply double-click the `index.html` file in your file explorer to open it directly in any modern web browser. However, using a local server (like Options 1-3) is recommended to prevent any potential CORS issues with module scripts or local assets.

## Project Structure
- `index.html` - The main entry point and structure of the application.
- `style.css` - Contains the core styling, layout, typography, and responsive breakpoints.
- `effects.css` - Contains advanced CSS styling such as gradient rules or utility classes.
- `script.js` - Contains the interactivity logic, animations, canvas rendering, and intersection observers.
