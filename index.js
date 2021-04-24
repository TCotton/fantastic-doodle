import * as R from 'ramda';

const addition = (x, y) => {
    if (typeof x !== 'number' && typeof y !== 'number') return null;
    return x + y;
}

const filterByPropsAndValues = (data, prop, value) => {
    const returned = R.filter(R.propEq(prop, value))
    return returned(data)
}

const findAllUniqueValues = (data) => {
    const findRegions = data.map((x) => x.region && x.region.toString())
    const removeNull = R.reject(R.equals(null))
    const sortNamesAsc = R.sortBy(R.identity)
    const createList = R.compose(removeNull, R.uniq, sortNamesAsc)
    return createList(findRegions)
}

const removeEmptyArrayItems = (data) => {
    const notEmpty = R.compose(R.not, R.isNil)
    return R.filter(notEmpty, data)
}

const findAllUniqueValuesFlatMap = (data) => {
    // takes all category items from data and flattens them into single array
    // this is then sorted alphabetically
    const filterTags = (x) => x.node && x.node.caseStudyFields && x.node.caseStudyFields.filterTags
    const cats = R.map(filterTags, data)
    const result = R.reject(R.equals(null))(R.flatten(cats))
    const sortNamesAsc = R.sortBy(R.identity)
    const list = R.compose(R.uniq, sortNamesAsc)
    return list(result)
}

export {addition, filterByPropsAndValues, findAllUniqueValues, removeEmptyArrayItems, findAllUniqueValuesFlatMap}