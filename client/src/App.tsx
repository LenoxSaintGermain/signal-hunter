import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import OpportunityDetail from "./pages/OpportunityDetail";
import WhitehallAssemblage from "./pages/WhitehallAssemblage";

import PropertyComparison from "@/pages/PropertyComparison";
import Property514Whitehall from "./pages/Property514Whitehall";
import PonceProtocol from "./pages/PonceProtocol";
import CapitalStack from "./pages/CapitalStack";

import Projections from "./pages/Projections";
import SearchSettings from "./pages/SearchSettings";
import ApiSettings from "./pages/ApiSettings";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />

      <Route path={"/capital-stack"} component={CapitalStack} />
      <Route path={"/projections"} component={Projections} />
      <Route path={"/settings/search"} component={SearchSettings} />
      <Route path={"/settings/api"} component={ApiSettings} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"opportunity/:id"} component={OpportunityDetail} />
      <Route path="/property/514-whitehall" component={Property514Whitehall} />
      <Route path="/property/whitehall-assemblage" component={WhitehallAssemblage} />
      <Route path="/property/comparison" component={PropertyComparison} />
      <Route path="/property/ponce-protocol" component={PonceProtocol} />

      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
