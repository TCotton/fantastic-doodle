import {addition, filterByPropsAndValues, findAllUniqueValues, removeEmptyArrayItems} from '../index.js'
import {assert, should, expect} from 'chai';
import {readFile} from 'fs/promises';

const filterByPropsAndValuesDummy = JSON.parse(await readFile(new URL('./dummy/filterByPropsAndValuesData.json', import.meta.url)));

describe('addition', () => {

    it('adds together two numbers', () => {
        const result = addition(7, 8)
        assert.strictEqual(result, 15)
        assert.typeOf(result, 'number')
        expect(result).not.to.be.undefined;
    });

    it('adds two strings together', () => {
        const result = addition("and", "here")
        assert.strictEqual(result, "andhere")
        assert.typeOf(result, 'string')
        expect(result).not.to.be.undefined;
    });
});

describe('filterByPropsAndValues', () => {

    it('should return an array', function () {
        const result = filterByPropsAndValues(filterByPropsAndValuesDummy, 'seniority', 'management-team')
        expect(result).not.to.be.undefined;
        assert.typeOf(result, 'array')
        assert.strictEqual(result.length, 16)
    });

    it('should return an empty array', function () {
        const result = filterByPropsAndValues(filterByPropsAndValuesDummy, 'seniority', 'executive-board')
        expect(result).not.to.be.undefined;
        assert.typeOf(result, 'array')
        assert.strictEqual(result.length, 0)
    });
})

describe('findAllUniqueValues', () => {

    it('should return an array', function () {
        const result = findAllUniqueValues(filterByPropsAndValuesDummy)
        expect(result).not.to.be.undefined;
        assert.typeOf(result, 'array')
        assert.strictEqual(result.length, 3)
    });

    it('should return an three different regions', function () {
        const result = findAllUniqueValues(filterByPropsAndValuesDummy)
        expect(result).not.to.be.undefined;
        assert.strictEqual(result.includes('Germany'), true)
        assert.strictEqual(result.includes('Ireland'), true)
        assert.strictEqual(result.includes('Spain'), true)
    });

    it('should return data in alphabetical order', function () {
        const result = findAllUniqueValues(filterByPropsAndValuesDummy)
        expect(result).not.to.be.undefined;
        assert.strictEqual(result[0] === 'Germany', true)
        assert.strictEqual(result[1] === 'Ireland', true)
        assert.strictEqual(result[2] === 'Spain', true)
    });
})

describe('removeEmptyArrayItems', () => {

    const anArray = [0,3,4,null]

    it('should return an array', function () {
        const result = removeEmptyArrayItems(anArray)
        expect(result).not.to.be.undefined;
        assert.typeOf(result, 'array')
    });
    it('should return remove empty arrays', function () {
        const result = removeEmptyArrayItems(anArray)
        expect(result).not.to.be.undefined;
        assert.strictEqual(result.length, 3)
    });
})