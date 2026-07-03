import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ConsumablesReportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Consumables Report</h1>
        <p className="text-slate-600 mt-1">View stock movements and current levels</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Consumables Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-slate-500">
            <p className="mb-4">Consumables report module</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
