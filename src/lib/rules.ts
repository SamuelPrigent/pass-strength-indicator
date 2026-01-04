import type { PasswordRule, RuleOptions } from "./types";

export const defaultRules: PasswordRule[] = [
  {
    id: "minLength",
    test: (password) => password.length >= 12,
  },
  {
    id: "uppercase",
    test: (password) => /[A-Z]/.test(password),
  },
  {
    id: "lowercase",
    test: (password) => /[a-z]/.test(password),
  },
  {
    id: "number",
    test: (password) => /[0-9]/.test(password),
  },
  {
    id: "special",
    test: (password) => /[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\\/`~;']/.test(password),
  },
];

export const optionalRules: PasswordRule[] = [
  {
    id: "noEmail",
    test: (password, options?: RuleOptions) => {
      if (!options?.email) return true;
      const emailParts = options.email.toLowerCase().split("@");
      const username = emailParts[0];
      if (!username) return true;
      // Check if password contains the email username
      return !password.toLowerCase().includes(username);
    },
  },
  {
    id: "noForbiddenWords",
    test: (password, options?: RuleOptions) => {
      if (!options?.forbiddenWords || options.forbiddenWords.length === 0) return true;
      const lowerPassword = password.toLowerCase();
      return !options.forbiddenWords.some((word) =>
        lowerPassword.includes(word.toLowerCase())
      );
    },
  },
];

export function evaluatePassword(
  password: string,
  options?: RuleOptions
): { passedRules: string[]; failedRules: string[]; score: number } {
  const passedRules: string[] = [];
  const failedRules: string[] = [];

  // Evaluate default rules
  for (const rule of defaultRules) {
    if (rule.test(password, options)) {
      passedRules.push(rule.id);
    } else {
      failedRules.push(rule.id);
    }
  }

  // Evaluate optional rules if options are provided
  for (const rule of optionalRules) {
    // Only evaluate noEmail if email is provided
    if (rule.id === "noEmail" && options?.email) {
      if (rule.test(password, options)) {
        passedRules.push(rule.id);
      } else {
        failedRules.push(rule.id);
      }
    }
    // Only evaluate noForbiddenWords if forbiddenWords are provided
    if (rule.id === "noForbiddenWords" && options?.forbiddenWords?.length) {
      if (rule.test(password, options)) {
        passedRules.push(rule.id);
      } else {
        failedRules.push(rule.id);
      }
    }
  }

  // Calculate score based on passed rules (out of total evaluated rules)
  const totalRules = passedRules.length + failedRules.length;
  const score = totalRules > 0 ? Math.round((passedRules.length / totalRules) * 5) : 0;

  return { passedRules, failedRules, score };
}
