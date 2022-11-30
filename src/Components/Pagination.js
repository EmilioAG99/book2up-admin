import React , {useState} from "react";
import "./Pagination.css";

const Pagination = ({ postPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  const [currentIndex,setCurrentIndex] = useState(0)
  for (let i = 0; i < Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul className="pagination-area">
        {pageNumbers.map((number) => {
          return (
            <li key={number}>
              <div
                 className={number===currentIndex?"active":'index-number'}
                onClick={() => {
                  paginate(number + 1);
                  setCurrentIndex(number)
                }}
              >
                {number + 1}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
