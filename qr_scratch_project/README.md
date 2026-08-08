# 🎓 QR Freshers Welcome + Scratch Card

Scan a QR code → land on a **Welcome to IT Family!!** page → tap Continue →
**scratch a digital card** → a random funny fresher message pops up 🎉

Built with **Python (Flask)** as the backend/API and plain HTML/CSS/JS
(canvas) for the scratch-card animation on the frontend.

---

## 📁 Project Structure
```
qr_scratch_project/
├── app.py                 # Flask app (routes + /api/random-message)
├── generate_qr.py         # Generates the QR code image
├── requirements.txt
├── templates/
│   ├── welcome.html        # Page 1 - shown right after scan
│   └── scratch.html        # Page 2 - the scratch card
└── static/
    ├── css/style.css
    ├── js/scratch.js        # Scratch canvas logic + calls the API
    └── images/              # welcome_qr.png gets saved here
```

## ▶️ How to Run (VS Code)

1. Open this folder in VS Code.
2. Open a terminal (`` Ctrl+` ``) and create/activate a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   venv\Scripts\activate      # Windows
   source venv/bin/activate   # Mac/Linux
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the Flask server:
   ```bash
   python app.py
   ```
   It will run at `http://0.0.0.0:5000/` (accessible on your local WiFi).
5. In a **second terminal**, generate the QR code (make sure `app.py` is
   still running, and your laptop is connected to the same WiFi as the
   phones that will scan it):
   ```bash
   python generate_qr.py
   ```
   This saves `static/images/welcome_qr.png` — open/print/display that
   image for freshers to scan.
6. Scan the QR with a phone camera → Welcome page → Continue → Scratch card
   → a random funny message pops up with confetti 🎊

> Tip: If scanning from a phone doesn't connect, double-check the phone and
> laptop are on the **same WiFi network**, and that your firewall allows
> incoming connections on port 5000.

## 🎨 Customize
- Edit the 20 messages in `app.py` inside `FUNNY_MESSAGES`.
- Change welcome text/subtitle in the `welcome()` route in `app.py`.
- Tweak colors/fonts in `static/css/style.css`.
- Scratch sensitivity (brush size / reveal %) is in `static/js/scratch.js`
  (`scratch()` and `checkRevealProgress()` functions).

Enjoy welcoming your freshers! 🥳
