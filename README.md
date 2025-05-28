## 실행 방법

### 1. 로컬에서 실행

```bash
pnpm dev
```

[http://localhost:3000](http://localhost:3000)

### 2. 링크

[아직 배포 안됨!]()

<br/>

## 기술 스택

`next.js` `typescript` `tailwind css`

<br/>

## 요구사항

- [ ] 상품 리스트 페이지 (/products)
  - [ ] API 연결
  - [ ] UI
    - [ ] 20개 아이템 노출 (상품명 `title`, 상품설명 `description`, 썸네일 이미지 `thumbnail`, 별점 `rating`, 리뷰 수 `reviews`)
    - [ ] 보기 방식 구현 - 리스트형 (List) + 그리드형 (Grid)
    - [ ] 페이지 최초 진입 시 50% 확률로 랜덤 View 방식 → 24시간 이후 재접속 시 다시 랜덤 View 방식
    - [ ] 리스트 상단에 상품 생성 페이지(/products/new)로 이동하는 버튼
- [ ] 상품 생성 페이지 (/products/new)
  - [ ] API 연결
  - [ ] UI
    - [ ] form
    - [ ] 유효성 검사
      - [ ] title
      - [ ] description
      - [ ] price
      - [ ] discountPercentage
      - [ ] brand
    - [ ] price 에서 discountPercentage 로 계산된 결과물(최종가격)이 실시간으로 디스플레이
    - [ ] 생성 완료 시 상품 리스트 페이지(/products)로 이동

<br/>

## 개발 계획

초기 설정(eslint, prettier)
→ 기능 구현
→ UI, 컴포넌트 디자인 및 설계
→ 퍼블리싱

<br/>

## 커밋 prefix

|          | 설명          |
| :------- | :------------ |
| feat     | 기능 추가     |
| fix      | 버그 수정     |
| style    | 스타일 수정   |
| refactor | 코드 리팩토링 |
| docs     | README 수정   |
