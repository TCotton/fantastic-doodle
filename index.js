import * as R from 'ramda'

/**
 * @function
 * @description compareAndFilter_TwoArrays
 * @param {array} arr
 * @param {array} tags
 * @returns {array}
 */

const compareAndFilter_twoArrays = (arr, tags) => {
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

/**
 * @function
 * @description filterByPropsAndValues
 * @param {array} data
 * @param {string} prop
 * @param {string} value
 * @returns {array}
 */

const filterByPropsAndValues = (data, prop, value) => {
  const returned = R.filter(R.propEq(prop, value))
  return returned(data)
}

/**
 * @function
 * @description findAllUniqueValues
 * @param {array} data
 * @returns {array}
 */

const findAllUniqueValues = data => {
   //const findRegions = data.map(x => x.region && x.region.toString())
  const findRegions = R.pipe(
    R.pluck('region'),
    R.flatten
  )(data)
  const removeNull = R.reject(R.equals(null))
  const sortNamesAsc = R.sortBy(R.identity)
  const createList = R.compose(removeNull, R.uniq, sortNamesAsc)
  return createList(findRegions)
}

/**
 * @function
 * @description removeEmptyArrayItems
 * @param {array} data
 * @returns {array}
 */

const removeEmptyArrayItems = data => {
  const notEmpty = R.compose(R.not, R.isNil)
  return R.filter(notEmpty, data)
}

/**
 * @function
 * @description findAllUniqueValuesFlatMap
 * @param {array} data
 * @returns {array}
 */

const findAllUniqueValuesFlatMap = data => {
  const mapTags = R.map(
    R.path(['node', 'caseStudyFields', 'filterTags']),
  )(data)
  const removeNullFlatten = R.compose(R.reject(R.equals(null)), R.flatten)
  const result = removeNullFlatten(mapTags)
  const sortNamesAsc = R.sortBy(R.identity)
  const list = R.compose(R.uniq, sortNamesAsc)
  return list(result)
}

/**
 * @function
 * @description changePropArrayValueFromNestedObject
 * @param {array} data
 * @param {string} find
 * @param {string} replace
 * @returns {array}
 */

const changePropArrayValueFromNestedObject = (data, find, replace) => {
  const transformations = {
    region: R.adjust(0, R.replace(`/${find}/`, replace))
  }
  const changeUK = R.evolve(transformations)
  return R.map(changeUK, data)
}

const sortAsc = (a, b) => {
  const dateA = a.modifiedGmt
  const dateB = b.modifiedGmt
  return new Date(dateA).getTime() - new Date(dateB).getTime()
}

/**
 * @function
 * @description sortByDateAsc
 * @param {array} data
 * @returns {array}
 */

const sortByDateAsc = data => {
  return R.sort(sortAsc, data)
}

const sortDesc = (a, b) => {
  const dateA = a.modifiedGmt
  const dateB = b.modifiedGmt
  return new Date(dateB).getTime() - new Date(dateA).getTime()
}

/**
 * @function
 * @description sortByDateDesc
 * @param {array} data
 * @returns {array}
 */

const sortByDateDesc = data => {
  return R.sort(sortDesc, data)
}

export const sortBool = (a, b) => {
  const getNodeAFeatured = R.pathOr(false, ['node', 'newsAndViewpoint', 'featured'], a)
  const getNodeBFeatured = R.pathOr(false, ['node', 'newsAndViewpoint', 'featured'], b)
  return getNodeBFeatured - getNodeAFeatured
}

/**
 * @function
 * @description sortByBoolean
 * @param {array} data
 * @returns {array}
 */

const sortByBoolean = (data) => {
  return R.sort(sortBool, data)
}

export {
  sortByBoolean,
  filterByPropsAndValues,
  findAllUniqueValues,
  removeEmptyArrayItems,
  findAllUniqueValuesFlatMap,
  compareAndFilter_twoArrays,
  sortByDateAsc,
  sortByDateDesc,
  changePropArrayValueFromNestedObject
}

