import * as R from 'ramda';

const addition = (x, y) => {
    return x + y;
}

const filterByPropsAndValues = (data, prop, value) => {
    const returned = R.filter(R.propEq(prop, value))
    return returned(data)
}

export {addition, filterByPropsAndValues}