---
title: "Wordpress custom blocks: Pass down attributes to child blocks"
date: "2022-01-27"
categories: 
  - "tips-tricks"
tags: 
  - "custom-blocks"
  - "gutenberg"
  - "wordpress"
---

Suppose you are working on a set of interacting custom blocks in Wordpress. You have a child block that needs information from the parent block to display, in this situation, information about a specific record. In such a case you want to use [Block context](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-context/).

> Block context is a feature which enables ancestor blocks to provide values which can be consumed by descendent blocks within its own hierarchy.
> 
> [Wordpress](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-context/)

#### Let's get to work

In your parent block, map the attribute you want to use in your child block using `providesContext`. So if you would like to map the `recordId` property, your parent block configuration would look like this:

```generic
registerBlockType('my-plugin/parent-block', {
  // ...

  attributes: {
    recordId: {
      type: 'number',
    },
  },
 
  providesContext: {
    'my-plugin/recordId': 'recordId',
  },

  // ...
}

```

The child block can then "consume" the context by adding the following `useContext` line to your child block configuration:

```generic
registerBlockType('my-plugin/child-block', {
  // ...

  usesContext: \['my-plugin/recordId'\],

  // ...
}

```

In your child block's `edit` and `save` methods, you can then access the context like this:

```js
registerBlockType('my-plugin/child-block', {
  // ...

  edit(props) {
    const { context } = props;
    const { "my-plugin/recordId": recordId } = context;

    return (
      <p>{ recordId }</p>
    );
  },

  save(props) {
    const { context } = props;
    const { "my-plugin/recordId": recordId } = context;

    return (
      <p>{ recordId }</p>
    );
  }

  // ...
}

```
