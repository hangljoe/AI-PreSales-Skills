## Visual diagram guide — how to build each diagram

### Assumption Graphic (Cloud)

5 nodes positioned in the standard cloud layout.

**Shape guide:**
- Goal (centre top): `rectangle`, large, `#1e3a5f` fill, white text
- Need A (mid left): `ellipse`, `#2d6a9f` fill, white text
- Need B (mid right): `ellipse`, `#2d6a9f` fill, white text
- Want A (bottom left): `rectangle`, `#f0f4f8` fill, dark text
- Want B (bottom right): `rectangle`, `#f0f4f8` fill, dark text
- Conflict arrow: bidirectional arrow between Want A and Want B, red, thick
- All other arrows: one-directional, `#2d6a9f`, pointing from want/need toward goal
- Assumption text: free-floating labels on each arrow

**Save:** `output/toc/cloud_[topic].excalidraw`

### Current Reality Tree (CRT)

Bottom-up tree. Root cause at bottom, UDEs at top. Vertical arrows point upward (cause → effect).

**Shape guide:**
- UDEs: `rectangle`, `#c0392b` fill, white text — at top
- Intermediate effects: `rectangle`, `#e67e22` fill, dark text — middle layers
- Root cause: `rectangle`, large, `#1e3a5f` fill, white text — at bottom
- Arrows: upward, vertical, `#333333`, standard width
- Assumption labels: free-floating text on arrows where the link is non-obvious

**Save:** `output/toc/crt_[topic].excalidraw`

### Future Reality Tree (FRT)

Bottom-up tree. Injections at bottom, desired effects above, goal at top. NBR branches extend sideways.

**Shape guide:**
- Injections: `ellipse`, `#27ae60` fill, white text — at bottom
- Desired effects: `rectangle`, `#2980b9` fill, white text — middle layers
- NBR negative effects: `rectangle`, `#e67e22` fill, dark text — sideways branches
- Preventative injections: `ellipse`, `#1abc9c` fill, white text — connecting to NBR branches
- Goal: `rectangle`, large, `#27ae60` border, `#eafaf1` fill — at top
- Arrows: upward for desired chain, sideways for NBR branches

**Save:** `output/toc/frt_[topic].excalidraw`

### Transition Tree (TT)

Linear sequence from top to bottom. Each step is a 5-part row.

**Shape guide:**
- Each step: group of 5 connected elements in a row
  - CS box: `rectangle`, `#f8f9fa` fill
  - Action box: `rectangle`, `#2980b9` fill, white text
  - EE box: `rectangle`, `#f0f4f8` fill
  - Why label: free-floating text below the row
  - AE box: `rectangle`, dashed border, `#f8f9fa` fill (awaiting completion)
- Progress arrows: between steps, pointing down, `#27ae60`

**Save:** `output/toc/tt_[topic].excalidraw`

### Necessary Condition Network (NCN)

Left-to-right network. Start states on the left, goal on the right. Parallel chains arranged vertically. Horizontal arrows throughout (prerequisite logic).

**Shape guide:**
- All nodes: `rectangle`, white fill, dark border — each is a Done Statement
- Goal node: `rectangle`, large, `#27ae60` border, `#eafaf1` fill
- Start nodes (no prerequisites): `ellipse`, `#f0f4f8` fill — left edge
- Resource color coding: different border or background tint per owner/team
- Arrows: left to right, `#2d6a9f`, one-directional, horizontal
- Parallel chains: stacked vertically — same horizontal position = can happen simultaneously
- Time grid lines (when scaled): light gray vertical lines, one per time unit

**Layout rules:**
- Push nodes hard left — close the gaps to show the fastest realistic timeline
- Nodes at the same horizontal level are not dependent on each other — they can run in parallel
- A node that is genuinely prerequisite to many others will visually appear as a convergence point

**Save:** `output/toc/ncn_[topic].excalidraw`

### Druid Loop

Two behaviour branches with cause-and-effect steps rising to goal violations, with loop arrows.

**Shape guide:**
- Two behaviour nodes: `rectangle`, `#2d6a9f` fill, white text — at the bottom centre, side by side
- Cause-and-effect steps (each branch): `rectangle`, `#e8f4f8` fill, dark text — rising vertically
- Goal violations: `rectangle`, `#c0392b` fill, white text — at the top of each branch
- Branch arrows: upward, vertical (cause-and-effect logic)
- Loop arrows: large curved arrows from each goal violation back to the opposite behaviour, `#e67e22`, thick

**Save:** `output/toc/druid_[topic].excalidraw`

---

