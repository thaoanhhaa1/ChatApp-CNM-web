import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    contacts: {
        A: [
            {
                name: 'Angelina Parisian',
                avatar: 'https://loremflickr.com/640/480',
                id: '1',
            },
            {
                name: 'Angelo Metz',
                avatar: 'https://loremflickr.com/640/480',
                id: '2',
            },
            {
                name: 'Lynette Brakus Sr.',
                avatar: 'https://loremflickr.com/640/480',
                id: '3',
            },
            {
                name: 'Ms. Jeannie Mertz',
                avatar: 'https://loremflickr.com/640/480',
                id: '4',
            },
        ],
        B: [
            {
                name: 'Roberta Schneider',
                avatar: 'https://loremflickr.com/640/480',
                id: '5',
            },
            {
                name: 'Winston Runolfsson',
                avatar: 'https://loremflickr.com/640/480',
                id: '6',
            },
            {
                name: 'Lena Deckow',
                avatar: 'https://loremflickr.com/640/480',
                id: '7',
            },
            {
                name: 'Milton Maggio',
                avatar: 'https://loremflickr.com/640/480',
                id: '8',
            },
            {
                name: 'Connie Nader',
                avatar: 'https://loremflickr.com/640/480',
                id: '9',
            },
        ],
        C: [
            {
                name: 'Erik Huels II',
                avatar: 'https://loremflickr.com/640/480',
                id: '10',
            },
            {
                name: 'Lamar Bogisich',
                avatar: 'https://loremflickr.com/640/480',
                id: '11',
            },
            {
                name: 'Eloise Jacobs',
                avatar: 'https://loremflickr.com/640/480',
                id: '12',
            },
            {
                name: 'Alexandra Leuschke',
                avatar: 'https://loremflickr.com/640/480',
                id: '13',
            },
            {
                name: 'Kristi Hodkiewicz',
                avatar: 'https://loremflickr.com/640/480',
                id: '14',
            },
            {
                name: 'Ms. Margarita Jacobi',
                avatar: 'https://loremflickr.com/640/480',
                id: '15',
            },
            {
                name: 'Anna Stiedemann',
                avatar: 'https://loremflickr.com/640/480',
                id: '16',
            },
            {
                name: 'Sheldon Bartoletti',
                avatar: 'https://loremflickr.com/640/480',
                id: '17',
            },
        ],
        D: [
            {
                name: 'Darrin Berge',
                avatar: 'https://loremflickr.com/640/480',
                id: '18',
            },
            {
                name: 'Shelly Gerhold',
                avatar: 'https://loremflickr.com/640/480',
                id: '19',
            },
            {
                name: 'Teri Bruen',
                avatar: 'https://loremflickr.com/640/480',
                id: '20',
            },
            {
                name: 'Diane Glover',
                avatar: 'https://loremflickr.com/640/480',
                id: '21',
            },
            {
                name: 'Gerardo Gleichner',
                avatar: 'https://loremflickr.com/640/480',
                id: '22',
            },
            {
                name: 'Stanley Ondricka',
                avatar: 'https://loremflickr.com/640/480',
                id: '23',
            },
            {
                name: 'Carole Rodriguez',
                avatar: 'https://loremflickr.com/640/480',
                id: '24',
            },
            {
                name: 'Julian Murphy III',
                avatar: 'https://loremflickr.com/640/480',
                id: '25',
            },
            {
                name: 'Madeline Koepp',
                avatar: 'https://loremflickr.com/640/480',
                id: '26',
            },
            {
                name: 'Steve Vandervort',
                avatar: 'https://loremflickr.com/640/480',
                id: '27',
            },
            {
                name: 'Rex Yost',
                avatar: 'https://loremflickr.com/640/480',
                id: '28',
            },
            {
                name: 'Sherman Bartoletti',
                avatar: 'https://loremflickr.com/640/480',
                id: '29',
            },
            {
                name: 'Elmer Wisoky Jr.',
                avatar: 'https://loremflickr.com/640/480',
                id: '30',
            },
            {
                name: 'Marc Gutmann',
                avatar: 'https://loremflickr.com/640/480',
                id: '31',
            },
            {
                name: 'Jacob Metz',
                avatar: 'https://loremflickr.com/640/480',
                id: '32',
            },
        ],
    },
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
});

export default contactsSlice.reducer;
export const {} = contactsSlice.actions;
