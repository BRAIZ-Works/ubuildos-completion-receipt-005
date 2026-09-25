# Control Applicability Matrix

| Control | State | Evidence / boundary |
|---|---|---|
| Product runtime/functionality | PASS | frozen producer tests 20/20 |
| Frozen negative controls | PASS | 10/10 detected |
| Fresh Independent IQA | PASS | exact transport + detached sidecar authenticated |
| Owner acceptance/freeze | PASS | exact reviewed bytes only |
| Public/private repository separation | PASS | CR-005 remained private/empty before publication conversion |
| Public release projection | PASS | allowlisted public-only successor package |
| Live hosting readback | PENDING | external publication/Pages gate |
| Terminal closeout | PENDING | requires live readback + recovery/audit reconciliation + TEND |
