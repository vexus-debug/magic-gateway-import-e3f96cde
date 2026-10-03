# Upgrade & Connect the Inventory & Supply Pages

## What's there today
- **Inventory**: add/restock/use items, history, transfers, reports. The supplier is only a typed name, not linked to the Suppliers list.
- **Inventory Costs**: a transaction list and spend by category, all entered by hand.
- **Treatment Materials**: links a treatment to the item it uses and how much. Doing the treatment doesn't take anything out of stock.
- **Suppliers**: a basic contact list with no history or performance info.
- **Purchase Orders**: order header only (supplier, dates, totals). Line items exist in the data but you can't manage them, and receiving an order doesn't add stock.

## The connected flow
```text
Suppliers --supply--> Items --low stock--> Purchase Orders
   ^                    |  ^                    |
   | performance        |  +---- receive -------+  (adds stock + cost entry)
   |                    v
   +------------- Inventory Costs <-- Treatment Materials
                  (automatic)          (completed treatment takes stock out)
```

## Upgrades by page

**Inventory**
- Choose the supplier from the Suppliers list and set a preferred supplier for each item.
- Add unit cost, reorder quantity, batch/lot number, expiry date, storage location and barcode/SKU.
- Show a stock status badge (OK / Low / Out / Expiring soon) with filters.
- Add a "Reorder" button, plus one action that turns all low-stock items into draft purchase orders grouped by supplier.
- Item detail drawer: stock movement history, the treatments that use the item, open orders and past prices.

**Purchase Orders**
- Full editor with line items: pick items from inventory, prefill the last cost, and calculate totals and tax.
- Status flow: Draft, Sent, Partially received, Received, Cancelled.
- Receive screen: enter the quantity received for each line (partial deliveries allowed). Receiving adds stock, updates the item's cost and records a cost entry automatically.
- Printable PO and an overdue flag when the expected date has passed.

**Suppliers**
- Supplier profile page: items they supply, order history, total spend, on-time delivery rate and average lead time.
- Add payment terms, rating, tax ID and categories.
- Active/inactive filter and search.

**Treatment Materials**
- Map several materials to each treatment at once, grouped by treatment.
- Show the material cost per treatment and the margin against the treatment price.
- When a treatment is marked completed, deduct its materials from stock and log them to that patient visit.
- Warn when a treatment's materials are low or out of stock.

**Inventory Costs**
- Build entries automatically from received orders and treatment usage. Manual entries stay available for adjustments and waste.
- Date range filters, monthly trend chart, and spend by supplier, category and treatment.
- Cost of materials used vs. treatment revenue, wastage/expiry losses, and CSV export.

## Connections across pages
- Supplier names, item names and PO numbers are links that open the related page.
- Shared alerts in the dashboard header for low stock, items about to expire and overdue orders.

## Technical details
- Database: add `preferred_supplier_id`, `unit_cost`, `reorder_qty`, `expiry_date`, `batch_no`, `location`, `sku` to `inventory`. Add `supplier_id` (linked to suppliers), plus `payment_terms` and `rating` on `suppliers`. Add `received_qty` on `purchase_order_items`. Add `po_id`, `treatment_id` and `patient_id` links on `inventory_transactions`.
- Receiving a PO and using treatment materials run as database functions, so stock and cost entries always update together.
- Keep the existing supplier text value and match it to supplier records where the names match.
- Reuse the existing hooks and extend them. New hooks: `usePurchaseOrderItems` and `useSupplierStats`.

## Build order
1. Database changes and supplier linking
2. PO line items and receiving
3. Inventory upgrades and reorder
4. Automatic stock deduction from treatments
5. Costs analytics, supplier profiles and alerts
