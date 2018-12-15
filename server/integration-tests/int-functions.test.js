const intFunctions = require('./int-functions');
const testInit = require('./init');

describe('intFunctions', () => {
    describe('getAllCharacters', () => {
        it('returns 10', async() => {
            const persons = await intFunctions.getAllCharacters()
            expect(persons.results.length).toBe(10)
        })
    }),
    describe('getLukeSkywalker', () => {
        it('returns Luke', async() => {
            const persons = await intFunctions.getLukeSkywalker()
            // console.log(persons)
            expect(persons.name).toBe('Luke Skywalker')
        })
    }),
    describe('getAllPokemon', () => {
        it('returns Pokemon', async() => {
            const pokemon = await intFunctions.getAllCards()
            // console.log(pokemon.cards.length)
            expect(pokemon.cards.length).toBe(100)
        })
    }),
    describe('getCharizard', () => {
        it('returns Charizard Name', async() => {
            const charizard = await intFunctions.getCharizard()
            expect(charizard.name).toBe('Charizard-EX')
        })
    }),
    describe('getMagicCards', () => {
        it('returns magic card 1 name', async() => {
            const magic = await
            intFunctions.getMagicCard1()
            expect(magic.subtypes.length).toBe(1)
        })
    }),
    describe('getAllDaMAgic', () => {
        it('returns all the magic cards', async() => {
            const magicCards = await
            intFunctions.getAllMagicCards()
            console.log(magicCards.length)
            expect(magicCards.length).toBe(100)
        })
    })
})