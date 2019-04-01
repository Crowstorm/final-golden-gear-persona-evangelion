const playerDefaultState = {
  isAuth: true,
  id: null,
  login: null,
  expTable:[
    {exp: 100, boost: 2},
    {exp: 250, boost: 2},
    {exp: 500, boost: 2},
    {exp: 1000, boost: 2},
  ]
}

const playerReducer = (state = playerDefaultState, action) => {
    switch (action.type) {
     

        default:
            return state;
    }

}

export default playerReducer;