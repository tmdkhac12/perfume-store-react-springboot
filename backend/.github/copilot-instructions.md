# Global Rules

- Communication: The user prompts in Vietnamese. Respond and explain in Vietnamese when providing explanations or guidance.
- Code: ALL source code, unit tests, variable names, comments, and documentation MUST be in English.
- Consistency: If the user describes a feature in Vietnamese, translate the concepts to the established English domain terms (e.g., "Hóa đơn" -> "Invoice").
- Style: Prefer Spring Boot 4 conventions and the project patterns described in `AGENTS.md` (module pattern: controller -> service -> mapper -> dto).
- Instruction Files: Path-specific guidance lives under `.github/instructions/*.instructions.md` (each file should contain a YAML `applyTo` header). Always check `.github/copilot-instructions.md`, `.github/instructions/*`, and `AGENTS.md` before producing code or tests.
- Update policy: When changing AI/agent rules, update `.github/copilot-instructions.md` and the relevant file(s) under `.github/instructions/`
