# Control Applicability Matrix
| Control | Status | Basis |
|---|---|---|
| Zero required runtime network | PASS | static source scan + product architecture |
| Analytics/tracking | PASS | none shipped |
| Authentication/cloud DB | N/A | product is local-only |
| Sensitive fixture data | PASS | synthetic labels only |
| Public/private repo separation | PASS_PRE_IQA | public projection contains public allowlist only |
| Live hosting readback | PENDING | post-IQA external-effect gate |
| LinkedIn/social | N/A for product closure | current Day-04 plan |