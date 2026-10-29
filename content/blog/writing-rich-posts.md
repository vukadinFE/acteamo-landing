---
title: Writing rich posts with images and components
description: A quick reference for content authors — how to add images, callouts, buttons and embeds to any Markdown file using MDC.
date: 2025-03-01
author: The Acteamo Team
tag: Guides
tags:
  - authoring
  - markdown
  - components
---

Every page and blog post on this site is just Markdown. Thanks to **MDC**
(Markdown Components) you can drop images and Vue components straight into your
content — no code changes required.

## Images

Use standard Markdown image syntax. Local images live in `public/` and are
referenced from the site root:

```md
![The Acteamo capacity selector](/images/capacity-selector.svg)
```

![The Acteamo capacity selector](/images/capacity-selector.svg)

Image paths are automatically resolved to the correct base URL, so they work
both on a custom domain and on GitHub project pages.

## Callouts

Wrap a highlight in a `::callout` block. The `type` can be `tip`, `info`,
`warning` or `success`:

```md
::callout{type="success" title="Nice work"}
You just rendered a component from Markdown.
::
```

::callout{type="success" title="Nice work"}
You just rendered a component from Markdown.
::

::callout{type="warning" title="One rule"}
Close every block component with a matching `::` on its own line.
::

## Buttons

Add a call-to-action inline with `:button-link`:

```md
:button-link[Start for free]{to="https://my.acteamo.com/auth/register"}
```

:button-link[Start for free]{to="https://my.acteamo.com/auth/register"}
:button-link[Read the blog]{to="/blog" variant="secondary"}

## Video embeds

Embed a YouTube video by its id:

```md
::youtube{id="dQw4w9WgXcQ" title="Acteamo demo"}
::
```

::youtube{id="dQw4w9WgXcQ" title="Acteamo demo"}
::

That is everything — mix prose, images and components freely to build rich,
on-brand content.
