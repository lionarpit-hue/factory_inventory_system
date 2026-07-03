import { eq, and, gte, lte, desc, asc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  units,
  itemGroups,
  departments,
  parties,
  items,
  indents,
  indentItems,
  comparativeSheets,
  comparativeSheetQuotes,
  purchaseOrders,
  purchaseOrderItems,
  goodsReceivedNotes,
  grnItems,
  goodsIssueNotes,
  ginItems,
  directPurchases,
  directPurchaseItems,
  stockLevels,
  stockMovements,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db
    .select()
    .from(users)
    .where(eq(users.openId, openId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Master Data Query Helpers
 */

export async function getAllUnits() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(units).orderBy(asc(units.name));
}

export async function createUnit(data: { name: string; description?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(units).values(data);
  return result;
}

export async function updateUnit(id: number, data: { name?: string; description?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(units).set(data).where(eq(units.id, id));
}

export async function deleteUnit(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(units).where(eq(units.id, id));
}

export async function getAllItemGroups() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(itemGroups).orderBy(asc(itemGroups.name));
}

export async function createItemGroup(data: { name: string; description?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(itemGroups).values(data);
}

export async function updateItemGroup(id: number, data: { name?: string; description?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(itemGroups).set(data).where(eq(itemGroups.id, id));
}

export async function deleteItemGroup(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(itemGroups).where(eq(itemGroups.id, id));
}

export async function getAllDepartments() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(departments).orderBy(asc(departments.name));
}

export async function createDepartment(data: { name: string; description?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(departments).values(data);
}

export async function updateDepartment(id: number, data: { name?: string; description?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(departments).set(data).where(eq(departments.id, id));
}

export async function deleteDepartment(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(departments).where(eq(departments.id, id));
}

export async function getAllParties() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(parties).orderBy(asc(parties.name));
}

export async function createParty(data: {
  name: string;
  type: "supplier" | "vendor" | "contractor";
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  gstin?: string;
  bankAccount?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(parties).values(data);
}

export async function updateParty(id: number, data: Partial<typeof parties.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(parties).set(data).where(eq(parties.id, id));
}

export async function deleteParty(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(parties).where(eq(parties.id, id));
}

export async function getAllItems() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(items).orderBy(asc(items.code));
}

export async function getItemById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(items).where(eq(items.id, id)).limit(1);
  return result[0] || null;
}

export async function createItem(data: {
  code: string;
  name: string;
  description?: string;
  unitId: number;
  itemGroupId: number;
  reorderLevel?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(items).values(data);
  
  // Create stock level entry for new item
  if (result && typeof result === 'object' && 'insertId' in result) {
    const insertId = (result as any).insertId;
    if (insertId) {
      try {
        await db.insert(stockLevels).values({
          itemId: Number(insertId),
          currentStock: "0",
        });
      } catch (e) {
        console.warn("Failed to create stock level entry", e);
      }
    }
  }
  
  return result;
}

export async function updateItem(id: number, data: Partial<typeof items.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(items).set(data).where(eq(items.id, id));
}

export async function deleteItem(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(items).where(eq(items.id, id));
}

/**
 * Indent Helpers
 */

export async function createIndent(data: { indentNo: string; departmentId: number; remarks?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(indents).values(data);
}

export async function getIndentById(id: number) {
  const db = await getDb();
  if (!db) return null;
  return db.select().from(indents).where(eq(indents.id, id)).limit(1);
}

export async function getAllIndents() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(indents).orderBy(desc(indents.createdAt));
}

export async function updateIndentStatus(id: number, status: string, approvedBy?: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const data: any = { status };
  if (approvedBy) {
    data.approvedBy = approvedBy;
    data.approvalDate = new Date();
  }
  return db.update(indents).set(data).where(eq(indents.id, id));
}

export async function addIndentItem(data: { indentId: number; itemId: number; quantity: string; remarks?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(indentItems).values(data);
}

export async function getIndentItems(indentId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(indentItems).where(eq(indentItems.indentId, indentId));
}

/**
 * Comparative Sheet Helpers
 */

export async function createComparativeSheet(data: { sheetNo: string; indentId: number; remarks?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(comparativeSheets).values(data);
}

export async function getComparativeSheetById(id: number) {
  const db = await getDb();
  if (!db) return null;
  return db.select().from(comparativeSheets).where(eq(comparativeSheets.id, id)).limit(1);
}

export async function getAllComparativeSheets() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(comparativeSheets).orderBy(desc(comparativeSheets.createdAt));
}

export async function addQuoteToSheet(data: {
  sheetId: number;
  itemId: number;
  partyId: number;
  quantity: string;
  rate: string;
  total: string;
  leadTime?: number;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(comparativeSheetQuotes).values(data);
}

export async function getSheetQuotes(sheetId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(comparativeSheetQuotes).where(eq(comparativeSheetQuotes.sheetId, sheetId));
}

export async function finalizeComparativeSheet(id: number, selectedPartyId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(comparativeSheets).set({ status: "finalized", selectedPartyId }).where(eq(comparativeSheets.id, id));
}

/**
 * Purchase Order Helpers
 */

export async function createPurchaseOrder(data: {
  poNo: string;
  comparativeSheetId?: number;
  partyId: number;
  poDate: Date;
  deliveryDate?: Date;
  totalAmount: string;
  remarks?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(purchaseOrders).values(data);
}

export async function getPurchaseOrderById(id: number) {
  const db = await getDb();
  if (!db) return null;
  return db.select().from(purchaseOrders).where(eq(purchaseOrders.id, id)).limit(1);
}

export async function getAllPurchaseOrders() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(purchaseOrders).orderBy(desc(purchaseOrders.createdAt));
}

export async function addPOItem(data: {
  poId: number;
  itemId: number;
  quantity: string;
  rate: string;
  total: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(purchaseOrderItems).values(data);
}

export async function getPOItems(poId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(purchaseOrderItems).where(eq(purchaseOrderItems.poId, poId));
}

export async function updatePOStatus(id: number, status: "draft" | "issued" | "partial_received" | "received" | "cancelled") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(purchaseOrders).set({ status }).where(eq(purchaseOrders.id, id));
}

/**
 * GRN Helpers
 */

export async function createGRN(data: {
  grnNo: string;
  poId: number;
  grnDate: Date;
  receivedBy?: number;
  remarks?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(goodsReceivedNotes).values(data);
}

export async function getGRNById(id: number) {
  const db = await getDb();
  if (!db) return null;
  return db.select().from(goodsReceivedNotes).where(eq(goodsReceivedNotes.id, id)).limit(1);
}

export async function getAllGRNs() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(goodsReceivedNotes).orderBy(desc(goodsReceivedNotes.createdAt));
}

export async function addGRNItem(data: {
  grnId: number;
  poItemId: number;
  itemId: number;
  quantity: string;
  condition: "good" | "damaged" | "partial";
  remarks?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(grnItems).values(data);
}

export async function getGRNItems(grnId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(grnItems).where(eq(grnItems.grnId, grnId));
}

export async function updateGRNStatus(id: number, status: "draft" | "received" | "inspected" | "accepted" | "rejected") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(goodsReceivedNotes).set({ status }).where(eq(goodsReceivedNotes.id, id));
}

/**
 * GIN Helpers
 */

export async function createGIN(data: {
  ginNo: string;
  departmentId: number;
  ginDate: Date;
  issuedBy?: number;
  purpose?: string;
  remarks?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(goodsIssueNotes).values(data);
}

export async function getGINById(id: number) {
  const db = await getDb();
  if (!db) return null;
  return db.select().from(goodsIssueNotes).where(eq(goodsIssueNotes.id, id)).limit(1);
}

export async function getAllGINs() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(goodsIssueNotes).orderBy(desc(goodsIssueNotes.createdAt));
}

export async function addGINItem(data: { ginId: number; itemId: number; quantity: string; remarks?: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(ginItems).values(data);
}

export async function getGINItems(ginId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(ginItems).where(eq(ginItems.ginId, ginId));
}

export async function updateGINStatus(id: number, status: "draft" | "issued" | "received") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(goodsIssueNotes).set({ status }).where(eq(goodsIssueNotes.id, id));
}

/**
 * Direct Purchase Helpers
 */

export async function createDirectPurchase(data: {
  dpNo: string;
  partyId: number;
  dpDate: Date;
  totalAmount: string;
  remarks?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(directPurchases).values(data);
}

export async function getDirectPurchaseById(id: number) {
  const db = await getDb();
  if (!db) return null;
  return db.select().from(directPurchases).where(eq(directPurchases.id, id)).limit(1);
}

export async function getAllDirectPurchases() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(directPurchases).orderBy(desc(directPurchases.createdAt));
}

export async function addDPItem(data: {
  dpId: number;
  itemId: number;
  quantity: string;
  rate: string;
  total: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(directPurchaseItems).values(data);
}

export async function getDPItems(dpId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(directPurchaseItems).where(eq(directPurchaseItems.dpId, dpId));
}

export async function updateDPStatus(id: number, status: "draft" | "issued" | "received" | "cancelled") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(directPurchases).set({ status }).where(eq(directPurchases.id, id));
}

/**
 * Stock Level Helpers
 */

export async function getStockLevel(itemId: number) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(stockLevels).where(eq(stockLevels.itemId, itemId)).limit(1);
  return result[0] || null;
}

export async function getAllStockLevels() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(stockLevels).orderBy(asc(stockLevels.itemId));
}

export async function updateStockLevel(itemId: number, quantity: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(stockLevels).set({ currentStock: quantity }).where(eq(stockLevels.itemId, itemId));
}

export async function recordStockMovement(data: {
  itemId: number;
  movementType: "grn" | "gin" | "adjustment";
  referenceId?: number;
  referenceType?: string;
  quantity: string;
  remarks?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(stockMovements).values(data);
}

export async function getStockMovements(itemId: number, startDate?: Date, endDate?: Date) {
  const db = await getDb();
  if (!db) return [];
  
  if (startDate && endDate) {
    return db.select().from(stockMovements).where(and(eq(stockMovements.itemId, itemId), gte(stockMovements.createdAt, startDate), lte(stockMovements.createdAt, endDate))).orderBy(desc(stockMovements.createdAt));
  }
  
  return db.select().from(stockMovements).where(eq(stockMovements.itemId, itemId)).orderBy(desc(stockMovements.createdAt));
}

export async function getLowStockItems(reorderThreshold: number = 10) {
  const db = await getDb();
  if (!db) return [];
  
  // Get all stock levels and filter those below reorder level
  const allStocks = await db.select().from(stockLevels);
  const itemIds = allStocks.map(s => s.itemId);
  
  if (itemIds.length === 0) return [];
  
  const allItems = await db.select().from(items);
  
  return allItems.filter(item => {
    const stock = allStocks.find(s => s.itemId === item.id);
    const reorderLevel = item.reorderLevel ? Number(item.reorderLevel) : reorderThreshold;
    return stock && Number(stock.currentStock) <= reorderLevel;
  });
}
