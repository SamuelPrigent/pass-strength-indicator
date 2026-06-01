# Props & API reference

Full reference for [`pass-strength-indicator`](../README.md). For installation, a quick start, and examples, see the [README](../README.md).

## `<PasswordStrength />` props

| Prop                  | Type                                         | Default     | Description                                                                                                                          |
| --------------------- | -------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `value`               | `string`                                     | required    | Password value to evaluate.                                                                                                          |
| `locale`              | `Locale`                                     | `"en"`      | UI language. 13 locales supported (see [Languages](../README.md#languages)).                                                        |
| `barMode`             | `"default" \| "full"`                        | `"default"` | `"default"` = segmented bars, `"full"` = one continuous bar.                                                                          |
| `indicatorBackground` | `string \| { light: string; dark: string }` | –           | Wraps the indicator in a card. Tailwind classes (`"bg-zinc-100 dark:bg-zinc-900"`) or per-theme CSS colors (`{ light, dark }`).      |
| `barsNumber`          | `3 \| 4 \| 5`                                | `5`         | Number of strength bars. Affects the score → level mapping.                                                                         |
| `maxRules`            | `number`                                     | `2`         | Max validation rules displayed. `0` = bar only.                                                                                     |
| `email`               | `string`                                     | –           | When set, flags any 4+ consecutive characters taken from the email's local part (the bit before `@`).                                |
| `forbiddenWords`      | `string[]`                                   | –           | Words that must not appear in the password (case-insensitive).                                                                      |
| `className`           | `string`                                     | –           | Extra class on the root container.                                                                                                  |
| `barClassName`        | `string`                                     | –           | Extra class on the bar(s).                                                                                                          |

## Types

```ts
type Locale =
  | "en" | "fr" | "es" | "de" | "pt" | "it" | "nl"
  | "pl" | "sv" | "uk" | "zh" | "ja" | "ko";

type StrengthLevel = "veryWeak" | "weak" | "soso" | "good" | "strong";

interface PasswordStrengthResult {
  score: number; // 0–5
  level: StrengthLevel;
  passedRules: string[];
  failedRules: string[];
  percentage: number; // 0–100
}
```

## Headless API

Use these when you want the logic without the built-in UI: a custom meter, form gating, or tests.

### `usePasswordStrength(password, options?)`

React hook (memoized). Returns a `PasswordStrengthResult`.

```ts
const { score, level, percentage, passedRules, failedRules } =
  usePasswordStrength(password, {
    barsNumber: 5, // optional, 3 | 4 | 5
    email: "user@mail.com", // optional
    forbiddenWords: ["acme"], // optional
  });
```

### `evaluatePassword(password, options?)`

Pure function (no React). Returns `{ passedRules, failedRules, score }`.

```ts
import { evaluatePassword } from "pass-strength-indicator";

const { score, failedRules } = evaluatePassword("MyP@ssw0rd123", {
  email: "user@mail.com", // optional
  forbiddenWords: ["acme"], // optional
});
```

### Other exports

| Export                           | Signature                                                | Purpose                                          |
| -------------------------------- | -------------------------------------------------------- | ------------------------------------------------ |
| `levelToActiveBars`              | `(level: StrengthLevel, totalBars: 3 \| 4 \| 5) => number` | Active bar count for a given level.              |
| `getTranslation`                 | `(locale: string) => Translation`                        | Labels for a locale (falls back to English).     |
| `defaultRules` / `optionalRules` | `PasswordRule[]`                                         | The underlying rule definitions.                 |

## Validation rules

1. **Minimum length** — at least 12 characters
2. **Uppercase** — at least one uppercase letter
3. **Lowercase** — at least one lowercase letter
4. **Number** — at least one digit
5. **Special character** — at least one special character
6. **No email pattern** _(optional, requires `email`)_ — no 4+ consecutive characters from the email
7. **No forbidden words** _(optional, requires `forbiddenWords`)_

> The score is `round(passed / total * 5)`, minus 2 if the email or a forbidden word is detected. See the [scoring diagram](../README.md#how-it-works).
