'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var clsx = require('clsx');
var jsxRuntime = require('react/jsx-runtime');

// src/lib/PasswordStrength.tsx

// src/lib/rules.ts
var defaultRules = [
  {
    id: "minLength",
    test: (password) => password.length >= 12
  },
  {
    id: "uppercase",
    test: (password) => /[A-Z]/.test(password)
  },
  {
    id: "lowercase",
    test: (password) => /[a-z]/.test(password)
  },
  {
    id: "number",
    test: (password) => /[0-9]/.test(password)
  },
  {
    id: "special",
    test: (password) => /[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\\/`~;']/.test(password)
  }
];
var optionalRules = [
  {
    id: "noEmail",
    test: (password, options) => {
      if (!(options == null ? void 0 : options.email)) return true;
      const emailParts = options.email.toLowerCase().split("@");
      const username = emailParts[0];
      if (!username) return true;
      return !password.toLowerCase().includes(username);
    }
  },
  {
    id: "noForbiddenWords",
    test: (password, options) => {
      if (!(options == null ? void 0 : options.forbiddenWords) || options.forbiddenWords.length === 0) return true;
      const lowerPassword = password.toLowerCase();
      return !options.forbiddenWords.some(
        (word) => lowerPassword.includes(word.toLowerCase())
      );
    }
  }
];
function evaluatePassword(password, options) {
  var _a;
  const passedRules = [];
  const failedRules = [];
  for (const rule of defaultRules) {
    if (rule.test(password, options)) {
      passedRules.push(rule.id);
    } else {
      failedRules.push(rule.id);
    }
  }
  for (const rule of optionalRules) {
    if (rule.id === "noEmail" && (options == null ? void 0 : options.email)) {
      if (rule.test(password, options)) {
        passedRules.push(rule.id);
      } else {
        failedRules.push(rule.id);
      }
    }
    if (rule.id === "noForbiddenWords" && ((_a = options == null ? void 0 : options.forbiddenWords) == null ? void 0 : _a.length)) {
      if (rule.test(password, options)) {
        passedRules.push(rule.id);
      } else {
        failedRules.push(rule.id);
      }
    }
  }
  const totalRules = passedRules.length + failedRules.length;
  const score = totalRules > 0 ? Math.round(passedRules.length / totalRules * 5) : 0;
  return { passedRules, failedRules, score };
}

// src/lib/usePasswordStrength.ts
function scoreToLevel(score, levels) {
  if (levels === 5) {
    if (score === 0) return "veryWeak";
    if (score === 1) return "veryWeak";
    if (score === 2) return "weak";
    if (score === 3) return "soso";
    if (score === 4) return "good";
    return "strong";
  }
  if (levels === 4) {
    if (score <= 1) return "weak";
    if (score === 2) return "soso";
    if (score === 3 || score === 4) return "good";
    return "strong";
  }
  if (score <= 2) return "weak";
  if (score <= 4) return "soso";
  return "strong";
}
function levelToActiveBars(level, totalBars) {
  const mapping = {
    veryWeak: { 3: 0, 4: 0, 5: 1 },
    weak: { 3: 1, 4: 1, 5: 2 },
    soso: { 3: 2, 4: 2, 5: 3 },
    good: { 3: 2, 4: 3, 5: 4 },
    strong: { 3: 3, 4: 4, 5: 5 }
  };
  return mapping[level][totalBars];
}
function usePasswordStrength(password, options = {}) {
  const { levels = 5, email, forbiddenWords } = options;
  return react.useMemo(() => {
    if (!password) {
      return {
        score: 0,
        level: "veryWeak",
        passedRules: [],
        failedRules: ["minLength", "uppercase", "lowercase", "number", "special"],
        percentage: 0
      };
    }
    const ruleOptions = { email, forbiddenWords };
    const { passedRules, failedRules, score } = evaluatePassword(password, ruleOptions);
    const level = scoreToLevel(score, levels);
    const percentage = Math.round(score / 5 * 100);
    return {
      score,
      level,
      passedRules,
      failedRules,
      percentage
    };
  }, [password, levels, email, forbiddenWords]);
}

// src/lib/translations.ts
var translations = {
  en: {
    levels: {
      veryWeak: "Very Weak",
      weak: "Weak",
      soso: "So-so",
      good: "Good",
      strong: "Strong"
    },
    passwordMustInclude: "Your Password must include",
    rules: {
      minLength: "At least 12 characters",
      uppercase: "At least one uppercase letter",
      lowercase: "At least one lowercase letter",
      number: "At least one number",
      special: "At least one special character",
      noEmail: "Must not contain your email",
      noForbiddenWords: "Must not contain forbidden words"
    },
    placeholder: "Enter your password",
    label: "Password"
  },
  fr: {
    levels: {
      veryWeak: "Tr\xE8s faible",
      weak: "Faible",
      soso: "Moyen",
      good: "Bon",
      strong: "Fort"
    },
    passwordMustInclude: "Votre mot de passe doit inclure",
    rules: {
      minLength: "Au moins 12 caract\xE8res",
      uppercase: "Au moins une lettre majuscule",
      lowercase: "Au moins une lettre minuscule",
      number: "Au moins un chiffre",
      special: "Au moins un caract\xE8re sp\xE9cial",
      noEmail: "Ne doit pas contenir votre email",
      noForbiddenWords: "Ne doit pas contenir de mots interdits"
    },
    placeholder: "Entrez votre mot de passe",
    label: "Mot de passe"
  },
  es: {
    levels: {
      veryWeak: "Muy d\xE9bil",
      weak: "D\xE9bil",
      soso: "Regular",
      good: "Buena",
      strong: "Fuerte"
    },
    passwordMustInclude: "Tu contrase\xF1a debe incluir",
    rules: {
      minLength: "Al menos 12 caracteres",
      uppercase: "Al menos una letra may\xFAscula",
      lowercase: "Al menos una letra min\xFAscula",
      number: "Al menos un n\xFAmero",
      special: "Al menos un car\xE1cter especial",
      noEmail: "No debe contener tu email",
      noForbiddenWords: "No debe contener palabras prohibidas"
    },
    placeholder: "Ingresa tu contrase\xF1a",
    label: "Contrase\xF1a"
  }
};
function getTranslation(locale) {
  return translations[locale] || translations.en;
}
var levelColors = {
  veryWeak: {
    bar: "bg-gray-300 dark:bg-gray-600",
    text: "text-gray-500 dark:text-gray-400",
    border: "border-gray-300 dark:border-gray-600"
  },
  weak: {
    bar: "bg-red-500",
    text: "text-red-500",
    border: "border-red-500"
  },
  soso: {
    bar: "bg-orange-400",
    text: "text-orange-400",
    border: "border-orange-400"
  },
  good: {
    bar: "bg-lime-500",
    text: "text-lime-500",
    border: "border-lime-500"
  },
  strong: {
    bar: "bg-green-500",
    text: "text-green-500",
    border: "border-green-500"
  }
};
function CheckIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      className: clsx.clsx("w-4 h-4", className),
      children: /* @__PURE__ */ jsxRuntime.jsx(
        "path",
        {
          fillRule: "evenodd",
          d: "M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z",
          clipRule: "evenodd"
        }
      )
    }
  );
}
function XIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      className: clsx.clsx("w-4 h-4", className),
      children: /* @__PURE__ */ jsxRuntime.jsx(
        "path",
        {
          d: "M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
        }
      )
    }
  );
}
function EyeIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      className: clsx.clsx("w-5 h-5", className),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "path",
          {
            fillRule: "evenodd",
            d: "M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z",
            clipRule: "evenodd"
          }
        )
      ]
    }
  );
}
function EyeSlashIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      className: clsx.clsx("w-5 h-5", className),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "path",
          {
            fillRule: "evenodd",
            d: "M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z",
            clipRule: "evenodd"
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" })
      ]
    }
  );
}
function InfoIcon({ className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      className: clsx.clsx("w-4 h-4", className),
      children: /* @__PURE__ */ jsxRuntime.jsx(
        "path",
        {
          fillRule: "evenodd",
          d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
          clipRule: "evenodd"
        }
      )
    }
  );
}
function PasswordStrength({
  value,
  onChange,
  locale = "en",
  mode = "full",
  levels = 5,
  maxRules = 2,
  showRulesOnValid = true,
  email,
  forbiddenWords,
  hideInput = false,
  className,
  barClassName,
  inputClassName,
  placeholder,
  label,
  showToggleVisibility = true,
  InputComponent,
  LabelComponent
}) {
  const [showPassword, setShowPassword] = react.useState(false);
  const inputId = react.useId();
  const translation = getTranslation(locale);
  const { level, passedRules, failedRules, score } = usePasswordStrength(value, {
    levels,
    email,
    forbiddenWords
  });
  const colors = levelColors[level];
  const activeBars = levelToActiveBars(level, levels);
  const displayRules = [
    ...failedRules.slice(0, maxRules),
    ...showRulesOnValid ? passedRules.slice(0, Math.max(0, maxRules - failedRules.length)) : []
  ].slice(0, maxRules);
  const hasValue = value && value.length > 0;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: clsx.clsx("w-full space-y-2", className), children: [
    !hideInput && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-1.5", children: [
      label !== void 0 ? label && (LabelComponent ? /* @__PURE__ */ jsxRuntime.jsx(LabelComponent, { htmlFor: inputId, children: label }) : /* @__PURE__ */ jsxRuntime.jsx(
        "label",
        {
          htmlFor: inputId,
          className: "block text-sm font-medium text-gray-900 dark:text-gray-100",
          children: label
        }
      )) : LabelComponent ? /* @__PURE__ */ jsxRuntime.jsx(LabelComponent, { htmlFor: inputId, children: translation.label }) : /* @__PURE__ */ jsxRuntime.jsx(
        "label",
        {
          htmlFor: inputId,
          className: "block text-sm font-medium text-gray-900 dark:text-gray-100",
          children: translation.label
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative", children: [
        InputComponent ? /* @__PURE__ */ jsxRuntime.jsx(
          InputComponent,
          {
            id: inputId,
            type: showPassword ? "text" : "password",
            value,
            onChange: (e) => onChange == null ? void 0 : onChange(e.target.value),
            placeholder: placeholder || translation.placeholder,
            className: clsx.clsx(
              "pr-10",
              hasValue && colors.border,
              inputClassName
            )
          }
        ) : /* @__PURE__ */ jsxRuntime.jsx(
          "input",
          {
            id: inputId,
            type: showPassword ? "text" : "password",
            value,
            onChange: (e) => onChange == null ? void 0 : onChange(e.target.value),
            placeholder: placeholder || translation.placeholder,
            className: clsx.clsx(
              "w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-offset-0",
              hasValue ? colors.border : "border-gray-300 dark:border-gray-700",
              hasValue && `focus:ring-${level === "strong" ? "green" : level === "good" ? "lime" : level === "soso" ? "orange" : level === "weak" ? "red" : "gray"}-500/30`,
              inputClassName
            )
          }
        ),
        showToggleVisibility && /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowPassword(!showPassword),
            className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
            tabIndex: -1,
            children: showPassword ? /* @__PURE__ */ jsxRuntime.jsx(EyeIcon, {}) : /* @__PURE__ */ jsxRuntime.jsx(EyeSlashIcon, {})
          }
        )
      ] })
    ] }),
    hasValue && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
      mode === "full" && displayRules.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 space-y-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: translation.passwordMustInclude }),
        /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "space-y-1", children: displayRules.map((ruleId) => {
          const isPassed = passedRules.includes(ruleId);
          const ruleLabel = translation.rules[ruleId];
          return /* @__PURE__ */ jsxRuntime.jsxs(
            "li",
            {
              className: clsx.clsx(
                "flex items-center gap-2 text-sm transition-colors",
                isPassed ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"
              ),
              children: [
                isPassed ? /* @__PURE__ */ jsxRuntime.jsx(CheckIcon, { className: "text-green-500 flex-shrink-0" }) : /* @__PURE__ */ jsxRuntime.jsx(XIcon, { className: "text-gray-400 flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { children: ruleLabel })
              ]
            },
            ruleId
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-gray-600 dark:text-gray-400 font-medium", children: mode === "full" ? "Password Strength" : "" }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: clsx.clsx("font-medium", colors.text), children: translation.levels[level] }),
            mode === "bar-only" && /* @__PURE__ */ jsxRuntime.jsx(InfoIcon, { className: colors.text })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: clsx.clsx("flex gap-1", barClassName), children: Array.from({ length: levels }).map((_, index) => /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            className: clsx.clsx(
              "h-1 flex-1 rounded-full transition-all duration-300",
              index < activeBars ? colors.bar : "bg-gray-200 dark:bg-gray-700"
            )
          },
          index
        )) })
      ] })
    ] })
  ] });
}
var PasswordStrength_default = PasswordStrength;

exports.PasswordStrength = PasswordStrength;
exports.default = PasswordStrength_default;
exports.defaultRules = defaultRules;
exports.evaluatePassword = evaluatePassword;
exports.getTranslation = getTranslation;
exports.levelToActiveBars = levelToActiveBars;
exports.optionalRules = optionalRules;
exports.translations = translations;
exports.usePasswordStrength = usePasswordStrength;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map