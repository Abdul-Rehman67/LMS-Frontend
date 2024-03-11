// thunkActions.js
import { setSelectedBook } from '../reducers/book';
import axios from '../../apis/axios'
import { GET_ALL_BOOKS } from '../../apis/apiRoutes';

// export const fetchTableData = () => async (dispatch) => {
//     try {
//         const response = await axios.get(GET_ALL_BOOKS);
//         dispatch(setSelectedBook(response?.data?.payload));
//     } catch (error) {
//         console.error('Error fetching table data:', error);
//     }
// };
