---
title: "FTS — Fluent Typed Scripting"
description: "Write policies for logs, metrics, and traces directly in Fluent Bit, with typed access to telemetry values and OpenTelemetry context."
type: fts
headerTheme: light
image: "/images/blog/1701353456-general-fluent-bit-preview-card.png"
---

<section class="fts-section" aria-labelledby="use-cases">
<p class="fts-eyebrow">Your pipeline. Your policy.</p>

## Keep the telemetry you need. Shape what you send. {#use-cases}

A secret in a log, inconsistent metric units, or a stream of successful probes can get in the way of useful telemetry. FTS lets you express how that data should reach your destinations, inside Fluent Bit.

<div class="fts-use-cases">
<div>

### Protect sensitive fields

Redact selected structured keys in log bodies and attributes. Apply privacy policies at the input when every destination needs the same treatment.

</div>
<div>

### Normalize across services

Decode JSON messages, align OpenTelemetry context, and explicitly convert metric names and units to the conventions your queries expect.

</div>
<div>

### Reduce noise and dimensions

Keep failures and useful context while suppressing selected successful probes. Aggregate compatible metric series over the dimensions you need.

</div>
</div>
</section>

<section class="fts-section" aria-labelledby="packs">
<div class="fts-section-grid">
<div>
<p class="fts-eyebrow">Reusable Lua. Configurable policies.</p>

## Start with a pack. Make it your policy. {#packs}

A pack contains Lua processing blocks with declared parameters and fixtures. Install the files locally, choose a block in YAML, and supply your settings. Operators can use a pack without writing Lua; authors can extend the policy without creating a native plugin.

A **recipe** runs selected blocks in order. Compose core operations and pack blocks for the same signal, with parameter validation before ingestion starts.

[Install and run your first pack]({{< fts-link "quickstart" >}}) · [Write or extend a pack]({{< fts-link "authoring" >}})

Packs are trusted local configuration. Fluent Bit does not download or auto-update them. Pin and review the installed artifact.

</div>
<div>

{{< fts-recipe >}}

</div>
</div>

### Policies you can build on

Each pack documents its source requirements, parameters, limits, and independent fixtures. Choose one that matches your input contract.

{{< fts-packs >}}

[Browse the full policy catalog]({{< fts-link "examples" >}})
</section>

<section class="fts-section" aria-labelledby="signals">
<p class="fts-eyebrow">One runtime. Three signals.</p>

## Write the transformation your data needs. {#signals}

For custom logic, attach a Lua script to an input or output processor. Use a separate policy for each signal: one log record, one metric family, or one span per callback. These examples are independent scripts.

{{< fts-signals >}}

OpenTelemetry resource, scope, and attributes are available as properties. Logs must carry OpenTelemetry context to use those properties; ordinary logs can first pass through the OpenTelemetry envelope processor.
</section>

<section class="fts-section fts-typed-section" aria-labelledby="typed-values">
<div class="fts-section-grid">
<div>
<p class="fts-eyebrow">Change the field. Preserve the value.</p>

## What does “typed” mean? {#typed-values}

A request ID should still be the same ID after you redact a password. FTS exposes telemetry values with their types intact: exact 64-bit integers, doubles, binary data, nulls, maps, and arrays.

Lua remains dynamically typed. Accessors check values at runtime, and explicit constructors let you create exact integers. Untouched values retain their type and value; OpenTelemetry's own constraints still apply.

</div>
<div class="fts-value-card" aria-label="Examples of preserved telemetry types">
  <p class="fts-code-label">Values your policy leaves untouched</p>
  <dl>
    <div><dt>Integer ID</dt><dd><code>9007199254740993</code><span>Exact 64-bit value</span></dd></div>
    <div><dt>Null</dt><dd><code>null</code><span>Preserved as null</span></dd></div>
    <div><dt>Binary</dt><dd><code>bytes</code><span>Preserved as binary data</span></dd></div>
    <div><dt>Context</dt><dd><code>resource · scope</code><span>Structured OpenTelemetry access</span></dd></div>
  </dl>
</div>
</div>
</section>

<section class="fts-section" aria-labelledby="workflow">
<p class="fts-eyebrow">From policy to a reviewed pipeline</p>

## Compose. Validate. Replay. {#workflow}

<div class="fts-workflow">
<div>

### 01 / Compose

Select a pack or write trusted Lua. Declare the signal and source schema; order parsing, normalization, and redaction before decisions that use those fields.

</div>
<div>

### 02 / Validate

Run `fluent-bit --dry-run -c fluent-bit.yaml` to check configuration and pack loading. Authors and tools can inspect exported parameter schemas and Lua API declarations.

</div>
<div>

### 03 / Replay

Test representative inputs and independently specified outputs through the real Fluent Bit runtime. Typed fixtures help catch accidental changes to IDs, values, and context.

</div>
</div>

[Authoring schemas and API declarations]({{< fts-link "schemas" >}}) · [Typed fixture runner]({{< fts-link "fixtures" >}})

### When a policy fails

Item edits roll back together. By default, `error_mode: drop` removes the item; `keep` forwards its original, including any unredacted data. Redaction targets only the values and structured keys you specify; it does not discover secrets in free-form text.

Instruction, memory, and output limits help contain policy mistakes. Policies and packs are trusted configuration; the restricted environment is not a security boundary.

### When a policy needs state

The development runtime also provides local deduplication, throttling, and bounded windows. These have specific signal and placement requirements. State is local and volatile across restart, reload, and shutdown; local decisions do not guarantee delivery. Read the [state and window contract]({{< fts-link "state" >}}) before using them.

FTS complements the existing Lua filter. Existing scripts may still need its module access, record splitting, or classic configuration. Adapting a policy to FTS requires its callback and value model, not just a configuration rename.
</section>

<section class="fts-section fts-get-started" aria-labelledby="get-started">
<p class="fts-eyebrow">Try it with your telemetry</p>

## Start with one policy. {#get-started}

Run a complete pack example, inspect the output, then adapt its parameters to representative data from your own pipeline.

{{< fts-availability >}}

<div class="fts-actions">
<a class="btn btn-gradient" href="{{< fts-link "quickstart" >}}">Get started with FTS</a>
<a class="fts-text-link" href="{{< fts-link "reference" >}}">Read the processor reference ↗</a>
</div>

The guides above are maintained in the official Fluent Bit source repository. [OpenTelemetry with Fluent Bit](/opentelemetry/) and [How it works](/how-it-works/) explain the surrounding pipeline. Share your policy needs and feedback in [GitHub Discussions](https://github.com/fluent/fluent-bit/discussions).
</section>
