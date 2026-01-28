module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 새로운 기능
        'fix', // 버그 수정
        'docs', // 문서 변경
        'style', // 코드 스타일 (포매팅, 세미콜론 등)
        'refactor', // 리팩토링
        'perf', // 성능 개선
        'test', // 테스트 추가/수정
        'build', // 빌드 시스템 또는 외부 종속성
        'ci', // CI 설정
        'chore', // 기타 변경사항
        'revert', // 커밋 되돌리기
      ],
    ],
    'subject-case': [0], // 한글 커밋 메시지 허용
    'body-max-line-length': [0], // body 줄 길이 제한 해제
  },
};
