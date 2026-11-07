---
title: "FTS — Fluent Typed Scripting"
description: "Write policies for logs, metrics, and traces directly in Fluent Bit, with typed access to telemetry values and OpenTelemetry context."
intro: "Use Lua to hide sensitive fields, make your data consistent, and filter out unwanted events before they reach your backend."
type: fts
headerTheme: light
image: "/images/blog/1701353456-general-fluent-bit-preview-card.png"
---

<section class="fts-section" aria-labelledby="use-cases">

## Your data. Your rules. {#use-cases}

A policy is a small Lua script that tells Fluent Bit what to change, keep, or drop.

<div class="fts-use-cases">
<div>

### Hide sensitive fields

Replace passwords, tokens, and other known fields before sending data to a destination.

</div>
<div>

### Make data consistent

Use common environment labels and metric units so data from different services is easier to query.

</div>
<div>

### Reduce noise

Filter out events you do not need, or combine compatible metric series using the labels that matter to you.

</div>
</div>
</section>

<section class="fts-section fts-typed-section" aria-labelledby="typed-values">
<div class="fts-section-grid">
<div>

## What does “typed” mean? {#typed-values}

Changing a password field should not change a request ID. FTS preserves the values your policy leaves untouched, including large integer IDs, nulls, and binary data.

Lua is still Lua: you do not need a new language or static type declarations.

</div>
<div class="fts-value-card" aria-label="An exact ID preserved by the policy">
  <p class="fts-code-label">The ID in the example above</p>
  <dl>
    <div><dt>Before</dt><dd><code>9007199254740993</code></dd></div>
    <div><dt>After</dt><dd><code>9007199254740993</code><span>Same value. No rounding.</span></dd></div>
  </dl>
</div>
</div>
</section>

<section class="fts-section" aria-labelledby="signals">

## Works with logs, metrics, and traces {#signals}

Write a policy for the data you want to change. FTS also gives you access to OpenTelemetry resource and application context when it is present.

<details class="fts-more-examples">
<summary>See examples for logs, metrics, and traces</summary>

{{< fts-signals >}}

</details>
</section>

{{< benchmark-fts >}}

<section class="fts-section fts-get-started" aria-labelledby="get-started">

## Try your first policy {#get-started}

The quickstart shows how to add a Lua policy to a Fluent Bit pipeline and inspect the result. FTS is included in **Fluent Bit 5.2**.

<div class="fts-actions">
<a class="btn btn-gradient" href="{{< fts-link "quickstart" >}}">Get started with FTS</a>
<a class="fts-text-link" href="{{< fts-link "reference" >}}">Examples and API reference ↗</a>
</div>

<details class="fts-more-examples">
<summary>A few things to know before you start</summary>

- Redaction replaces the structured fields you name. Secrets inside message text need their own rules.
- By default, a failed policy drops the affected item. Review the [error-handling options]({{< fts-link "reference" >}}#callback-results) before using a privacy policy.
- Existing Lua filter scripts can keep running. FTS uses a different API, so moving a script requires adapting it.

</details>
</section>
