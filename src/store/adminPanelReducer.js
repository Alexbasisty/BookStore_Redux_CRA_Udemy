const initialState = {
    book: {
        name: "",
        author: "",
        description: "",
        onStock: true,
        image: "",
        genre: "",
    },
};

const adminPanelReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            console.log(`Unknown action ${action.type}`);
            return state;
    }
};

export default adminPanelReducer;
