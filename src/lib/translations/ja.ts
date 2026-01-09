import type { Translation } from './types';

export const ja: Translation = {
  levels: {
    veryWeak: '非常に弱い',
    weak: '弱い',
    soso: '普通',
    good: '良い',
    strong: '強い',
  },
  passwordMustInclude: 'パスワードには以下が必要です',
  passwordStrength: 'パスワード強度',
  rules: {
    minLength: '12文字以上',
    uppercase: '大文字を1つ以上',
    lowercase: '小文字を1つ以上',
    number: '数字を1つ以上',
    special: '特殊文字を1つ以上',
    noEmail: 'メールアドレスを含めない',
    noForbiddenWords: '禁止語を含めない',
  },
  placeholder: 'パスワードを入力',
  label: 'パスワード',
};
