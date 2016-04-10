import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import mq from 'src/mq'

describe('mq/mediaQuery()', () => {
  describe('set query with different values', () => {
    it('small min-width value', () => {
      let mQ = mq.mediaQuery({
        query: '(min-width: 1px)'
      })
      expect(mQ.queryMatches).toBe(true)
    })

    it('large min-width value', () => {
      let mQ = mq.mediaQuery({
        query: '(min-width: 10000px)',
      })
      expect(mQ.queryMatches).toBe(false)
    })

    it('small max-width value', () => {
      let mQ = mq.mediaQuery({
        query: '(max-width: 1px)',
      })
      expect(mQ.queryMatches).toBe(false)
    })

    it('large max-width value', () => {
      let mQ = mq.mediaQuery({
        query: '(max-width: 10000px)',
      })
      expect(mQ.queryMatches).toBe(true)
    })

    it('automatically wrap with parens', () => {
      let mQ = mq.mediaQuery({
        query: 'min-width: 1px',
      })
      expect(mQ.queryMatches).toBe(true)
    })

    describe('`full` property', function() {
      it('media queries without wrapping parentheses no longer match', () => {
        let mQ = mq.mediaQuery({
          query: 'min-width: 1px',
          full: true,
        })
        expect(mQ.queryMatches).toBe(false)
      })

      it('media queries with both types and features match', () => {
        let mQ = mq.mediaQuery({
          query: 'all and (min-width: 1px)',
          full: true,
        })
        expect(mQ.queryMatches).toBe(true)
      })
    })

    describe('query does not activate on empty string or null', function() {
      it('empty string', () => {
        let mQ = mq.mediaQuery({
          query: '',
        })
        expect(mQ._mq).toNotExist()
      })

      it('null', () => {
        let mQ = mq.mediaQuery({
          query: null,
        })
        expect(mQ._mq).toNotExist()
      })
    })
  })
})


describe('mq/mediaQueryMapper()', () => {

  describe('`defaultValue` property', () => {

    it('should be returned when no query matches', () => {
      let mQM = mq.mediaQueryMapper({
        defaultValue: 1,
        queries: [{
          query: 'min-width: 10000px',
          value: 2
        }]
      })
      expect(mQM.getValue()).toEqual(1)
    })

    it('should be returned when no query is passed', () => {
      let mQM = mq.mediaQueryMapper({
        defaultValue: 'tiny',
      })
      expect(mQM.getValue()).toEqual('tiny')
    })
  })

  describe('`valueKey` property should be used to read value from matching query', () => {

    it('default (value)', () => {
      let mQM = mq.mediaQueryMapper({
        queries: [{
          query: 'min-width: 1px',
          value: 'small',
        }]
      })
      expect(mQM.getValue()).toEqual('small')
    })

    it('columns', () => {
      let mQM = mq.mediaQueryMapper({
        valueKey: 'columns',
        queries: [{
          query: 'min-width: 1px',
          columns: 2,
        }]
      })
      expect(mQM.getValue()).toEqual(2)
    })
  })
})