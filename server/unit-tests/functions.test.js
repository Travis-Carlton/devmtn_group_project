const functions = require('./functions')

describe('functions', () => {
    describe('appliedOrNot2', () => {
        it('returns -1', () => {
            const data = [{job_id: 5},{job_id: 8},{job_id: 12}];
            expect(functions.appliedOrNot2(data, 3)).toEqual(-1)
        }),
        it('returns index', () => {
            const data = [{job_id: 5},{job_id: 8},{job_id: 12}];
            expect(functions.appliedOrNot2(data, 12)).toEqual(2)
        })

    }),
    describe('organizeDate', () => {
        it('returns date in order', () => {
            const job = {stamp: '2018-12-14T07:00:00.000Z'};
            expect(functions.organizeDate(job)).toEqual('12-14-2018')
        })
    }),
    describe('convos2', () => {
        it('returns not null', () => {
            const arr = ['Hello', null, 'Bye']
            expect(functions.convos2(arr)).toEqual(['Hello', 'Bye'])
        })
    }),
    describe('postJobForm', () => {
        it('returns correct object', () => {
            const job = {
                title: 'Cookie Site',
                description: 'The best site to order and eat cookies.', 
                startDate: '12-31-2018', 
                estimatedTime: '2 months', 
                pay: '200', 
                email: 'email@email.com'}
            expect(functions.postJobForm('Cookie Site','The best site to order and eat cookies.', '12-31-2018', '2 months', '200', 'email@email.com')).toEqual(job)
        }),
        it('returns alert', () => {
                expect(functions.postJobForm('Cookie Site','The best site to order and eat cookies.', '12-31-2018', '2 months', 'email@email.com')).toEqual(alert('Error while posting job.'))
        })
    })
})