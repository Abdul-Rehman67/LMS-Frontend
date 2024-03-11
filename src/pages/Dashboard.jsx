import { React, useState } from "react";
import Table from "../components/Table";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";


const Dashboard = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true)

  // const [selectedBook,setSelectedBook]=useState({})

  const selectedBook = useSelector(state => state.table.selectedBook);


  console.log("selectedBook", selectedBook)
  const bookId = selectedBook?._id
  const GotoChecIn = () => {
    navigate(`/checkin/${bookId}`);
  };
  const GotoChecOut = () => {
    navigate(`checkout/${bookId}`)
  };


  return (
    <>
      <div class="bg-gray-100 h-[100vh]">

        <TopBar />
        <div>
          <div className="flex justify-between mt-5">
            <div>
              <h1 class="md:text-4xl text-xl font-normal leading-normal px-5">
                Library Managment Sytem!
              </h1>
            </div>
            <div className="flex gap-1 mt-1 mr-[0.1px] sm:mr-5">
              <button
                type="button"
                onClick={GotoChecIn}
                className={selectedBook && selectedBook.isCheckedOut ? 'bg-blue-500 rounded w-full md:text-md text-xs' : 'bg-gray-300 rounded w-full md:text-md text-xs'}
                disabled={selectedBook && selectedBook.isCheckedOut ? false : true}
              // className={selectedBook && !selectedBook.isCheckedOut ? 'bg-blue-500 rounded w-full md:text-md text-xs' : 'bg-gray-500 rounded w-full md:text-md text-xs'}

              // class={selectedBook?.isCheckedOut === true ? 'bg-gray-500 rounded w-full md:text-md text-xs' : 'bg-blue-500 rounded w-full md:text-md text-xs'}
              >
                Check In
              </button>
              <button
                type="button"
                onClick={GotoChecOut}
                disabled={selectedBook ? selectedBook?.isCheckedOut : true}
                className={selectedBook && !selectedBook.isCheckedOut ? 'bg-blue-500 rounded w-full md:text-md text-xs' : 'bg-gray-300 rounded w-full md:text-md text-xs'}
              >
                Check Out
              </button>
            </div>
          </div>
          <div className="flex flex-col px-5  mt-5 md:flex-row gap-1 h-[500px]">
            <div className="w-full bg-white rounded shadow-lg">
              <Table />
            </div>
            <div className="flex flex-wrap justify-center  h-[30rem] w-[20rem] overflow-y-scroll">
              <h1 className=" text-gray-700 text-lg font-bold	">Check-out History</h1>
              {selectedBook && selectedBook?.checkOutHistory?.map((item, index) => (
                <div key={index} className="max-w-xs rounded overflow-hidden shadow-lg m-2 bg-white h-[15rem]">
                  <div className="px-6 py-4">

                    <p className="text-gray-700 text-base">
                      Name: {item.checkedOutBy.name}<br />
                      Mobile Number: {item.checkedOutBy.mobileNumber}<br />
                      National ID: {item.checkedOutBy.nationalID}<br />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>



        </div>
      </div >
    </>
  );
};

export default Dashboard;
