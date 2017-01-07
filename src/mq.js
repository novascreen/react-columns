var mediaQueries = {};

export function mediaQuery({
  query = '',
  full = false,
  onChange = () => {},
} = {}) {
  var result = {
    query,
    full,
    queryMatches: false,
    _mq: null,
  }
  if (!query) {
    return result
  }

  function listener(mq) {
    result.queryMatches = mq.matches
    onChange(result.queryMatches)
  }
  function removeListener() {
    result._mq.removeListener(listener)
  }

  result.query = !full && query[query.length-1] !== ')' ? '(' + query + ')' : query

  if (!mediaQueries[result.query]) {
    mediaQueries[result.query] = window.matchMedia(result.query)
  }
  result._mq = mediaQueries[result.query]
  result.queryMatches = result._mq.matches
  result.removeListener = removeListener
  
  result._mq.addListener(listener)

  return result
}


export function mediaQueryMapper({ 
  queries = [],
  valueKey = 'value',
  defaultValue = '',
  onChange = () => {},
} = {}) {
    const mQs = queries.map(query => mediaQuery({
      query: query.query,
      full: query.full,
      onChange: onMqChange,
    }))

    function getValue() {
      let value = defaultValue
      mQs.forEach((mQ, i) => {
        if (mQ.queryMatches) {
          value = queries[i][valueKey]
        }
      })
      return value
    }

    function onMqChange (mq) {
      onChange(getValue())
    }

    function removeListeners() {
      mQs.forEach((mq, i) => {
        mq.removeListener()
      })
    }

    return { getValue, removeListeners }
}