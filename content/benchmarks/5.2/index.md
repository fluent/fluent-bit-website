---
title: "Fluent Bit 5.2 performance benchmarks"
description: "Explore Fluent Bit v5.2 throughput, CPU, memory, and buffering measurements under documented workload conditions."
headerTheme: light
image: "/images/blog/1701353456-general-fluent-bit-preview-card.png"
---

<section class="benchmark-section" aria-labelledby="otlp">

## OpenTelemetry log ingestion and transformation {#otlp}

Fluent Bit 5.2 reaches **1.50 million JSON records/s** and **1.43 million Protobuf records/s** when adding one log attribute with memory buffering. It has the highest throughput in all eight measured ingestion and transformation cases.

The transformation is the same across systems: set `bench.added = "yes"` on every log. Both Fluent Bit versions use `content_modifier`; Collector 0.163 uses its transform processor / OTTL. **This comparison does not use FTS.** All systems complete 30 million records per run with null outputs.

{{< benchmark-results "otlp" >}}

Collector has the lowest peak RSS in these tests. Saturation RSS includes queued records and is not an equal-rate memory-efficiency measurement. Compare memory alongside throughput and CPU.

<details>
<summary>All OTLP results: throughput, CPU, memory, and latency</summary>

{{< benchmark-table "otlp" >}}

</details>
<details>
<summary>How the OTLP comparison was measured</summary>

Each case uses 100 logs/request, 16 persistent HTTP clients, 320,000 warmup records, and 30M measured records. Product order rotates across five fresh runs. The Linux host uses an AMD Ryzen 9 7940HS, with four server CPUs and separate generator cores.

Fluent Bit uses four HTTP workers, a 0.5s flush interval, and null output. Collector Contrib 0.163 uses an instrumented counting null exporter, one sending-queue consumer, and 8,192-record batching. Filesystem tests use Fluent Bit filesystem buffering and Collector `file_storage`; their persistence semantics are not equivalent.

Throughput includes sending and final drain. Fluent Bit completion counters update about once per second. Clients retry refusals, and every run completes all 30M records. Latency is the HTTP batch round trip, not per-record delivery latency. Results depend on the tested workload, buffering configuration, and hardware.

</details>
</section>

<section class="benchmark-section" aria-labelledby="fts">

## Lower CPU for programmable log transformations {#fts}

In nine equivalent-policy tests, **FTS uses 18–45% less CPU than Lua on Fluent Bit 5.1.0**. The comparison includes Lua on 5.1.0, Lua on 5.2, and FTS on 5.2.

These are log-policy measurements. They do not include a Collector or standalone content modifier baseline, and do not establish performance for metrics or traces.

{{< benchmark-results "fts" >}}
{{< benchmark-table "fts" >}}

<details>
<summary>Memory and flush-interval tradeoffs</summary>

At the tested 0.2s flush interval, FTS generally uses slightly more peak RSS for input policies. Output processing uses less: 60.2 MB versus 75.7 MB for Lua on 5.1.0.

At a 0.02s flush interval, CPU remains within 2% of the reported results and input-policy peak RSS stays within 1.5 MB of Lua. Output-side memory is 52 MB versus 67 MB for Lua in that configuration. The source reports medians but does not state the repeat count.

</details>

[Explore Fluent Typed Scripting](/fts/) and see how to write typed telemetry policies in Lua.
</section>

<section class="benchmark-section" aria-labelledby="fusion">

## Make multiple content modifier edits in one pass {#fusion}

Compatible content modifier chains combine their work into one decode/edit/encode pass. Six upserts reduce CPU by **15.7% on 12-field records** and **19.4% on 128-field records** in the final confirmation. Wide-record throughput improves **20.0%**; narrow-record throughput remains approximately flat.

{{< benchmark-results "fusion" >}}
{{< benchmark-table "fusion" >}}

The baseline is an earlier 5.2 revision, not 5.1. These percentages must not be added to the OTLP gains. Compatible plain-body insert, upsert, delete, and rename chains benefit; grouped OTLP records, conditions, and unsupported chains take other paths.
</section>

<section class="benchmark-section" aria-labelledby="storage">

## Use less disk for many low-volume streams {#storage}

With 1,000 sparse tags, allocated filesystem space falls from **250 MiB to 19.53 MiB**, a **92.2% reduction**. The benefit is strongest for sparse streams; busy-stream throughput stays broadly similar.

{{< benchmark-results "storage" >}}
{{< benchmark-table "storage" >}}

<details>
<summary>Buffering workload and tradeoffs</summary>

Real tail-to-null pipelines use 256-byte source lines: 64,000 records across 1,000 sparse tags, or 1M records for busy-stream and memory controls. Disk figures are sampled allocated blocks, not payload size. CPU includes startup and shutdown; ingestion rate excludes startup and final drain.

Tests use ext4/NVMe, 4 KiB pages, one server CPU, and a shared host. Checksum-enabled busy streams use 2.1% more CPU and have 1.7% lower measured ingestion rate. Busy-stream remaps increase from 1,105 to 1,523. Both builds use ChunkIO 1.5.5, isolating allocation integration.

</details>
</section>

<section class="benchmark-section" aria-labelledby="libraries">

## Smaller in-memory record graphs {#libraries}

Compact CFL arenas reduce reserved memory per decoded record by **27–31%**, with **23–26% less CPU time** in the measured record-building workloads. These are record-graph measurements, not total process RSS.

<details open>
<summary>Record-building CPU and memory measurements</summary>

{{< benchmark-results "cfl" >}}
{{< benchmark-table "cfl" >}}

These microbenchmark gains are not additive with pipeline results. Memory improvements vary by record shape.

</details>
</section>
