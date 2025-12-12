import { Link, useLocation } from "wouter";
import { APP_LOGO, APP_TITLE } from "@/const";
import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trpc } from "@/lib/trpc";

interface NavigationProps {
  currentPage?: string;
}

export default function Navigation({ currentPage }: NavigationProps) {
  const [location] = useLocation();
  const activePath = currentPage || location;
  const [open, setOpen] = useState(false);

  // Fetch active deals (not draft)
  const { data: activeDealsData } = trpc.dealsV2.list.useQuery({
    excludeDrafts: true,
  });
  const activeDeals = activeDealsData?.deals || [];

  // Fetch draft deals
  const { data: draftDealsData } = trpc.dealsV2.list.useQuery({
    draftsOnly: true,
  });
  const draftDeals = draftDealsData?.deals || [];

  const staticNavItems = [
    { href: "/dashboard", label: "Pipeline" },
    { href: "/settings/search", label: "Discovery" },
    { href: "/capital-stack", label: "Capital Stack" },
    { href: "/projections", label: "Projections" },
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
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {staticNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-all hover:opacity-60 relative pb-1 whitespace-nowrap ${
                  activePath === item.href ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {item.label}
                {activePath === item.href && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
                )}
              </Link>
            ))}

            {/* Active Deals Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground px-2 gap-1"
                >
                  Active Deals
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>Active Deals ({activeDeals.length})</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {activeDeals.length === 0 ? (
                  <div className="px-2 py-4 text-sm text-muted-foreground text-center">
                    No active deals yet
                  </div>
                ) : (
                  activeDeals.slice(0, 10).map((deal: any) => (
                    <DropdownMenuItem key={deal.id} asChild>
                      <Link href={`/deal/${deal.id}`} className="flex flex-col items-start gap-1 cursor-pointer">
                        <span className="font-medium">{deal.name}</span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>${(deal.price / 1000000).toFixed(1)}M</span>
                          {deal.score && <span>• Score: {deal.score}/100</span>}
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))
                )}
                {activeDeals.length > 10 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="text-xs text-center text-primary cursor-pointer">
                        View all {activeDeals.length} deals →
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Deal Backlog Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground px-2 gap-1"
                >
                  Deal Backlog
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>Draft Deals ({draftDeals.length})</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {draftDeals.length === 0 ? (
                  <div className="px-2 py-4 text-sm text-muted-foreground text-center">
                    No draft deals
                  </div>
                ) : (
                  draftDeals.slice(0, 10).map((deal: any) => (
                    <DropdownMenuItem key={deal.id} asChild>
                      <Link href={`/deal/${deal.id}`} className="flex flex-col items-start gap-1 cursor-pointer">
                        <span className="font-medium">{deal.name}</span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>${(deal.price / 1000000).toFixed(1)}M</span>
                          {deal.score && <span>• Score: {deal.score}/100</span>}
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))
                )}
                {draftDeals.length > 10 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard?filter=draft" className="text-xs text-center text-primary cursor-pointer">
                        View all {draftDeals.length} drafts →
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu - Show on medium screens too */}
          <div className="lg:hidden">
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
                  {staticNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`text-lg font-medium transition-colors hover:text-foreground/80 py-2 border-b border-border/50 ${
                        activePath === item.href ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}

                  {/* Mobile Active Deals Section */}
                  <div className="pt-2">
                    <p className="text-sm font-semibold text-muted-foreground mb-2">
                      Active Deals ({activeDeals.length})
                    </p>
                    {activeDeals.slice(0, 5).map((deal: any) => (
                      <Link
                        key={deal.id}
                        href={`/deal/${deal.id}`}
                        onClick={() => setOpen(false)}
                        className="block py-2 px-2 hover:bg-secondary rounded text-sm"
                      >
                        <div className="font-medium">{deal.name}</div>
                        <div className="text-xs text-muted-foreground">
                          ${(deal.price / 1000000).toFixed(1)}M
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Mobile Draft Deals Section */}
                  <div className="pt-2">
                    <p className="text-sm font-semibold text-muted-foreground mb-2">
                      Deal Backlog ({draftDeals.length})
                    </p>
                    {draftDeals.slice(0, 5).map((deal: any) => (
                      <Link
                        key={deal.id}
                        href={`/deal/${deal.id}`}
                        onClick={() => setOpen(false)}
                        className="block py-2 px-2 hover:bg-secondary rounded text-sm"
                      >
                        <div className="font-medium">{deal.name}</div>
                        <div className="text-xs text-muted-foreground">
                          ${(deal.price / 1000000).toFixed(1)}M
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
