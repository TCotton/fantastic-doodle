import {
  filterByPropsAndValues,
  findAllUniqueValues,
  removeEmptyArrayItems,
  findAllUniqueValuesFlatMap,
  compareAndFilter_twoArrays,
  sortByDateAsc,
  sortByDateDesc,
  changePropArrayValueFromNestedObject,
  sortByBoolean
} from '../index.js'
import { assert, expect } from 'chai'
import { readFile } from 'fs/promises'

const findAllUniqueValuesFlatMapData = JSON.parse(
  await readFile(
    new URL('./dummy/findAllUniqueValuesFlatMapData.json', import.meta.url)
  )
)
const sortByDateDummy = JSON.parse(
  await readFile(new URL('./dummy/sortByDateDummy.json', import.meta.url))
)
const changePropValueDummy = JSON.parse(
  await readFile(new URL('./dummy/changePropValueDummy.json', import.meta.url))
)
const sortByBooleanDummy = JSON.parse(
  await readFile(new URL('./dummy/sortByBooleanDummy.json', import.meta.url))
)

const filterArr = [
  {
    "seniority": "management-team",
  },
  {
    "seniority": "executive",
  },
]

describe('filterByPropsAndValues', () => {
  it('should return defined', function () {
    const result = filterByPropsAndValues(
      filterArr,
      'seniority',
      'management-team'
    )
    expect(result).not.to.be.undefined
  })

  it('should return an array', function () {
    const result = filterByPropsAndValues(
      filterArr,
      'seniority',
      'management-team'
    )
    expect(result).not.to.be.undefined
    assert.typeOf(result, 'array')
  })

  it('should return an array of 16 items', function () {
    const result = filterByPropsAndValues(
      filterArr,
      'seniority',
      'management-team'
    )
    assert.strictEqual(result.length, 1)
  })

  it('should return an empty array if different property value passed as arguments', function () {
    const result = filterByPropsAndValues(
      filterArr,
      'seniority',
      'executive-board'
    )
    assert.typeOf(result, 'array')
    assert.strictEqual(result.length, 0)
  })
})

const filterArrTwo = [
  {
    "region": ["nordics"],
  },
  {
    "region": ["germany"],
  },
  {
    "region": ["germany"],
  },
  {
    "region": ["uk"],
  },
  {
    "region": ["germany"],
  },
  {
    "region": ["nordics"],
  },
  {
    "region": ["uk"],
  },
  {
    "region": ["germany"],
  },
  {
    "region": ["germany"],
  },
  {
    "region": ["germany"],
  },
  {
    "region": ["germany"],
  },
  {
    "region": ["germany"],
  },
  {
    "region": ["uk"],
  },
  {
    "region": ["uk"],
  }
]

describe('findAllUniqueValues', () => {
  it('should return defined', function () {
    const result = findAllUniqueValues(filterArrTwo)
    expect(result).not.to.be.undefined
  })

  it('should return an array', function () {
    const result = findAllUniqueValues(filterArrTwo)
    assert.typeOf(result, 'array')
  })

  it('should return an array of three items', function () {
    const result = findAllUniqueValues(filterArrTwo)
    assert.strictEqual(result.length, 3)
  })

  it('should return an three different regions', function () {
    const result = findAllUniqueValues(filterArrTwo)
    console.dir(result)
    assert.strictEqual(result.includes('germany'), true)
    assert.strictEqual(result.includes('nordics'), true)
    assert.strictEqual(result.includes('uk'), true)
  })

  it('should return data in alphabetical order', function () {
    const result = findAllUniqueValues(filterArrTwo)
    assert.strictEqual(result[0] === 'germany', true)
    assert.strictEqual(result[1] === 'nordics', true)
    assert.strictEqual(result[2] === 'uk', true)
  })
})

describe('removeEmptyArrayItems', () => {
  const anArray = [0, 3, 4, null]

  it('should return defined', function () {
    const result = removeEmptyArrayItems(anArray)
    expect(result).not.to.be.undefined
  })
  it('should return an array', function () {
    const result = removeEmptyArrayItems(anArray)
    assert.typeOf(result, 'array')
  })
  it('should return remove empty arrays', function () {
    const result = removeEmptyArrayItems(anArray)
    assert.strictEqual(result.length, 3)
  })
})

describe('findAllUniqueValuesFlatMap', () => {
  it('should return defined', function () {
    const result = findAllUniqueValuesFlatMap(findAllUniqueValuesFlatMapData)
    expect(result).not.to.be.undefined
  })

  it('should return an array', function () {
    const result = findAllUniqueValuesFlatMap(findAllUniqueValuesFlatMapData)
    assert.typeOf(result, 'array')
  })

  it('should return an array of four items', function () {
    const result = findAllUniqueValuesFlatMap(findAllUniqueValuesFlatMapData)
    assert.strictEqual(result.length, 4)
  })

  it('should return an four different categories', function () {
    const result = findAllUniqueValuesFlatMap(findAllUniqueValuesFlatMapData)
    assert.strictEqual(result.includes('Hazardous goods'), true)
    assert.strictEqual(result.includes('Pharmaceuticals'), true)
    assert.strictEqual(result.includes('Specialist manufacturing'), true)
    assert.strictEqual(result.includes('Temperature control'), true)
  })

  it('should return data in alphabetical order', function () {
    const result = findAllUniqueValuesFlatMap(findAllUniqueValuesFlatMapData)
    assert.strictEqual(result[0] === 'Hazardous goods', true)
    assert.strictEqual(result[1] === 'Pharmaceuticals', true)
    assert.strictEqual(result[2] === 'Specialist manufacturing', true)
    assert.strictEqual(result[3] === 'Temperature control', true)
  })
})

describe('compareAndFilter_TwoArrays', () => {
  const arrayOne = [
    {
      node: {
        caseStudyFields: {
          filterTags: ['Temperature control']
        }
      }
    },
    {
      node: {
        caseStudyFields: {
          filterTags: null
        }
      }
    },
    {
      node: {
        caseStudyFields: {
          filterTags: ['Specialist manufacturing']
        }
      }
    },
    {
      node: {
        caseStudyFields: {
          filterTags: ['Pharmaceuticals']
        }
      }
    },
    {
      node: {
        caseStudyFields: {
          filterTags: ['Specialist manufacturing']
        }
      }
    },
    {
      node: {
        caseStudyFields: {
          filterTags: ['Temperature control', 'Pharmaceuticals']
        }
      }
    },
    {
      node: {
        caseStudyFields: {
          filterTags: [
            'Hazardous goods',
            'Pharmaceuticals',
            'Specialist manufacturing'
          ]
        }
      }
    },
    {
      node: {
        caseStudyFields: {
          filterTags: ['Hazardous goods', 'Specialist manufacturing']
        }
      }
    },
    {
      node: {
        caseStudyFields: {
          filterTags: null
        }
      }
    }
  ]
  const arrayTwo = [
    'Hazardous goods',
    'Pharmaceuticals',
    'Specialist manufacturing',
    'Temperature control'
  ]

  it('should return defined', function () {
    const result = compareAndFilter_twoArrays(arrayOne, arrayTwo)
    expect(result).not.to.be.undefined
  })

  it('should return an array', function () {
    const result = compareAndFilter_twoArrays(arrayOne, arrayTwo)
    assert.typeOf(result, 'array')
  })

  it('should return an array of seven items', function () {
    const result = compareAndFilter_twoArrays(arrayOne, arrayTwo)
    assert.strictEqual(result.length, 7)
  })

  it('should return an array containing all of the items in arrayTwo', function () {
    const result = compareAndFilter_twoArrays(arrayOne, arrayTwo)
    assert.equal(
      result[0].node.caseStudyFields.filterTags.toString(),
      arrayTwo[3]
    )
    assert.equal(
      result[1].node.caseStudyFields.filterTags.toString(),
      arrayTwo[2]
    )
    assert.equal(
      result[2].node.caseStudyFields.filterTags.toString(),
      arrayTwo[1]
    )
    assert.equal(
      result[6].node.caseStudyFields.filterTags[0].toString(),
      arrayTwo[0]
    )
  })

  it('should return an array of 4 containing all if two categories', function () {
    const arrayThree = ['Hazardous goods', 'Pharmaceuticals']
    const result = compareAndFilter_twoArrays(arrayOne, arrayThree)
    assert.strictEqual(result.length, 4)
  })
})

describe('sortByDateAsc', () => {
  it('should return defined', function () {
    const result = sortByDateAsc(sortByDateDummy)
    expect(result).not.to.be.undefined
  })

  it('should return an array', function () {
    const result = sortByDateAsc(sortByDateDummy)
    assert.typeOf(result, 'array')
  })

  it('should return an array of seven items', function () {
    const result = sortByDateAsc(sortByDateDummy)
    assert.strictEqual(result.length, 3)
  })

  it('should return an array in the correct date order', function () {
    const result = sortByDateAsc(sortByDateDummy)
    assert.strictEqual(result[0].modifiedGmt < result[1].modifiedGmt, true)
    assert.strictEqual(result[1].modifiedGmt < result[2].modifiedGmt, true)
  })
})

describe('sortByDateDesc', () => {
  it('should return defined', function () {
    const result = sortByDateDesc(sortByDateDummy)
    expect(result).not.to.be.undefined
  })

  it('should return an array', function () {
    const result = sortByDateDesc(sortByDateDummy)
    assert.typeOf(result, 'array')
  })

  it('should return an array of seven items', function () {
    const result = sortByDateDesc(sortByDateDummy)
    assert.strictEqual(result.length, 3)
  })

  it('should return an array in the correct date order', function () {
    const result = sortByDateDesc(sortByDateDummy)
    assert.strictEqual(result[0].modifiedGmt > result[1].modifiedGmt, true)
    assert.strictEqual(result[1].modifiedGmt > result[2].modifiedGmt, true)
  })
})

describe('changePropValueArrayNestedObject', () => {
  it('should return defined', function () {
    const result = changePropArrayValueFromNestedObject(
      changePropValueDummy,
      'uk',
      'United Kingdom'
    )
    expect(result).not.to.be.undefined
  })

  it('should return defined', function () {
    const result = changePropArrayValueFromNestedObject(
      changePropValueDummy,
      'uk',
      'United Kingdom'
    )
    assert.typeOf(result, 'array')
  })

  it('should return the changed array from one string value (uk) to another (United Kingdom)', function () {
    const result = changePropArrayValueFromNestedObject(
      changePropValueDummy,
      'uk',
      'United Kingdom'
    )
    assert.typeOf(result[0].region, 'array')
    assert.strictEqual(result[0].region.toString(), 'uk', 'United Kingdom')
  })
})

describe('sortByDataDummy', () => {
  it('should return defined', function () {
    const result = sortByBoolean(sortByBooleanDummy)
    expect(result).not.to.be.undefined
  })

  it('should return an array', function () {
    const result = sortByBoolean(sortByBooleanDummy)
    assert.typeOf(result, 'array')
  })

  it('should return an array', function () {
    const result = sortByBoolean(sortByBooleanDummy)
    assert.typeOf(result, 'array')
  })

  it('should return an array of 50 items', function () {
    const result = sortByBoolean(sortByBooleanDummy)
    assert.strictEqual(result.length, 50)
  })

  it('should return boolean true at top of list', function () {
    const result = sortByBoolean(sortByBooleanDummy)
    assert.strictEqual(result[0].node.newsAndViewpoint.featured, true)
    assert.strictEqual(result[1].node.newsAndViewpoint.featured, true)
    assert.strictEqual(result[2].node.newsAndViewpoint.featured, null)
    assert.strictEqual(result[3].node.newsAndViewpoint.featured, null)
  })
})
