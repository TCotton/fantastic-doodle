import * as R from 'ramda'

const filterByPropsAndValues = (data, prop, value) => {
  const returned = R.filter(R.propEq(prop, value))
  return returned(data)
}

const findAllUniqueValues = data => {
  const findRegions = data.map(x => x.region && x.region.toString())
  const removeNull = R.reject(R.equals(null))
  const sortNamesAsc = R.sortBy(R.identity)
  const createList = R.compose(removeNull, R.uniq, sortNamesAsc)
  return createList(findRegions)
}

const removeEmptyArrayItems = data => {
  const notEmpty = R.compose(R.not, R.isNil)
  return R.filter(notEmpty, data)
}

const findAllUniqueValuesFlatMap = data => {
  const filterTags = x =>
    x.node && x.node.caseStudyFields && x.node.caseStudyFields.filterTags
  const cats = R.map(filterTags, data)
  const removeNullFlatten = R.compose(R.reject(R.equals(null)), R.flatten)
  const result = removeNullFlatten(cats)
  const sortNamesAsc = R.sortBy(R.identity)
  const list = R.compose(R.uniq, sortNamesAsc)
  return list(result)
}

const changePropArrayValueFromNestedObject = (data, find, replace) => {
  if (!data && !find && !replace)
    return Error('Please enter all three arguments')
  const transformations = {
    region: R.adjust(0, R.replace(`/${find}/`, replace))
  }
  const changeUK = R.evolve(transformations)
  return R.map(changeUK, data)
}

const compareAndFilter_TwoArrays = (arr, tags) => {
  const filterByTags = R.curry((tags, arr) =>
    R.filter(
      R.pipe(
        R.pathOr([], ['node', 'caseStudyFields', 'filterTags']),
        R.any(R.includes(R.__, tags))
      )
    )(arr)
  )

  return filterByTags(tags, arr)
}

const sortAsc = (a, b) => {
  const dateA = a.modifiedGmt
  const dateB = b.modifiedGmt
  return new Date(dateA).getTime() - new Date(dateB).getTime()
}

const sortByDateAsc = data => {
  return R.sort(sortAsc, data)
}

const sortDesc = (a, b) => {
  const dateA = a.modifiedGmt
  const dateB = b.modifiedGmt
  return new Date(dateB).getTime() - new Date(dateA).getTime()
}

const sortByDateDesc = data => {
  return R.sort(sortDesc, data)
}

export {
  filterByPropsAndValues,
  findAllUniqueValues,
  removeEmptyArrayItems,
  findAllUniqueValuesFlatMap,
  compareAndFilter_TwoArrays,
  sortByDateAsc,
  sortByDateDesc,
  changePropArrayValueFromNestedObject
}

