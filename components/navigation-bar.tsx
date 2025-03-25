import DesktopMenuBar from './elements/desktop-menu-bar';
import Header from './elements/header';
import MobileMenuBar from './elements/mobile-menu-bar';
import { headerData, menuData } from '@/data';

export default async function NavigationBar() {
  const menu = await menuData;

  return (
    <Header headerData={headerData}>
      <DesktopMenuBar {...menu} />
      <MobileMenuBar menu={menuData} header={headerData} />
    </Header>
  );
}
