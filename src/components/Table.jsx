import React from "react";
import { useEffect, useState } from "react";
import axios from "../apis/axios"
import { GET_ALL_BOOKS } from "../apis/apiRoutes";
import { setSelectedBook } from "../store/reducers/book";
import { useDispatch, useSelector } from "react-redux";


const Table = ({ }) => {
  const dispatch = useDispatch()

  const [tableData, setTableData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const selectedBook = useSelector(state => state.table.selectedBook);

  const headers = ["title", "ISBN", "coverPrice", "publishYear", "isCheckedOut",]


  useEffect(() => {

    setSelectedItem(selectedBook)

    getTableData()
  }, []);

  const getTableData = async () => {
    const data = await axios.get(GET_ALL_BOOKS);
    setTableData(data.data.payload)
    // setSelectedItem(data.data.payload[0])

  }
  const handleSelectedBook = (item) => {
    if (item) {
      setSelectedItem(item)
      dispatch(setSelectedBook(item));
    }





  }


  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          {tableData?.length > 0 ? (
            <div className="h-[25rem] overflow-y-scroll ">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th className="text-md font-medium text-gray-900 px-6 py-4 text-left">Select</th>
                    {/* <th>ID</th> */}
                    {headers?.map((header) => (
                      <th
                        key={header}
                        scope="col"
                        className="text-md font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        {header.toUpperCase()}
                      </th>
                    ))}

                  </tr>
                </thead>
                <tbody>
                  {tableData?.map((item) => (
                    <tr
                      key={item._id}
                      className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      <td>
                        <div className="flex items-center justify-center h-full w-full">
                          <input
                            type="radio"
                            name="selectedBook"
                            value={item}
                            checked={selectedBook === item}
                            onChange={() => handleSelectedBook(item)}
                          />
                        </div>
                      </td>

                      {headers?.map((header) => (
                        <td
                          key={header}
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                        >
                          {tableData?.length ? (
                            header === 'isCheckedOut' ? (item[header] ? 'Yes' : 'No') : item[header]
                          ) : ''}
                        </td>
                      ))}
                      <td>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <span className="flex justify-center items-center  font-bold">
              No Books
            </span>
          )}
        </div>
      </div>

    </div>
  );
};

export default Table;
