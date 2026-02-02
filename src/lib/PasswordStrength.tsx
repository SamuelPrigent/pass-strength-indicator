"use client";

import React, { useMemo } from "react";
import { clsx } from "clsx";
import type { PasswordStrengthProps, StrengthLevel } from "./types";
import { usePasswordStrength, levelToActiveBars } from "./usePasswordStrength";
import { getTranslation, type Translation } from "./translations/index";
import { CheckIcon, XIcon } from "./icons";

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

/* ── Internal sub-components ── */

/** Renders the "Password must include" heading + validation rules list. */
function RulesList({
  displayRules,
  passedRules,
  translation,
}: {
  displayRules: string[];
  passedRules: string[];
  translation: Translation;
}) {
  return (
    <>
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
                  : "text-gray-600 dark:text-gray-400",
              )}
            >
              {isPassed ? (
                <CheckIcon className="text-blue-500 shrink-0" />
              ) : (
                <XIcon className="text-gray-400 shrink-0" />
              )}
              <span className="text-black dark:text-white">{ruleLabel}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
}

/** Renders the strength label row + bar (full or segmented). */
function StrengthBar({
  isFull,
  percentage,
  activeBars,
  barsNumber,
  colors,
  barClassName,
  level,
  translation,
  segmentSpacing = "mt-[6px]",
}: {
  isFull: boolean;
  percentage: number;
  activeBars: number;
  barsNumber: number;
  colors: { bar: string; text: string };
  barClassName?: string;
  level: StrengthLevel;
  translation: Translation;
  segmentSpacing?: string;
}) {
  return (
    <>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-400 font-medium">
          {translation.passwordStrength}
        </span>
        <span
          className={clsx("font-medium", colors.text)}
          aria-live="polite"
        >
          {translation.levels[level]}
        </span>
      </div>
      {isFull ? (
        <div
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={translation.passwordStrength}
          className={clsx(
            "h-1 w-full rounded-full bg-gray-200 dark:bg-gray-700",
            barClassName,
          )}
        >
          <div
            className={clsx(
              "h-1 rounded-full transition-all duration-300",
              colors.bar,
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      ) : (
        <div
          role="progressbar"
          aria-valuenow={activeBars}
          aria-valuemin={0}
          aria-valuemax={barsNumber}
          aria-label={translation.passwordStrength}
          className={clsx("flex gap-1", barClassName)}
        >
          {Array.from({ length: barsNumber }).map((_, index) => (
            <div
              key={index}
              className={clsx(
                "h-[3.5px] flex-1 rounded-full transition-all duration-300",
                segmentSpacing,
                index < activeBars
                  ? colors.bar
                  : "bg-gray-200 dark:bg-gray-700",
              )}
            />
          ))}
        </div>
      )}
    </>
  );
}

/* ── Main component ── */

export const PasswordStrength = React.memo(function PasswordStrength({
  value,
  locale = "en",
  barsNumber = 5,
  maxRules = 2,
  email,
  forbiddenWords,
  className,
  barClassName,
  barMode = "default",
  indicatorBackground,
}: PasswordStrengthProps) {
  const translation = getTranslation(locale);

  const { level, passedRules, failedRules, percentage } = usePasswordStrength(
    value,
    { barsNumber, email, forbiddenWords },
  );

  const colors = levelColors[level];
  const activeBars = levelToActiveBars(level, barsNumber);
  const isFull = barMode === "full";

  const displayRules = useMemo(
    () =>
      [
        ...failedRules.slice(0, maxRules),
        ...passedRules.slice(0, Math.max(0, maxRules - failedRules.length)),
      ].slice(0, maxRules),
    [failedRules, passedRules, maxRules],
  );

  const hasValue = value && value.length > 0;
  const hasRules = maxRules > 0 && displayRules.length > 0;

  // Resolve indicatorBackground
  let cardBgClass: string | undefined;
  let cardBgStyle: React.CSSProperties | undefined;

  if (indicatorBackground) {
    if (typeof indicatorBackground === "object") {
      cardBgStyle = {
        "--rcbg-l": indicatorBackground.light,
        "--rcbg-d": indicatorBackground.dark,
      } as React.CSSProperties;
      cardBgClass = "bg-[var(--rcbg-l)] dark:bg-[var(--rcbg-d)]";
    } else {
      cardBgClass = indicatorBackground;
    }
  }

  const showCard = hasRules && !!indicatorBackground;

  const barProps = {
    isFull,
    percentage,
    activeBars,
    barsNumber,
    colors,
    barClassName,
    level,
    translation,
  } as const;

  return (
    <div className={clsx("w-full", className)}>
      {hasValue && (
        <>
          {/* ── Card layout (rules + bar inside card) ── */}
          {showCard && (
            <div
              className={clsx(
                "p-3 rounded-lg space-y-2 mt-[17px]",
                cardBgClass,
              )}
              style={cardBgStyle}
            >
              <RulesList
                displayRules={displayRules}
                passedRules={passedRules}
                translation={translation}
              />
              <div
                className={clsx("space-y-1.5", !isFull && "pt-[6px] pb-2")}
              >
                <StrengthBar {...barProps} />
              </div>
            </div>
          )}

          {/* ── Clean layout (rules without card) ── */}
          {hasRules && !showCard && (
            <div className="space-y-3 mt-4">
              <div className="space-y-1.5">
                <RulesList
                  displayRules={displayRules}
                  passedRules={passedRules}
                  translation={translation}
                />
              </div>
              <div className="space-y-1.5 mt-3.5">
                <StrengthBar {...barProps} />
              </div>
            </div>
          )}

          {/* ── No rules — bar only ── */}
          {!hasRules && (
            <div className="space-y-1.5">
              <StrengthBar {...barProps} segmentSpacing="mt-0.5" />
            </div>
          )}
        </>
      )}
    </div>
  );
});

export default PasswordStrength;
