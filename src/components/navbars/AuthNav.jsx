import { ModeToggle } from "../Buttons/ThemeToggler";

const AuthNav = () => {
  return (
    <nav className="flex justify-end items-center py-3 px-5 fixed top-0 left-0 right-0 border-b">
      <>
        <ModeToggle align={`end`} />
      </>
    </nav>
  );
};

export default AuthNav;