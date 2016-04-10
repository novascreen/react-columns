import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import range from 'lodash.range'
import mapNodesToColumns from 'src/mapNodesToColumns'

describe('mapNodesToColumns()', () => {
  let children = (range(10)).map((i) => {
    let node = document.createElement('div')
    node.id = i
    return node
  })
  let dimensions = [
    { width: 800, height: 1200 },
    { width: 800, height: 600 },
    { width: 800, height: 800 },
    { width: 800, height: 600 },
    { width: 800, height: 1200 },
    { width: 800, height: 600 },
    { width: 800, height: 400 },
    { width: 800, height: 400 },
    { width: 800, height: 400 },
    { width: 800, height: 800 },
  ]

  it('should return children unchanged when only 1 column', () => {
    let columns = mapNodesToColumns({
      children: children,
      columns: 1,
    })
    expect(columns).toEqual(children)
  })

  describe('spread the children across the columns', () => {
    it('should put children into 2 columns', () => {
      let columns = mapNodesToColumns({
        children: children,
        columns: 2,
      })
      expect(columns).toEqual([
        [children[0], children[2], children[4], children[6], children[8],],
        [children[1], children[3], children[5], children[7], children[9],],
      ])
    })

    it('should put children into 3 columns', () => {
      let columns = mapNodesToColumns({
        children: children,
        columns: 3,
      })
      expect(columns).toEqual([
        [children[0], children[3], children[6], children[9],],
        [children[1], children[4], children[7],],
        [children[2], children[5], children[8],],
      ])
    })
  })
  describe('use `dimensions` to put every child into the shortest column', () => {
    it('should put children into 2 columns optimized by dimensions', () => {
      let columns = mapNodesToColumns({
        children: children,
        columns: 2,
        dimensions: dimensions,
      })
      expect(columns).toEqual([
        [children[0], children[3], children[5], children[6], children[8],],
        [children[1], children[2], children[4], children[7], children[9],],
      ])
    })

    it('should put children into 3 columns optimized by dimensions', () => {
      let columns = mapNodesToColumns({
        children: children,
        columns: 3,
        dimensions: dimensions,
      })
      expect(columns).toEqual([
        [children[0], children[5], children[8],],
        [children[1], children[3], children[6], children[7], children[9],],
        [children[2], children[4],],
      ])
    })
  })
})