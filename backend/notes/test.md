# Unit Testing Principles and Workflow

## Core Principles

* **Isolation:** Unit tests must not touch the **Database**, call **real APIs**, or read **physical files**. All external dependencies must be **Mocked**.
* **Target Layers:** Unit tests primarily focus on the **Service** layer and **Validator/Mapper** components.
* **Scope of Testing:**
    * **Business Logic:** Verifying the "Happy Path."
    * **Edge Cases:** Testing branching logic (`if-else`) and boundary values.
    * **Exception Handling:** Ensuring the system correctly throws and manages exceptions.
* **Execution over Data:** Unit tests do not test the data itself; they test the **Control Flow** (the processing logic).
* **Service Responsibility:** A Service unit test assumes: *"The data is already clean when it reaches this point; my only job is to process it correctly."*
* **Regression Prevention:** Unit tests ensure that what worked yesterday continues to work today, even if you refactor code or update libraries.
* **Logical Limitations:** Unit tests cannot detect missing business logic (e.g., *"Only Admins should be allowed to delete a Brand"*). Detecting missing requirements is a human task (or an AI task if provided with full context).
* **Project Structure:**
    * **Unit Test:** Written for `config`, `common`, `service`, and `mapper` packages.
    * **Integration Test:** Reserved for `controller`, `repository`, and `specification`.

---

## The Unit Testing Workflow (Step-by-Step)

1.  **Identify Scenarios:** List all possible Success/Failure cases for the function on paper.
2.  **Write Test Code:** Use **JUnit 5** (`@Test`) and **Mockito** (`when(...).thenReturn(...)`).
3.  **Execute and Observe:** Run the tests to see the result: **Green** (Pass) or **Red** (Fail).
4.  **Refactor:** If the logic doesn't cover all edge cases, refine the production code until all test cases turn Green.

---

## The Ultimate Goal

The purpose of a Unit Test is to confirm: *"If all external components behave exactly as I expect, is the logic within **this specific class** correct?"*

> **Pro Tip:** Instead of writing code and then writing tests, try writing the **Test before the Code** (Test-Driven Development).