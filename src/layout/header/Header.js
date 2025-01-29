'use client'

import CategoriesNav from "./CategoriesNav";
import MainNav from "./MainNav";
import MobileHeader from "./MobileHeader";
import TopNav from "./TopNav";

export default function Header() {
  return (
    <header style={{display:"unset"}}>
      <TopNav />
      <MainNav />
      <MobileHeader />
      <CategoriesNav/>
    </header>
  );
}
