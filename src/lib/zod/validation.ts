import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().nonempty("상품명을 입력해 주세요").max(15),
  description: z.string(),
  price: z.coerce
    .number()
    .nonnegative("0원부터 입력할 수 있어요")
    .gte(1000, "1000원부터 입력할 수 있어요"),
  discountPercentage: z.coerce
    .number()
    .nonnegative("0%부터 입력할 수 있어요")
    .lte(100, "100%까지만 입력할 수 있어요"),
  brand: z.string().nonempty(),
});
