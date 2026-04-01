## 1. What is OAuth2?
**OAuth2 (Open Authorization 2.0)** is an industry-standard protocol for **authorization**. It allows a third-party application to obtain limited access to a user's resources on another service (like Google, Facebook, or GitHub) **without** requiring the user's raw credentials (username and password).

---

## 2. Pain Points (The Problem)
Imagine you want a **Printing App** (Third-party) to access your **Google Photos** to print them.

### Without OAuth2 (The Dangerous Way):
If you provide your *Username/Password*, *JWT*, or *Session ID* to the Printing App:

* **⚠️ Excessive Permissions:** The app gains full control over your account, including reading private emails, deleting files, or changing your password.
* **🔓 Security Risk:** If the Printing App is compromised, your master password is stolen.
* **🚫 Hard to Revoke:** To stop the app from accessing your photos, you must change your main password, which affects every other service you use.

---

## 3. How OAuth2 Works (The Flow)
The standard **Authorization Code Flow** follows these steps:

1.  **Client (Your App):** Redirects the user to the Provider (e.g., Google) to request specific permissions (**Scopes**).
2.  **Resource Owner (User):** Logs in to the Provider's site and clicks **"Allow"**.
3.  **Authorization Server (Google):** Sends a temporary **Authorization Code** back to your Client app via a redirect URL.
4.  **Client:** Exchanges this **Code** + **Client Secret** to redeem an **Access Token**.
5.  **Resource Server:** Validates the Access Token and serves the requested data (Photos) to the Client.

---

## 4. Pros (The Benefits)
Using OAuth2 provides significant advantages for users, developers, and platform owners:

* **🎯 Granular Access (Scopes):** Users can grant access to *specific* data (e.g., "read-only photos") rather than the entire account.
* **🔑 No Password Sharing:** The third-party app never sees or stores the user's password, keeping the "Master Key" safe.
* **🔄 Easy Revocation:** Users can go to their Google/Facebook settings and revoke access for a specific app at any time without changing their password.
* **⏳ Short-lived Tokens:** Access Tokens usually expire quickly. Even if a token is leaked, the window of risk is very small.
* **🚀 Improved UX:** Features like "Login with Google" allow users to create accounts and sign in with a single click, reducing friction.
* **🛡️ Separation of Concerns:** It clearly distinguishes between **Authentication** (who you are) and **Authorization** (what you can do).

## 5. Practical Applications of OAuth2

### 1. Single Sign-On (SSO)
This is the most common application seen daily. Instead of creating new accounts, users use their Google, Facebook, or GitHub accounts to sign in to other websites.

* **Real-world Example:** Using a Google account to log in to Spotify, Pinterest, or food delivery apps.
* **Benefits:** Users don't have to remember multiple passwords; Developers don't need to manage registration, email verification, or password security.

---

### 2. Internal Application Ecosystem
Large corporations often have dozens of different applications (e.g., Google has Gmail, Drive, YouTube, and Maps).

* **Real-world Example:** When you log in to Gmail, you are automatically recognized in YouTube or Drive without re-logging.

---

### 3. Smart Device Integration (IoT & Smart Home)
OAuth2 plays a crucial role in connecting hardware devices from different manufacturers.

* **Real-world Example:** You buy a smart speaker (Google Home) and want it to control smart light bulbs from another brand (e.g., Xiaomi).

---

### 4. Open Banking
This is a booming global trend. OAuth2 allows personal finance management apps to access bank data securely.

* **Real-world Example:** Using a wealth management app (like Money Lover) to automatically sync transaction history from bank accounts (e.g., Chase, HSBC).
* **Benefits:** You don't have to give your bank password to the app; you only authorize "Read transaction history" through the bank's OAuth2 portal.

---

### 5. Access Control for Microservices
In a Microservices architecture, instead of each service verifying the user's identity individually, they use an "API Gateway."

* **Real-world Example:** Every request sent to the system is accompanied by an **OAuth2 Access Token**.

---

### 6. Open API Platforms (Community APIs)
Essential for platforms that want third-party developers to build applications based on their data.

* **Real-world Example:** E-commerce platforms like Shopee or Lazada provide APIs for "Price Tracking" or "Centralized Order Management" tools.

# Code
## 🚀 Quick OAuth2 Flow (Spring Security + JWT Cookie)

1. **User** accesses the initiation endpoint: `/oauth2/authorization/google`.
2. **`OAuth2AuthorizationRequestRedirectFilter`** intercepts the request and redirects the User to Google with `client_id`, `scopes`, and `state`.
3. **User** logs in to Google and clicks **"Allow"** to grant permissions.
4. **Google** redirects the browser back to the **Redirect URI**: `/login/oauth2/code/google` with an authorization `code`.
5. **`OAuth2LoginAuthenticationFilter`** intercepts the callback and exchanges the `code` for an **Access Token** from Google (in background).
6. **`CustomOAuth2Service`** is triggered to fetch User info (Email, Name) and performs **DB Sync** (Saves User to DB with `username = email` to satisfy unique/not-null constraints).
7. **`CustomOAuth2SuccessHandler`** is triggered after successful authentication:
    - Extracts `email` from `OAuth2User`.
    - Loads `UserDetails` via `CustomUserDetailsService` (using `findByUsername` or `findByEmail`).
    - Generates a **JWT Token** via `JwtService`.
    - Attaches the JWT to an **HTTP-Only Cookie** and adds it to the `HttpServletResponse`.
8. **Browser** is redirected to the **Success URL** (`/api/v1/auth/home`) via `getRedirectStrategy().sendRedirect()`.
9. **Final State**: The session is **Stateless**; the browser stores the JWT in a Cookie for all subsequent API requests.