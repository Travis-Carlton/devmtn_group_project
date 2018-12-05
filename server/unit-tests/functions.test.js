const functions = require('./functions')

describe('functions', () => {
    describe('number', () => {
        it('returns number', () => {
            expect(functions.number(3)).toEqual(3)
        })
    })
})