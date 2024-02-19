import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    files: [
        {
            name: 'deposit.dic',
            id: '1',
        },
        {
            name: 'neptunium_latin.atomsvc',
            id: '2',
        },
        {
            name: 'fort_henry_northwest.ncx',
            id: '3',
        },
        {
            name: 'market_money.jxr',
            id: '4',
        },
        {
            name: 'islands_male_sodium.mag',
            id: '5',
        },
        {
            name: 'metal_mandatory.png',
            id: '6',
        },
        {
            name: 'cis_female_microchip.wif',
            id: '7',
        },
        {
            name: 'electric.log',
            id: '8',
        },
        {
            name: 'fiat_sleek_transmitting.uva',
            id: '9',
        },
        {
            name: 'adaptive.smil',
            id: '10',
        },
        {
            name: 'program_plus_french.jls',
            id: '11',
        },
        {
            name: 'inflame.mpeg',
            id: '12',
        },
        {
            name: 'transmit_discrete_qua.azs',
            id: '13',
        },
        {
            name: 'inside_coulomb_compatible.musd',
            id: '14',
        },
        {
            name: 'southwest_well_savings.its',
            id: '15',
        },
        {
            name: 'card.azv',
            id: '16',
        },
        {
            name: 'mint_director_blues.scs',
            id: '17',
        },
        {
            name: 'electric.uvvi',
            id: '18',
        },
        {
            name: 'boohoo.mp21',
            id: '19',
        },
        {
            name: 'executive_carp.sdp',
            id: '20',
        },
        {
            name: 'deliverables.xdm',
            id: '21',
        },
        {
            name: 'becquerel_east.txt',
            id: '22',
        },
        {
            name: 'date_florida_dodge.odg',
            id: '23',
        },
        {
            name: 'northwest.m4s',
            id: '24',
        },
        {
            name: 'thailand_chicopee_liaison.nml',
            id: '25',
        },
        {
            name: 'renminbi_senior.m3a',
            id: '26',
        },
        {
            name: 'functionalities_aspernatur_buff.mmr',
            id: '27',
        },
        {
            name: 'ah_intermediate.ppsm',
            id: '28',
        },
        {
            name: 'supervisor_principal.xpx',
            id: '29',
        },
        {
            name: 'repurpose.ait',
            id: '30',
        },
        {
            name: 'angrily.xpm',
            id: '31',
        },
        {
            name: 'henry_lanthanum_borders.wadl',
            id: '32',
        },
    ],
};

const attachFilesSlice = createSlice({
    name: 'attachFiles',
    initialState,
    reducers: {
        setFiles: (state, { payload }) => {
            state.files = payload;
        },
    },
});

export default attachFilesSlice.reducer;
export const { setFiles } = attachFilesSlice.actions;
