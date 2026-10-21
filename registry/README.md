# Linkoteq Unified Core Registry (initial rollout)

This registry records known components and their *declared* Core v0.5 alignment. Entries do not establish deployed integration or passing end-to-end tests.

New components must register an ID, type, version and evidence-backed status in a PR. Core contract changes require consumer migration checks before a production rollout. CI in this repository validates registry consistency only; each consumer must separately implement a contract test and release gate. GPT and plugin access requires authorized connector setup. Do not auto-upgrade engineering calculations without validated compatibility and approval.
