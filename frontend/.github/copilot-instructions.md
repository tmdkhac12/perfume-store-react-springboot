# Global Rules

- Communication: The user prompts in Vietnamese. Respond and explain in Vietnamese when providing explanations or guidance.
- Code: ALL source code, unit tests, variable names, comments, and documentation MUST be in English.
- Consistency: If the user describes a feature in Vietnamese, translate the concepts to the established English domain terms (e.g., "Hóa đơn" -> "Invoice").

- Instruction Files: Path-specific guidance lives under `.github/instructions/*.instructions.md` (each file should contain a YAML `applyTo` header). Always check `.github/copilot-instructions.md`, `.github/instructions/*`, and `AGENTS.md` before producing code or changing anything.
- Update policy: When changing AI/agent rules, update `.github/copilot-instructions.md` and the relevant file(s) under `.github/instructions/`

- React JS instruction set for this workspace:
	- `.github/instructions/react-core.instructions.md`
	- `.github/instructions/react-routing-layout.instructions.md`
	- `.github/instructions/react-testing-quality.instructions.md`
