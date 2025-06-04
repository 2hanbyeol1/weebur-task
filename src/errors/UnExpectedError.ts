class UnExpectedError extends Error {
  constructor() {
    super("예상하지 못한 오류가 발생했어요");
  }
}

export default UnExpectedError;
