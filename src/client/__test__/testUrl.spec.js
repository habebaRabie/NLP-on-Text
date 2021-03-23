import is_url from "../js/checkURL"

describe('Test check url functionality', () => {
    test('Testing the checkUrl function defined or not', () => {
        expect(is_url).toBeDefined();        
    })

    test('Testing the checkUrl function return false for invalid url', () => {
        var validone = "https://en.wikipedia.org/wiki/English_articles";
        expect(is_url(validone)).toBe(true);
    })

    test('Testing the checkUrl function return true for valid url', () => {
        var notvalidone = "https:/ en.wikipedia.org/wiki/English_articles";
        expect(is_url(notvalidone)).toBe(false);
    })
})
