import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import * as db from "./db";
import { z } from "zod";

/**
 * Master Data Routers
 */

const unitRouter = router({
  list: publicProcedure.query(() => db.getAllUnits()),
  create: protectedProcedure
    .input(z.object({ name: z.string(), description: z.string().optional() }))
    .mutation(({ input }) => db.createUnit(input)),
  update: protectedProcedure
    .input(z.object({ id: z.number(), name: z.string().optional(), description: z.string().optional() }))
    .mutation(({ input }) => db.updateUnit(input.id, { name: input.name, description: input.description })),
  delete: protectedProcedure.input(z.number()).mutation(({ input }) => db.deleteUnit(input)),
});

const itemGroupRouter = router({
  list: publicProcedure.query(() => db.getAllItemGroups()),
  create: protectedProcedure
    .input(z.object({ name: z.string(), description: z.string().optional() }))
    .mutation(({ input }) => db.createItemGroup(input)),
  update: protectedProcedure
    .input(z.object({ id: z.number(), name: z.string().optional(), description: z.string().optional() }))
    .mutation(({ input }) => db.updateItemGroup(input.id, { name: input.name, description: input.description })),
  delete: protectedProcedure.input(z.number()).mutation(({ input }) => db.deleteItemGroup(input)),
});

const departmentRouter = router({
  list: publicProcedure.query(() => db.getAllDepartments()),
  create: protectedProcedure
    .input(z.object({ name: z.string(), description: z.string().optional() }))
    .mutation(({ input }) => db.createDepartment(input)),
  update: protectedProcedure
    .input(z.object({ id: z.number(), name: z.string().optional(), description: z.string().optional() }))
    .mutation(({ input }) => db.updateDepartment(input.id, { name: input.name, description: input.description })),
  delete: protectedProcedure.input(z.number()).mutation(({ input }) => db.deleteDepartment(input)),
});

const partyRouter = router({
  list: publicProcedure.query(() => db.getAllParties()),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        type: z.enum(["supplier", "vendor", "contractor"]),
        contactPerson: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        pincode: z.string().optional(),
        gstin: z.string().optional(),
        bankAccount: z.string().optional(),
      })
    )
    .mutation(({ input }) => db.createParty(input)),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        type: z.enum(["supplier", "vendor", "contractor"]).optional(),
        contactPerson: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        pincode: z.string().optional(),
        gstin: z.string().optional(),
        bankAccount: z.string().optional(),
      })
    )
    .mutation(({ input }) => {
      const { id, ...data } = input;
      return db.updateParty(id, data);
    }),
  delete: protectedProcedure.input(z.number()).mutation(({ input }) => db.deleteParty(input)),
});

const itemRouter = router({
  list: publicProcedure.query(() => db.getAllItems()),
  getById: publicProcedure.input(z.number()).query(({ input }) => db.getItemById(input)),
  create: protectedProcedure
    .input(
      z.object({
        code: z.string(),
        name: z.string(),
        description: z.string().optional(),
        unitId: z.number(),
        itemGroupId: z.number(),
        reorderLevel: z.string().optional(),
      })
    )
    .mutation(({ input }) => db.createItem(input)),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        code: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        unitId: z.number().optional(),
        itemGroupId: z.number().optional(),
        reorderLevel: z.string().optional(),
      })
    )
    .mutation(({ input }) => {
      const { id, ...data } = input;
      return db.updateItem(id, data);
    }),
  delete: protectedProcedure.input(z.number()).mutation(({ input }) => db.deleteItem(input)),
});

/**
 * Indent Router
 */

const indentRouter = router({
  list: publicProcedure.query(() => db.getAllIndents()),
  getById: publicProcedure.input(z.number()).query(({ input }) => db.getIndentById(input)),
  create: protectedProcedure
    .input(
      z.object({
        indentNo: z.string(),
        departmentId: z.number(),
        remarks: z.string().optional(),
      })
    )
    .mutation(({ input }) => db.createIndent(input)),
  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["draft", "submitted", "approved", "rejected"]),
        approvedBy: z.number().optional(),
      })
    )
    .mutation(({ input }) => db.updateIndentStatus(input.id, input.status, input.approvedBy)),
  addItem: protectedProcedure
    .input(
      z.object({
        indentId: z.number(),
        itemId: z.number(),
        quantity: z.string(),
        remarks: z.string().optional(),
      })
    )
    .mutation(({ input }) => db.addIndentItem(input)),
  getItems: publicProcedure.input(z.number()).query(({ input }) => db.getIndentItems(input)),
});

/**
 * Comparative Sheet Router
 */

const comparativeSheetRouter = router({
  list: publicProcedure.query(() => db.getAllComparativeSheets()),
  getById: publicProcedure.input(z.number()).query(({ input }) => db.getComparativeSheetById(input)),
  create: protectedProcedure
    .input(
      z.object({
        sheetNo: z.string(),
        indentId: z.number(),
        remarks: z.string().optional(),
      })
    )
    .mutation(({ input }) => db.createComparativeSheet(input)),
  addQuote: protectedProcedure
    .input(
      z.object({
        sheetId: z.number(),
        itemId: z.number(),
        partyId: z.number(),
        quantity: z.string(),
        rate: z.string(),
        total: z.string(),
        leadTime: z.number().optional(),
      })
    )
    .mutation(({ input }) => db.addQuoteToSheet(input)),
  getQuotes: publicProcedure.input(z.number()).query(({ input }) => db.getSheetQuotes(input)),
  finalize: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        selectedPartyId: z.number(),
      })
    )
    .mutation(({ input }) => db.finalizeComparativeSheet(input.id, input.selectedPartyId)),
});

/**
 * Purchase Order Router
 */

const purchaseOrderRouter = router({
  list: publicProcedure.query(() => db.getAllPurchaseOrders()),
  getById: publicProcedure.input(z.number()).query(({ input }) => db.getPurchaseOrderById(input)),
  create: protectedProcedure
    .input(
      z.object({
        poNo: z.string(),
        comparativeSheetId: z.number().optional(),
        partyId: z.number(),
        poDate: z.date(),
        deliveryDate: z.date().optional(),
        totalAmount: z.string(),
        remarks: z.string().optional(),
      })
    )
    .mutation(({ input }) => db.createPurchaseOrder(input)),
  addItem: protectedProcedure
    .input(
      z.object({
        poId: z.number(),
        itemId: z.number(),
        quantity: z.string(),
        rate: z.string(),
        total: z.string(),
      })
    )
    .mutation(({ input }) => db.addPOItem(input)),
  getItems: publicProcedure.input(z.number()).query(({ input }) => db.getPOItems(input)),
  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["draft", "issued", "partial_received", "received", "cancelled"]),
      })
    )
    .mutation(({ input }) => db.updatePOStatus(input.id, input.status)),
});

/**
 * GRN Router
 */

const grnRouter = router({
  list: publicProcedure.query(() => db.getAllGRNs()),
  getById: publicProcedure.input(z.number()).query(({ input }) => db.getGRNById(input)),
  create: protectedProcedure
    .input(
      z.object({
        grnNo: z.string(),
        poId: z.number(),
        grnDate: z.date(),
        receivedBy: z.number().optional(),
        remarks: z.string().optional(),
      })
    )
    .mutation(({ input }) => db.createGRN(input)),
  addItem: protectedProcedure
    .input(
      z.object({
        grnId: z.number(),
        poItemId: z.number(),
        itemId: z.number(),
        quantity: z.string(),
        condition: z.enum(["good", "damaged", "partial"]),
        remarks: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Add GRN item
      await db.addGRNItem(input);
      
      // Update stock level
      const currentStock = await db.getStockLevel(input.itemId);
      const newStock = (Number(currentStock?.currentStock || 0) + Number(input.quantity)).toString();
      await db.updateStockLevel(input.itemId, newStock);
      
      // Record stock movement
      await db.recordStockMovement({
        itemId: input.itemId,
        movementType: "grn",
        referenceId: input.grnId,
        referenceType: "GRN",
        quantity: input.quantity,
        remarks: input.remarks,
      });
    }),
  getItems: publicProcedure.input(z.number()).query(({ input }) => db.getGRNItems(input)),
  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["draft", "received", "inspected", "accepted", "rejected"]),
      })
    )
    .mutation(({ input }) => db.updateGRNStatus(input.id, input.status)),
});

/**
 * GIN Router
 */

const ginRouter = router({
  list: publicProcedure.query(() => db.getAllGINs()),
  getById: publicProcedure.input(z.number()).query(({ input }) => db.getGINById(input)),
  create: protectedProcedure
    .input(
      z.object({
        ginNo: z.string(),
        departmentId: z.number(),
        ginDate: z.date(),
        issuedBy: z.number().optional(),
        purpose: z.string().optional(),
        remarks: z.string().optional(),
      })
    )
    .mutation(({ input }) => db.createGIN(input)),
  addItem: protectedProcedure
    .input(
      z.object({
        ginId: z.number(),
        itemId: z.number(),
        quantity: z.string(),
        remarks: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Add GIN item
      await db.addGINItem(input);
      
      // Update stock level
      const currentStock = await db.getStockLevel(input.itemId);
      const newStock = (Number(currentStock?.currentStock || 0) - Number(input.quantity)).toString();
      await db.updateStockLevel(input.itemId, newStock);
      
      // Record stock movement
      await db.recordStockMovement({
        itemId: input.itemId,
        movementType: "gin",
        referenceId: input.ginId,
        referenceType: "GIN",
        quantity: input.quantity,
        remarks: input.remarks,
      });
    }),
  getItems: publicProcedure.input(z.number()).query(({ input }) => db.getGINItems(input)),
  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["draft", "issued", "received"]),
      })
    )
    .mutation(({ input }) => db.updateGINStatus(input.id, input.status)),
});

/**
 * Direct Purchase Router
 */

const directPurchaseRouter = router({
  list: publicProcedure.query(() => db.getAllDirectPurchases()),
  getById: publicProcedure.input(z.number()).query(({ input }) => db.getDirectPurchaseById(input)),
  create: protectedProcedure
    .input(
      z.object({
        dpNo: z.string(),
        partyId: z.number(),
        dpDate: z.date(),
        totalAmount: z.string(),
        remarks: z.string().optional(),
      })
    )
    .mutation(({ input }) => db.createDirectPurchase(input)),
  addItem: protectedProcedure
    .input(
      z.object({
        dpId: z.number(),
        itemId: z.number(),
        quantity: z.string(),
        rate: z.string(),
        total: z.string(),
      })
    )
    .mutation(({ input }) => db.addDPItem(input)),
  getItems: publicProcedure.input(z.number()).query(({ input }) => db.getDPItems(input)),
  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["draft", "issued", "received", "cancelled"]),
      })
    )
    .mutation(({ input }) => db.updateDPStatus(input.id, input.status)),
});

/**
 * Stock Management Router
 */

const stockRouter = router({
  getLevel: publicProcedure.input(z.number()).query(({ input }) => db.getStockLevel(input)),
  getAllLevels: publicProcedure.query(() => db.getAllStockLevels()),
  getMovements: publicProcedure
    .input(
      z.object({
        itemId: z.number(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      })
    )
    .query(({ input }) => db.getStockMovements(input.itemId, input.startDate, input.endDate)),
  getLowStockItems: publicProcedure
    .input(z.object({ threshold: z.number().optional() }))
    .query(({ input }) => db.getLowStockItems(input.threshold)),
});

/**
 * Reports Router
 */

const reportsRouter = router({
  purchaseReport: publicProcedure
    .input(
      z.object({
        startDate: z.date(),
        endDate: z.date(),
      })
    )
    .query(async ({ input }) => {
      const pos = await db.getAllPurchaseOrders();
      const grns = await db.getAllGRNs();
      const dps = await db.getAllDirectPurchases();
      
      const filteredPOs = pos.filter(
        (po) => new Date(po.createdAt) >= input.startDate && new Date(po.createdAt) <= input.endDate
      );
      const filteredGRNs = grns.filter(
        (grn) => new Date(grn.createdAt) >= input.startDate && new Date(grn.createdAt) <= input.endDate
      );
      const filteredDPs = dps.filter(
        (dp) => new Date(dp.createdAt) >= input.startDate && new Date(dp.createdAt) <= input.endDate
      );
      
      return {
        purchaseOrders: filteredPOs,
        goodsReceivedNotes: filteredGRNs,
        directPurchases: filteredDPs,
      };
    }),
  consumablesReport: publicProcedure
    .input(
      z.object({
        startDate: z.date(),
        endDate: z.date(),
      })
    )
    .query(async ({ input }) => {
      const movements = await db.getStockMovements(0, input.startDate, input.endDate);
      const allItems = await db.getAllItems();
      const stockLevels = await db.getAllStockLevels();
      
      return {
        stockMovements: movements,
        currentStockLevels: stockLevels,
        items: allItems,
      };
    }),
});

/**
 * Dashboard Router
 */

const dashboardRouter = router({
  metrics: publicProcedure.query(async () => {
    const indents = await db.getAllIndents();
    const pos = await db.getAllPurchaseOrders();
    const grns = await db.getAllGRNs();
    const lowStockItems = await db.getLowStockItems();
    
    return {
      pendingIndents: indents.filter((i) => i.status === "submitted").length,
      openPOs: pos.filter((p) => p.status === "issued" || p.status === "partial_received").length,
      recentGRNs: grns.slice(0, 5),
      lowStockAlerts: lowStockItems,
    };
  }),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  units: unitRouter,
  itemGroups: itemGroupRouter,
  departments: departmentRouter,
  parties: partyRouter,
  items: itemRouter,
  indents: indentRouter,
  comparativeSheets: comparativeSheetRouter,
  purchaseOrders: purchaseOrderRouter,
  grns: grnRouter,
  gins: ginRouter,
  directPurchases: directPurchaseRouter,
  stock: stockRouter,
  reports: reportsRouter,
  dashboard: dashboardRouter,
});

export type AppRouter = typeof appRouter;
