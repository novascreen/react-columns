import React, { Component, PropTypes } from 'react'
import { mediaQueryMapper } from './mq'
import mapNodesToColumns from './mapNodesToColumns'

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
    const { children, dimensions, gap } = this.props
    const columnStyles = {
      boxSizing: 'border-box',
      float: 'left',
      width: 'calc(1 / ' + columns + ' * 100%)',
      paddingLeft: gap,
      paddingRight: gap,
    }
    let renderedColumns = children

    if (columns > 1) {
      const columnsContainers = mapNodesToColumns({ children, columns, dimensions })
      renderedColumns = columnsContainers.map((column, i) => (
        <div key={i} style={columnStyles}>{column}</div>
      ))
    }

    return renderedColumns
  }

  render() {
    const { className, gap, rootStyles } = this.props
    const { columns = this.props.columns } = this.state
    const rowStyles = columns === 1 ? {} : {
      marginLeft: `calc(${gap} * -1)`,
      marginRight: `calc(${gap} * -1)`,
    }

    return (
      <div className={className} style={rootStyles}>
        <div style={rowStyles}>
          {this.renderColumns(columns)}
          <div style={{clear: 'both'}}></div>
        </div>
      </div>
    )
  }
}

Columns.defaultProps = {
  className: '',
  rootStyles: {
    overflowX: 'hidden',
  },
  queries: [],
  columns: 3,
  gap: 0,
}

Columns.propTypes = {
  className: PropTypes.string,
  rootStyles: PropTypes.object,
  queries: PropTypes.array,
  columns: PropTypes.number,
  gap: PropTypes.string,
}

export default Columns