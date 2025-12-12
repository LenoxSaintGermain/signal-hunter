import { Link, useLocation } from "wouter";
import { APP_LOGO, APP_TITLE } from "@/const";
import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavigationProps {
  currentPage?: string;
}

export default function Navigation({ currentPage }: NavigationProps) {
  const [location] = useLocation();
  const activePath = currentPage || location;
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "/dashboard", label: "Pipeline" },
    { href: "/capital-stack", label: "Capital Stack" },
    { href: "/projections", label: "Projections" },
    { href: "/property/ponce-protocol", label: "Ponce Protocol" },
    { href: "/property/514-whitehall", label: "514 Whitehall" },
    { href: "/property/whitehall-assemblage", label: "Assemblage" },
    { href: "/property/comparison", label: "Compare" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={APP_LOGO} alt={APP_TITLE} className="w-8 h-8" />
            <span className="font-semibold text-lg text-foreground">
              {APP_TITLE}
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-all hover:opacity-60 relative pb-1 ${activePath === item.href ? 'text-foreground' : 'text-muted-foreground'
                  }`}
              >
                {item.label}
                {activePath === item.href && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="text-left border-b pb-4 mb-4">
                  <SheetTitle className="flex items-center gap-2">
                    <img src={APP_LOGO} alt={APP_TITLE} className="w-6 h-6" />
                    {APP_TITLE}
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`text-lg font-medium transition-colors hover:text-foreground/80 py-2 border-b border-border/50 last:border-0 ${activePath === item.href ? "text-foreground" : "text-muted-foreground"
                        }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
