import { Link } from "wouter";
import { APP_LOGO, APP_TITLE } from "@/const";

interface NavigationProps {
  currentPage?: string;
}

export default function Navigation({ currentPage }: NavigationProps) {
  const navItems = [
    { href: "/dashboard", label: "Pipeline" },
    { href: "/property/ponce-protocol", label: "Ponce Protocol" },
    { href: "/property/514-whitehall", label: "514 Whitehall" },
    { href: "/property/whitehall-assemblage", label: "Assemblage" },
    { href: "/property/comparison", label: "Compare" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={APP_LOGO} alt={APP_TITLE} className="w-8 h-8" />
            <span className="font-semibold text-lg text-foreground">
              {APP_TITLE}
            </span>
          </Link>

          {/* Right: Nav Items */}
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={`text-sm font-medium transition-all hover:opacity-60 relative pb-1 ${
                  currentPage === item.href ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {item.label}
                {currentPage === item.href && (
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" 
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
