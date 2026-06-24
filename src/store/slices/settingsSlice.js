import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSystemConfigs } from '../../services/configService';

export const fetchSettings = createAsyncThunk(
    'settings/fetchSettings',
    async (_, { rejectWithValue }) => {
        try {
            const data = await getSystemConfigs();
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState = {
    data: {
        allCategories: ['Frame', 'Lens', 'Contact Lens', 'Sunglass', 'Solution', 'Accessory'],
        gst: [0, 5, 12, 18, 28],
        storeName: 'DigiOptics',
    },
    loading: false,
    error: null,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        updateSettings: (state, action) => {
            state.data = { ...state.data, ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSettings.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSettings.fulfilled, (state, action) => {
                state.loading = false;
                // Merge API data with static defaults
                state.data = {
                    ...state.data,
                    ...(action.payload?.data || action.payload),
                };
            })
            .addCase(fetchSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { updateSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
