# 성인 데이터 관리 가이드

## 개요

성인 데이터는 `data/saints.json`에 저장되며, Zod 스키마로 검증됩니다.
데이터를 빠르게 채우는 방법을 제공합니다.

## 방법 1: Claude 웹 채팅으로 수동 생성 (소량 추가 / 데이터 보완)

한 번에 20~50명씩 생성 가능. Wikidata 데이터의 빈 필드 보완에도 활용.

### 프롬프트 템플릿

아래를 Claude ([claude.ai](https://claude.ai))에 붙여넣기:

```
다음 가톨릭 성인들의 데이터를 아래 JSON 형식으로 생성해줘.
한국어 이름은 한국 천주교 주교회의 공식 표기법 기준으로 작성.

[조건 예시]
- "2월 축일 가톨릭 성인 30명"
- "수호성인이 직업 관련된 성인 20명"
- 또는 특정 성인 목록

형식:
{
  "saints": [
    {
      "id": "lowercase-hyphen-only",
      "nameKo": "한국 천주교 공식 표기",
      "nameEn": "Saint ...",
      "nameLatin": "라틴어명 (선택)",
      "shortName": "짧은 이름 (한 단어)",
      "feastMonth": 숫자,
      "feastDay": 숫자,
      "patronages": ["수호 대상 한국어"],
      "patronageCategories": ["occupation"|"location"|"situation"|"illness"|"cause"|"other"],
      "biography": "한국어 전기 50자 이상",
      "birthYear": 숫자 (선택),
      "deathYear": 숫자 (선택),
      "canonizationYear": 숫자 (선택),
      "initials": "한글 1자"
    }
  ]
}
```

생성된 JSON을 `data/saints-batch-N.json`으로 저장 후:

```bash
npx tsx scripts/bulk-update-saints.ts data/saints-batch-N.json
```

---

## Wikidata 데이터 보완

Wikidata로 자동 수집한 데이터는 `patronages`가 비어있고 `biography`가 단순합니다.
보완이 필요한 성인 목록 추출:

```bash
# patronages가 빈 성인 수 확인
node -e "
const d = require('./data/saints.json');
const empty = d.saints.filter(s => s.patronages.length === 0);
console.log('patronages 없는 성인:', empty.length);
"
```

비어있는 항목들은 방법 2(Claude 웹 채팅)로 보완하거나 직접 편집합니다.

---

## 데이터 검증

병합 전후 언제든지 실행 가능:

```bash
npx tsx scripts/bulk-update-saints.ts data/saints-batch-N.json
# 내부적으로 Zod 스키마 전체 검증 수행
```

---

## 참고: 신뢰할 수 있는 출처

| 출처                                                      | 용도                          |
| --------------------------------------------------------- | ----------------------------- |
| [한국 천주교 주교회의](https://cbck.or.kr)                | 한국어 성인명, 축일 공식 표기 |
| [Vatican News](https://www.vaticannews.va)                | 시성/시복 공식 정보           |
| [Catholic Online Saints](https://www.catholic.org/saints) | 영문 성인 정보, 수호 분야     |
| [Wikidata](https://query.wikidata.org)                    | 구조화 데이터 대량 수집       |

---

## 관련 파일

| 파일                            | 역할                           |
| ------------------------------- | ------------------------------ |
| `data/saints.json`              | 메인 데이터 파일               |
| `scripts/bulk-update-saints.ts` | 배치 파일을 saints.json에 병합 |
| `lib/types/saints.ts`           | Zod 스키마 정의                |
