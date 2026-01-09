"use client";

import React, { useState, useId, useEffect, useMemo, useCallback } from "react";
import { clsx } from "clsx";
import type { PasswordStrengthProps, StrengthLevel } from "./types";
import { usePasswordStrength, levelToActiveBars } from "./usePasswordStrength";
import {
  loadTranslation,
  getTranslationSync,
  type Translation,
} from "./translations/index";
import { CheckIcon, XIcon, EyeIcon, EyeSlashIcon } from "./icons";

// Strength level colors
const levelColors: Record<StrengthLevel, { bar: string; text: string }> = {
  veryWeak: {
    bar: "bg-gray-300 dark:bg-gray-600",
    text: "text-gray-500 dark:text-gray-400",
  },
  weak: {
    bar: "bg-red-500",
    text: "text-red-500",
  },
  soso: {
    bar: "bg-orange-400",
    text: "text-orange-400",
  },
  good: {
    bar: "bg-lime-500",
    text: "text-lime-500",
  },
  strong: {
    bar: "bg-green-500",
    text: "text-green-500",
  },
};

export function PasswordStrength({
  value,
  onChange,
  locale = "en",
  barsNumber = 5,
  maxRules = 2,
  email,
  forbiddenWords,
  className,
  barClassName,
  inputClassName,
  placeholder,
  label,
  showToggleVisibility = true,
  toggleTabIndex = -1,
  InputComponent,
  LabelComponent,
}: PasswordStrengthProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [translation, setTranslation] = useState<Translation>(() =>
    getTranslationSync(locale)
  );
  const inputId = useId();

  // Lazy load translation when locale changes
  useEffect(() => {
    loadTranslation(locale).then(setTranslation);
  }, [locale]);

  const { level, passedRules, failedRules } = usePasswordStrength(value, {
    barsNumber,
    email,
    forbiddenWords,
  });

  const colors = levelColors[level];
  const activeBars = levelToActiveBars(level, barsNumber);

  // Memoized display rules calculation
  const displayRules = useMemo(
    () =>
      [
        ...failedRules.slice(0, maxRules),
        ...passedRules.slice(0, Math.max(0, maxRules - failedRules.length)),
      ].slice(0, maxRules),
    [failedRules, passedRules, maxRules]
  );

  // Memoized onChange handler
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    },
    [onChange]
  );

  const hasValue = value && value.length > 0;

  return (
    <div className={clsx("w-full space-y-2", className)}>
      {/* Input field */}
      <div className="space-y-1.5">
        {label !== undefined ? (
          label &&
          (LabelComponent ? (
            <LabelComponent htmlFor={inputId}>{label}</LabelComponent>
          ) : (
            <label
              htmlFor={inputId}
              className="block text-sm font-medium text-gray-900 dark:text-gray-100"
            >
              {label}
            </label>
          ))
        ) : LabelComponent ? (
          <LabelComponent htmlFor={inputId}>{translation.label}</LabelComponent>
        ) : (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-900 dark:text-gray-100"
          >
            {translation.label}
          </label>
        )}
        <div className="relative">
          {InputComponent ? (
            <InputComponent
              id={inputId}
              type={showPassword ? "text" : "password"}
              value={value}
              onChange={handleChange}
              placeholder={placeholder || translation.placeholder}
              className={clsx("pr-10", inputClassName)}
            />
          ) : (
            <input
              id={inputId}
              type={showPassword ? "text" : "password"}
              value={value}
              onChange={handleChange}
              placeholder={placeholder || translation.placeholder}
              className={clsx(
                "w-full px-3 py-2 rounded-lg border bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-offset-0",
                hasValue &&
                  `focus:ring-${
                    level === "strong"
                      ? "green"
                      : level === "good"
                      ? "lime"
                      : level === "soso"
                      ? "orange"
                      : level === "weak"
                      ? "red"
                      : "gray"
                  }-500/30`,
                inputClassName
              )}
            />
          )}
          {showToggleVisibility && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer"
              tabIndex={toggleTabIndex}
            >
              {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
            </button>
          )}
        </div>
      </div>

      {/* Strength indicator */}
      {hasValue && (
        <div className="space-y-2">
          {/* Rules section with strength bar inside (when maxRules > 0) */}
          {maxRules > 0 && displayRules.length > 0 && (
            <div className="p-3 rounded-lg bg-[#f9f9f9] dark:bg-[#eeeeee0f] space-y-2 mt-[17px]">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {translation.passwordMustInclude}
              </p>
              <ul className="space-y-1">
                {displayRules.map((ruleId) => {
                  const isPassed = passedRules.includes(ruleId);
                  const ruleLabel =
                    translation.rules[ruleId as keyof typeof translation.rules];

                  return (
                    <li
                      key={ruleId}
                      className={clsx(
                        "flex items-center gap-[10px] text-sm transition-colors",
                        isPassed
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-600 dark:text-gray-400"
                      )}
                    >
                      {isPassed ? (
                        <CheckIcon className="text-blue-500 shrink-0" />
                      ) : (
                        <XIcon className="text-gray-400 shrink-0" />
                      )}
                      <span className="text-black dark:text-white">
                        {ruleLabel}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {/* Strength bars and label inside card */}
              <div className="space-y-1.5 pt-[6px] pb-2 border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    {translation.passwordStrength}
                  </span>
                  <span className={clsx("font-medium", colors.text)}>
                    {translation.levels[level]}
                  </span>
                </div>
                <div className={clsx("flex gap-1", barClassName)}>
                  {Array.from({ length: barsNumber }).map((_, index) => (
                    <div
                      key={index}
                      className={clsx(
                        "h-[3.5px] mt-[6px] flex-1 rounded-full transition-all duration-300",
                        index < activeBars
                          ? colors.bar
                          : "bg-gray-200 dark:bg-gray-700"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Strength bars only (when maxRules === 0) */}
          {maxRules === 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400 font-medium">
                  {translation.passwordStrength}
                </span>
                <span className={clsx("font-medium", colors.text)}>
                  {translation.levels[level]}
                </span>
              </div>
              <div className={clsx("flex gap-1", barClassName)}>
                {Array.from({ length: barsNumber }).map((_, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "h-[3.5px] flex-1 mt-0.5 rounded-full transition-all duration-300",
                      index < activeBars
                        ? colors.bar
                        : "bg-gray-200 dark:bg-gray-700"
                    )}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PasswordStrength;
