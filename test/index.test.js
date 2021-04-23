import {addition} from '../index.js'
import * as sinon from "sinon";
import { assert } from 'chai';

describe('addition', () => {
    it('adds together two numbers',  () => {
        const result = addition(7, 8)
        assert.strictEqual(result, 15)
        assert.typeOf(result, 'number')
    });
    it('adds two strings together',  () => {
        const result = addition("and", "here")
        assert.strictEqual(result, "andhere")
        assert.typeOf(result, 'string')
    });
});