# Linkoteq Unified Core Registry (initial rollout)

This registry records Core 0.6 as the current schema authority and each consumer’s declared schema separately. Core 0.5 remains supported during migration. Entries require separate integration and deployment evidence.

New components must register an ID, type, version and evidence-backed status in a PR. Core contract changes require consumer migration checks before a production rollout. CI in this repository validates registry consistency only; each consumer must separately implement a contract test and release gate. GPT and plugin access requires authorized connector setup. Do not auto-upgrade engineering calculations without validated compatibility and approval.
