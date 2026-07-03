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
import { toast } from "sonner";
import { Plus, Trash2, Edit2 } from "lucide-react";

export default function ItemsPage() {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    unitId: "",
    itemGroupId: "",
    reorderLevel: "",
  });

  const { data: items, isLoading: itemsLoading, refetch: refetchItems } = trpc.items.list.useQuery();
  const { data: units } = trpc.units.list.useQuery();
  const { data: groups } = trpc.itemGroups.list.useQuery();
  const createMutation = trpc.items.create.useMutation();
  const updateMutation = trpc.items.update.useMutation();
  const deleteMutation = trpc.items.delete.useMutation();

  const handleSubmit = async () => {
    if (!formData.code.trim() || !formData.name.trim() || !formData.unitId || !formData.itemGroupId) {
      toast.error("Code, Name, Unit, and Item Group are required");
      return;
    }

    try {
      if (editingId) {
        await updateMutation.mutateAsync({
          id: editingId,
          code: formData.code,
          name: formData.name,
          description: formData.description,
          unitId: Number(formData.unitId),
          itemGroupId: Number(formData.itemGroupId),
          reorderLevel: formData.reorderLevel,
        });
        toast.success("Item updated successfully");
      } else {
        await createMutation.mutateAsync({
          code: formData.code,
          name: formData.name,
          description: formData.description,
          unitId: Number(formData.unitId),
          itemGroupId: Number(formData.itemGroupId),
          reorderLevel: formData.reorderLevel,
        });
        toast.success("Item created successfully");
      }
      resetForm();
      setOpen(false);
      refetchItems();
    } catch (error) {
      toast.error("Failed to save item");
    }
  };

  const resetForm = () => {
    setFormData({
      code: "",
      name: "",
      description: "",
      unitId: "",
      itemGroupId: "",
      reorderLevel: "",
    });
    setEditingId(null);
  };

  const handleEdit = (item: any) => {
    setFormData({
      code: item.code,
      name: item.name,
      description: item.description || "",
      unitId: String(item.unitId),
      itemGroupId: String(item.itemGroupId),
      reorderLevel: item.reorderLevel || "",
    });
    setEditingId(item.id);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Item deleted successfully");
      refetchItems();
    } catch (error) {
      toast.error("Failed to delete item");
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetForm();
    }
    setOpen(newOpen);
  };

  const getUnitName = (unitId: number) => {
    return units?.find((u: any) => u.id === unitId)?.name || "-";
  };

  const getGroupName = (groupId: number) => {
    return groups?.find((g: any) => g.id === groupId)?.name || "-";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Items</h1>
          <p className="text-slate-600 mt-1">Manage inventory items and stock levels</p>
        </div>
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Item" : "Create New Item"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="code">Item Code *</Label>
                <Input
                  id="code"
                  placeholder="e.g., ITEM-001"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="name">Item Name *</Label>
                <Input
                  id="name"
                  placeholder="Item name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Optional description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="unit">Unit *</Label>
                  <Select value={formData.unitId} onValueChange={(value) => setFormData({ ...formData, unitId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {units?.map((unit: any) => (
                        <SelectItem key={unit.id} value={String(unit.id)}>
                          {unit.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="group">Item Group *</Label>
                  <Select value={formData.itemGroupId} onValueChange={(value) => setFormData({ ...formData, itemGroupId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select group" />
                    </SelectTrigger>
                    <SelectContent>
                      {groups?.map((group: any) => (
                        <SelectItem key={group.id} value={String(group.id)}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="reorder">Reorder Level</Label>
                <Input
                  id="reorder"
                  type="number"
                  placeholder="Minimum stock level"
                  value={formData.reorderLevel}
                  onChange={(e) => setFormData({ ...formData, reorderLevel: e.target.value })}
                />
              </div>
              <Button onClick={handleSubmit} className="w-full" disabled={createMutation.isPending || updateMutation.isPending}>
                {editingId ? "Update Item" : "Create Item"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Items</CardTitle>
        </CardHeader>
        <CardContent>
          {itemsLoading ? (
            <div className="text-center py-8 text-slate-500">Loading items...</div>
          ) : items && items.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Group</TableHead>
                    <TableHead>Reorder Level</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono font-medium">{item.code}</TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-slate-600">{getUnitName(item.unitId)}</TableCell>
                      <TableCell className="text-slate-600">{getGroupName(item.itemGroupId)}</TableCell>
                      <TableCell className="text-slate-600">{item.reorderLevel || "-"}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(item)}
                            className="hover:bg-blue-50"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                            className="hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">No items found. Create your first item to get started.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
