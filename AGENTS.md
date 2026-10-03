<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Branch-assigned non-admin staff automatically enter their sole sub-branch after sign-in, avoiding an unnecessary clinic picker.
- The installed app's `/sw.js` (scope /app/) never caches pages; it clears legacy caches and handles Web Push (VAPID, sent from a super-admin server function) whose taps open /app/inbox/:id.
- Dental dashboard data is role-focused: leadership sees clinic financials, dentists see their assigned schedule, and front-desk roles see queue and collections.
- Public marketing pages use CDN-backed snapshots of the current dashboard; tutorial image files remain isolated and unchanged.
