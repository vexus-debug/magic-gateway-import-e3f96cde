# Role-based dental dashboard upgrade

## Goal
Replace the current one-size-fits-all dental dashboard with focused owner, dentist, and receptionist workspaces while keeping the existing eye-clinic dashboard unchanged.

## What will change
- Build three dental dashboard modes from the signed-in member’s clinic role:
  - **Owner, admin, manager:** revenue, trends, clinic performance, pending collections, and management actions.
  - **Dentist:** their assigned patients, today’s chair, upcoming appointment, clinical workload, and patient actions.
  - **Receptionist:** live queue, arrivals, appointments, pending payments, and front-desk actions.
- Replace the equal card grid with one prominent day card containing the progress ring, next patient, and the most relevant primary action for that role.
- Add a compact horizontal KPI strip with small trend sparklines, followed by varied sections built around one wide operational card.
- Turn passive metrics into action cards with explicit next steps, including recalls, unpaid invoices, empty slots, and patient flow.
- Add one deterministic daily clinic insight derived from real dashboard data; it will show a useful fallback when there is not enough history.
- Show an onboarding checklist when the dental clinic has no operational data: add a dentist, add services, and register the first patient.
- Polish the presentation with tabular money values, a restrained teal glow on the primary day card only, thin gradient-border treatments, consistent Lucide icon weight, and a tooth-chart motif for empty states.
- Preserve existing page links, permissions, help controls, responsive behavior, dark mode, and the eye-clinic dashboard.

## Data and behavior
- Extend the existing dashboard data hooks for role-aware appointment filtering, recent payment totals, queue state, recall candidates, empty-slot patterns, staff/service setup, and sparkline series.
- Scope dentist data to the signed-in staff member where a matching staff record exists; avoid exposing clinic-wide financial summaries to dentist and receptionist views.
- Derive insights locally from authorized clinic data rather than sending patient information to an external AI service.
- Keep every action linked only to pages the signed-in role can access.

## Validation
- Verify owner, dentist, and receptionist variants in desktop and phone layouts.
- Verify the empty-clinic checklist and populated-clinic dashboard states.
- Confirm no overlapping text, clipped horizontal KPI strip, broken actions, runtime errors, or build errors.
