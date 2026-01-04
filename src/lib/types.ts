export type Locale = "en" | "fr" | "es";

export type StrengthLevel = "veryWeak" | "weak" | "soso" | "good" | "strong";

export type DisplayMode = "full" | "bar-only";

export interface PasswordRule {
  id: string;
  test: (password: string, options?: RuleOptions) => boolean;
}

export interface RuleOptions {
  email?: string;
  forbiddenWords?: string[];
}

export interface PasswordStrengthResult {
  score: number; // 0-5
  level: StrengthLevel;
  passedRules: string[];
  failedRules: string[];
  percentage: number; // 0-100
}

export interface PasswordStrengthProps {
  /** Current password value */
  value: string;
  /** Callback when password changes (for controlled input) */
  onChange?: (value: string) => void;
  /** Language for labels and messages */
  locale?: Locale;
  /** Display mode: full (with rules) or bar-only */
  mode?: DisplayMode;
  /** Number of strength bars (3-5) */
  levels?: 3 | 4 | 5;
  /** Maximum number of rules to display in full mode (1-5) */
  maxRules?: number;
  /** Whether to show rules when they are validated (true) or hide them (false) */
  showRulesOnValid?: boolean;
  /** Email to check password doesn't contain it */
  email?: string;
  /** Additional words that should not be in the password */
  forbiddenWords?: string[];
  /** Hide the input field (only show strength indicator) */
  hideInput?: boolean;
  /** Additional class name for the container */
  className?: string;
  /** Additional class name for the strength bars */
  barClassName?: string;
  /** Additional class name for the input */
  inputClassName?: string;
  /** Placeholder for the input field */
  placeholder?: string;
  /** Label for the input field */
  label?: string;
  /** Whether to show the eye icon to toggle password visibility */
  showToggleVisibility?: boolean;
  /** Custom Input component (e.g. shadcn/ui Input) */
  InputComponent?: React.ComponentType<React.ComponentProps<"input">>;
  /** Custom Label component (e.g. shadcn/ui Label) */
  LabelComponent?: React.ComponentType<React.ComponentProps<"label">>;
}
