'use client';

import { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { CodeBlock } from '@/components/CodeBlock';
import { CopyButton } from '@/components/CopyButton';
import { PasswordStrength } from '@/lib';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

// Code examples
const basicExample = `import { useState } from "react";
import { PasswordStrength } from "shadcn-password-strength";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function BasicExample() {
  const [password, setPassword] = useState("");

  return (
    <PasswordStrength
      value={password}
      onChange={setPassword}
      InputComponent={Input}
      LabelComponent={Label}
    />
  );
}`;

const basicExampleJS = `import { useState } from "react";
import { PasswordStrength } from "shadcn-password-strength";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function BasicExample() {
  const [password, setPassword] = useState("");

  return (
    <PasswordStrength
      value={password}
      onChange={setPassword}
      InputComponent={Input}
      LabelComponent={Label}
    />
  );
}`;

const barOnlyExample = `import { useState } from "react";
import { PasswordStrength } from "shadcn-password-strength";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function BarOnlyExample() {
  const [password, setPassword] = useState("");

  return (
    <PasswordStrength
      value={password}
      onChange={setPassword}
      mode="bar-only"
      InputComponent={Input}
      LabelComponent={Label}
    />
  );
}`;

const frenchExample = `import { useState } from "react";
import { PasswordStrength } from "shadcn-password-strength";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FrenchExample() {
  const [password, setPassword] = useState("");

  return (
    <PasswordStrength
      value={password}
      onChange={setPassword}
      locale="fr"
      InputComponent={Input}
      LabelComponent={Label}
    />
  );
}`;

const customExample = `import { useState } from "react";
import { PasswordStrength } from "shadcn-password-strength";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CustomExample() {
  const [password, setPassword] = useState("");

  return (
    <PasswordStrength
      value={password}
      onChange={setPassword}
      locale="en"
      mode="full"
      levels={5}
      maxRules={3}
      email="user@example.com"
      InputComponent={Input}
      LabelComponent={Label}
    />
  );
}`;

const threeLevelsExample = `import { useState } from "react";
import { PasswordStrength } from "shadcn-password-strength";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ThreeLevelsExample() {
  const [password, setPassword] = useState("");

  return (
    <PasswordStrength
      value={password}
      onChange={setPassword}
      levels={3}
      mode="bar-only"
      InputComponent={Input}
      LabelComponent={Label}
    />
  );
}`;

export default function Home() {
  const [basicPassword, setBasicPassword] = useState('MyP@ssw0rd123');
  const [barOnlyPassword, setBarOnlyPassword] = useState('Str0ng!');
  const [frenchPassword, setFrenchPassword] = useState('MonMotDePasse');
  const [customPassword, setCustomPassword] = useState('');
  const [threeLevelsPassword, setThreeLevelsPassword] = useState('Test123');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Theme Toggle - Sticky top right */}
      <ThemeToggle />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero with Basic Example */}
        <section className="py-8">
          <div className="text-center mb-5">
            <Image className="mx-auto mb-6" width={56} height={56} src="/npm.svg" alt="logo" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              shadcn-password-indicator
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              A customizable, accessible password strength component for React. Multi-language
              support, multiple display modes, and dark mode.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-4 mt-2 mb-10">
            <a
              href="#setup"
              className="px-5 py-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm"
            >
              Get Started
            </a>
            <a
              href="https://github.com/SamuelPrigent/shadcn-password-strength"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-sm"
            >
              GitHub
            </a>
          </div>

          {/* Basic Example - Featured */}
          <CodeBlock
            code={basicExample}
            jsCode={basicExampleJS}
            preview={
              <PasswordStrength
                value={basicPassword}
                onChange={setBasicPassword}
                InputComponent={Input}
                LabelComponent={Label}
              />
            }
          />
        </section>

        {/* Setup */}
        <section id="setup" className="py-12 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Setup</h2>

          <div className="space-y-6">
            {/* Step 1: Tailwind */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                1. Make sure Tailwind CSS is installed
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                If not, follow the{' '}
                <a
                  href="https://tailwindcss.com/docs/installation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 dark:text-gray-100 underline"
                >
                  Tailwind CSS installation guide
                </a>
              </p>
            </div>

            {/* Step 2: shadcn/ui */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                2. Initialize shadcn/ui
              </h3>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                  <code>npx shadcn@latest init</code>
                </pre>
                <CopyButton text="npx shadcn@latest init" className="absolute top-2 right-2" />
              </div>
            </div>

            {/* Step 3: Install shadcn components */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                3. Add Input and Label components
              </h3>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                  <code>npx shadcn@latest add input label</code>
                </pre>
                <CopyButton
                  text="npx shadcn@latest add input label"
                  className="absolute top-2 right-2"
                />
              </div>
            </div>

            {/* Step 4: Install package */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                4. Install the package
              </h3>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                  <code>npm install shadcn-password-strength</code>
                </pre>
                <CopyButton
                  text="npm install shadcn-password-strength"
                  className="absolute top-2 right-2"
                />
              </div>
            </div>

            {/* Step 5: Import and use */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                5. Import and use
              </h3>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto font-mono text-sm">
                  <code>{`import { PasswordStrength } from "shadcn-password-strength";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";`}</code>
                </pre>
                <CopyButton
                  text={`import { PasswordStrength } from "shadcn-password-strength";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";`}
                  className="absolute top-2 right-2"
                />
              </div>
            </div>
          </div>
        </section>

        {/* More Examples */}
        <section
          id="examples"
          className="py-12 border-t border-gray-200 dark:border-gray-800 space-y-10"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">More Examples</h2>

          {/* Bar Only */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Bar Only Mode
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Display only the strength bar without the password requirements list.
            </p>
            <CodeBlock
              code={barOnlyExample}
              preview={
                <PasswordStrength
                  value={barOnlyPassword}
                  onChange={setBarOnlyPassword}
                  mode="bar-only"
                  InputComponent={Input}
                  LabelComponent={Label}
                />
              }
            />
          </div>

          {/* French */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Multi-language Support
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Built-in support for English, French, and Spanish.
            </p>
            <CodeBlock
              code={frenchExample}
              preview={
                <PasswordStrength
                  value={frenchPassword}
                  onChange={setFrenchPassword}
                  locale="fr"
                  InputComponent={Input}
                  LabelComponent={Label}
                />
              }
            />
          </div>

          {/* Three Levels */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Configurable Levels
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Choose between 3, 4, or 5 strength levels.
            </p>
            <CodeBlock
              code={threeLevelsExample}
              preview={
                <PasswordStrength
                  value={threeLevelsPassword}
                  onChange={setThreeLevelsPassword}
                  levels={3}
                  mode="bar-only"
                  InputComponent={Input}
                  LabelComponent={Label}
                />
              }
            />
          </div>

          {/* Full Config */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Full Configuration
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Combine multiple options including email validation to prevent passwords containing
              user info.
            </p>
            <CodeBlock
              code={customExample}
              preview={
                <PasswordStrength
                  value={customPassword}
                  onChange={setCustomPassword}
                  locale="en"
                  mode="full"
                  levels={5}
                  maxRules={3}
                  email="user@example.com"
                  InputComponent={Input}
                  LabelComponent={Label}
                />
              }
            />
          </div>
        </section>

        {/* Props */}
        <section className="py-12 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Props</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">Prop</th>
                  <th className="py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">Type</th>
                  <th className="py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">
                    Default
                  </th>
                  <th className="py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-gray-800/50">
                  <td className="py-2 px-3 font-mono text-gray-900 dark:text-gray-100">value</td>
                  <td className="py-2 px-3 font-mono text-gray-600 dark:text-gray-400">string</td>
                  <td className="py-2 px-3 text-gray-500">required</td>
                  <td className="py-2 px-3 text-gray-600 dark:text-gray-400">Password value</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800/50">
                  <td className="py-2 px-3 font-mono text-gray-900 dark:text-gray-100">onChange</td>
                  <td className="py-2 px-3 font-mono text-gray-600 dark:text-gray-400">{`(value) => void`}</td>
                  <td className="py-2 px-3 text-gray-500">-</td>
                  <td className="py-2 px-3 text-gray-600 dark:text-gray-400">Change callback</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800/50">
                  <td className="py-2 px-3 font-mono text-gray-900 dark:text-gray-100">locale</td>
                  <td className="py-2 px-3 font-mono text-gray-600 dark:text-gray-400">{`"en" | "fr" | "es"`}</td>
                  <td className="py-2 px-3 text-gray-500">{`"en"`}</td>
                  <td className="py-2 px-3 text-gray-600 dark:text-gray-400">Language</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800/50">
                  <td className="py-2 px-3 font-mono text-gray-900 dark:text-gray-100">mode</td>
                  <td className="py-2 px-3 font-mono text-gray-600 dark:text-gray-400">{`"full" | "bar-only"`}</td>
                  <td className="py-2 px-3 text-gray-500">{`"full"`}</td>
                  <td className="py-2 px-3 text-gray-600 dark:text-gray-400">Display mode</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800/50">
                  <td className="py-2 px-3 font-mono text-gray-900 dark:text-gray-100">levels</td>
                  <td className="py-2 px-3 font-mono text-gray-600 dark:text-gray-400">
                    3 | 4 | 5
                  </td>
                  <td className="py-2 px-3 text-gray-500">5</td>
                  <td className="py-2 px-3 text-gray-600 dark:text-gray-400">Number of bars</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800/50">
                  <td className="py-2 px-3 font-mono text-gray-900 dark:text-gray-100">maxRules</td>
                  <td className="py-2 px-3 font-mono text-gray-600 dark:text-gray-400">number</td>
                  <td className="py-2 px-3 text-gray-500">2</td>
                  <td className="py-2 px-3 text-gray-600 dark:text-gray-400">Max rules shown</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800/50">
                  <td className="py-2 px-3 font-mono text-gray-900 dark:text-gray-100">email</td>
                  <td className="py-2 px-3 font-mono text-gray-600 dark:text-gray-400">string</td>
                  <td className="py-2 px-3 text-gray-500">-</td>
                  <td className="py-2 px-3 text-gray-600 dark:text-gray-400">Email to exclude</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800/50">
                  <td className="py-2 px-3 font-mono text-gray-900 dark:text-gray-100">
                    hideInput
                  </td>
                  <td className="py-2 px-3 font-mono text-gray-600 dark:text-gray-400">boolean</td>
                  <td className="py-2 px-3 text-gray-500">false</td>
                  <td className="py-2 px-3 text-gray-600 dark:text-gray-400">Hide input field</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800/50">
                  <td className="py-2 px-3 font-mono text-gray-900 dark:text-gray-100">
                    InputComponent
                  </td>
                  <td className="py-2 px-3 font-mono text-gray-600 dark:text-gray-400">
                    Component
                  </td>
                  <td className="py-2 px-3 text-gray-500">-</td>
                  <td className="py-2 px-3 text-gray-600 dark:text-gray-400">shadcn Input</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800/50">
                  <td className="py-2 px-3 font-mono text-gray-900 dark:text-gray-100">
                    LabelComponent
                  </td>
                  <td className="py-2 px-3 font-mono text-gray-600 dark:text-gray-400">
                    Component
                  </td>
                  <td className="py-2 px-3 text-gray-500">-</td>
                  <td className="py-2 px-3 text-gray-600 dark:text-gray-400">shadcn Label</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-500 text-sm">
            Built by{' '}
            <a
              href="https://github.com/SamuelPrigent"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:underline"
            >
              Samuel Prigent
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
