# Public Claims Ledger
| Claim | Bound source/evidence |
|---|---|
| Five explicit states: NEW, WAITING, DUE, WON, LOST | `logic.js` STATES + tests |
| WON/LOST never show overdue | `logic.js:isOverdue` + tests |
| CSV export is deterministic | `logic.js:toCSV` + deterministic-order test |
| No required network calls | static source scan + architecture |
| Synthetic sample data only | frozen fixtures + source review |
