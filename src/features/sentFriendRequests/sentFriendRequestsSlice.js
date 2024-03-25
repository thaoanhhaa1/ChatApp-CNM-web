import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sentFriendRequests: [
        {
            name: 'Dr. Sandy Crist',
            avatar: 'https://loremflickr.com/640/480',
            date: '2023-11-27T13:28:18.745Z',
            id: '1',
        },
        {
            name: 'Jeannette Erdman',
            avatar: 'https://loremflickr.com/640/480',
            date: '2023-08-11T18:12:19.640Z',
            id: '2',
        },
        {
            name: 'Ms. Nathan Ruecker',
            avatar: 'https://loremflickr.com/640/480',
            date: '2023-09-22T22:09:25.086Z',
            id: '3',
        },
        {
            name: 'Jason Conroy',
            avatar: 'https://loremflickr.com/640/480',
            date: '2023-12-22T20:11:07.806Z',
            id: '4',
        },
        {
            name: 'Ann Rosenbaum Jr.',
            avatar: 'https://loremflickr.com/640/480',
            date: '2023-05-04T22:20:07.034Z',
            id: '5',
        },
        {
            name: 'Josh Rohan',
            avatar: 'https://loremflickr.com/640/480',
            date: '2024-02-17T05:30:52.070Z',
            id: '6',
        },
        {
            name: 'Wallace Bins',
            avatar: 'https://loremflickr.com/640/480',
            date: '2023-04-24T06:02:53.982Z',
            id: '7',
        },
        {
            name: 'Raquel Grady',
            avatar: 'https://loremflickr.com/640/480',
            date: '2023-12-23T11:37:40.211Z',
            id: '8',
        },
        {
            name: 'Tracy Hudson',
            avatar: 'https://loremflickr.com/640/480',
            date: '2023-06-28T07:05:26.464Z',
            id: '9',
        },
        {
            name: 'Erick Rohan',
            avatar: 'https://loremflickr.com/640/480',
            date: '2023-04-16T05:07:40.962Z',
            id: '10',
        },
        {
            name: 'Maryann Emard',
            avatar: 'https://loremflickr.com/640/480',
            date: '2023-07-12T15:26:35.891Z',
            id: '11',
        },
        {
            name: 'Roy Rau',
            avatar: 'https://loremflickr.com/640/480',
            date: '2023-10-16T08:16:17.009Z',
            id: '12',
        },
        {
            name: 'Ms. Jacqueline Rippin',
            avatar: 'https://loremflickr.com/640/480',
            date: '2024-02-26T18:31:34.850Z',
            id: '13',
        },
        {
            name: 'Arnold Bins',
            avatar: 'https://loremflickr.com/640/480',
            date: '2024-01-26T02:09:51.968Z',
            id: '14',
        },
        {
            name: 'Mr. Kenneth Kulas',
            avatar: 'https://loremflickr.com/640/480',
            date: '2024-01-27T04:14:25.094Z',
            id: '15',
        },
        {
            name: 'Sally Emmerich',
            avatar: 'https://loremflickr.com/640/480',
            date: '2023-09-09T02:55:55.640Z',
            id: '16',
        },
        {
            name: 'Sonya Walter',
            avatar: 'https://loremflickr.com/640/480',
            date: '2023-09-26T22:02:46.245Z',
            id: '17',
        },
        {
            name: 'Perry Jacobson',
            avatar: 'https://loremflickr.com/640/480',
            date: '2023-05-04T05:18:27.179Z',
            id: '18',
        },
        {
            name: 'Elijah Vandervort',
            avatar: 'https://loremflickr.com/640/480',
            date: '2023-06-18T02:40:53.153Z',
            id: '19',
        },
        {
            name: 'Paulette Lesch',
            avatar: 'https://loremflickr.com/640/480',
            date: '2024-01-11T05:13:17.190Z',
            id: '20',
        },
        {
            name: 'Linda Kilback',
            avatar: 'https://loremflickr.com/640/480',
            date: '2023-06-17T16:14:28.799Z',
            id: '21',
        },
        {
            name: 'Franklin Powlowski',
            avatar: 'https://loremflickr.com/640/480',
            date: '2023-10-27T21:10:33.416Z',
            id: '22',
        },
        {
            name: 'Tricia Donnelly Jr.',
            avatar: 'https://loremflickr.com/640/480',
            date: '2023-11-05T13:33:37.994Z',
            id: '23',
        },
        {
            name: 'Mr. Eddie Powlowski',
            avatar: 'https://loremflickr.com/640/480',
            date: '2023-04-13T14:47:55.937Z',
            id: '24',
        },
        {
            name: 'Lela Reichel IV',
            avatar: 'https://loremflickr.com/640/480',
            date: '2023-08-22T14:35:46.551Z',
            id: '25',
        },
        {
            name: 'Mary Roberts',
            avatar: 'https://loremflickr.com/640/480',
            date: '2023-09-12T09:30:05.381Z',
            id: '26',
        },
        {
            name: 'Andre Reichel',
            avatar: 'https://loremflickr.com/640/480',
            date: '2023-04-20T13:02:27.261Z',
            id: '27',
        },
        {
            name: 'Tommy Witting',
            avatar: 'https://loremflickr.com/640/480',
            date: '2023-11-25T05:07:14.005Z',
            id: '28',
        },
        {
            name: 'Dr. Chester Larkin',
            avatar: 'https://loremflickr.com/640/480',
            date: '2023-09-05T08:30:56.746Z',
            id: '29',
        },
        {
            name: 'Mrs. Della Kshlerin',
            avatar: 'https://loremflickr.com/640/480',
            date: '2023-12-23T12:00:31.573Z',
            id: '30',
        },
        {
            name: 'Michael Towne',
            avatar: 'https://loremflickr.com/640/480',
            date: '2023-07-13T19:00:10.296Z',
            id: '31',
        },
        {
            name: 'Benjamin Effertz',
            avatar: 'https://loremflickr.com/640/480',
            date: '2024-01-04T09:34:29.207Z',
            id: '32',
        },
    ],
    loading: false,
};

const sentFriendRequestsSlice = createSlice({
    name: 'sentFriendRequests',
    initialState,
    reducers: {},
});

export default sentFriendRequestsSlice.reducer;
export const {} = sentFriendRequestsSlice.actions;
