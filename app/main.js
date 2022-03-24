import "modern-css-reset";
import "./../assets/styles/tailwind.sass";
import "./../assets/styles/style.sass";
import "phosphor-icons";

// import {writeTweets} from "./writeTweets.js";
import data from "./data.json";

console.log(data);

// Carga pagina

window.addEventListener("load", () => {
  renderTweets();
  initSearchEvent();
});

let filteredData = [];


// Renderizar Tweets

const renderTweets = () => {
  const tweetsBlock = document.querySelector(".tweets");
  let tweetsHTML = "";
  data.forEach((dataItem) => {
    tweetsHTML += `
    <div class="tweet_line">
      <div class="tweet_container">
      <div class="user_pic">
        <img
          src=${dataItem.user.pic}
          alt=""
        />
      </div>
      <div class="tweet_main">
        <div class="user_info">
          <div class="user_name">${dataItem.user.name}</div>
          <div class="user_atname">@${dataItem.user.at}</div>
          <span>&#8231;</span>
          <div class="time">${dataItem.tweet.time}h</div>
        </div>
        <div class="tweet_content">
          <p>
          ${dataItem.tweet.content}
          </p>
        </div>
        <div class="tweet_info">
          <div class="tweet_info_comments">
            <div class="comments_icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.0459 2.24199L9.89795 2.23199H9.89595C5.52195 2.23199 2.09595 5.65899 2.09595 10.034C2.09595 14.132 5.28195 17.24 9.56095 17.404V21.232C9.56095 21.34 9.60495 21.518 9.68095 21.635C9.82295 21.86 10.0649 21.982 10.3129 21.982C10.4509 21.982 10.5899 21.944 10.7149 21.864C10.9789 21.696 17.1879 17.724 18.8029 16.358C20.7049 14.748 21.8429 12.388 21.8459 10.046V10.029C21.8399 5.66199 18.4159 2.24199 14.0459 2.24099V2.24199ZM17.8329 15.214C16.6989 16.174 12.9709 18.619 11.0609 19.857V16.67C11.0609 16.256 10.7259 15.92 10.3109 15.92H9.91495C6.25495 15.92 3.59695 13.444 3.59695 10.034C3.59695 6.49999 6.36495 3.73199 9.89695 3.73199L14.0439 3.74199H14.0459C17.5779 3.74199 20.3459 6.50799 20.3479 10.038C20.3449 11.948 19.4059 13.882 17.8339 15.214H17.8329Z"
                  fill="rgb(156 163 175)"
                />
              </svg>
            </div>
            <div class="comments_number">${dataItem.tweet.comments}</div>
          </div>
          <div class="tweet_info_retweets">
            <div class="retweets_icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.77 15.67C23.478 15.377 23.003 15.377 22.71 15.67L20.49 17.89V7.65001C20.49 5.58201 18.807 3.90001 16.74 3.90001H10.89C10.476 3.90001 10.14 4.23601 10.14 4.65001C10.14 5.06401 10.476 5.40001 10.89 5.40001H16.74C17.98 5.40001 18.99 6.41001 18.99 7.65001V17.89L16.77 15.67C16.477 15.377 16.002 15.377 15.71 15.67C15.418 15.963 15.416 16.438 15.71 16.73L19.21 20.23C19.355 20.377 19.547 20.45 19.74 20.45C19.933 20.45 20.123 20.378 20.27 20.23L23.77 16.73C24.064 16.438 24.064 15.963 23.77 15.67ZM13.11 18.95H7.25997C6.01997 18.95 5.00997 17.94 5.00997 16.7V6.46001L7.22997 8.68001C7.37797 8.82701 7.56997 8.90001 7.76197 8.90001C7.95397 8.90001 8.14597 8.82701 8.29197 8.68001C8.58497 8.38701 8.58497 7.91201 8.29197 7.62001L4.79197 4.12001C4.49897 3.82601 4.02397 3.82601 3.73197 4.12001L0.231975 7.62001C-0.0620254 7.91201 -0.0620254 8.38701 0.231975 8.68001C0.525975 8.97301 0.998975 8.97301 1.29197 8.68001L3.51197 6.46001V16.7C3.51197 18.768 5.19497 20.45 7.26197 20.45H13.112C13.526 20.45 13.862 20.114 13.862 19.7C13.862 19.286 13.525 18.95 13.112 18.95H13.11Z"
                  fill="rgb(156 163 175)"
                />
              </svg>
            </div>
            <div class="retweets_number">${dataItem.tweet.retweets}</div>
          </div>
          <div class="tweet_info_likes">
            <div class="likes_icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21.638H11.986C9.40295 21.59 1.94995 14.856 1.94995 8.478C1.94995 5.414 4.47495 2.724 7.35295 2.724C9.64295 2.724 11.183 4.304 11.999 5.454C12.813 4.306 14.353 2.724 16.644 2.724C19.524 2.724 22.048 5.414 22.048 8.479C22.048 14.855 14.594 21.589 12.011 21.636H12V21.638ZM7.35395 4.225C5.27395 4.225 3.45095 6.213 3.45095 8.48C3.45095 14.22 10.485 20.076 12.001 20.138C13.519 20.076 20.551 14.221 20.551 8.48C20.551 6.213 18.728 4.225 16.648 4.225C14.12 4.225 12.708 7.161 12.696 7.19C12.466 7.752 11.54 7.752 11.309 7.19C11.295 7.16 9.88395 4.225 7.35495 4.225H7.35395Z"
                  fill="rgb(156 163 175)"
                />
              </svg>
            </div>
            <div class="likes_number">${dataItem.tweet.likes}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
  });
  tweetsBlock.innerHTML = tweetsHTML;
  initTweetEvents();
};

// Inicializar tweets

const initTweetEvents = () => {
  const allTweets = document.querySelectorAll(".tweet_container");

  allTweets.forEach((tweet, i) => {
    const likes = tweet.querySelector(".likes_icon");
    likes.addEventListener("click", () => {
      data[i].tweet.likes++;
      if (filteredData.length > 0) {
        renderFiltered();
      } else {
        renderTweets();
      }
    });

    const retweets = tweet.querySelector(".retweets_icon");
    retweets.addEventListener("click", () => {
      data[i].tweet.retweets++;
      if (filteredData.length > 0) {
        renderFiltered();
      } else {
        renderTweets();
      }
    });
  });
};

// Filtrado de tweets por nombre

const initSearchEvent = () => {
  const searchInput = document.querySelector(".search_input_text");
  searchInput.addEventListener("keyup", () => {
    if (searchInput.value.length > 2) {
      filteredData = data.filter((dataItem) =>
        dataItem.user.name.toLowerCase().includes(searchInput.value.toLowerCase())
      );

      if (filteredData.length > 0) {
        console.log(filteredData);
        renderFiltered();
      } else {
        const tweetsBlock = document.querySelector(".tweets");
        tweetsBlock.innerHTML = `
        <div class="tweet_line">
          <div class="tweet_container">
            
          </div>
        </div>
        `
        ;
      }
    } else {
      renderTweets();
    }
  });
};

// Render del filtrado


const renderFiltered = () => {
  const tweetsBlock = document.querySelector(".tweets");
  let filteredFeedHTML = "";
  filteredData.forEach((filteredDataItem) => {
    filteredFeedHTML += `
    <div class="tweet_line">
      <div class="tweet_container">
      <div class="user_pic">
        <img
          src=${filteredDataItem.user.pic}
          alt=""
        />
      </div>
      <div class="tweet_main">
        <div class="user_info">
          <div class="user_name">${filteredDataItem.user.name}</div>
          <div class="user_atname">@${filteredDataItem.user.at}</div>
          <span>&#8231;</span>
          <div class="time">${filteredDataItem.tweet.time}h</div>
        </div>
        <div class="tweet_content">
          <p>
          ${filteredDataItem.tweet.content}
          </p>
        </div>
        <div class="tweet_info">
          <div class="tweet_info_comments">
            <div class="comments_icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.0459 2.24199L9.89795 2.23199H9.89595C5.52195 2.23199 2.09595 5.65899 2.09595 10.034C2.09595 14.132 5.28195 17.24 9.56095 17.404V21.232C9.56095 21.34 9.60495 21.518 9.68095 21.635C9.82295 21.86 10.0649 21.982 10.3129 21.982C10.4509 21.982 10.5899 21.944 10.7149 21.864C10.9789 21.696 17.1879 17.724 18.8029 16.358C20.7049 14.748 21.8429 12.388 21.8459 10.046V10.029C21.8399 5.66199 18.4159 2.24199 14.0459 2.24099V2.24199ZM17.8329 15.214C16.6989 16.174 12.9709 18.619 11.0609 19.857V16.67C11.0609 16.256 10.7259 15.92 10.3109 15.92H9.91495C6.25495 15.92 3.59695 13.444 3.59695 10.034C3.59695 6.49999 6.36495 3.73199 9.89695 3.73199L14.0439 3.74199H14.0459C17.5779 3.74199 20.3459 6.50799 20.3479 10.038C20.3449 11.948 19.4059 13.882 17.8339 15.214H17.8329Z"
                  fill="rgb(156 163 175)"
                />
              </svg>
            </div>
            <div class="comments_number">${filteredDataItem.tweet.comments}</div>
          </div>
          <div class="tweet_info_retweets">
            <div class="retweets_icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.77 15.67C23.478 15.377 23.003 15.377 22.71 15.67L20.49 17.89V7.65001C20.49 5.58201 18.807 3.90001 16.74 3.90001H10.89C10.476 3.90001 10.14 4.23601 10.14 4.65001C10.14 5.06401 10.476 5.40001 10.89 5.40001H16.74C17.98 5.40001 18.99 6.41001 18.99 7.65001V17.89L16.77 15.67C16.477 15.377 16.002 15.377 15.71 15.67C15.418 15.963 15.416 16.438 15.71 16.73L19.21 20.23C19.355 20.377 19.547 20.45 19.74 20.45C19.933 20.45 20.123 20.378 20.27 20.23L23.77 16.73C24.064 16.438 24.064 15.963 23.77 15.67ZM13.11 18.95H7.25997C6.01997 18.95 5.00997 17.94 5.00997 16.7V6.46001L7.22997 8.68001C7.37797 8.82701 7.56997 8.90001 7.76197 8.90001C7.95397 8.90001 8.14597 8.82701 8.29197 8.68001C8.58497 8.38701 8.58497 7.91201 8.29197 7.62001L4.79197 4.12001C4.49897 3.82601 4.02397 3.82601 3.73197 4.12001L0.231975 7.62001C-0.0620254 7.91201 -0.0620254 8.38701 0.231975 8.68001C0.525975 8.97301 0.998975 8.97301 1.29197 8.68001L3.51197 6.46001V16.7C3.51197 18.768 5.19497 20.45 7.26197 20.45H13.112C13.526 20.45 13.862 20.114 13.862 19.7C13.862 19.286 13.525 18.95 13.112 18.95H13.11Z"
                  fill="rgb(156 163 175)"
                />
              </svg>
            </div>
            <div class="retweets_number">${filteredDataItem.tweet.retweets}</div>
          </div>
          <div class="tweet_info_likes">
            <div class="likes_icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21.638H11.986C9.40295 21.59 1.94995 14.856 1.94995 8.478C1.94995 5.414 4.47495 2.724 7.35295 2.724C9.64295 2.724 11.183 4.304 11.999 5.454C12.813 4.306 14.353 2.724 16.644 2.724C19.524 2.724 22.048 5.414 22.048 8.479C22.048 14.855 14.594 21.589 12.011 21.636H12V21.638ZM7.35395 4.225C5.27395 4.225 3.45095 6.213 3.45095 8.48C3.45095 14.22 10.485 20.076 12.001 20.138C13.519 20.076 20.551 14.221 20.551 8.48C20.551 6.213 18.728 4.225 16.648 4.225C14.12 4.225 12.708 7.161 12.696 7.19C12.466 7.752 11.54 7.752 11.309 7.19C11.295 7.16 9.88395 4.225 7.35495 4.225H7.35395Z"
                  fill="rgb(156 163 175)"
                />
              </svg>
            </div>
            <div class="likes_number">${filteredDataItem.tweet.likes}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
  });
  tweetsBlock.innerHTML = filteredFeedHTML;
  initTweetEvents();
};

// Escribir Nuevo Tweet

// counterVisible = false
// isButtonActive = false
// newTweetText = ""

// initNewTweetEvents = () =>
//   const newTweetText = document.querySelectorAll(".write_tweet");
