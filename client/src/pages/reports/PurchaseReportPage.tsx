import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PurchaseReportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Purchase Report</h1>
        <p className="text-slate-600 mt-1">View purchase orders, GRNs, and direct purchases</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Purchase Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-slate-500">
            <p className="mb-4">Purchase report module</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
