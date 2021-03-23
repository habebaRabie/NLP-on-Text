import "@babel/polyfill";
import handleSubmit from "../js/formHandler"

describe('Client Test', () => {
    test('Testing the formHandler function defined or not', () => {
        expect(handleSubmit).toBeDefined();
    })
})
