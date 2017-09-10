import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { mediaQueryMapper } from './mq'
import mapNodesToColumns from './mapNodesToColumns'

class Columns extends Component{
  constructor(props) {
    super(props)
    this.setColumns = this.setColumns.bind(this)
    this.state = {}
  }

  componentDidMount() {
    this.updateColumns(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const queriesChanged = this.props.queries !== nextProps.queries;
    const columnsChanged = this.props.columns !== nextProps.columns
    if (queriesChanged || columnsChanged) {
      this.updateColumns(nextProps);
    }
  }

  componentWillUnmount() {
    this.removeColumnListeners()
  }

  updateColumns(props) {
    if (props.queries.length) {
      this.removeColumnListeners()
      this._columns = mediaQueryMapper({
        queries: props.queries,
        valueKey: 'columns',
        defaultValue: props.queries.length ? 1 : props.columns,
        onChange: this.setColumns,
      })
      this.setColumns()
    }
  }
  
  setColumns() {
    this.setState(() => ({
      columns: this._columns.getValue()
    }))
  }
  
  removeColumnListeners() {
    if (this._columns) {
      this._columns.removeListeners()
    }
  }

  renderColumns(columns) {
    const { children, dimensions, gap } = this.props
    const columnStyles = {
      boxSizing: 'border-box',
      float: 'left',
      width: `${1 / columns * 100}%`,
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
  gap: '0px',
}

Columns.propTypes = {
  className: PropTypes.string,
  rootStyles: PropTypes.object,
  queries: PropTypes.array,
  columns: PropTypes.number,
  gap: PropTypes.string,
}

export default Columns
