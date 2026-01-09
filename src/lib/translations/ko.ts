import type { Translation } from './types';

export const ko: Translation = {
  levels: {
    veryWeak: '매우 약함',
    weak: '약함',
    soso: '보통',
    good: '좋음',
    strong: '강함',
  },
  passwordMustInclude: '비밀번호는 다음을 포함해야 합니다',
  passwordStrength: '비밀번호 강도',
  rules: {
    minLength: '최소 12자',
    uppercase: '대문자 1개 이상',
    lowercase: '소문자 1개 이상',
    number: '숫자 1개 이상',
    special: '특수문자 1개 이상',
    noEmail: '이메일 포함 불가',
    noForbiddenWords: '금지어 포함 불가',
  },
  placeholder: '비밀번호 입력',
  label: '비밀번호',
};
