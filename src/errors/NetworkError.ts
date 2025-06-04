class NetworkError extends Error {
  constructor() {
    super("네트워크 에러가 발생했어요");
  }
}

export default NetworkError;
