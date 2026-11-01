---
title: "FTS — Fluent Typed Scripting"
description: "Write policies for logs, metrics, and traces directly in Fluent Bit, with typed access to telemetry values and OpenTelemetry context."
type: fts
headerTheme: light
image: "/images/blog/1701353456-general-fluent-bit-preview-card.png"
---

## A policy in action {#policy-in-action}

A login event should help you investigate a request without sending its password to your backend. This policy redacts the structured password field and adds a consistent environment label.

<div class="fts-example-grid">
<div>

### Input

```json {linenos=false,hl_lines="0"}
{"message":"login","password":"example-secret"}
```

</div>
<div>

### Lua policy

```lua {linenos=false,hl_lines="0"}
local fb = require("fluentbit")

function process(log)
  fb.redact(log.body, {"password"})
  log.body:set("environment", "production")
end
```

</div>
<div>

### Result

```json {linenos=false,hl_lines="0"}
{"message":"login","password":"[REDACTED]","environment":"production"}
```

</div>
</div>

The callback edits one log record. Returning nothing keeps its changes; returning `fb.DROP` removes the item. The [official quickstart]({{< fts-link "quickstart" >}}) shows how to attach a policy to a YAML pipeline and run it.

Redaction matches the keys you name in the value you pass. It does not discover secrets inside message text or redact other attributes automatically. A failed policy rolls back its edits and drops the item by default; choosing `error_mode: keep` forwards the original without redaction.

## Put your telemetry policy close to the source

<div class="fts-use-cases">
<div>

### Redact sensitive fields

Replace known keys in structured records and attributes before routing them to a destination. Attach the policy to the input when every destination needs the same redaction.

</div>
<div>

### Normalize telemetry

Align environment names, metric units, and OpenTelemetry resource attributes so that data from different services is easier to query together.

</div>
<div>

### Reduce noise and cardinality

Drop selected log records and deliberately aggregate compatible metric series over the dimensions you need. Choose the policy for your data; FTS makes no automatic decisions about what to discard.

</div>
</div>

## Logs, metrics, and traces

Each signal has its own processor entry and policy: one log record, one metric family, or one span per callback. These snippets are separate policies, not a combined script.

### Logs: normalize OpenTelemetry context

```lua {linenos=false,hl_lines="0"}
local fb = require("fluentbit")

function process(log)
  if fb.is_otel(log) then
    log.resource.attributes:set("deployment.environment.name", "production")
  end
end
```

OpenTelemetry resources, scopes, and attributes are exposed as properties. Ordinary logs need an OpenTelemetry envelope before using those properties.

### Metrics: keep useful dimensions

```lua {linenos=false,hl_lines="0"}
local fb = require("fluentbit")

function process(metric)
  if metric.name == "http.server.requests" then
    fb.aggregate_metric(metric, {"http.route", "http.response.status_code"}, "sum")
  end
end
```

For a compatible request counter, keep route and status dimensions and combine series whose time windows match. Aggregate explicitly: simply removing attributes can create duplicate series.

### Traces: redact span attributes

```lua {linenos=false,hl_lines="0"}
local fb = require("fluentbit")

function process(span)
  fb.redact(span.attributes, {"authorization", "password"})
end
```

This edits span attributes; events and resource attributes need their own policy operations. FTS processes individual spans. Use a trace sampling processor when you need decisions about whole traces.

## What does “typed” mean?

A large integer ID should remain the same ID after you edit an unrelated field. A null should remain a null, and binary data should remain binary data. FTS gives your Lua policy access to typed telemetry values, preserving the type and value of fields it leaves untouched, including exact 64-bit integers, maps, and arrays.

Lua remains dynamically typed. FTS does not add static type checking. Typed accessors validate values at runtime: reading a number as a string raises an error. When creating values, use explicit integer constructors where needed; ordinary Lua numbers are stored as doubles. OpenTelemetry's own value constraints still apply.

FTS complements the existing Lua filter. Use FTS for programmable policies across signals and typed OpenTelemetry access. Existing Lua filter scripts can remain useful, especially when they need Lua modules or classic configuration. The callback and value models differ, so migration requires adapting the policy.

## Try a policy in your pipeline

Start with a development build containing FTS. Native builds need `FLB_PROCESSOR_FTS`, `FLB_LUAJIT`, and `FLB_YYJSON` enabled. Policies use YAML processors on inputs or outputs, with a separate policy for each signal.

- [Get started with FTS]({{< fts-link "quickstart" >}})
- [Configuration and API reference]({{< fts-link "reference" >}})
- [Official examples for logs, metrics, and traces]({{< fts-link "examples" >}})

The official README currently hosts the quickstart, reference, and signal examples. See [How Fluent Bit works](/how-it-works/) and [OpenTelemetry with Fluent Bit](/opentelemetry/) for the surrounding pipeline.
