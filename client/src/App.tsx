import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import DashboardLayout from "./components/DashboardLayout";
import UnitsPage from "./pages/masters/UnitsPage";
import ItemGroupsPage from "./pages/masters/ItemGroupsPage";
import DepartmentsPage from "./pages/masters/DepartmentsPage";
import PartiesPage from "./pages/masters/PartiesPage";
import ItemsPage from "./pages/masters/ItemsPage";
import IndentsPage from "./pages/transactions/IndentsPage";
import ComparativeSheetsPage from "./pages/transactions/ComparativeSheetsPage";
import PurchaseOrdersPage from "./pages/transactions/PurchaseOrdersPage";
import GRNsPage from "./pages/transactions/GRNsPage";
import GINsPage from "./pages/transactions/GINsPage";
import DirectPurchasesPage from "./pages/transactions/DirectPurchasesPage";
import PurchaseReportPage from "./pages/reports/PurchaseReportPage";
import ConsumablesReportPage from "./pages/reports/ConsumablesReportPage";
import DashboardPage from "./pages/DashboardPage";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/dashboard"}>
        {() => (
          <DashboardLayout>
            <DashboardPage />
          </DashboardLayout>
        )}
      </Route>

      {/* Masters */}
      <Route path={"/masters/units"}>
        {() => (
          <DashboardLayout>
            <UnitsPage />
          </DashboardLayout>
        )}
      </Route>
      <Route path={"/masters/item-groups"}>
        {() => (
          <DashboardLayout>
            <ItemGroupsPage />
          </DashboardLayout>
        )}
      </Route>
      <Route path={"/masters/departments"}>
        {() => (
          <DashboardLayout>
            <DepartmentsPage />
          </DashboardLayout>
        )}
      </Route>
      <Route path={"/masters/parties"}>
        {() => (
          <DashboardLayout>
            <PartiesPage />
          </DashboardLayout>
        )}
      </Route>
      <Route path={"/masters/items"}>
        {() => (
          <DashboardLayout>
            <ItemsPage />
          </DashboardLayout>
        )}
      </Route>

      {/* Transactions */}
      <Route path={"/transactions/indents"}>
        {() => (
          <DashboardLayout>
            <IndentsPage />
          </DashboardLayout>
        )}
      </Route>
      <Route path={"/transactions/comparative-sheets"}>
        {() => (
          <DashboardLayout>
            <ComparativeSheetsPage />
          </DashboardLayout>
        )}
      </Route>
      <Route path={"/transactions/purchase-orders"}>
        {() => (
          <DashboardLayout>
            <PurchaseOrdersPage />
          </DashboardLayout>
        )}
      </Route>
      <Route path={"/transactions/grns"}>
        {() => (
          <DashboardLayout>
            <GRNsPage />
          </DashboardLayout>
        )}
      </Route>
      <Route path={"/transactions/gins"}>
        {() => (
          <DashboardLayout>
            <GINsPage />
          </DashboardLayout>
        )}
      </Route>
      <Route path={"/transactions/direct-purchases"}>
        {() => (
          <DashboardLayout>
            <DirectPurchasesPage />
          </DashboardLayout>
        )}
      </Route>

      {/* Reports */}
      <Route path={"/reports/purchase"}>
        {() => (
          <DashboardLayout>
            <PurchaseReportPage />
          </DashboardLayout>
        )}
      </Route>
      <Route path={"/reports/consumables"}>
        {() => (
          <DashboardLayout>
            <ConsumablesReportPage />
          </DashboardLayout>
        )}
      </Route>

      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
