---
title: "Test vue component event emits"
date: "2022-08-16"
categories: 
  - "notebook"
tags: 
  - "vue"
  - "jest"
  - "event"
  - "emit"
---

```js
const WrapperComponent = {
  components: {
    ChildComponent,
  },
  methods: {
    onUpdate: jest.fn(),
  },
  template: '<child-component @onUpdate="onUpdate" />',
};

describe('ChildComponent', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(WrapperComponent, {});
  });

  afterEach(() => {
    wrapper.destroy();
  });
  
  it('emits onUpdate event', async () => {
    const spy = jest.spyOn(WrapperComponent.methods, 'onUpdate');
    
    // do something that would make child component emit the 'onUpdate' event
   
    expect(spy).toHaveBeenCalled();
  });
  
 });
```
