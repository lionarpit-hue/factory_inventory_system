import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
export default function ComparativeSheetsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Comparative Sheets</h1>
          <p className="text-slate-600 mt-1">Compare quotes from multiple suppliers</p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" />New Sheet</Button>
      </div>
      <Card>
        <CardHeader><CardTitle>All Comparative Sheets</CardTitle></CardHeader>
        <CardContent><div className="text-center py-12 text-slate-500"><p>Comparative sheet management module</p></div></CardContent>
      </Card>
    </div>
  );
}
