import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Eye } from "lucide-react";

export default function IndentsPage() {
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedIndent, setSelectedIndent] = useState<any>(null);
  const [formData, setFormData] = useState({
    indentNo: "",
    departmentId: "",
    remarks: "",
  });
  const [itemForm, setItemForm] = useState({
    itemId: "",
    quantity: "",
    remarks: "",
  });

  const { data: indents, isLoading: indentsLoading, refetch: refetchIndents } = trpc.indents.list.useQuery();
  const { data: departments } = trpc.departments.list.useQuery();
  const { data: items } = trpc.items.list.useQuery();
  const createMutation = trpc.indents.create.useMutation();
  const addItemMutation = trpc.indents.addItem.useMutation();
  const updateStatusMutation = trpc.indents.updateStatus.useMutation();
  const { data: indentItems, refetch: refetchItems } = trpc.indents.getItems.useQuery(selectedIndent?.id || 0, {
    enabled: !!selectedIndent?.id,
  });

  const handleCreateIndent = async () => {
    if (!formData.indentNo.trim() || !formData.departmentId) {
      toast.error("Indent number and department are required");
      return;
    }

    try {
      await createMutation.mutateAsync({
        indentNo: formData.indentNo,
        departmentId: Number(formData.departmentId),
        remarks: formData.remarks,
      });
      toast.success("Indent created successfully");
      setFormData({ indentNo: "", departmentId: "", remarks: "" });
      setOpen(false);
      refetchIndents();
    } catch (error) {
      toast.error("Failed to create indent");
    }
  };

  const handleAddItem = async () => {
    if (!itemForm.itemId || !itemForm.quantity) {
      toast.error("Item and quantity are required");
      return;
    }

    try {
      await addItemMutation.mutateAsync({
        indentId: selectedIndent.id,
        itemId: Number(itemForm.itemId),
        quantity: itemForm.quantity,
        remarks: itemForm.remarks,
      });
      toast.success("Item added to indent");
      setItemForm({ itemId: "", quantity: "", remarks: "" });
      refetchItems();
    } catch (error) {
      toast.error("Failed to add item");
    }
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      await updateStatusMutation.mutateAsync({
        id,
        status: status as any,
      });
      toast.success("Indent status updated");
      refetchIndents();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const getDepartmentName = (deptId: number) => {
    return departments?.find((d: any) => d.id === deptId)?.name || "-";
  };

  const getItemName = (itemId: number) => {
    return items?.find((i: any) => i.id === itemId)?.name || "-";
  };

  const getStatusColor = (status: string) => {
    const colors: any = {
      draft: "bg-slate-100 text-slate-800",
      submitted: "bg-blue-100 text-blue-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-slate-100 text-slate-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Indents</h1>
          <p className="text-slate-600 mt-1">Create and manage material requisitions</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Indent
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Indent</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="indentNo">Indent Number *</Label>
                <Input
                  id="indentNo"
                  placeholder="e.g., IND-001"
                  value={formData.indentNo}
                  onChange={(e) => setFormData({ ...formData, indentNo: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="department">Department *</Label>
                <Select value={formData.departmentId} onValueChange={(value) => setFormData({ ...formData, departmentId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments?.map((dept: any) => (
                      <SelectItem key={dept.id} value={String(dept.id)}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea
                  id="remarks"
                  placeholder="Optional remarks"
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                />
              </div>
              <Button onClick={handleCreateIndent} className="w-full" disabled={createMutation.isPending}>
                Create Indent
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Indents</CardTitle>
        </CardHeader>
        <CardContent>
          {indentsLoading ? (
            <div className="text-center py-8 text-slate-500">Loading indents...</div>
          ) : indents && indents.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Indent No</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {indents.map((indent: any) => (
                    <TableRow key={indent.id}>
                      <TableCell className="font-mono font-medium">{indent.indentNo}</TableCell>
                      <TableCell>{getDepartmentName(indent.departmentId)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(indent.status)}>{indent.status}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">
                        {new Date(indent.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedIndent(indent);
                            setViewOpen(true);
                          }}
                          className="hover:bg-blue-50"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">No indents found. Create your first indent to get started.</div>
          )}
        </CardContent>
      </Card>

      {/* View Indent Dialog */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Indent Details - {selectedIndent?.indentNo}</DialogTitle>
          </DialogHeader>
          {selectedIndent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600">Department</p>
                  <p className="font-medium">{getDepartmentName(selectedIndent.departmentId)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Status</p>
                  <Badge className={getStatusColor(selectedIndent.status)}>{selectedIndent.status}</Badge>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Items</h3>
                {indentItems && indentItems.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Remarks</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {indentItems.map((item: any) => (
                        <TableRow key={item.id}>
                          <TableCell>{getItemName(item.itemId)}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell className="text-slate-600">{item.remarks || "-"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-sm text-slate-500">No items added yet</p>
                )}
              </div>

              {selectedIndent.status === "draft" && (
                <div className="space-y-3 border-t pt-4">
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Label htmlFor="addItem">Item</Label>
                      <Select value={itemForm.itemId} onValueChange={(value) => setItemForm({ ...itemForm, itemId: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select item" />
                        </SelectTrigger>
                        <SelectContent>
                          {items?.map((item: any) => (
                            <SelectItem key={item.id} value={String(item.id)}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="qty">Quantity</Label>
                      <Input
                        id="qty"
                        type="number"
                        placeholder="0"
                        value={itemForm.quantity}
                        onChange={(e) => setItemForm({ ...itemForm, quantity: e.target.value })}
                      />
                    </div>
                    <div className="flex items-end">
                      <Button onClick={handleAddItem} className="w-full" disabled={addItemMutation.isPending}>
                        Add
                      </Button>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleUpdateStatus(selectedIndent.id, "submitted")}
                    className="flex-1"
                    disabled={!indentItems || indentItems.length === 0}
                  >
                    Submit Indent
                  </Button>
                </div>
              )}

              {selectedIndent.status === "submitted" && (
                <div className="flex gap-2 border-t pt-4">
                  <Button
                    onClick={() => handleUpdateStatus(selectedIndent.id, "approved")}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleUpdateStatus(selectedIndent.id, "rejected")}
                    variant="destructive"
                    className="flex-1"
                  >
                    Reject
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
