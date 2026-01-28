import { formatDate, getTodayMonthDay, formatMonthDay, isToday } from '@/lib/utils/dateUtils';

describe('dateUtils', () => {
  describe('formatDate', () => {
    it('should format date as YYYY-MM-DD', () => {
      const date = new Date(2026, 0, 28); // January 28, 2026
      expect(formatDate(date)).toBe('2026-01-28');
    });

    it('should pad single digit months and days', () => {
      const date = new Date(2026, 4, 5); // May 5, 2026
      expect(formatDate(date)).toBe('2026-05-05');
    });
  });

  describe('getTodayMonthDay', () => {
    it('should return current month and day', () => {
      const result = getTodayMonthDay();
      const today = new Date();
      expect(result.month).toBe(today.getMonth() + 1);
      expect(result.day).toBe(today.getDate());
    });
  });

  describe('formatMonthDay', () => {
    it('should format month/day as MM-DD', () => {
      expect(formatMonthDay(1, 15)).toBe('01-15');
      expect(formatMonthDay(12, 25)).toBe('12-25');
    });

    it('should pad single digit values', () => {
      expect(formatMonthDay(5, 3)).toBe('05-03');
    });
  });

  describe('isToday', () => {
    it('should return true for today', () => {
      const today = new Date();
      expect(isToday(today.getMonth() + 1, today.getDate())).toBe(true);
    });

    it('should return false for other days', () => {
      expect(isToday(1, 1)).toBe(new Date().getMonth() === 0 && new Date().getDate() === 1);
    });
  });
});
