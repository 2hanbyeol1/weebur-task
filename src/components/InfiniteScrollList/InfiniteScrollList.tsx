"use client";

import { ComponentProps, ReactNode, useEffect, useState } from "react";

import useIntersectionObserver from "@/hooks/useIntersectionObserver";

interface InfiniteScrollListProps<T> extends ComponentProps<"div"> {
  render: (data: T) => ReactNode;
  fetchFn: (page: number) => Promise<{ newData: T[]; isLastPage: boolean }>;
}

const InfiniteScrollList = <T,>({
  className,
  render,
  fetchFn,
}: InfiniteScrollListProps<T>) => {
  const [page, setPage] = useState<number>(0);
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isLastPage, setLastPage] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { newData, isLastPage } = await fetchFn(page);
        setData((prev) => [...prev, ...newData]);
        setLastPage(isLastPage);
        setLoading(false);
      } catch (e) {
        setError(e as Error);
      }
    })();
  }, [fetchFn, page]);

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isIntersecting) setPage((prev) => prev + 1);
  };

  const { setTarget } = useIntersectionObserver({
    onIntersect,
    rootMargin: "1000px",
  });

  if (error) throw error;

  return (
    <>
      <div className={className}>{data.map((item) => render(item))}</div>
      {!isLastPage &&
        (isLoading ? (
          <div className="bg-primary/80 mx-auto my-10 h-2 w-2 animate-ping rounded-full"></div>
        ) : (
          <div ref={setTarget}></div>
        ))}
    </>
  );
};

export default InfiniteScrollList;
