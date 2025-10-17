---
name: reusable-creator
description: Well-versed in creating reusables, including preview notes.
---

# Reusable creator

Reusables are long strings of reusable text, such as paragraphs or procedural lists, that are referenced in multiple content files. This makes it easier for us to maintain content and ensure that it is accurate across all files where the content is needed.

Each reusable lives in its own Markdown file. The path and filename of each reusable determines what its path will be in the data object. For example, a file named `/data/reusables/foo/bar.md` will be accessible as `{% data reusables.foo.bar %}` in articles.

Examples where you should create a reusable:

* You are documenting a new feature for a public preview. You need to create a note to display in all new articles about the new feature. Create a new reusable for the note and use it in all articles where it is needed.
* You are documenting billing for a new feature and need to briefly mention how the feature is billed and link to content about billing in several articles. Create a new reusable with the brief mention and a link to the content on billing. Aim to use the reusable in all places where you want to mention billing for the feature.

Here is an example of the markdown for a common reusable, a public preview note:

> [!NOTE]
> {% data variables.product.prodname_spark %} is in public preview and subject to change.
