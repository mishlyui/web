import Link from "next/link"
import { cn } from "@/lib/utils/cn"
import { headerConfig } from "@/config/header"
import { motion, AnimatePresence } from "framer-motion"
import { memo, useRef } from "react"
import { Container } from "@/components/ui/container"
import { SearchButton } from "@/components/ui/search-button"
import { DiscordIcon } from "@/components/ui/icons"
import { useFocusTrap } from "@/hooks"
import { mobileMenuAnimation, staggerItemAnimation, fadeIn, DURATION } from "@/lib/animations"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onSearchClick: () => void
  isActiveLink: (href: string) => boolean
}

export const MobileMenu = memo(
  ({ isOpen, onClose, onSearchClick, isActiveLink }: MobileMenuProps) => {
    const menuRef = useRef<HTMLDivElement>(null)
    useFocusTrap(menuRef, isOpen)

    const handleSearchClick = () => {
      onSearchClick()
      onClose()
    }

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            {...mobileMenuAnimation}
            className="border-border bg-background overflow-hidden border-t md:hidden"
            role="navigation"
            aria-label="Mobile navigation menu"
          >
            <Container size="md" className="py-4">
              <nav className="flex flex-col gap-4">
                {headerConfig.navLinks.map((link, index) => (
                  <motion.div key={link.label} {...staggerItemAnimation(index)}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-label={`Navigate to ${link.label}`}
                      className={cn(
                        "text-muted-foreground hover:text-foreground block text-[15px] transition-colors",
                        isActiveLink(link.href) && "text-foreground font-medium",
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {headerConfig.mobileMenu.showSearch && (
                  <motion.div
                    {...staggerItemAnimation(headerConfig.navLinks.length)}
                    className="md:hidden"
                  >
                    <SearchButton
                      placeholder={headerConfig.search.placeholder}
                      shortcut={headerConfig.search.shortcut}
                      showShortcut={false}
                      onClick={handleSearchClick}
                      className="w-full"
                    />
                  </motion.div>
                )}

                <motion.div
                  {...fadeIn}
                  transition={{ duration: DURATION.normal, delay: 0.2 }}
                  className="border-border border-t pt-4"
                >
                  {headerConfig.socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${social.name} page`}
                      className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-[15px] transition-colors"
                    >
                      {social.icon === "discord" && <DiscordIcon className="h-[18px] w-[18px]" />}
                      <span>{social.name}</span>
                    </Link>
                  ))}
                </motion.div>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    )
  },
)

MobileMenu.displayName = "MobileMenu"
