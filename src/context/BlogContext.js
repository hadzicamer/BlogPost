import createDataContext from './createDataContext';
import jsonserver from '../api/jsonServer';

const BlogReducer = (state, action) => {
    switch (action.type) {
        case 'edit_BlogPost':
            return state.map((blogPost) => {
                if (blogPost.id === action.payload.id)
                    return action.payload;
                else
                    return blogPost;
            });
        case 'addBlogPost':
            return [...state, { id: Math.floor(Math.random() * 99999), title: action.payload.title, content: action.payload.content }];
        case 'deleteBlogPost':
            return state.filter(blogPost => blogPost.id !== action.payload);
            case 'getBlogPost':
                return action.payload;
                // api ce nam vratiti svoj state tako da nam ne treba nista slicno 
        default:
            return state;
    }
};

const getBlogPost = dispatch => {
    return async () => {
        const response = await jsonserver.get('/blogposts');
        dispatch({ type: 'getBlogPost', payload: response.data });
    };
};

const addBlogPost = dispatch => {
    return async (title, content, callback) => {
        await jsonserver.post('/blogposts',{title,content});
        // dispatch({ type: 'addBlogPost', payload: { title, content } });
        if (callback)
            callback();
    };
};

const deleteBlogPost = (dispatch) => {
    return (id) => {
        dispatch({ type: 'deleteBlogPost', payload: id });
    }
}

const editBlogPost = (dispatch) => {
    return async (id, title, content, callback) => {
        await jsonserver.put(`blogposts/${id}`,{title,content})
        dispatch({
            type: 'edit_BlogPost',
            payload: { id, title, content }
        });
        if (callback)
            callback();
    };
};


export const { Context, Provider } = createDataContext(BlogReducer, { addBlogPost, deleteBlogPost, editBlogPost,getBlogPost }, []);
