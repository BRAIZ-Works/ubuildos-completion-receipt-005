# Control Applicability Matrix

| Control | State | Evidence / boundary |
|---|---|---|
| Product runtime/functionality | PASS | frozen producer tests 20/20 |
| Frozen negative controls | PASS | 10/10 detected |
| Fresh Independent IQA | PASS | exact transport + detached sidecar authenticated |
| Owner acceptance/freeze | PASS | exact reviewed bytes only |
| Public/private repository separation | PASS | CR-005 public projection contains allowlisted public files only |
| Public release projection | PASS | public-only successor package deployed |
| Repository visibility | PASS | public repository readback |
| GitHub Pages deployment | PASS | successful Pages deployment for successor commit `5ef86d392581d6bfe758c2e66f448fed94139cc1` |
| Secret/IP exposure review | PASS | current public tree + 66-commit patch history reviewed; no credential/key/token signatures found |
| Live HTTP surface readback | BLOCKED | current tool environment cannot fetch the github.io surface |
| Terminal closeout | PENDING | requires live HTTP readback + final recovery/audit reconciliation + TEND |
