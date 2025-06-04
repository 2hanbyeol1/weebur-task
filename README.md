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

`next.js` `typescript`
`tailwind css`
`jest` `react testing library` `msw`
`react hook form` `zod`

<br/>

## 요구사항

- [x] 상품 리스트 페이지 (/products)
  - [x] API 연결
  - [x] UI
    - [x] 20개 아이템 노출 (상품명 `title`, 상품설명 `description`, 썸네일 이미지 `thumbnail`, 별점 `rating`, 리뷰 수 `reviews`)
    - [x] 보기 방식 구현 - 리스트형 (List) + 그리드형 (Grid)
    - [x] 페이지 최초 진입 시 50% 확률로 랜덤 View 방식 → 24시간 이후 재접속 시 다시 랜덤 View 방식
    - [x] 리스트 상단에 상품 생성 페이지(/products/new)로 이동하는 버튼
- [x] 상품 생성 페이지 (/products/new)
  - [x] API 연결
  - [x] UI
    - [x] form
    - [x] 유효성 검사
      - [x] title
        - [x] text
        - [x] required
        - [x] 15자 이내
      - [x] description
        - [x] textarea
        - [x] optional
      - [x] price
        - [x] number
        - [x] required
        - [x] 1000원 이상
      - [x] discountPercentage
        - [x] number
        - [x] optional
        - [x] 100 이내
      - [x] brand
        - [x] select
        - [x] required
        - [x] Apple | Samsung | Weebur 중 한 개 선택
    - [x] price 에서 discountPercentage 로 계산된 결과물(최종가격)이 실시간으로 디스플레이
    - [x] 생성 완료 시 상품 리스트 페이지(/products)로 이동

<br/>

## 추가 구현 사항
- [x] 상품 리스트 페이지 (/products)
  - [x] 무한 스크롤
  - [x] title 2줄 / description 3줄 이후 ...
- [x] 예외 처리
- [x] 테스트 코드
- [x] API 모킹

## 개발 계획

- [x] 초기 설정(eslint, prettier)
- [x] MVP 기능 구현
- [x] UI, 컴포넌트 디자인 및 설계
- [x] 퍼블리싱
- [x] 추가 구현 사항 구현
- [x] 버그 픽스

<br/>

## 트러블 슈팅
- [순환 참조](https://velog.io/@2hanbyeol1/Javascript-%EC%88%9C%ED%99%98-%EC%B0%B8%EC%A1%B0)에 대해 공부했습니다.
- 랜덤 뷰 구현
  - **LocalStorage vs. Cookie**
    랜덤 뷰를 구현하는 방법을 LocalStorage와 Cookie 두 가지 방식으로 나눌 수 있다고 생각했습니다. 가장 큰 차이점은 Cookie는 서버와 클라이언트 모두에서 사용할 수 있다는 점이었고, 저는 **Server Component에서도 사용하고 싶었기 때문에 Cookie를 선택**했습니다.
  - **Server 쿠키 Set 에러**
    SSR 환경에서 쿠키를 set하는 함수를 호출했을 때, 다음과 같은 오류가 발생했습니다.
    `Error: Cookies can only be modified in a Server Action or Route Handler.`

    근데 이상하게도 에러 메시지와 달리 Server Action을 잘 사용하고 있다고 생각이 들었습니다. 왜냐하면 Client Component에서 호출했을 때는 잘 작동했기 때문입니다.
    
    ```jsx
    import { handleLayoutMode } from "./action";

    const ProductListPage = async () => {
      const currentLayout = await handleLayoutMode();

      return (
        ...
      );
    };

    export default ProductListPage;
    ```
    ```jsx
    "use server";

    import { cookies } from "next/headers";

    // 기존에 저장된 값이 있다면 -> 저장값을 리턴
    // 없다면 -> 새로 생성된 값을 저장하고 리턴
    export async function handleLayoutMode() {
      ...
      cookieStore.set({
        name: "layout_mode",
        value: randomLayoutMode,
        maxAge: 60 * 60 * 24, // ! 24시간
        httpOnly: true,
      });
      return randomLayoutMode;
    }
    ```

    server action을 SSR에서 사용하는 방식이 문제가 되는 것이라고 생각해서 route handler로도 구현해봤습니다. 오류는 나지 않았지만, 역시 Client 측에서만 제대로 작동했고 Cookie는 저장되지 않았습니다.
    → 구글링을 계속 해보니, Server Component에서는 Next의 cookies로 set을 할 수 없다는 결론에 도달하게 되었습니다.

    그래서 처음 계획대로, 다음과 같은 방식을 사용하게 되었습니다:
    1. Server Component에서는 Cookie 값을 조회만 한다.
    2. 그 값을 props로 Client Component에 전달한다.
    3. Client Component로 전달된 값이
      3-1. 있다면, 해당 값을 레이아웃 상태의 defaultValue로 사용하고
      3-2. 없다면, 새로운 랜덤 값을 생성하고, 쿠키에 저장한 후 상태로 사용한다.

    그런데 막상 구현해 보니, 어차피 products가 렌더링되기 전까지는 layout이 화면에 보이지 않고,
    products fetch 속도가 더 빨라서... 그냥 CSR로 구현해도 큰 차이가 없었겠다는 생각이 들었습니다.
    조금 허무했지만, 혹시 모를 상황을 대비해 현재 구조로 유지하기로 했습니다. 🥲

- SelectBox와 react-hook-form
  select > option은 자유로운 스타일 변경이 어렵습니다. 그래서 select, option 대신 button과 ul/li로 대체하여 커스텀 SelectBox 컴포넌트를 만들었습니다. 그런데, select 태그를 사용하지 않으니 register를 할 요소가 없어져서 hook-form을 연결하지 못하는 문제가 발생했습니다.

  구글링을 했을 때 가장 보편적인 방법은 Controller를 사용하는 것이었습니다. 하지만 이렇게 구현하면 SelectBox를 사용할 때마다 Controller로 감싸줘야 하고 다른 input들과 사용 방법에 차이가 생겨 개발 편의성이 떨어진다고 생각했습니다.

  → 자유로운 스타일링과 통일성(register 사용)을 모두 놓치고 싶지 않아서 여러가지 방법을 생각하던 중 ul/li 대신 label과 radio를 사용하면 어떨까하는 아이디어가 떠올랐고, 이를 사용하여 해결했습니다.

<br/>

## 커밋 prefix

|          | 설명          |
| :------- | :------------ |
| feat     | 기능 추가     |
| fix      | 버그 수정     |
| style    | 스타일 수정   |
| refactor | 코드 리팩토링 |
| test     | 테스트 코드 추가   |
| docs     | README 수정   |
