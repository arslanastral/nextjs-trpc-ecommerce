import { useMantineColorScheme } from '@mantine/core';
import ControlBar from './ControlBar';
import Logo from './Logo';
import NavBar from './NavBar';

function Header() {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <div className={`w-full ${dark ? 'bg-black' : 'bg-white'}`}>
      <ControlBar />
      <Logo />
      <NavBar />
    </div>
  );
}

export default Header;
