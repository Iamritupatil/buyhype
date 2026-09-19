"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
  }, [menuOpen]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    function onResize() {
      if (window.innerWidth > 720) setMenuOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="header">
        <Link className="logo" href="/" aria-label="BuyHype home">
          <img src="/assets/logo.webp" alt="" width="52" height="52" />
        </Link>

        <nav className="nav-pill" aria-label="Primary">
          <Link href="/" className="nav-link active">
            Discover
          </Link>
          <Link href="/coming-soon?from=Opportunities" className="nav-link">
            Opportunities
          </Link>
          <Link href="/coming-soon?from=Domains" className="nav-link">
            Domains
          </Link>
          <Link href="/coming-soon?from=About" className="nav-link">
            About
          </Link>
        </nav>

        <div className="cta-slot">
          <Link href="/waitlist" className="cta-pill">
            Waitlist
          </Link>
        </div>

        <button
          className="burger"
          type="button"
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </header>

      <div
        className="mobile-overlay"
        id="mobile-menu"
        hidden={!menuOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMenu();
        }}
      >
        <nav className="mobile-sheet" aria-label="Mobile">
          <Link href="/" className="mobile-link active" onClick={closeMenu}>
            <span className="mobile-link-label">Discover</span>
          </Link>
          <Link
            href="/coming-soon?from=Opportunities"
            className="mobile-link"
            onClick={closeMenu}
          >
            <span className="mobile-link-label">Opportunities</span>
          </Link>
          <Link
            href="/coming-soon?from=Domains"
            className="mobile-link"
            onClick={closeMenu}
          >
            <span className="mobile-link-label">Domains</span>
          </Link>
          <Link
            href="/coming-soon?from=About"
            className="mobile-link"
            onClick={closeMenu}
          >
            <span className="mobile-link-label">About</span>
          </Link>
          <Link href="/waitlist" className="mobile-cta" onClick={closeMenu}>
            Join the Waitlist
          </Link>
        </nav>
      </div>
    </>
  );
}
