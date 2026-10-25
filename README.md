# Interactive Product Inventory & Analytics Dashboard
### College Capstone Mini-Project in Pure HTML, CSS, and Vanilla JavaScript (ES6+)

---

## 📌 Project Overview

The **Interactive Product Inventory & Analytics Dashboard** is a comprehensive, production-quality front-end web application built for college capstone demonstrations and computer science laboratory coursework. 

The application implements real-time inventory management, stock valuation, automated categorization, and dynamic analytical reporting using **pure Vanilla JavaScript** without any external libraries or frameworks (no React, Angular, Vue, Tailwind, or backend dependencies).

---

## 🎯 Syllabus & JavaScript Concept Mapping

Every requirement specified in the capstone curriculum is explicitly implemented and documented in the source code:

| # | Syllabus Requirement | Implementation Details in `script.js` |
|---|----------------------|--------------------------------------|
| **1** | **Data & Input Initialization** | Initial array contains **Laptop ($800)** and **Mouse ($25)** as structured objects `{ id, name, price }`. Native `window.prompt()` accepts inputs, with explicit type casting via `Number(price)` and input validation. |
| **2** | **Control Flow & Conditionals** | `if...else` categorizes items into **Budget** (`< $100`), **Standard** (`$100 - $500`), and **Premium** (`> $500`). A comprehensive `switch (reportType)` block handles dynamic analytical reports. |
| **3** | **Loops & Flow Control** | Standard `for` loops search and audit items. Demonstrates `continue` (to skip non-matching products) and `break` (to immediately halt search on finding a match) with an interactive **live execution trace terminal** in the UI. |
| **4** | **Functions & Scope** | Regular functions (`addProduct()`, `calculateTotalValue()`, `searchProducts()`) paired with modern Arrow Functions (`categorizeProduct = (price) => ...`). Demonstrates strict **local variable scope** in the tax and discount calculator (`calculateTaxAndDiscount()`). |
| **5** | **Array Methods & Iteration** | `forEach()` dynamically generates DOM table rows; `filter()` isolates affordable items under `$200`; `map()` projects uppercase formatted report arrays like `["LAPTOP: $800", "MOUSE: $25"]`. |

---

## 💻 Tech Stack & Design System

- **HTML5**: Semantic tags (`<header>`, `<main>`, `<section>`, `<article>`, `<dialog>`, `<table>`).
- **CSS3 (Vanilla)**:
  - Charcoal dark theme (`#0e1117`, `#161b22`, `#1c2128`).
  - High-contrast card surfaces with subtle borders and glassmorphism.
  - Vibrant blue (`#3b82f6`) and gold (`#f59e0b`) highlights.
  - Category badges: **Budget** (Emerald), **Standard** (Sky Blue), **Premium** (Amber Gold).
  - 100% responsive grid & flexbox layout supporting desktop, tablet, and mobile viewports.
- **Vanilla JavaScript (ES6+)**:
  - Modular, cleanly organized architecture.
  - Thorough academic inline comments explaining every concept.
  - XSS protection via HTML escaping utilities.
  - Toast notification engine and accessible dialog modals.

---

## 📂 Project File Structure

```text
project01/
├── index.html        # Semantic HTML5 application structure & UI layout
├── style.css         # Modern charcoal design system & responsive styling
├── script.js         # Complete, commented JavaScript logic & state engine
└── README.md         # Documentation, syllabus mapping, and execution guide
```

---

## 🚀 How to Run the Project

### Method 1: Direct Browser Launch (Easiest & Fastest)
1. Navigate to the project folder `c:\Desktop\project01\`.
2. Locate `index.html`.
3. **Double-click** `index.html` to open it immediately in your default browser (Google Chrome, Microsoft Edge, Mozilla Firefox, or Brave).

---

### Method 2: Using Visual Studio Code (VS Code) & Live Server
1. Launch **Visual Studio Code**.
2. Go to **File** → **Open Folder...** and select `c:\Desktop\project01`.
3. If not already installed, install the **Live Server** extension by *Ritwick Dey* from the Extensions panel (`Ctrl + Shift + X`).
4. Right-click on `index.html` in the file explorer and click **"Open with Live Server"**.
5. Your browser will automatically launch at `http://127.0.0.1:5500/index.html` with hot-reloading enabled.

---

### Method 3: Using a Local Python HTTP Server
If you prefer running a command-line HTTP server:
```powershell
# In PowerShell or Terminal inside c:\Desktop\project01:
python -m http.server 8000
```
Open your browser and navigate to: `http://localhost:8000/`

---

## 🧪 Step-by-Step Demonstration & Expected Outputs

### 1. Initial State (On Page Load)
- **Inventory Table**:
  1. `Laptop` — `$800.00` — **Premium** (`> $500`)
  2. `Mouse` — `$25.00` — **Budget** (`< $100`)
- **Total Products Count**: `2`
- **Total Inventory Valuation**: `$825.00`
- **Affordable Items (< $200)**: `Mouse` (`$25.00`)
- **Formatted Report (Array.map)**:
  ```json
  [
    "LAPTOP: $800",
    "MOUSE: $25"
  ]
  ```

---

### 2. Demonstration: Adding "Monitor" at $150
1. Under **"Add New Product"**, enter:
   - **Product Name**: `Monitor`
   - **Unit Price**: `150`
   *(Notice the dynamic badge preview updates to **Standard** as you type)*
2. Click **"Add Product"** (or click **"Add via prompt()"** to test the browser dialog requirement).
3. **Verified Output Results**:
   - `Monitor` is classified as **Standard** (`$100 <= price <= $500`).
   - **Total Products Count**: Increases from `2` to `3`.
   - **Total Inventory Value**: `$825 + $150 = $975.00`.
   - **Affordable Items (< $200)**: Now displays both `Mouse` and `Monitor`.
   - **Formatted Report**:
     ```json
     [
       "LAPTOP: $800",
       "MOUSE: $25",
       "MONITOR: $150"
     ]
     ```

---

### 3. Demonstration: Loop Flow Control (`break` and `continue`)
1. Click **"Run Loop Trace (break / continue)"** in the Search card.
2. The interactive terminal opens and prints the step-by-step loop log:
   - Evaluates each item.
   - Outputs: `No match. Executing 'continue' to skip to next item.`
   - When a match is detected: `Match found! Executing 'break' to terminate the loop early!`
   - Proves deep understanding of loop termination and skip semantics to evaluators.

---

### 4. Demonstration: Tax & Discount Financial Calculator (Local Scope)
1. Adjust the **Sales Tax Rate** slider (e.g., set to 8%).
2. Adjust the **Discount Rate** slider (e.g., set to 10%).
3. The values are calculated using variables declared strictly inside `calculateTaxAndDiscount()`:
   - Variables like `subtotalAfterDiscount` and `taxAmount` cannot be accessed in the browser console from outside the function, demonstrating lexical local scope.

---

### 5. Demonstration: Reset to Default Baseline
1. Click **"Reset to Default"** in the top header.
2. A confirmation modal appears preventing accidental loss.
3. Confirming restores the exact starting state: Laptop ($800) and Mouse ($25).

---

## 🎓 College Viva & Examination Quick Reference Guide

### Q1: Why use `Number()` instead of `parseInt()` or `parseFloat()`?
> **Answer**: `Number()` strictly converts the entire string to a number. If the user enters `"150abc"`, `parseInt()` would leniently parse `150`, whereas `Number("150abc")` returns `NaN`, allowing strict input validation.

### Q2: How does `map()` differ from `forEach()`?
> **Answer**: `forEach()` executes a callback for side-effects (e.g. rendering DOM elements) and returns `undefined`. `map()` creates and returns a **new array** of transformed elements (e.g. `["LAPTOP: $800", ...]`) without mutating the original array.

### Q3: How is local scope demonstrated in this project?
> **Answer**: Inside `calculateTaxAndDiscount()`, variables like `let discountAmount` and `let taxAmount` are declared with `let`/`const`. They reside in the function's execution context and cease to exist after the function returns, preventing pollution of the global `window` scope.

### Q4: When is `break` preferred over `continue` in a loop?
> **Answer**: `continue` skips the remaining statements of the current iteration and advances the counter to the next iteration. `break` exits the loop construct completely, saving CPU cycles once the desired result has been found.

---

## 📜 License
Developed as an academic capstone mini-project submission. Free to use for educational and learning purposes.
