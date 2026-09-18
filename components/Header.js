"use client";

import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

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
          <a href="#" className="nav-link active">
            Discover
          </a>
          <a href="#" className="nav-link">
            Opportunities
          </a>
          <a href="#" className="nav-link">
            Domains
          </a>
          <a href="#" className="nav-link">
            About
          </a>
        </nav>

        <div className="cta-slot">
          <SignedOut>
            <SignInButton mode="modal">
              <button type="button" className="cta-pill">
                Explore
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/alerts" className="cta-pill">
              Alerts
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
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
          <a href="#" className="mobile-link active" onClick={closeMenu}>
            <span className="mobile-link-label">Discover</span>
          </a>
          <a href="#" className="mobile-link" onClick={closeMenu}>
            <span className="mobile-link-label">Opportunities</span>
          </a>
          <a href="#" className="mobile-link" onClick={closeMenu}>
            <span className="mobile-link-label">Domains</span>
          </a>
          <a href="#" className="mobile-link" onClick={closeMenu}>
            <span className="mobile-link-label">About</span>
          </a>
          <SignedOut>
            <SignInButton mode="modal">
              <button type="button" className="mobile-cta">
                Explore BuyHype
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/alerts" className="mobile-cta" onClick={closeMenu}>
              My Alerts
            </Link>
          </SignedIn>
        </nav>
      </div>
    </>
  );
}
