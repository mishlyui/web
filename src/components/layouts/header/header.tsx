"use client"

import Link from "next/link"
import { cn } from "@/lib/utils/cn"
import { headerConfig } from "@/config/header"
import { motion, AnimatePresence } from "framer-motion"
import { memo } from "react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SearchButton } from "@/components/ui/search-button"
import { DiscordIcon, MenuIcon, CloseIcon } from "@/components/ui/icons"
import { useHeader } from "./hooks/use-header"
import { MobileMenu } from "./mobile-menu"
import { headerAnimation, iconRotateAnimation } from "@/lib/animations"

interface HeaderProps {
  onSearchClick?: () => void
}

export const Header = memo(({ onSearchClick }: HeaderProps) => {
  const { isScrolled, isMobileMenuOpen, menuRef, toggleMobileMenu, closeMobileMenu, isActiveLink } =
    useHeader()

  const handleSearchClick = () => {
    if (onSearchClick) {
      onSearchClick()
    }
  }

  return (
    <motion.header
      ref={menuRef}
      {...headerAnimation}
      className={cn(
        "bg-background fixed top-0 z-50 w-full transition-all duration-200",
        isScrolled && "backdrop-blur-md",
      )}
    >
      <Container size="md" className="flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-7">
          <Link href={headerConfig.logo.href} className="flex items-center gap-2.5">
            <span className="text-foreground text-[17px] font-semibold">
              {headerConfig.logo.text}
            </span>
          </Link>

          <div className="bg-border hidden h-5 w-px md:block" />

          <nav className="hidden items-center gap-6 md:flex">
            {headerConfig.navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-muted-foreground hover:text-foreground text-[15px] transition-colors",
                  isActiveLink(link.href) && "text-foreground font-medium",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <SearchButton
            placeholder={headerConfig.search.placeholder}
            shortcut={headerConfig.search.shortcut}
            onClick={handleSearchClick}
            className="hidden md:flex"
          />
          {headerConfig.socialLinks.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground hidden p-2 transition-colors md:block"
            >
              {social.icon === "discord" && <DiscordIcon className="h-[18px] w-[18px]" />}
            </Link>
          ))}

          <Button
            variant="ghost"
            onClick={toggleMobileMenu}
            className="h-9 w-9 p-0 md:hidden"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div key="close" {...iconRotateAnimation(true)}>
                  <CloseIcon className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div key="menu" {...iconRotateAnimation(false)}>
                  <MenuIcon className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </Container>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        onSearchClick={handleSearchClick}
        isActiveLink={isActiveLink}
      />
    </motion.header>
  )
})

Header.displayName = "Header"
