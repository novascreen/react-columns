import expect from 'expect'
import React, { Component } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import Columns from 'src/'

describe('Columns', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('renders into 3 columns by default', () => {
    render((
      <Columns>
        <div id="1">1</div>
        <div id="2">2</div>
        <div id="3">3</div>
        <div id="4">4</div>
        <div id="5">5</div>
        <div id="6">6</div>
      </Columns>
    ), node, () => {
      expect(node.textContent).toContain('142536')
    })
  })

  it('renders into n columns when setting just `columns` property', () => {
    render((
      <Columns columns={2}>
        <div id="1">1</div>
        <div id="2">2</div>
        <div id="3">3</div>
        <div id="4">4</div>
        <div id="5">5</div>
        <div id="6">6</div>
      </Columns>
    ), node, () => {
      expect(node.textContent).toContain('135246')
    })
  })

  it('renders into 1 column with a big first media query', () => {
    render((
      <Columns queries={[{
        query: 'min-width: 10000px',
        columns: 2,
      }]}>
        <div id="1">1</div>
        <div id="2">2</div>
        <div id="3">3</div>
        <div id="4">4</div>
        <div id="5">5</div>
        <div id="6">6</div>
      </Columns>
    ), node)

    expect(node.textContent).toContain('123456')
  })

  it('renders into 2 columns with a small first media query', () => {
    render((
      <Columns queries={[{
        query: 'min-width: 1px',
        columns: 2,
      }]}>
        <div id="1">1</div>
        <div id="2">2</div>
        <div id="3">3</div>
        <div id="4">4</div>
        <div id="5">5</div>
        <div id="6">6</div>
      </Columns>
    ), node)

    expect(node.textContent).toContain('135246')
  })

  it('renders into 1 column after changing first media query from small to big', () => {
    class UpdateQueries extends Component {
      constructor(props) {
        super(props)
        this.state = {
          queries: [{
            query: 'min-width: 1px',
            columns: 2,
          }]
        }
      }
      componentDidMount() {
        this.setState(() => ({
          queries: [{
            query: 'min-width: 10000px',
            columns: 2,
          }]
        }))
      }
      render() {
        return (
          <Columns queries={this.state.queries}>
            <div id="1">1</div>
            <div id="2">2</div>
            <div id="3">3</div>
            <div id="4">4</div>
            <div id="5">5</div>
            <div id="6">6</div>
          </Columns>
        )
      }
    }
    render((
      <UpdateQueries />
    ), node)

    expect(node.textContent).toContain('123456')
  })
})