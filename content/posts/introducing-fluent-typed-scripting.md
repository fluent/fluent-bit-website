---
title: "Introducing FTS: Typed Telemetry Policies for Fluent Bit"
description: "Redact a login event with a Lua policy, then explore typed transformations for logs, metrics, traces, and OpenTelemetry context in Fluent Bit."
draft: true
url: "/blog/introducing-fts/"
author: "The Fluent Bit Team"
image: "/images/blog/1701353456-general-fluent-bit-preview-card.png"
herobg: "/images/blog/1689182792-background-fluent-bit.png"
tags: ["FTS", "Lua", "OpenTelemetry"]
---

A login request fails, and its log is exactly what you need to investigate. But the event also contains a password. You want to keep the useful context, remove the secret, and label the event consistently before it reaches your backend.

**FTS — Fluent Typed Scripting** lets you express that policy in Lua inside Fluent Bit. Start with this log body:

```json {linenos=false,hl_lines="0"}
{"message":"login","password":"example-secret"}
```

A short policy redacts the password and adds an environment field:

```lua {linenos=false,hl_lines="0"}
local fb = require("fluentbit")

function process(log)
  fb.redact(log.body, {"password"})
  log.body:set("environment", "production")
end
```

The result keeps the event useful:

```json {linenos=false,hl_lines="0"}
{"message":"login","password":"[REDACTED]","environment":"production"}
```

Redaction here matches the structured key `password`. Secrets embedded in free-form message text need an explicit string policy, and other attribute maps need their own redaction calls. The [official quickstart]({{< fts-link "quickstart" >}}) shows how to configure and run your first policy.

## Shape your telemetry with Lua.

The same approach extends beyond log fields. FTS gives policies typed access to logs, metrics, and traces, along with OpenTelemetry resource, scope, and attribute context.

- **Redact sensitive fields:** replace selected keys in structured bodies or attributes before forwarding data.
- **Normalize telemetry:** align resource attributes across services or convert metric values and units together.
- **Reduce noise and cardinality:** discard selected records or aggregate compatible metric series over the dimensions you choose.

For example, a policy for an HTTP request counter can retain route and status dimensions while deliberately combining series with matching time windows:

```lua {linenos=false,hl_lines="0"}
local fb = require("fluentbit")

function process(metric)
  if metric.name == "http.server.requests" then
    fb.aggregate_metric(metric, {"http.route", "http.response.status_code"}, "sum")
  end
end
```

Span policies can edit attributes, events, and resource context. They operate on individual spans; whole-trace sampling belongs in a sampling processor.

## Measured scripting performance

Across nine equivalent log-policy tests, FTS on Fluent Bit 5.2 uses 18–45% less CPU than Lua on 5.1.0. The [benchmark report](/benchmarks/5.2/#fts) includes Lua on both versions, CPU and peak RSS, policy-specific memory tradeoffs, and the published measurement conditions.

## Typed values, familiar Lua

“Typed” describes the telemetry values exposed to the script. Lua stays dynamically typed, and checks happen at runtime. FTS preserves untouched values such as exact 64-bit integers, binary data, nulls, maps, and arrays. Updating an environment field should not round an unrelated large integer ID.

Policies use typed accessors and constructors rather than converting every value to a Lua table or number. OpenTelemetry context is available through properties such as `log.resource.attributes`; scripts do not need to decode raw metadata to reach it. OpenTelemetry properties on logs require that context to be present.

## A policy inside the pipeline

Attach an FTS processor to an input or output using YAML. Each signal uses a separate processor entry and policy. A callback receives one log record, one metric family, or one span, then keeps its edits or drops that item. Processor instances do not share Lua globals across signals.

If a callback fails, its edits roll back. The default `error_mode: drop` removes the item; `keep` forwards the unmodified original. That choice matters for redaction: keeping the original also keeps the secret.

Instruction, memory, and output limits help manage policy mistakes. The restricted Lua environment is not a security boundary; policies must come from trusted authors.

FTS complements the existing Lua filter. The Lua filter remains useful for existing log scripts, Lua module access, and classic configuration. Moving a script to FTS requires adapting its callback and value access; it is not a mandatory migration.

## Try FTS with Fluent Bit 5.2

{{< fts-availability >}}

The current Lua quickstart, reference, and signal examples live in the official Fluent Bit source repository. Stable release notes will identify the first shipped version when it is released.

Explore [FTS's capabilities and signal examples](/fts/), then [get started with FTS]({{< fts-link "quickstart" >}}). Try a policy against representative data and share your feedback through [Fluent Bit's GitHub discussions](https://github.com/fluent/fluent-bit/discussions): which transformations do you need, and where could the policy API be clearer?
