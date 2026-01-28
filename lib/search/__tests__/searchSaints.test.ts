import { searchSaints } from '@/lib/search/searchSaints';
import { initializeSaintsStore } from '@/lib/store/saints';

// Initialize store before tests
beforeAll(() => {
  initializeSaintsStore();
});

describe('searchSaints', () => {
  describe('name search', () => {
    it('should find saints by Korean name', () => {
      const results = searchSaints('프란치스코', 'name');
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].saint.nameKo).toContain('프란치스코');
    });

    it('should find saints by English name', () => {
      const results = searchSaints('Francis', 'name');
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].saint.nameEn.toLowerCase()).toContain('francis');
    });

    it('should find saints by partial name match', () => {
      const results = searchSaints('김대건', 'name');
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].saint.shortName).toBe('김대건');
    });

    it('should return empty array for no matches', () => {
      const results = searchSaints('존재하지않는성인', 'name');
      expect(results).toEqual([]);
    });

    it('should return empty array for empty query', () => {
      const results = searchSaints('', 'name');
      expect(results).toEqual([]);
    });

    it('should limit results when limit is specified', () => {
      const results = searchSaints('성', 'name', 3);
      expect(results.length).toBeLessThanOrEqual(3);
    });

    it('should return results with scores', () => {
      const results = searchSaints('프란치스코', 'name');
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].score).toBeGreaterThan(0);
      expect(results[0].score).toBeLessThanOrEqual(1);
    });
  });

  describe('patronage search', () => {
    it('should find saints by patronage', () => {
      const results = searchSaints('동물', 'patronage');
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].saint.patronages).toContain('동물');
    });

    it('should find saints by occupation patronage', () => {
      const results = searchSaints('의사', 'patronage');
      expect(results.length).toBeGreaterThan(0);
    });

    it('should return empty array for unknown patronage', () => {
      const results = searchSaints('존재하지않는수호분야', 'patronage');
      expect(results).toEqual([]);
    });
  });
});
