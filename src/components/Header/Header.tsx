import Logo from "@/svgs/Logo";

const Header = () => {
  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-center bg-white px-6">
      <div className="w-full max-w-[1200px]">
        <Logo />
      </div>
    </header>
  );
};

export default Header;
