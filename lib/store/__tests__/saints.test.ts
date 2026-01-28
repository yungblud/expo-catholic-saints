import { SaintSchema, type Saint } from '@/lib/types/saints';

describe('Saint Type Validation', () => {
  const validSaint: Saint = {
    id: 'francis-assisi',
    nameKo: '아시시의 성 프란치스코',
    nameEn: 'Saint Francis of Assisi',
    nameLatin: 'Franciscus Assisiensis',
    shortName: '프란치스코',
    feastMonth: 10,
    feastDay: 4,
    patronages: ['동물', '환경'],
    patronageCategories: ['cause', 'location'],
    biography:
      '아시시의 성 프란치스코는 이탈리아의 수도자이자 프란치스코회의 창설자입니다. 부유한 상인의 아들로 태어났으나 모든 것을 버리고 가난과 청빈의 삶을 선택했습니다.',
    birthYear: 1182,
    deathYear: 1226,
    canonizationYear: 1228,
    initials: '프',
  };

  it('should validate a valid saint object', () => {
    const result = SaintSchema.safeParse(validSaint);
    expect(result.success).toBe(true);
  });

  it('should reject saint with invalid id format', () => {
    const invalidSaint = { ...validSaint, id: 'Invalid ID With Spaces' };
    const result = SaintSchema.safeParse(invalidSaint);
    expect(result.success).toBe(false);
  });

  it('should reject saint with empty nameKo', () => {
    const invalidSaint = { ...validSaint, nameKo: '' };
    const result = SaintSchema.safeParse(invalidSaint);
    expect(result.success).toBe(false);
  });

  it('should reject saint with invalid feastMonth', () => {
    const invalidSaint = { ...validSaint, feastMonth: 13 };
    const result = SaintSchema.safeParse(invalidSaint);
    expect(result.success).toBe(false);
  });

  it('should reject saint with invalid feastDay', () => {
    const invalidSaint = { ...validSaint, feastDay: 32 };
    const result = SaintSchema.safeParse(invalidSaint);
    expect(result.success).toBe(false);
  });

  it('should reject saint with short biography', () => {
    const invalidSaint = { ...validSaint, biography: '짧은 약력' };
    const result = SaintSchema.safeParse(invalidSaint);
    expect(result.success).toBe(false);
  });

  it('should allow optional fields to be undefined', () => {
    const saintWithoutOptional: Partial<Saint> = {
      ...validSaint,
      nameLatin: undefined,
      birthYear: undefined,
      deathYear: undefined,
      canonizationYear: undefined,
    };
    const result = SaintSchema.safeParse(saintWithoutOptional);
    expect(result.success).toBe(true);
  });

  it('should validate patronageCategories enum values', () => {
    const invalidSaint = {
      ...validSaint,
      patronageCategories: ['invalid-category'],
    };
    const result = SaintSchema.safeParse(invalidSaint);
    expect(result.success).toBe(false);
  });
});
