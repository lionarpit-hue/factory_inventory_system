import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  decimal,
  boolean,
  datetime,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Master Data Tables
 */

export const units = mysqlTable("units", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Unit = typeof units.$inferSelect;
export type InsertUnit = typeof units.$inferInsert;

export const itemGroups = mysqlTable("itemGroups", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ItemGroup = typeof itemGroups.$inferSelect;
export type InsertItemGroup = typeof itemGroups.$inferInsert;

export const departments = mysqlTable("departments", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Department = typeof departments.$inferSelect;
export type InsertDepartment = typeof departments.$inferInsert;

export const parties = mysqlTable("parties", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 150 }).notNull().unique(),
  type: mysqlEnum("type", ["supplier", "vendor", "contractor"]).notNull(),
  contactPerson: varchar("contactPerson", { length: 100 }),
  email: varchar("email", { length: 100 }),
  phone: varchar("phone", { length: 20 }),
  address: text("address"),
  city: varchar("city", { length: 50 }),
  state: varchar("state", { length: 50 }),
  pincode: varchar("pincode", { length: 10 }),
  gstin: varchar("gstin", { length: 20 }),
  bankAccount: varchar("bankAccount", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Party = typeof parties.$inferSelect;
export type InsertParty = typeof parties.$inferInsert;

export const items = mysqlTable("items", {
  id: int("id").autoincrement().primaryKey(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  name: varchar("name", { length: 150 }).notNull(),
  description: text("description"),
  unitId: int("unitId").notNull(),
  itemGroupId: int("itemGroupId").notNull(),
  reorderLevel: decimal("reorderLevel", { precision: 10, scale: 2 }).default("0"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Item = typeof items.$inferSelect;
export type InsertItem = typeof items.$inferInsert;

/**
 * Transaction Tables
 */

export const indents = mysqlTable("indents", {
  id: int("id").autoincrement().primaryKey(),
  indentNo: varchar("indentNo", { length: 50 }).notNull().unique(),
  departmentId: int("departmentId").notNull(),
  status: mysqlEnum("status", ["draft", "submitted", "approved", "rejected"]).default("draft").notNull(),
  approvedBy: int("approvedBy"),
  approvalDate: datetime("approvalDate"),
  remarks: text("remarks"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Indent = typeof indents.$inferSelect;
export type InsertIndent = typeof indents.$inferInsert;

export const indentItems = mysqlTable("indentItems", {
  id: int("id").autoincrement().primaryKey(),
  indentId: int("indentId").notNull(),
  itemId: int("itemId").notNull(),
  quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull(),
  remarks: text("remarks"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type IndentItem = typeof indentItems.$inferSelect;
export type InsertIndentItem = typeof indentItems.$inferInsert;

export const comparativeSheets = mysqlTable("comparativeSheets", {
  id: int("id").autoincrement().primaryKey(),
  sheetNo: varchar("sheetNo", { length: 50 }).notNull().unique(),
  indentId: int("indentId").notNull(),
  status: mysqlEnum("status", ["draft", "finalized"]).default("draft").notNull(),
  selectedPartyId: int("selectedPartyId"),
  remarks: text("remarks"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ComparativeSheet = typeof comparativeSheets.$inferSelect;
export type InsertComparativeSheet = typeof comparativeSheets.$inferInsert;

export const comparativeSheetQuotes = mysqlTable("comparativeSheetQuotes", {
  id: int("id").autoincrement().primaryKey(),
  sheetId: int("sheetId").notNull(),
  itemId: int("itemId").notNull(),
  partyId: int("partyId").notNull(),
  quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull(),
  rate: decimal("rate", { precision: 12, scale: 2 }).notNull(),
  total: decimal("total", { precision: 12, scale: 2 }).notNull(),
  leadTime: int("leadTime"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ComparativeSheetQuote = typeof comparativeSheetQuotes.$inferSelect;
export type InsertComparativeSheetQuote = typeof comparativeSheetQuotes.$inferInsert;

export const purchaseOrders = mysqlTable("purchaseOrders", {
  id: int("id").autoincrement().primaryKey(),
  poNo: varchar("poNo", { length: 50 }).notNull().unique(),
  comparativeSheetId: int("comparativeSheetId"),
  partyId: int("partyId").notNull(),
  poDate: datetime("poDate").notNull(),
  deliveryDate: datetime("deliveryDate"),
  totalAmount: decimal("totalAmount", { precision: 12, scale: 2 }).notNull(),
  status: mysqlEnum("status", ["draft", "issued", "partial_received", "received", "cancelled"]).default("draft").notNull(),
  remarks: text("remarks"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PurchaseOrder = typeof purchaseOrders.$inferSelect;
export type InsertPurchaseOrder = typeof purchaseOrders.$inferInsert;

export const purchaseOrderItems = mysqlTable("purchaseOrderItems", {
  id: int("id").autoincrement().primaryKey(),
  poId: int("poId").notNull(),
  itemId: int("itemId").notNull(),
  quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull(),
  rate: decimal("rate", { precision: 12, scale: 2 }).notNull(),
  total: decimal("total", { precision: 12, scale: 2 }).notNull(),
  receivedQuantity: decimal("receivedQuantity", { precision: 10, scale: 2 }).default("0"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PurchaseOrderItem = typeof purchaseOrderItems.$inferSelect;
export type InsertPurchaseOrderItem = typeof purchaseOrderItems.$inferInsert;

export const goodsReceivedNotes = mysqlTable("goodsReceivedNotes", {
  id: int("id").autoincrement().primaryKey(),
  grnNo: varchar("grnNo", { length: 50 }).notNull().unique(),
  poId: int("poId").notNull(),
  grnDate: datetime("grnDate").notNull(),
  receivedBy: int("receivedBy"),
  status: mysqlEnum("status", ["draft", "received", "inspected", "accepted", "rejected"]).default("draft").notNull(),
  remarks: text("remarks"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GoodsReceivedNote = typeof goodsReceivedNotes.$inferSelect;
export type InsertGoodsReceivedNote = typeof goodsReceivedNotes.$inferInsert;

export const grnItems = mysqlTable("grnItems", {
  id: int("id").autoincrement().primaryKey(),
  grnId: int("grnId").notNull(),
  poItemId: int("poItemId").notNull(),
  itemId: int("itemId").notNull(),
  quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull(),
  condition: mysqlEnum("condition", ["good", "damaged", "partial"]).default("good").notNull(),
  remarks: text("remarks"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GRNItem = typeof grnItems.$inferSelect;
export type InsertGRNItem = typeof grnItems.$inferInsert;

export const goodsIssueNotes = mysqlTable("goodsIssueNotes", {
  id: int("id").autoincrement().primaryKey(),
  ginNo: varchar("ginNo", { length: 50 }).notNull().unique(),
  departmentId: int("departmentId").notNull(),
  ginDate: datetime("ginDate").notNull(),
  issuedBy: int("issuedBy"),
  purpose: text("purpose"),
  status: mysqlEnum("status", ["draft", "issued", "received"]).default("draft").notNull(),
  remarks: text("remarks"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GoodsIssueNote = typeof goodsIssueNotes.$inferSelect;
export type InsertGoodsIssueNote = typeof goodsIssueNotes.$inferInsert;

export const ginItems = mysqlTable("ginItems", {
  id: int("id").autoincrement().primaryKey(),
  ginId: int("ginId").notNull(),
  itemId: int("itemId").notNull(),
  quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull(),
  remarks: text("remarks"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GINItem = typeof ginItems.$inferSelect;
export type InsertGINItem = typeof ginItems.$inferInsert;

export const directPurchases = mysqlTable("directPurchases", {
  id: int("id").autoincrement().primaryKey(),
  dpNo: varchar("dpNo", { length: 50 }).notNull().unique(),
  partyId: int("partyId").notNull(),
  dpDate: datetime("dpDate").notNull(),
  totalAmount: decimal("totalAmount", { precision: 12, scale: 2 }).notNull(),
  status: mysqlEnum("status", ["draft", "issued", "received", "cancelled"]).default("draft").notNull(),
  remarks: text("remarks"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DirectPurchase = typeof directPurchases.$inferSelect;
export type InsertDirectPurchase = typeof directPurchases.$inferInsert;

export const directPurchaseItems = mysqlTable("directPurchaseItems", {
  id: int("id").autoincrement().primaryKey(),
  dpId: int("dpId").notNull(),
  itemId: int("itemId").notNull(),
  quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull(),
  rate: decimal("rate", { precision: 12, scale: 2 }).notNull(),
  total: decimal("total", { precision: 12, scale: 2 }).notNull(),
  receivedQuantity: decimal("receivedQuantity", { precision: 10, scale: 2 }).default("0"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type DirectPurchaseItem = typeof directPurchaseItems.$inferSelect;
export type InsertDirectPurchaseItem = typeof directPurchaseItems.$inferInsert;

/**
 * Stock Management Table
 */

export const stockLevels = mysqlTable("stockLevels", {
  id: int("id").autoincrement().primaryKey(),
  itemId: int("itemId").notNull().unique(),
  currentStock: decimal("currentStock", { precision: 10, scale: 2 }).default("0").notNull(),
  lastUpdated: timestamp("lastUpdated").defaultNow().onUpdateNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type StockLevel = typeof stockLevels.$inferSelect;
export type InsertStockLevel = typeof stockLevels.$inferInsert;

export const stockMovements = mysqlTable("stockMovements", {
  id: int("id").autoincrement().primaryKey(),
  itemId: int("itemId").notNull(),
  movementType: mysqlEnum("movementType", ["grn", "gin", "adjustment"]).notNull(),
  referenceId: int("referenceId"),
  referenceType: varchar("referenceType", { length: 50 }),
  quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull(),
  remarks: text("remarks"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type StockMovement = typeof stockMovements.$inferSelect;
export type InsertStockMovement = typeof stockMovements.$inferInsert;
