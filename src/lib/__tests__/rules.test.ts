import { describe, it, expect } from 'vitest';
import { defaultRules, optionalRules, evaluatePassword } from '../rules';

describe('defaultRules', () => {
  describe('minLength', () => {
    const rule = defaultRules.find((r) => r.id === 'minLength')!;

    it('fails for passwords shorter than 12 characters', () => {
      expect(rule.test('short')).toBe(false);
      expect(rule.test('11charactr')).toBe(false);
    });

    it('passes for passwords of 12+ characters', () => {
      expect(rule.test('12characters')).toBe(true);
      expect(rule.test('longerpassword123')).toBe(true);
    });
  });

  describe('uppercase', () => {
    const rule = defaultRules.find((r) => r.id === 'uppercase')!;

    it('fails when no uppercase letter', () => {
      expect(rule.test('lowercase123!')).toBe(false);
    });

    it('passes when at least one uppercase letter', () => {
      expect(rule.test('Uppercase123!')).toBe(true);
      expect(rule.test('ABC')).toBe(true);
    });
  });

  describe('lowercase', () => {
    const rule = defaultRules.find((r) => r.id === 'lowercase')!;

    it('fails when no lowercase letter', () => {
      expect(rule.test('UPPERCASE123!')).toBe(false);
    });

    it('passes when at least one lowercase letter', () => {
      expect(rule.test('UPPER123!a')).toBe(true);
      expect(rule.test('abc')).toBe(true);
    });
  });

  describe('number', () => {
    const rule = defaultRules.find((r) => r.id === 'number')!;

    it('fails when no number', () => {
      expect(rule.test('NoNumbers!')).toBe(false);
    });

    it('passes when at least one number', () => {
      expect(rule.test('Has1Number')).toBe(true);
      expect(rule.test('123')).toBe(true);
    });
  });

  describe('special', () => {
    const rule = defaultRules.find((r) => r.id === 'special')!;

    it('fails when no special character', () => {
      expect(rule.test('NoSpecial123')).toBe(false);
    });

    it('passes for various special characters', () => {
      expect(rule.test('Has!')).toBe(true);
      expect(rule.test('Has@')).toBe(true);
      expect(rule.test('Has#')).toBe(true);
      expect(rule.test('Has$')).toBe(true);
      expect(rule.test('Has%')).toBe(true);
      expect(rule.test('Has^')).toBe(true);
      expect(rule.test('Has&')).toBe(true);
      expect(rule.test('Has*')).toBe(true);
      expect(rule.test('Has(')).toBe(true);
      expect(rule.test('Has)')).toBe(true);
      expect(rule.test('Has,')).toBe(true);
      expect(rule.test('Has.')).toBe(true);
      expect(rule.test('Has?')).toBe(true);
      expect(rule.test('Has:')).toBe(true);
      expect(rule.test('Has{')).toBe(true);
      expect(rule.test('Has}')).toBe(true);
      expect(rule.test('Has|')).toBe(true);
      expect(rule.test('Has<')).toBe(true);
      expect(rule.test('Has>')).toBe(true);
      expect(rule.test('Has_')).toBe(true);
      expect(rule.test('Has-')).toBe(true);
      expect(rule.test('Has+')).toBe(true);
      expect(rule.test('Has=')).toBe(true);
      expect(rule.test('Has[')).toBe(true);
      expect(rule.test('Has]')).toBe(true);
      expect(rule.test('Has\\')).toBe(true);
      expect(rule.test('Has/')).toBe(true);
      expect(rule.test('Has`')).toBe(true);
      expect(rule.test('Has~')).toBe(true);
      expect(rule.test('Has;')).toBe(true);
      expect(rule.test("Has'")).toBe(true);
    });
  });
});

describe('optionalRules', () => {
  describe('noEmail', () => {
    const rule = optionalRules.find((r) => r.id === 'noEmail')!;

    it('passes when no email option provided', () => {
      expect(rule.test('anypassword')).toBe(true);
      expect(rule.test('anypassword', {})).toBe(true);
    });

    it('passes when email username is too short (<4 chars)', () => {
      expect(rule.test('abc123password', { email: 'abc@example.com' })).toBe(true);
    });

    it('fails when password contains 4+ consecutive chars from email username', () => {
      expect(rule.test('johndoe123!', { email: 'johndoe@example.com' })).toBe(false);
      expect(rule.test('MyJohnPassword', { email: 'johndoe@example.com' })).toBe(false);
      expect(rule.test('test1234!', { email: 'test@example.com' })).toBe(false);
    });

    it('passes when password does not contain email parts', () => {
      expect(rule.test('SecurePass123!', { email: 'johndoe@example.com' })).toBe(true);
      expect(rule.test('CompletelyDifferent!1', { email: 'user@example.com' })).toBe(true);
    });

    it('is case insensitive', () => {
      expect(rule.test('JOHNDOE123!', { email: 'johndoe@example.com' })).toBe(false);
      expect(rule.test('JoHnDoE123!', { email: 'JOHNDOE@example.com' })).toBe(false);
    });
  });

  describe('noForbiddenWords', () => {
    const rule = optionalRules.find((r) => r.id === 'noForbiddenWords')!;

    it('passes when no forbidden words option provided', () => {
      expect(rule.test('password123')).toBe(true);
      expect(rule.test('password123', {})).toBe(true);
      expect(rule.test('password123', { forbiddenWords: [] })).toBe(true);
    });

    it('fails when password contains a forbidden word', () => {
      expect(rule.test('mypassword123', { forbiddenWords: ['password'] })).toBe(false);
      expect(rule.test('CompanyName2024', { forbiddenWords: ['company'] })).toBe(false);
    });

    it('passes when password does not contain forbidden words', () => {
      expect(rule.test('SecurePass123!', { forbiddenWords: ['password', 'company'] })).toBe(true);
    });

    it('is case insensitive', () => {
      expect(rule.test('PASSWORD123', { forbiddenWords: ['password'] })).toBe(false);
      expect(rule.test('PaSsWoRd123', { forbiddenWords: ['PASSWORD'] })).toBe(false);
    });
  });
});

describe('evaluatePassword', () => {
  describe('score calculation', () => {
    it('returns score 0 for empty password', () => {
      const result = evaluatePassword('');
      expect(result.score).toBe(0);
      expect(result.passedRules).toEqual([]);
      expect(result.failedRules).toEqual(['minLength', 'uppercase', 'lowercase', 'number', 'special']);
    });

    it('returns score 5 for a strong password meeting all rules', () => {
      const result = evaluatePassword('StrongPass123!');
      expect(result.score).toBe(5);
      expect(result.passedRules).toContain('minLength');
      expect(result.passedRules).toContain('uppercase');
      expect(result.passedRules).toContain('lowercase');
      expect(result.passedRules).toContain('number');
      expect(result.passedRules).toContain('special');
      expect(result.failedRules).toEqual([]);
    });

    it('returns partial score for passwords meeting some rules', () => {
      // Only lowercase - 1/5 rules = 1
      const result1 = evaluatePassword('onlylowercase');
      expect(result1.passedRules).toContain('minLength');
      expect(result1.passedRules).toContain('lowercase');
      expect(result1.score).toBe(2); // 2/5 = 0.4 * 5 = 2

      // Lowercase + uppercase + minLength - 3/5 = 3
      const result2 = evaluatePassword('MixedCaseOnly');
      expect(result2.score).toBe(3); // 3/5 = 0.6 * 5 = 3
    });
  });

  describe('email penalty', () => {
    it('applies -2 penalty when password contains email parts', () => {
      const result = evaluatePassword('Johndoe123!@#', { email: 'johndoe@example.com' });
      // Would be score 5 without penalty (all 6 rules pass except noEmail)
      // 5/6 * 5 = 4.17 ≈ 4, then -2 = 2
      expect(result.failedRules).toContain('noEmail');
      expect(result.score).toBeLessThanOrEqual(3);
    });

    it('no penalty when email check passes', () => {
      const result = evaluatePassword('StrongPass123!', { email: 'user@example.com' });
      expect(result.passedRules).toContain('noEmail');
      expect(result.score).toBe(5);
    });
  });

  describe('forbidden words penalty', () => {
    it('applies -2 penalty when password contains forbidden word', () => {
      const result = evaluatePassword('MyPassword123!', { forbiddenWords: ['password'] });
      expect(result.failedRules).toContain('noForbiddenWords');
      expect(result.score).toBeLessThanOrEqual(3);
    });

    it('no penalty when no forbidden words in password', () => {
      const result = evaluatePassword('StrongPass123!', { forbiddenWords: ['forbidden', 'word'] });
      expect(result.passedRules).toContain('noForbiddenWords');
      expect(result.score).toBe(5);
    });
  });

  describe('combined penalties', () => {
    it('applies both penalties when both conditions fail', () => {
      const result = evaluatePassword('Johndoepassword1!', {
        email: 'johndoe@example.com',
        forbiddenWords: ['password'],
      });
      expect(result.failedRules).toContain('noEmail');
      expect(result.failedRules).toContain('noForbiddenWords');
      // Score should be significantly reduced
      expect(result.score).toBeLessThanOrEqual(1);
    });
  });

  describe('edge cases', () => {
    it('handles special characters in forbidden words', () => {
      const result = evaluatePassword('test$pecial123A', { forbiddenWords: ['$pecial'] });
      expect(result.failedRules).toContain('noForbiddenWords');
    });

    it('handles unicode characters', () => {
      const result = evaluatePassword('Pässwörd123!');
      // Should still validate basic rules
      expect(result.passedRules).toContain('minLength');
      expect(result.passedRules).toContain('number');
      expect(result.passedRules).toContain('special');
    });
  });
});
