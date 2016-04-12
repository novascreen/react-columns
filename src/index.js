import React, { Component } from 'react'
import { mediaQueryMapper } from './mq'
import mapNodesToColumns from './mapNodesToColumns'

const styles = {
  column: {
    breakInside: 'avoid-column',
    WebkitColumnBreakInside: 'avoid',
    WebkitMarginTopCollapse: 'discard',
  }
}

class Columns extends Component{
  constructor(props) {
    super(props)
    this.setColumns = this.setColumns.bind(this)
    this.state = {}
  }

  setColumns() {
    this.setState({
      columns: this._columns.getValue()
    })
  }

  componentWillMount() {
    if (this.props.queries.length) {
      this._columns = mediaQueryMapper({
        queries: this.props.queries,
        valueKey: 'columns',
        defaultValue: this.props.queries.length ? 1 : this.props.columns,
        onChange: this.setColumns,
      })
      this.setColumns()
    }
  }

  componentWillUnmount() {
    if (this._columns) {
      this._columns.removeListeners()
    }
  }

  renderColumns(columns) {
    const { children, dimensions } = this.props

    if (columns === 1) {
      return children
    }
    else {
      const columnsContainers = mapNodesToColumns({ children, columns, dimensions })
      return columnsContainers.map((column, i) => (
        <div key={i} style={styles.column}>{column}</div>
      ))
    }
  }

  render() {
    const { className, gap = 0 } = this.props
    const { columns = this.props.columns } = this.state
    const rootStyles = columns === 1 ? {} : { 
      columnCount: columns,
      WebkitColumnCount: columns,
      MozColumnCount: columns,
      columnGap: gap,
      WebkitColumnGap: gap,
      MozColumnGap: gap,
    }

    return <div className={className} style={rootStyles}>{this.renderColumns(columns)}</div>
  }
}

Columns.defaultProps = {
  queries: [],
  columns: 3
}

export default Columns