const offer = "https://res.cloudinary.com/dlk3ezbal/image/upload/v1677413167/cramberry/cfzqnhwp04xaqlqauyvu.pdf";
const wordsmith = "https://res.cloudinary.com/dlk3ezbal/video/upload/v1677413167/cramberry/lxgokwodalpkqlpbcenk.mp4";

const highLevelSummaries = [
    {
        title: "Summary 1",
        description: "This is a summary of the first thing",
        id: "123"
    },
    {
        title: "Summary 2",
        description: "This is a summary of the second thing",
        id: "456"
    },
    {
        title: "Summary 3",
        description: "This is a summary of the third thing",
        id: "789"
    },
    {
        title: "Summary 4",
        description: "This is a summary of the fourth thing",
        id: "101112"
    },
    {
        title: "Summary 5",
        description: "This is a summary of the fifth thing",
        id: "131415"
    },
];

const summairesAndFiles = {
    "123": {
        summary: [{ text: 'This is a summary of the second thing', location: 3, file: offer, type: 'pdf' }, { text: 'This is a summary of the third thing', location: 3, file: offer, type: 'pdf' }, { text: 'This is a summary of the fourth thing', location: 2, file: wordsmith, type: 'video' }, { text: 'This is a summary of the fifth thing', location: 5, file: wordsmith, type: 'video' }],
        title: "Summary 1",
    },
    "456": {
        summary: [{ text: 'This is a summary of the first thing', location: 3, file: offer, type: 'pdf' }, { text: 'This is a summary of the first thing', location: 1, file: offer, type: 'pdf' }, { text: 'This is a summary of the first thing', location: 20, file: wordsmith, type: 'video' }, { text: 'This is a summary of the first thing', location: 5, file: wordsmith, type: 'video' }],
        title: "Summary 2",
    },

}




export { highLevelSummaries, summairesAndFiles };