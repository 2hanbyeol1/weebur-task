import Link from "next/link";

import { PRODUCT_LIST_PATH } from "@/constants/path";
import Logo from "@/svgs/Logo";

const Header = () => {
  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-center bg-white px-6">
      <div className="w-full max-w-[1200px]">
        <Link href={PRODUCT_LIST_PATH} className="inline-block py-2">
          <Logo />
        </Link>
      </div>
    </header>
  );
};

export default Header;
