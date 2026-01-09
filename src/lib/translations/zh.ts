import type { Translation } from './types';

export const zh: Translation = {
  levels: {
    veryWeak: '非常弱',
    weak: '弱',
    soso: '中等',
    good: '良好',
    strong: '强',
  },
  passwordMustInclude: '您的密码必须包含',
  passwordStrength: '密码强度',
  rules: {
    minLength: '至少12个字符',
    uppercase: '至少一个大写字母',
    lowercase: '至少一个小写字母',
    number: '至少一个数字',
    special: '至少一个特殊字符',
    noEmail: '不能包含您的邮箱',
    noForbiddenWords: '不能包含禁用词',
  },
  placeholder: '请输入密码',
  label: '密码',
};
