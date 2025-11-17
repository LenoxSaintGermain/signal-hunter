import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  TrendingUp, 
  DollarSign, 
  MapPin,
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
  ChevronDown
} from "lucide-react";

export default function PropertyAnalysis() {
  const [activeScenario, setActiveScenario] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Hero Section - Apple Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-gradient" />
        
        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <Badge className="mx-auto text-sm px-4 py-2 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-4 h-4 mr-2 inline" />
            Opportunity Zone Qualified
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
            514 Whitehall St SW
          </h1>
          
          <p className="text-2xl md:text-3xl text-muted-foreground max-w-3xl mx-auto font-light">
            Where a $200K parking lot becomes a{" "}
            <span className="text-primary font-medium">$3M empire</span>
          </p>
          
          <div className="flex flex-wrap gap-6 justify-center text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>1 mile from Mercedes-Benz Stadium</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              <span>Adjacent to $1.29B Forge Development</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>91% Cash-on-Cash Returns</span>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center pt-8">
            <Button size="lg" className="text-lg px-8">
              Explore Scenarios
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              View Full Report
            </Button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-muted-foreground" />
        </div>
      </section>

      {/* Story Section - Rory Sutherland Style */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold">The Invisible Goldmine</h2>
            <p className="text-xl text-muted-foreground">
              Or: How behavioral economics reveals what spreadsheets miss
            </p>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl leading-relaxed">
              Here's a question: Would you rather own a parking lot that generates 33% annual returns, 
              or a mixed-use building that generates 91% annual returns?
            </p>
            
            <p className="text-xl leading-relaxed">
              If you answered "the building," congratulations—you're thinking like everyone else. 
              Which is precisely why this opportunity exists.
            </p>
            
            <Card className="p-8 bg-primary/5 border-primary/20 my-8">
              <p className="text-lg italic">
                "The problem with real estate investing is that everyone is looking at the same spreadsheets, 
                reading the same cap rate formulas, and arriving at the same boring conclusions. 
                Meanwhile, the real money is made by people who understand human behavior."
              </p>
              <p className="text-sm text-muted-foreground mt-4">— Rory Sutherland (probably)</p>
            </Card>
            
            <h3 className="text-3xl font-bold mt-12">The Psychology of Parking</h3>
            
            <p className="text-xl leading-relaxed">
              Consider this: On game days, 70,000 people descend on Mercedes-Benz Stadium. 
              The official lots charge $40-$60. But here's what the spreadsheets don't tell you—
              <strong>people hate paying for parking</strong>.
            </p>
            
            <p className="text-xl leading-relaxed">
              Not because they're cheap. Because parking feels like a <em>tax</em> rather than a <em>service</em>. 
              It's loss aversion in action. But charge $20 instead of $40? Suddenly you're not a tax collector—
              you're a <strong>hero</strong> who saved them money.
            </p>
            
            <p className="text-xl leading-relaxed">
              Same parking space. Different frame. 3x the customers.
            </p>
            
            <h3 className="text-3xl font-bold mt-12">The Event Space Paradox</h3>
            
            <p className="text-xl leading-relaxed">
              Now add an event space above the parking lot. Corporate clients will pay $400/hour for 
              a venue near the stadium. Why? Because <strong>context is everything</strong>.
            </p>
            
            <p className="text-xl leading-relaxed">
              A 2,000 sq ft room in an office building? Worth $30/hour. The exact same room 
              with stadium views and "game day energy"? Worth $400/hour. You're not selling 
              square footage—you're selling <em>the story</em> your clients get to tell.
            </p>
            
            <Card className="p-8 bg-accent/10 border-accent/20 my-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-primary">$119K</div>
                  <div className="text-sm text-muted-foreground mt-2">Parking Revenue</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary">$141K</div>
                  <div className="text-sm text-muted-foreground mt-2">Event Space Revenue</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary">$17K</div>
                  <div className="text-sm text-muted-foreground mt-2">Airbnb Revenue</div>
                </div>
              </div>
              <div className="text-center mt-6 pt-6 border-t">
                <div className="text-5xl font-bold text-primary">$277K</div>
                <div className="text-sm text-muted-foreground mt-2">Total Annual Revenue</div>
              </div>
            </Card>
            
            <h3 className="text-3xl font-bold mt-12">The Opportunity Zone Secret</h3>
            
            <p className="text-xl leading-relaxed">
              But here's where it gets interesting. This property is likely in a designated 
              Opportunity Zone. Which means if you hold it for 10 years, <strong>all appreciation 
              is completely tax-free</strong>.
            </p>
            
            <p className="text-xl leading-relaxed">
              Not "tax-deferred." Not "tax-advantaged." <strong>Tax. Free.</strong>
            </p>
            
            <p className="text-xl leading-relaxed">
              Invest $1.5M today. Property appreciates to $3M in 10 years. That's $1.5M in gains. 
              Normal tax bill? $386,000. Opportunity Zone tax bill? <strong>$0</strong>.
            </p>
            
            <p className="text-xl leading-relaxed">
              Suddenly that 91% cash-on-cash return looks conservative.
            </p>
          </div>
        </div>
      </section>

      {/* Scenario Comparison Teaser */}
      <section className="py-32 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <h2 className="text-5xl font-bold">Four Paths. One Property.</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Play with the levers. See how profit, risk, and cost interact in real-time. 
            Because the best investment is the one that matches your goals—not someone else's spreadsheet.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {scenarios.map((scenario) => (
              <Card 
                key={scenario.id}
                className="p-6 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => setActiveScenario(scenario.id)}
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-lg bg-${scenario.color}/10 flex items-center justify-center`}>
                    <scenario.icon className={`w-6 h-6 text-${scenario.color}`} />
                  </div>
                  <h3 className="text-xl font-bold">{scenario.title}</h3>
                  <p className="text-sm text-muted-foreground">{scenario.description}</p>
                  <div className="pt-4 border-t">
                    <div className="text-2xl font-bold text-primary">{scenario.return}</div>
                    <div className="text-xs text-muted-foreground">Annual Return</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <Button size="lg" className="mt-8">
            Compare All Scenarios
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}

const scenarios = [
  {
    id: "parking",
    title: "Parking Lot",
    description: "Simple, immediate cash flow with minimal operational complexity",
    return: "33%",
    color: "blue",
    icon: DollarSign
  },
  {
    id: "land-bank",
    title: "Land Banking",
    description: "Minimal improvements, hold for appreciation as corridor transforms",
    return: "29%",
    color: "green",
    icon: TrendingUp
  },
  {
    id: "flex-stack",
    title: "Flex-Stack",
    description: "Parking + Event Space + Airbnb for maximum diversification",
    return: "91%",
    color: "purple",
    icon: Building2
  },
  {
    id: "quick-flip",
    title: "Quick Flip",
    description: "Acquire and sell to developer in 6-12 months",
    return: "30-67%",
    color: "orange",
    icon: Calendar
  }
];
