import * as R from 'ramda';

const addition = (x, y) => {
    return x + y;
}

const filterByPropsAndValues = (data) => {
    const executive = R.filter(R.propEq('seniority', 'executive-board'))
    const nonExecutive = R.filter(
        R.propEq('seniority', 'management-team' || 'Non-executive')
    )
    return {
        executive: executive(data),
        nonExecutive: nonExecutive(data),
    }
}

export {addition, filterByPropsAndValues}