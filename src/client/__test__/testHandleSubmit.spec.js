// to solve ReferenceError: regeneratorRuntime is not defined
// https://knowledge.udacity.com/questions/174638
// const babelPolyfill = require('@babel/polyfilll')
import "@babel/polyfill";
import handleSubmit from "../js/formHandler"

describe('Client Test', () => {
    test('Testing the formHandler function defined or not', () => {
        expect(handleSubmit).toBeDefined();
    })
})
