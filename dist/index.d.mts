import * as react_jsx_runtime from 'react/jsx-runtime';

type Locale = "en" | "fr" | "es";
type StrengthLevel = "veryWeak" | "weak" | "soso" | "good" | "strong";
type DisplayMode = "full" | "bar-only";
interface PasswordRule {
    id: string;
    test: (password: string, options?: RuleOptions) => boolean;
}
interface RuleOptions {
    email?: string;
    forbiddenWords?: string[];
}
interface PasswordStrengthResult {
    score: number;
    level: StrengthLevel;
    passedRules: string[];
    failedRules: string[];
    percentage: number;
}
interface PasswordStrengthProps {
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

declare function PasswordStrength({ value, onChange, locale, mode, levels, maxRules, showRulesOnValid, email, forbiddenWords, hideInput, className, barClassName, inputClassName, placeholder, label, showToggleVisibility, InputComponent, LabelComponent, }: PasswordStrengthProps): react_jsx_runtime.JSX.Element;

/**
 * Maps a strength level to the number of active bars
 */
declare function levelToActiveBars(level: StrengthLevel, totalBars: 3 | 4 | 5): number;
interface UsePasswordStrengthOptions {
    levels?: 3 | 4 | 5;
    email?: string;
    forbiddenWords?: string[];
}
declare function usePasswordStrength(password: string, options?: UsePasswordStrengthOptions): PasswordStrengthResult;

interface Translation {
    levels: Record<StrengthLevel, string>;
    passwordMustInclude: string;
    rules: {
        minLength: string;
        uppercase: string;
        lowercase: string;
        number: string;
        special: string;
        noEmail: string;
        noForbiddenWords: string;
    };
    placeholder: string;
    label: string;
}
declare const translations: Record<Locale, Translation>;
declare function getTranslation(locale: Locale): Translation;

declare const defaultRules: PasswordRule[];
declare const optionalRules: PasswordRule[];
declare function evaluatePassword(password: string, options?: RuleOptions): {
    passedRules: string[];
    failedRules: string[];
    score: number;
};

export { type DisplayMode, type Locale, type PasswordRule, PasswordStrength, type PasswordStrengthProps, type PasswordStrengthResult, type RuleOptions, type StrengthLevel, PasswordStrength as default, defaultRules, evaluatePassword, getTranslation, levelToActiveBars, optionalRules, translations, usePasswordStrength };
