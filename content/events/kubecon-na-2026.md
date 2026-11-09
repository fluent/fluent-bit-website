---
title: "Fluent Bit at KubeCon North America 2026"
date: 2026-11-08
draft: false
description: "Meet the Fluent Bit community at KubeCon NA 2026. Explore Fluent Bit 5.2, try Studio, see the benchmarks, and find our kiosk and talks."
url: "/events/kubecon-na-2026/"
layout: "kubecon"
headerTheme: light
canonicalUrl: "https://fluentbit.io/events/kubecon-na-2026/"
studioUrl: "https://studio.fluentbit.io/"
scheduleUrl: "https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/program/schedule/"
kioskMorningUrl: "https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/program/schedule/?id=1373666"
kioskAfternoonUrl: "https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/program/schedule/?id=1373667"
# Session details verified against the official program on 2026-11-08.
# All event times are local to Salt Lake City: MST (UTC-7).
featuredTalk:
  title: "Engineering High-Performance Telemetry Pipelines: Lessons from Fluent Bit"
  speaker: "Eduardo Silva"
  time: "Wednesday, November 11 · 11:00–11:30 AM"
  location: "Salt Palace · Level 2 · 250 A-C"
  url: "https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/program/schedule/?id=1289665"
lightningTalk:
  title: "Fluent Bit: The Evolution of High-Performance Telemetry Pipelines"
  speaker: "Eduardo Silva"
  time: "Monday, November 9 · 11:24–11:29 AM"
  location: "Hyatt Regency · Level 4 · Regency Ballroom B-D"
  url: "https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/program/schedule/?id=1289874"
---

### Typed scripting for all three signals

**Fluent Typed Scripting (FTS)** brings Lua policies to logs, metrics, and traces. Redact sensitive fields, normalize telemetry, and reduce noise while preserving typed values and OpenTelemetry context. [Explore FTS →](/fts/)

### Faster OpenTelemetry pipelines

Native processing improvements accelerate log ingestion and transformations. Compatible Content Modifier chains apply multiple edits in one pass. [Inspect the benchmarks →](/benchmarks/5.2/)

### Delivery that responds to busy backends

HTTP, OpenTelemetry, Elasticsearch, and OpenSearch outputs honor supported throttling responses and retry-delay hints. Waiting through a cooldown does not consume retry attempts.

### More efficient buffering

Filesystem buffering uses disk more efficiently for low-volume streams, while large log buffers are processed in bounded windows.

### System logs, ready for OpenTelemetry

The new `journald_otel` processor maps journal records into OTel logs, including severity, host, and process information.

### Fluent Bit in the browser

An experimental WebAssembly browser SDK brings configuration, JSON log ingestion, and engine lifecycle controls to browser applications. [Try Fluent Bit Studio →](https://studio.fluentbit.io/)
