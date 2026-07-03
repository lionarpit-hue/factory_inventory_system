import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import { Package, BarChart3, ShoppingCart, FileText, Zap } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Factory Store Inventory</h1>
                <p className="text-slate-600 mt-1">Complete Procurement & Inventory Management System</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600">Welcome back,</p>
                <p className="font-semibold text-slate-900">{user?.name || "User"}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          {/* Quick Actions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                onClick={() => navigate("/dashboard")}
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-blue-50 hover:border-blue-300"
              >
                <BarChart3 className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-medium">Dashboard</span>
              </Button>
              <Button
                onClick={() => navigate("/transactions/indents")}
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-purple-50 hover:border-purple-300"
              >
                <FileText className="w-6 h-6 text-purple-600" />
                <span className="text-sm font-medium">Create Indent</span>
              </Button>
              <Button
                onClick={() => navigate("/transactions/purchase-orders")}
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-green-50 hover:border-green-300"
              >
                <ShoppingCart className="w-6 h-6 text-green-600" />
                <span className="text-sm font-medium">Purchase Orders</span>
              </Button>
              <Button
                onClick={() => navigate("/transactions/grns")}
                variant="outline"
                className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-orange-50 hover:border-orange-300"
              >
                <Package className="w-6 h-6 text-orange-600" />
                <span className="text-sm font-medium">Goods Received</span>
              </Button>
            </div>
          </div>

          {/* Module Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Masters */}
            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-slate-600" />
                  Master Data Management
                </CardTitle>
                <CardDescription>Configure items, units, departments, and suppliers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="ghost" onClick={() => navigate("/masters/items")} className="justify-start">
                    Items
                  </Button>
                  <Button variant="ghost" onClick={() => navigate("/masters/units")} className="justify-start">
                    Units
                  </Button>
                  <Button variant="ghost" onClick={() => navigate("/masters/item-groups")} className="justify-start">
                    Item Groups
                  </Button>
                  <Button variant="ghost" onClick={() => navigate("/masters/departments")} className="justify-start">
                    Departments
                  </Button>
                  <Button variant="ghost" onClick={() => navigate("/masters/parties")} className="justify-start">
                    Parties
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Transactions */}
            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-slate-600" />
                  Procurement Workflow
                </CardTitle>
                <CardDescription>Manage indents, quotes, orders, and receipts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="ghost" onClick={() => navigate("/transactions/indents")} className="justify-start">
                    Indents
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/transactions/comparative-sheets")}
                    className="justify-start"
                  >
                    Comparisons
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/transactions/purchase-orders")}
                    className="justify-start"
                  >
                    Purchase Orders
                  </Button>
                  <Button variant="ghost" onClick={() => navigate("/transactions/grns")} className="justify-start">
                    GRN
                  </Button>
                  <Button variant="ghost" onClick={() => navigate("/transactions/gins")} className="justify-start">
                    GIN
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/transactions/direct-purchases")}
                    className="justify-start"
                  >
                    Direct Purchase
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Reports */}
            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-slate-600" />
                  Reports & Analytics
                </CardTitle>
                <CardDescription>View comprehensive reports with date-range filtering</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button variant="ghost" onClick={() => navigate("/reports/purchase")} className="justify-start">
                    Purchase Report
                  </Button>
                  <Button variant="ghost" onClick={() => navigate("/reports/consumables")} className="justify-start">
                    Consumables Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features Overview */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <h3 className="font-semibold text-slate-900">Real-time Stock Tracking</h3>
                </div>
                <p className="text-sm text-slate-600">Automatic stock updates from GRN and GIN entries with low-stock alerts</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold text-slate-900">Complete Workflow</h3>
                </div>
                <p className="text-sm text-slate-600">From indent creation through comparative analysis to purchase and receipt</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 className="w-5 h-5 text-green-500" />
                  <h3 className="font-semibold text-slate-900">Detailed Reporting</h3>
                </div>
                <p className="text-sm text-slate-600">Date-range filtered reports for purchases and consumables analysis</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Factory Store Inventory</h1>
        <p className="text-xl mb-8 text-blue-100">Complete Procurement & Inventory Management System</p>
        <Button size="lg" onClick={() => (window.location.href = getLoginUrl())} className="bg-white text-blue-600 hover:bg-blue-50">
          Sign In to Continue
        </Button>
      </div>
    </div>
  );
}
