import { normalizeString, getInitials, containsKorean } from '@/lib/utils/stringUtils';

describe('stringUtils', () => {
  describe('normalizeString', () => {
    it('should convert string to lowercase', () => {
      expect(normalizeString('FRANCIS')).toBe('francis');
    });

    it('should trim whitespace', () => {
      expect(normalizeString('  Francis  ')).toBe('francis');
    });

    it('should handle Korean characters', () => {
      expect(normalizeString('프란치스코')).toBe('프란치스코');
    });

    it('should handle mixed Korean and English', () => {
      expect(normalizeString('Saint 프란치스코')).toBe('saint 프란치스코');
    });
  });

  describe('getInitials', () => {
    it('should return first character of Korean name', () => {
      expect(getInitials('프란치스코')).toBe('프');
    });

    it('should return first character of English name', () => {
      expect(getInitials('Francis')).toBe('F');
    });

    it('should handle empty string', () => {
      expect(getInitials('')).toBe('?');
    });

    it('should handle whitespace-only string', () => {
      expect(getInitials('   ')).toBe('?');
    });
  });

  describe('containsKorean', () => {
    it('should return true for Korean text', () => {
      expect(containsKorean('프란치스코')).toBe(true);
    });

    it('should return false for English text', () => {
      expect(containsKorean('Francis')).toBe(false);
    });

    it('should return true for mixed text', () => {
      expect(containsKorean('Saint 프란치스코')).toBe(true);
    });

    it('should return false for empty string', () => {
      expect(containsKorean('')).toBe(false);
    });
  });
});
