# 🔐 Spring Security & JWT: The Core Architecture

A simplified guide to understanding how Spring Security handles identity and how JWT facilitates stateless authentication.

---

## 1. Authentication & Authorization

In Spring Security, the security process is split into two distinct concerns:

* **Authentication (AuthN):** *"Who are you?"* — Handled by the **Auth Module** (Login/Register).
* **Authorization (AuthZ):** *"What are you allowed to do?"* — Handled by the **Security Module**.

### Key Components:
* **UserDetails (Interface):** The core representation of a user in Spring Security. It is decoupled from your database.
* **UserDetailsService (Interface):** The "bridge" to your data. Spring calls this service whenever it needs to load user data during authentication.
* **GrantedAuthority:** Represents a permission or role (e.g., `ROLE_ADMIN`). These are used by:
    * `@PreAuthorize`
    * `.hasRole()` / `.hasAuthority()`
* **Standard Processing:** Spring Security expects roles to be represented as Strings (typically prefixed with `ROLE_`).



---

## 2. JWT (JSON Web Token) Anatomy & Lifecycle

A JWT consists of three parts separated by dots: `header.payload.signature`.

### 🛠️ Token Creation Process
1.  **Preparation:** The server creates a **Header** (algorithm info) and a **Payload** (user claims).
2.  **Encoding:** Both are encoded using **Base64URL**.
3.  **Signing:** The server hashes the encoded header and payload together with a **SECRET_KEY** (usually using the **HS256** algorithm).
4.  **Output:** Returns the concatenated string: `encoded_header.encoded_payload.signature`.

### 🔍 Token Verification Process
1.  **Extraction:** The server receives the token and extracts the Header and Payload.
2.  **Re-hashing:** It hashes them again using its own **SECRET_KEY**.
3.  **Comparison:** It compares the newly generated signature with the signature provided in the token. If they match, the token is valid.



---

## 3. Technical Implementation Details

### The SECRET_KEY Rules:
* **Format:** Use **Base64** rather than a raw String. Raw strings may contain UTF-8 characters that cause exceptions during byte conversion.
* **Size Requirements:** * **HS256:** Minimum 32 bytes (256 bits).
    * **HS512:** Minimum 64 bytes (512 bits).
* **Spring Handling:** In Spring Security, the Secret must be a `byte[]`. Use `Keys.hmacShaKeyFor()` to automatically detect the algorithm based on key size and wrap it in a `SecretKey` object.

### The Filter Pitfall:
* **Avoid `@Component` on Filters:** If you mark a filter with `@Component`, it is registered as a generic **Servlet Filter** (Global). For Spring Security, it should only be registered within the **SecurityFilterChain** to avoid redundant execution.

---

## 4. The Security Flow (The Lifecycle)

Spring Security uses the **Security Context** to determine permissions. This context is thread-local and is **released** (cleared) when the request lifecycle ends.

### 🌊 Step-by-Step Flow:
1.  **Request:** Client sends a request with a JWT.
2.  **JWT Filter:** Intercepts the request, validates the token, and populates the **Security Context** with user details.
3.  **SecurityFilterChain:** The "gatekeeper" that checks the context against endpoint rules (Authorization).
4.  **Controller:** The request finally reaches your business logic.



---