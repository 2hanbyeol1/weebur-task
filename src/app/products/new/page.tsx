"use client";

import ProductForm from "./_components/ProductForm";

const CreateProductPage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-14 mb-8 w-full max-w-160">
        <h1 className="mb-10 text-3xl font-semibold">상품 등록하기</h1>
        <ProductForm />
      </div>
    </div>
  );
};

export default CreateProductPage;
