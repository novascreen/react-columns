import React, { Component } from 'react'
import {render} from 'react-dom'
import random from 'lodash.random'

import Column from '../../src'
import LoremImage from '../../src'
import styles from './styles.css'

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

  render() {
    const { columns } = this.state
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
        <Column gap="20px" queries={queries}>
          {dimensions.map(({ width, height }, i) => (
            <img key={i} className={styles.demoItem} src={`http://placehold.it/${width}x${height}?text=${i+1}`} alt="" />
          ))}
        </Column>
        <hr/>
        <p>If you pass the dimensions of every item react-columns iterates over the children and adds them to the shortest column. It uses the aspect ratio to calculate a comparable height.</p>
        <p>This also demonstrates a different value for the `gap` property. The vertical spacing is defined by the items' own styles.</p>
        <Column gap="10px" queries={queries} dimensions={dimensions}>
          {dimensions.map(({ width, height }, i) => (
            <img key={i} className={styles.demoItem} src={`http://placehold.it/${width}x${height}?text=${i+1}`} alt="" />
          ))}
        </Column>
        <hr/>
        <p>You can also simply set the columns directly without any automatic media query handling</p>
        <p>
          <button type="button" onClick={this.onColumnsButtonClick}>Randomize columns</button>
        </p>
        <Column gap="20px" columns={columns}>
          {dimensions.map(({ width, height }, i) => (
            <img key={i} className={styles.demoItem} src={`http://placehold.it/${width}x${height}?text=${i+1}`} alt="" />
          ))}
        </Column>
      </div>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))
