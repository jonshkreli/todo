/**
 * @author Jon Shkreli
 * This data will be used a sample for the application.
 * */

export const TasksExampleData = [
    {
        id: 1,
        title: 'Go to gym',
        description: 'Do the new exercise learned yesterday',
        done: false,
        created: new Date(2018, 4, 17, 4, 6), //optional
        lastUpdated: new Date(2018, 4, 17, 10, 10), //optional
        deadline: new Date(2018, 4, 18, 15, 30) //optional
    },
    {
        id: 2,
        title: 'Book flight',
        description: 'Book flight to Malta',
        done: true,
        created: new Date(2018, 2, 12, 6, 12), //optional
        lastUpdated: null, //optional
        deadline: new Date(null) //optional
    },
    {
        id: 3,
        title: 'Meet somebody',
        description: '',
        done: false,
    },

];