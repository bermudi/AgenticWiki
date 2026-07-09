---
title: Axiom
created: 2026-04-28
updated: 2026-04-28
sources: ["raw/yt-youre-logging-wrong.md"]
unaudited_marginal: 0
tags: ["observability", "logging", "platforms", "production-engineering"]
---

# Axiom

> Observability platform purpose-built for high-cardinality, high-dimensionality log data at scale. Handles 5.8 billion rows / 7.3 TB of raw text for T3 Chat's production services alone. Pricing model favors retention over ingest metering, making [[wide-events|wide event]] logging economically viable.

Axiom built their own database technology optimized for the specific demands of structured log data: high cardinality fields (user IDs, trace IDs), high dimensionality (50+ fields per event), and fast querying across both. This distinguishes them from legacy logging systems that charge by volume and choke on high cardinality.

## Economics

The pricing model is retention-based rather than ingest-based, which changes the calculus for wide events:

- **Free tier**: 500 GB monthly ingest, 30-day retention
- **Paid**: ~$35/month for 1 TB ingest with 1-year retention
- **Field limit**: 4,096 fields per dataset (T3 Chat uses 59 of them in their main service; Stripe logging uses 791)

This contrasts with platforms that bill on raw ingest — those create pressure to log less, which undermines the wide-event philosophy of "log everything you might need."

## Agent Relevance

For agent-produced code, Axiom (or equivalent columnar-backend observability platforms) removes the economic objection to wide events. An agent can default to logging generously without worrying that it's creating an unsustainable observability bill. The platform handles the scale; the agent's job is to provide the context.

## Related

- [[wide-events]] — Axiom is the storage/query layer that makes wide events practical at scale
- [[agent-observability]] — Same platform can host agent decision-chain traces alongside service logs
- [[agent-quality-engineering]] — Observability infrastructure is part of the quality stack

## Sources

- `raw/yt-youre-logging-wrong.md` — Theo's tour of T3 Chat's Axiom setup: 5.8B rows, 59 fields, cost structure
