let initial_state = [
    {
        name: 'Main Character',
        portrait: "https://unknown321.github.io/mgswaifus/img/ui_face_big_boss.png",
        position: {
            x: 12,
            y: 2,
            model: ''
        },
        stats: {
            maxHp: 25,
            hp: 25,
            maxMp: 15,
            mp: 15,
            strength: 5,
            defence: 5,
            magic: 5,
            magicResist: 5,
            agility: 5,
            luck: 5,
            speed: 5,
        },
        quests: [

        ],
        eq: {
            head: 'https://i.pinimg.com/originals/2e/a8/51/2ea851e26242a29461b14ec21004dfe2.png',
            chest: 'http://piq.codeus.net/static/media/userpics/piq_65251_400x400.png',
            leftHand: 'https://vignette.wikia.nocookie.net/teoria/images/3/39/Piq_68684_400x400.png/revision/latest?cb=20160723153739&path-prefix=pl',
            rightHand: 'https://i.pinimg.com/originals/8b/99/48/8b9948f230b107327413d56e3d83b744.png',
            legs: 'https://orig00.deviantart.net/ba0b/f/2015/019/7/8/minecraft_leather_pants_by_dragonshadow3-d8ekmni.png'
        },
        skills: [

        ],
        magic: [
          
        ],
        items: [

        ],
        consumables: [
            
        ],
        questItems: [

        ]
    },
];

export default (state = initial_state, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
}