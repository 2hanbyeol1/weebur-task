"use client";

import { ComponentProps, ReactNode, useEffect, useState } from "react";

interface InfiniteScrollListProps<T> extends ComponentProps<"div"> {
  render: (data: T) => ReactNode;
  fetchFn: () => Promise<T[]>;
}

const InfiniteScrollList = <T,>({
  className,
  render,
  fetchFn,
}: InfiniteScrollListProps<T>) => {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    (async function () {
      const newData = await fetchFn();
      setData((prev) => [...prev, ...newData]);
    })();
  }, [fetchFn]);

  return <div className={className}>{data.map((item) => render(item))}</div>;
};

export default InfiniteScrollList;
