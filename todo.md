# Factory Store Inventory Management System - TODO

## Phase 1: Database Schema & Backend Setup
- [x] Design and implement database schema (Items, Units, Item Groups, Departments, Parties, Indents, Comparative Sheets, POs, GRNs, GINs, Direct Purchases, Stock Levels)
- [x] Create database migrations and apply schema
- [x] Build backend query helpers for all entities
- [x] Implement tRPC procedures for Masters (CRUD operations)
- [x] Implement tRPC procedures for Transactions (Indent, Comparative Sheet, PO, GRN, GIN, Direct Purchase)
- [x] Implement stock level calculation and automatic updates
- [ ] Write vitest tests for database operations and business logic

## Phase 2: Master Data Management UI
- [x] Build Item management page (create, read, update, delete)
- [x] Build Unit management page
- [x] Build Item Group management page
- [x] Build Department management page
- [x] Build Party (Supplier/Vendor) management page
- [x] Create reusable master data form components
- [x] Add validation and error handling

## Phase 3: Transaction Modules - Part 1
- [x] Build Indent Creation page (form with item selection, quantity, department)
- [ ] Build Indent list/view page with approval workflow - IN PROGRESS
- [ ] Build Comparative Sheet page (select indent, add party quotes, compare)
- [ ] Build Comparative Sheet list/view page

## Phase 4: Transaction Modules - Part 2
- [ ] Build Purchase Order (PO) creation from comparative sheet
- [ ] Build PO list/view page with line items and party details
- [ ] Build Goods Received Note (GRN) page (record against PO)
- [ ] Build GRN list/view page
- [ ] Build Goods Issue Note (GIN) page (issue from store)
- [ ] Build GIN list/view page

## Phase 5: Direct Purchase & Stock Management
- [ ] Build Direct Purchase module (bypass indent/PO workflow)
- [ ] Build Direct Purchase list/view page
- [ ] Implement automatic stock level updates (GRN adds, GIN deducts)
- [ ] Build stock level tracking and display
- [ ] Add low-stock alerts

## Phase 6: Reports & Dashboard
- [ ] Build Purchase Report with date-range filtering (POs, GRNs, Direct Purchases)
- [ ] Build Consumables Report with stock movements and current levels
- [ ] Build Dashboard home page with key metrics
- [ ] Add pending indents count widget
- [ ] Add open POs count widget
- [ ] Add recent GRNs widget
- [ ] Add low-stock alerts widget
- [ ] Implement real-time metric updates

## Phase 7: UI Polish & Integration
- [ ] Implement elegant, refined visual design across all pages
- [ ] Add consistent typography, spacing, and color scheme
- [ ] Build responsive layouts for all modules
- [ ] Add loading states and error handling
- [ ] Implement smooth transitions and micro-interactions
- [ ] Test cross-browser compatibility
- [ ] Verify all workflows end-to-end

## Phase 8: Final Testing & Delivery
- [ ] Comprehensive testing of all features
- [ ] Performance optimization
- [ ] Create checkpoint and deliver to user
