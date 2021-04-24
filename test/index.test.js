import {
    addition,
    filterByPropsAndValues,
    findAllUniqueValues,
    removeEmptyArrayItems,
    findAllUniqueValuesFlatMap
} from '../index.js'
import {assert, should, expect} from 'chai';
import {readFile} from 'fs/promises';

const filterByPropsAndValuesDummy = JSON.parse(await readFile(new URL('./dummy/filterByPropsAndValuesData.json', import.meta.url)));
const findAllUniqueValuesFlatMapData = JSON.parse(await readFile(new URL('./dummy/findAllUniqueValuesFlatMapData.json', import.meta.url)));

describe('addition', () => {

    it('should return defined', function () {
        const result = addition(7, 8)
        expect(result).not.to.be.undefined;
    });

    it('should return a number', function () {
        const result = addition(7, 8)
        assert.typeOf(result, 'number')
    });

    it('adds together two numbers to equal 15', () => {
        const result = addition(7, 8)
        assert.strictEqual(result, 15)
    });

    it('should return null of strings used a params', () => {
        const result = addition("and", "here")
        assert.strictEqual(result, null)
    });
});

describe('filterByPropsAndValues', () => {

    it('should return defined', function () {
        const result = filterByPropsAndValues(filterByPropsAndValuesDummy, 'seniority', 'management-team')
        expect(result).not.to.be.undefined;
    });

    it('should return an array', function () {
        const result = filterByPropsAndValues(filterByPropsAndValuesDummy, 'seniority', 'management-team')
        expect(result).not.to.be.undefined;
        assert.typeOf(result, 'array')
    });

    it('should return an array of 16 items', function () {
        const result = filterByPropsAndValues(filterByPropsAndValuesDummy, 'seniority', 'management-team')
        assert.strictEqual(result.length, 16)
    });

    it('should return an empty array if different property value passed as arguments', function () {
        const result = filterByPropsAndValues(filterByPropsAndValuesDummy, 'seniority', 'executive-board')
        assert.typeOf(result, 'array')
        assert.strictEqual(result.length, 0)
    });
})

describe('findAllUniqueValues', () => {

    it('should return defined', function () {
        const result = findAllUniqueValues(filterByPropsAndValuesDummy)
        expect(result).not.to.be.undefined;
    });

    it('should return an array', function () {
        const result = findAllUniqueValues(filterByPropsAndValuesDummy)
        assert.typeOf(result, 'array')
    });

    it('should return an array of three items', function () {
        const result = findAllUniqueValues(filterByPropsAndValuesDummy)
        assert.strictEqual(result.length, 3)
    });

    it('should return an three different regions', function () {
        const result = findAllUniqueValues(filterByPropsAndValuesDummy)
        assert.strictEqual(result.includes('Germany'), true)
        assert.strictEqual(result.includes('Ireland'), true)
        assert.strictEqual(result.includes('Spain'), true)
    });

    it('should return data in alphabetical order', function () {
        const result = findAllUniqueValues(filterByPropsAndValuesDummy)
        assert.strictEqual(result[0] === 'Germany', true)
        assert.strictEqual(result[1] === 'Ireland', true)
        assert.strictEqual(result[2] === 'Spain', true)
    });
})

describe('removeEmptyArrayItems', () => {

    const anArray = [0, 3, 4, null]

    it('should return defined', function () {
        const result = removeEmptyArrayItems(anArray)
        expect(result).not.to.be.undefined;
    });
    it('should return an array', function () {
        const result = removeEmptyArrayItems(anArray)
        assert.typeOf(result, 'array')
    });
    it('should return remove empty arrays', function () {
        const result = removeEmptyArrayItems(anArray)
        assert.strictEqual(result.length, 3)
    });
})

describe('findAllUniqueValuesFlatMap', () => {

    it('should return defined', function () {
        const result = findAllUniqueValuesFlatMap(findAllUniqueValuesFlatMapData)
        expect(result).not.to.be.undefined;
    });

    it('should return an array', function () {
        const result = findAllUniqueValuesFlatMap(findAllUniqueValuesFlatMapData)
        assert.typeOf(result, 'array')
        assert.strictEqual(result.length, 4)
    });

    it('should return an array of four items', function () {
        const result = findAllUniqueValuesFlatMap(findAllUniqueValuesFlatMapData)
        assert.strictEqual(result.length, 4)
    });

    it('should return an four different categories', function () {
        const result = findAllUniqueValuesFlatMap(findAllUniqueValuesFlatMapData)
        expect(result).not.to.be.undefined;
        assert.strictEqual(result.includes('Hazardous goods'), true)
        assert.strictEqual(result.includes('Pharmaceuticals'), true)
        assert.strictEqual(result.includes('Specialist manufacturing'), true)
        assert.strictEqual(result.includes('Temperature control'), true)
    });

    it('should return data in alphabetical order', function () {
        const result = findAllUniqueValuesFlatMap(findAllUniqueValuesFlatMapData)
        assert.strictEqual(result[0] === 'Hazardous goods', true)
        assert.strictEqual(result[1] === 'Pharmaceuticals', true)
        assert.strictEqual(result[2] === 'Specialist manufacturing', true)
        assert.strictEqual(result[3] === 'Temperature control', true)
    });
})