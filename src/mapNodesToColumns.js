import min from 'lodash.min'
import times from 'lodash.times'

export default function mapNodesToColumns({
  children = [],
  columns = 1,
  dimensions = [],
} = {}) {
  let nodes = []
  let heights = []

  if (columns === 1) {
    return children
  }

  // use dimensions to calculate the best column for each child
  if (dimensions.length && dimensions.length === children.length) {
    times(columns, (i) => {
      nodes[i] = []
      heights[i] = 0
    })
    children.forEach((child, i) => {
      let { width, height } = dimensions[i]
      let index = heights.indexOf(min(heights))
      nodes[index].push(child)
      heights[index] += height / width
    })
  }
  // equally spread the children across the columns
  else {
    times(columns, (i) => {
      nodes[i] = children.filter((child, j) => j % columns === i)
    })
  }

  return nodes
}