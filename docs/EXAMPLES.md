# Examples

Every example for [`pass-strength-indicator`](../README.md). For installation and the quick start, see the [README](../README.md); for the full props and the headless API, see [PROPS.md](PROPS.md).

## Bar Only Mode

Set `maxRules={0}` to hide validation rules and show only the strength bar:

```tsx
<PasswordStrength value={password} maxRules={0} />
```

## Full Bar Mode

Use `barMode="full"` for a continuous bar instead of segmented bars:

```tsx
<PasswordStrength value={password} barMode="full" />
```

## Email Pattern Detection

Prevents users from including any 4+ consecutive characters from their email:

```tsx
<PasswordStrength value={password} email="johndoe@example.com" />
```

## Custom Number of Bars

Choose between 3, 4, or 5 strength bars:

```tsx
<PasswordStrength value={password} barsNumber={3} maxRules={0} />
```

## Indicator Background

Add a card background around the indicator section. Independent from `barMode`.

```tsx
// Tailwind classes
<PasswordStrength
  value={password}
  indicatorBackground="bg-zinc-100 dark:bg-zinc-900"
/>

// CSS colors (light/dark)
<PasswordStrength
  value={password}
  indicatorBackground={{ light: "#f5f5f5", dark: "#1c1c1c" }}
/>
```

## Full Configuration

```tsx
<PasswordStrength
  value={password}
  locale="fr"
  barMode="full"
  indicatorBackground="bg-zinc-100 dark:bg-zinc-900"
  barsNumber={5}
  maxRules={3}
  email="user@example.com"
  forbiddenWords={["password", "company"]}
/>
```

## Score required

Need to gate a form on the password strength? Read the live score with the `usePasswordStrength` hook (the headless side of the library), feed it the same `password` state as the indicator, and disable your button until the score is high enough.

```tsx
import { useState } from "react";
import { PasswordStrength, usePasswordStrength } from "pass-strength-indicator";

export function LoginForm() {
  const [password, setPassword] = useState("");

  // Same state as the input, so the score stays in sync
  const { score } = usePasswordStrength(password);

  return (
    <form className="space-y-2">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <PasswordStrength value={password} />

      <button type="submit" disabled={score < 4}>
        Log in
      </button>
    </form>
  );
}
```

> Prefer a plain function (no React)? `evaluatePassword(password)` returns `{ passedRules, failedRules, score }` and runs anywhere.
