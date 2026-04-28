# Trigonometric Assistant (Web App)

## Overview

This is a small, personal web project built to practice and improve skills in **HTML, CSS, and JavaScript**.  
It provides a **trigonometry assistant tool** for users who want to:

- Convert angles between **degrees and radians** (including expressions with π, e.g., `π/2`, `3π/4`, `pi`, `-Pi/8`).
- Calculate **trigonometric functions** (`sin`, `cos`, `tan`, `cot`) for any angle.
- View **basic trigonometric values** for common angles in a clean table.
- Explore **theoretical properties and identities** of trigonometric functions.

---

## Features

### 1. Main Screen (`index.html`)

**Purpose:** Interactive trigonometry helper for calculations.

**User Capabilities:**

- **Angle Conversion:**  
  - Convert between degrees and radians.  
  - Accepts numbers and π expressions (e.g., `π`, `π/2`, `3π/2`, `-π/4`).

- **Trigonometric Function Calculator:**  
  - Compute `sin`, `cos`, `tan`, `cot` for any input angle.  
  - Handles edge cases (e.g., very small numbers close to 0, angle normalization, quadrant signs).

- **Basic Angle Table:**  
  - Displays trigonometric values for key angles in **radians, decimals, and multiples/fractions of π**.

- **UX Helpers:**  
  - Reset inputs/outputs.  
  - Format output nicely (e.g., scientific notation with superscripts).

---

### 2. Theory Screen (`trigIdentitiesProperties.html`)

**Purpose:** Educational reference with visual and theoretical trig information.

**User Capabilities:**

- **Unit Circle Display:**  
  - Shows angle θ starting from the positive horizontal axis.  
  - Indicates **positive rotation direction** with an arc and (+) sign.  
  - Displays which trig functions are positive in each quadrant.

- **Trigonometric Identities Section:**  
  - Examples: `sin²(x) + cos²(x) = 1`.

- **Basic Properties Section:**  
  - Examples: `sin(a+b) = sin(a)cos(b) + cos(a)sin(b)`.

- **Navigation:**  
  - Connected to the main screen via a large button with the project logo.

---

## Project Structure

```text
trigonometric-assistant/
│
├── index.html                    ← Main interactive screen
├── trigIdentitiesProperties.html       ← Educational/theory screen
├── README.md
│
├── assets/
│   ├── icons/                    ← UI icons, buttons
│   └── images/                   ← Backgrounds, unit circle image, etc.
│
├── scripts/
│   ├── main.js                   ← Entry point connecting UI with modules
│   │
│   ├── math/                     ← Computation logic
│   │   ├── angleConverter.js
│   │   ├── trigonometry.js
│   │   ├── parseInputAngle.js
│   │   └── trigConstants.js
│   │
│   ├── format/                   ← Output formatting utilities
│   │   └── formatScientificNotation.js
│   │
│   └── ui/                       ← UX helpers
│       └── resetInputOutputUI.js
│
├── styles/                       ← Screen styling
│   ├── index.css
│   ├── style.css
│   └── trigIdentitiesProperties.css
│
└── svg/
    └── unitCircleInSVG.html      ← SVG Code that generates the UnitCircle.png image
```

---

## Notes

- `main.js` handles DOM events, connects user inputs with the math and formatting modules.
- `math/` contains all computational logic (angle conversions, trig calculations, trigonometric constants).
- `format/` handles presentation of results (scientific notation, superscripts).
- `ui/` contains helper functions for user experience (resetting inputs, styling interactions).

---

## Purpose & Audience

- **Educational / Personal Project:**  
  Designed to learn and improve basic skills in **JS, HTML, CSS**.
  As a Web App, helps users as a trigonometric assistant giving them quick trigonometric calculations and angle 
  conversions, as well as a cheat sheet with the basic trigonometric identities and properties.

- **Users:**  
  Anyone who wants a **lightweight trigonomtric asistant**:
  - Quickly convert angles.
  - Calculate trigonometric functions for any angle.
  - Reference key trigonometric values and identities.

---

## Usage

1. Open `index.html` in a browser.  
2. Input a value in the **angle converter** or **trig calculator**.  
   - Accepts numbers and π expressions (`π`, `π/2`, `3π/4`).  
3. View results immediately in the output sections.  
4. Navigate to **Theory Screen** using the top button to explore the **unit circle** and **basic trigonometric identities**.

---

## Author

Personal learning project

---

## Technologies

- HTML
- CSS
- JavaScript (ES6 modules)

---

## Live Demo

You can try the project directly in your browser:  
[Open Trigonometric Assistant](...Thoughts to upload it on Netlify...)
