import * as R from 'ramda';

const addition = (x, y) => {
    return x + y;
}

const filterByPropsAndValues = (data, prop, value) => {
    const returned = R.filter(R.propEq(prop, value))
    return returned(data)
}

const findAllUniqueValues = (data) => {
    const regions = data.map((x) => x.region && x.region.toString())
    const removeNull = R.reject(R.equals(null))
    const sortNamesAsc = R.sortBy(R.identity)
    const list = R.compose(removeNull, R.uniq, sortNamesAsc)
    return list(regions)
}

const removeEmptyArrayItems = (data) => {
    const notEmpty = R.compose(R.not, R.isNil)
    return R.filter(notEmpty, data)
}

export {addition, filterByPropsAndValues, findAllUniqueValues, removeEmptyArrayItems}