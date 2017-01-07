import React, { Component } from 'react'
import {render} from 'react-dom'
import random from 'lodash.random'

import Columns from '../../src'
import LoremImage from '../../src'
import styles from './styles.css'

const dimensions = [
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

class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: 5,
    }
    this.onColumnsButtonClick = this.onColumnsButtonClick.bind(this)
  }

  onColumnsButtonClick() {
    this.setState({ columns: random(1, 5) })
  }

  renderItems() {
    return dimensions.map(({ width, height }, i) => (
      <div key={i} className={styles.demoItem} style={{
        paddingTop: (height/width*100) + '%'
      }}>
        <img src={`http://placehold.it/${width}x${height}?text=${i+1}`} alt="" />
      </div>
    ))
  }

  render() {
    const { columns } = this.state
    const queries = [{
      columns: 2,
      query: 'min-width: 500px'
    }, {
      columns: 3,
      query: 'min-width: 1000px'
    }]
    return (
      <div>
        <h1>react-columns Demo</h1>
        <p>By default react-columns iterates over the columns and spreads the children equally among them </p>
        <Columns gap="20px" queries={queries}>
          {this.renderItems()}
        </Columns>
        <hr/>
        <p>If you pass the dimensions of every item react-columns iterates over the children and adds them to the shortest column. It uses the aspect ratio to calculate a comparable height.</p>
        <p>This also demonstrates a different value for the `gap` property. The vertical spacing is defined by the items' own styles.</p>
        <Columns gap="10px" queries={queries} dimensions={dimensions}>
          {this.renderItems()}
        </Columns>
        <hr/>
        <p>You can also simply set the columns directly without any automatic media query handling</p>
        <p>
          <button type="button" onClick={this.onColumnsButtonClick}>Randomize columns</button>
        </p>
        <Columns gap="20px" columns={columns} dimensions={dimensions}>
          {this.renderItems()}
        </Columns>
      </div>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))
