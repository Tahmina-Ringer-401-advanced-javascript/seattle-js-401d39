'use strict';

let LL = require('../lib/ll');

describe('Linked List', () => {
  it('inserts a node at the beginning an an empty list', () => {
    const list = new LL();
    list.insert('bananas');
    expect(list.head.value).toEqual('bananas');
  })
})