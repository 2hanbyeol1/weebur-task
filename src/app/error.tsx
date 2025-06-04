"use client";

import Button from "@/components/Button";
import NetworkError from "@/errors/NetworkError";

function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  if (error instanceof NetworkError)
    return (
      <div className="flex h-[calc(100vh-128px)] flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-1.5">
          <h1 className="text-xl font-medium">{error.message}</h1>
          <div className="text-gray-500">네트워크 연결 상태를 확인해주세요</div>
        </div>
        <Button onClick={reset}>재시도</Button>
      </div>
    );

  return (
    <div className="flex h-[calc(100vh-128px)] flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-1.5">
        <h1 className="text-xl font-medium">예상하지 못한 오류가 발생했어요</h1>
        <div className="text-gray-500">잠시 후 다시 시도해주세요</div>
      </div>
      <Button onClick={reset}>재시도</Button>
    </div>
  );
}
export default ErrorPage;
