## saints.json의 biography schema 규격 맞추기

saints.json에서는 biography라는 field가 있습니다.
해당 field는 `lib/types/saints.ts`에서 `SaintSchema`와 엮여서 사용됩니다.
해당 SaintSchema에서 biography는 50글자 이상이어야 합니다.
현재 saints.json에서는 biography 규약이 맞지 않는 데이터들이 있습니다.

- [x] saints.json에서 biography가 SaintSchema의 규약과 맞지 않는 것을 찾아내기
- [x] 해당 데이터들을 조사하여 biography를 더 풍성하게 채우기
