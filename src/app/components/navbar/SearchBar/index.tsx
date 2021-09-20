import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { StringLiteralLike } from "typescript";
import { usePostsContext } from "../../../../context/PostsContext";
import { useSearchContext } from "../../../../context/SearchContext";

const SearchBarContainer = styled.div`
  ${tw`
    shadow-md
    
`}
`;

const SearchInputs = styled.div`
  ${tw`
    flex
    
`}
  input {
    ${tw`
    rounded-sm
    p-4
    h-6
    w-72
    text-gray-500
    `}
  }
  input:focus {
    outline: none;
  }
`;

const SearchIcon = styled.div`
  ${tw`
    w-6
    h-6
    flex
    justify-center
    align-middle
    my-auto
`}
  svg {
    ${tw`
    align-middle
    m-auto
  `}
  }
`;

const SearchResults = styled.div`
  ${tw`
    mt-1
    w-72
    h-64    
    align-middle
    overflow-hidden
    overflow-y-auto
    absolute
    bg-white
    text-gray-500
`}
`;

const ResultItem = styled.div`
  ${tw`
    w-full
    flex
    align-middle
    my-2
`}
  p {
    ${tw`
        w-11/12
        m-auto
    `}
  }
  div {
    ${tw`
      w-full`}
  }
  div:hover {
    ${tw`
        bg-gray-300
    `}
  }
`;

interface Data {
  title: string;
  id: string;
}

interface FilterData {
  data: Data[] | [];
}

const SearchBar = () => {
  //   const [filteredData, setFilteredData] = useState<any>([]);

  const { wordEntered, setWordEntered, filteredData, setFilteredData } =
    useSearchContext();

  const { posts } = usePostsContext();

  const handleFilter = (event: any) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = posts.map((post) => {
      if (post.title?.toLowerCase().includes(searchWord.toLowerCase())) {
        const filterDate = {
          title: post.title,
          id: post.id,
        };
        return filterDate;
      }
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <SearchBarContainer>
      <SearchInputs>
        <input
          type="text"
          placeholder="Looking for something?"
          value={wordEntered}
          onChange={handleFilter}
        />
        <SearchIcon>
          {filteredData.length === 0 ? (
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={clearInput}
              cursor="pointer"
            >
              <path
                d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                fill="currentColor"
              />
            </svg>
          )}
        </SearchIcon>
      </SearchInputs>
      {filteredData.length != 0 && (
        <SearchResults>
          {filteredData.map((data: any) => {
            if (data) {
              return (
                <ResultItem>
                  <div>
                    <Link to={`/post/${data.id}`}>
                      <p>{data.title}</p>
                    </Link>
                  </div>
                </ResultItem>
              );
            }
          })}
        </SearchResults>
      )}
    </SearchBarContainer>
  );
};

export default SearchBar;
