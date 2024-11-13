import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Transition from '../utils/Transition';

function ModalSearch({
  id,
  searchId,
  modalOpen,
  setModalOpen
}) {
  const modalContent = useRef(null);
  const searchInput = useRef(null);
  const [searchData, setSearchData] = useState('');
  const [searchResults, setSearchResults] = useState({
    users: [],
    userProfiles: [],
    chargerunit: [],
    logretention: [],
    hubdata: [],
    helpandsupport: [],
    disputeform: [],
    feedback: []
  });
  const [currentResults, setCurrentResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!modalOpen || modalContent.current.contains(target)) return;
      setModalOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [modalOpen, setModalOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [modalOpen]);

  useEffect(() => {
    if (modalOpen) {
      searchInput.current.focus();
    }
  }, [modalOpen]);

  const handleSearchInputChange = (event) => {
    setSearchData(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    if (!searchData) return;

    setIsLoading(true);

    const rooturi = import.meta.env.VITE_ROOT_URI;

    try {
      const response = await fetch(`${rooturi}/searchq`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm: searchData }),
      });

      if (response.ok) {
        const result = await response.json();
        // Combine all results into a single array for easier display
        const combinedResults = [
          ...result.users,
          ...result.userProfiles,
          ...result.chargerunit,
          ...result.logretention,
          ...result.hubdata,
          ...result.helpandsupport,
          ...result.disputeform,
          ...result.feedback
        ];

        setSearchResults(result); // store the full result object
        setCurrentResults(combinedResults.slice(0, 20)); // only show the first 20 results initially
      } else {
        console.error('Search failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setIsLoading(false);
  };

  const handleLoadMore = () => {
    const combinedResults = [
      ...searchResults.users,
      ...searchResults.userProfiles,
      ...searchResults.chargerunit,
      ...searchResults.logretention,
      ...searchResults.hubdata,
      ...searchResults.helpandsupport,
      ...searchResults.disputeform,
      ...searchResults.feedback
    ];

    const nextResults = combinedResults.slice(currentResults.length, currentResults.length + 20);
    setCurrentResults((prevResults) => [...prevResults, ...nextResults]);
  };

  const renderResultItem = (item, index) => {
    return (
      <li key={index} className="p-4 border-b border-gray-200 dark:border-gray-700/60">
        <Link
          className="block text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700/20"
          to="#0"
          onClick={() => setModalOpen(!modalOpen)}
        >
          {/* Render all keys dynamically */}
          {Object.keys(item).map((key, idx) => (
            <div key={idx} className="mb-2">
              <strong className="text-sm text-gray-600 dark:text-gray-400">{key}:</strong>
              <span className="ml-2 text-sm text-gray-800 dark:text-gray-100">{JSON.stringify(item[key])}</span>
            </div>
          ))}
        </Link>
      </li>
    );
  };

  return (
    <>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-gray-900 bg-opacity-30 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          ref={modalContent}
          className="bg-white dark:bg-gray-800 border border-transparent dark:border-gray-700/60 overflow-auto max-w-2xl w-full max-h-full rounded-lg shadow-lg"
        >
          {/* Search form */}
          <form className="border-b border-gray-200 dark:border-gray-700/60" onSubmit={handleSearchSubmit}>
            <div className="relative">
              <label htmlFor={searchId} className="sr-only">
                Search
              </label>
              <input
                id={searchId}
                className="w-full dark:text-gray-300 bg-white dark:bg-gray-800 border-0 focus:ring-transparent placeholder-gray-400 dark:placeholder-gray-500 appearance-none py-3 pl-10 pr-4"
                type="search"
                placeholder="Search Anything…"
                ref={searchInput}
                value={searchData}
                onChange={handleSearchInputChange}
              />
              <button className="absolute inset-0 right-auto group" type="submit" aria-label="Search">
                <svg
                  className="shrink-0 fill-current text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400 ml-4 mr-2"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                  <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Display Search Results */}
          <div className="py-4 px-2">
            <div className="mb-3 last:mb-0">
              <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase px-2 mb-2">Search Results</div>
              <ul className="text-sm">
                {currentResults.map((item, index) => renderResultItem(item, index))}
              </ul>
            </div>
            {/* Load More Button */}
            {currentResults.length < Object.values(searchResults).flat().length && (
              <button
                className="w-full mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
                onClick={handleLoadMore}
              >
                Load More
              </button>
            )}
          </div>
        </div>
      </Transition>
    </>
  );
}

export default ModalSearch;
