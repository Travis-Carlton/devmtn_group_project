const initialState = {
    example: false,
};


const EXAMPLE = 'EXAMPLE';


export default function reducer(state = initialState, action){
    switch (action.type) {
        case EXAMPLE:
            return {...state, lusername: action.payload}
        

        default:
            return state;
    }
}


export function updateExample(ex){
    return {
        type: EXAMPLE,
        payload: ex
    }
}
