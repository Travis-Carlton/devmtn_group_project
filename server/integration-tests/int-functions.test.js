const intFunctions = require('./int-functions');
const testInit = require('./init');

describe('intFunctions', () => {
    describe('getAllCharacters', () => {
        it('returns 10', async() => {
            const persons = await intFunctions.getAllCharacters()
            expect(persons.results.length).toBe(10)
        })
    })
})