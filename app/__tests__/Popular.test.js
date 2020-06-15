import React from "react";
import { act, render, cleanup } from "@testing-library/react";
import { fetchPopularRepos } from "../utils/api";
import Popular from "../components/Popular";
import ReposGrid from "../components/ReposGrid";
import { ThemeProvider } from "../contexts/theme";
import { readFileSync } from "fs";
import path from "path";

// Mocking Global fetch
jest.mock("node-fetch");
import fetch, { Response } from "node-fetch";

const AllPopular = JSON.parse(
  readFileSync(path.join(__dirname, "allpopular.json")).toString()
);

fetch.mockReturnValue(
  Promise.resolve({
    json: () => Promise.resolve(AllPopular),
  })
);

//this is necesary to be used by the other places that fetch the data
global.fetch = fetch;
// End mocking fetch

let populars;
afterEach(cleanup);

test("Test popular repos", (done) => {
  fetchPopularRepos("All").then((repos) => {
    populars = repos;

    const { getByTestId } = render(
      <ThemeProvider value={"light"}>
        <ReposGrid repos={repos} />
      </ThemeProvider>
    );

    const reposeGrid = getByTestId("repos-grid");
    // console.log("populars", repos);
    // expect(reposeGrid.children.length).toEqual(repos.length)
    // expect(fetch).toHaveBeenCalledWith(
    //   "https://api.exchangeratesapi.io/latest?base=USD"
    // );
    expect(reposeGrid).toMatchInlineSnapshot(`
      <ul
        class="grid space-around"
        data-testid="repos-grid"
      >
        <li
          data-testid="freeCodeCamp"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #1
            </h4>
            <img
              alt="Avatar for freeCodeCamp"
              class="avatar"
              src="https://avatars0.githubusercontent.com/u/9892522?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/freeCodeCamp/freeCodeCamp"
              >
                freeCodeCamp
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/freeCodeCamp"
                  >
                    freeCodeCamp
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                311,539
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                24,213
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                312
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="996icu"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #2
            </h4>
            <img
              alt="Avatar for 996icu"
              class="avatar"
              src="https://avatars3.githubusercontent.com/u/48942249?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/996icu/996.ICU"
              >
                996icu
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/996icu"
                  >
                    996icu
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                249,752
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                21,096
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                16,772
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="vuejs"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #3
            </h4>
            <img
              alt="Avatar for vuejs"
              class="avatar"
              src="https://avatars1.githubusercontent.com/u/6128107?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/vuejs/vue"
              >
                vuejs
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/vuejs"
                  >
                    vuejs
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                165,624
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                25,108
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                513
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="EbookFoundation"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #4
            </h4>
            <img
              alt="Avatar for EbookFoundation"
              class="avatar"
              src="https://avatars0.githubusercontent.com/u/14127308?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/EbookFoundation/free-programming-books"
              >
                EbookFoundation
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/EbookFoundation"
                  >
                    EbookFoundation
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                150,541
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                36,304
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                55
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="facebook"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #5
            </h4>
            <img
              alt="Avatar for facebook"
              class="avatar"
              src="https://avatars3.githubusercontent.com/u/69631?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/facebook/react"
              >
                facebook
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/facebook"
                  >
                    facebook
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                150,165
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                29,241
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                622
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="tensorflow"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #6
            </h4>
            <img
              alt="Avatar for tensorflow"
              class="avatar"
              src="https://avatars1.githubusercontent.com/u/15658638?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/tensorflow/tensorflow"
              >
                tensorflow
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/tensorflow"
                  >
                    tensorflow
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                145,308
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                81,573
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                3,696
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="twbs"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #7
            </h4>
            <img
              alt="Avatar for twbs"
              class="avatar"
              src="https://avatars0.githubusercontent.com/u/2918581?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/twbs/bootstrap"
              >
                twbs
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/twbs"
                  >
                    twbs
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                141,283
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                68,953
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                399
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="sindresorhus"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #8
            </h4>
            <img
              alt="Avatar for sindresorhus"
              class="avatar"
              src="https://avatars1.githubusercontent.com/u/170270?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/sindresorhus/awesome"
              >
                sindresorhus
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/sindresorhus"
                  >
                    sindresorhus
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                134,673
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                17,945
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                42
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="getify"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #9
            </h4>
            <img
              alt="Avatar for getify"
              class="avatar"
              src="https://avatars1.githubusercontent.com/u/150330?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/getify/You-Dont-Know-JS"
              >
                getify
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/getify"
                  >
                    getify
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                122,959
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                24,657
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                111
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="jwasham"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #10
            </h4>
            <img
              alt="Avatar for jwasham"
              class="avatar"
              src="https://avatars2.githubusercontent.com/u/3771963?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/jwasham/coding-interview-university"
              >
                jwasham
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/jwasham"
                  >
                    jwasham
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                119,185
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                34,890
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                56
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="ohmyzsh"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #11
            </h4>
            <img
              alt="Avatar for ohmyzsh"
              class="avatar"
              src="https://avatars1.githubusercontent.com/u/22552083?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/ohmyzsh/ohmyzsh"
              >
                ohmyzsh
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/ohmyzsh"
                  >
                    ohmyzsh
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                111,547
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                19,934
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                704
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="kamranahmedse"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #12
            </h4>
            <img
              alt="Avatar for kamranahmedse"
              class="avatar"
              src="https://avatars2.githubusercontent.com/u/4921183?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/kamranahmedse/developer-roadmap"
              >
                kamranahmedse
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/kamranahmedse"
                  >
                    kamranahmedse
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                111,334
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                17,494
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                20
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="github"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #13
            </h4>
            <img
              alt="Avatar for github"
              class="avatar"
              src="https://avatars1.githubusercontent.com/u/9919?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/github/gitignore"
              >
                github
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/github"
                  >
                    github
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                103,311
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                54,547
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                146
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="CyC2018"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #14
            </h4>
            <img
              alt="Avatar for CyC2018"
              class="avatar"
              src="https://avatars3.githubusercontent.com/u/36260787?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/CyC2018/CS-Notes"
              >
                CyC2018
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/CyC2018"
                  >
                    CyC2018
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                103,193
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                33,634
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                37
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="donnemartin"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #15
            </h4>
            <img
              alt="Avatar for donnemartin"
              class="avatar"
              src="https://avatars2.githubusercontent.com/u/5458997?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/donnemartin/system-design-primer"
              >
                donnemartin
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/donnemartin"
                  >
                    donnemartin
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                98,602
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                17,324
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                164
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="microsoft"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #16
            </h4>
            <img
              alt="Avatar for microsoft"
              class="avatar"
              src="https://avatars2.githubusercontent.com/u/6154722?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/microsoft/vscode"
              >
                microsoft
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/microsoft"
                  >
                    microsoft
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                97,771
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                15,346
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                5,172
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="airbnb"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #17
            </h4>
            <img
              alt="Avatar for airbnb"
              class="avatar"
              src="https://avatars3.githubusercontent.com/u/698437?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/airbnb/javascript"
              >
                airbnb
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/airbnb"
                  >
                    airbnb
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                96,865
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                18,837
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                119
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="flutter"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #18
            </h4>
            <img
              alt="Avatar for flutter"
              class="avatar"
              src="https://avatars3.githubusercontent.com/u/14101776?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/flutter/flutter"
              >
                flutter
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/flutter"
                  >
                    flutter
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                93,945
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                12,792
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                7,774
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="torvalds"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #19
            </h4>
            <img
              alt="Avatar for torvalds"
              class="avatar"
              src="https://avatars0.githubusercontent.com/u/1024025?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/torvalds/linux"
              >
                torvalds
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/torvalds"
                  >
                    torvalds
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                92,202
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                32,056
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                327
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="d3"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #20
            </h4>
            <img
              alt="Avatar for d3"
              class="avatar"
              src="https://avatars1.githubusercontent.com/u/1562726?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/d3/d3"
              >
                d3
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/d3"
                  >
                    d3
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                91,974
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                22,130
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                6
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="facebook"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #21
            </h4>
            <img
              alt="Avatar for facebook"
              class="avatar"
              src="https://avatars3.githubusercontent.com/u/69631?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/facebook/react-native"
              >
                facebook
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/facebook"
                  >
                    facebook
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                87,894
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                19,516
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                915
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="jackfrued"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #22
            </h4>
            <img
              alt="Avatar for jackfrued"
              class="avatar"
              src="https://avatars0.githubusercontent.com/u/7474657?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/jackfrued/Python-100-Days"
              >
                jackfrued
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/jackfrued"
                  >
                    jackfrued
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                87,224
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                35,093
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                422
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="public-apis"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #23
            </h4>
            <img
              alt="Avatar for public-apis"
              class="avatar"
              src="https://avatars0.githubusercontent.com/u/51121562?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/public-apis/public-apis"
              >
                public-apis
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/public-apis"
                  >
                    public-apis
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                85,983
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                10,136
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                150
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="electron"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #24
            </h4>
            <img
              alt="Avatar for electron"
              class="avatar"
              src="https://avatars1.githubusercontent.com/u/13409222?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/electron/electron"
              >
                electron
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/electron"
                  >
                    electron
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                83,307
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                11,192
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                1,236
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="vinta"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #25
            </h4>
            <img
              alt="Avatar for vinta"
              class="avatar"
              src="https://avatars2.githubusercontent.com/u/652070?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/vinta/awesome-python"
              >
                vinta
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/vinta"
                  >
                    vinta
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                83,169
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                16,356
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                49
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="Snailclimb"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #26
            </h4>
            <img
              alt="Avatar for Snailclimb"
              class="avatar"
              src="https://avatars0.githubusercontent.com/u/29880145?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/Snailclimb/JavaGuide"
              >
                Snailclimb
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/Snailclimb"
                  >
                    Snailclimb
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                81,048
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                27,917
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                22
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="facebook"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #27
            </h4>
            <img
              alt="Avatar for facebook"
              class="avatar"
              src="https://avatars3.githubusercontent.com/u/69631?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/facebook/create-react-app"
              >
                facebook
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/facebook"
                  >
                    facebook
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                79,336
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                19,167
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                610
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="jlevy"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #28
            </h4>
            <img
              alt="Avatar for jlevy"
              class="avatar"
              src="https://avatars1.githubusercontent.com/u/2058167?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/jlevy/the-art-of-command-line"
              >
                jlevy
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/jlevy"
                  >
                    jlevy
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                77,388
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                8,879
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                184
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="TheAlgorithms"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #29
            </h4>
            <img
              alt="Avatar for TheAlgorithms"
              class="avatar"
              src="https://avatars1.githubusercontent.com/u/20487725?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/TheAlgorithms/Python"
              >
                TheAlgorithms
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/TheAlgorithms"
                  >
                    TheAlgorithms
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                76,205
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                22,949
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                38
                 open
              </li>
            </ul>
          </div>
        </li>
        <li
          data-testid="danistefanovic"
        >
          <div
            class="card bg-undefined"
          >
            <h4
              class="header-lg center-text"
            >
              #30
            </h4>
            <img
              alt="Avatar for danistefanovic"
              class="avatar"
              src="https://avatars3.githubusercontent.com/u/1736595?v=4"
            />
            <h2
              class="center-text"
            >
              <a
                class="link"
                href="https://github.com/danistefanovic/build-your-own-x"
              >
                danistefanovic
              </a>
            </h2>
            <ul
              class="card-list"
            >
              <li>
                <div
                  style="position: relative; display: flex;"
                >
                  <svg
                    color="rgb(255, 191, 116)"
                    fill="currentColor"
                    height="22"
                    size="22"
                    stroke="currentColor"
                    stroke-width="0"
                    style="color: rgb(255, 191, 116);"
                    viewBox="0 0 448 512"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                    />
                  </svg>
                  <a
                    href="https://github.com/danistefanovic"
                  >
                    danistefanovic
                  </a>
                </div>
              </li>
              <li>
                <svg
                  color="rgb(255, 215, 0)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(255, 215, 0);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                  />
                </svg>
                74,515
                 stars
              </li>
              <li>
                <svg
                  color="rgb(129, 195, 245)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(129, 195, 245);"
                  viewBox="0 0 384 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                  />
                </svg>
                6,047
                 forks
              </li>
              <li>
                <svg
                  color="rgb(241, 138, 147)"
                  fill="currentColor"
                  height="22"
                  size="22"
                  stroke="currentColor"
                  stroke-width="0"
                  style="color: rgb(241, 138, 147);"
                  viewBox="0 0 576 512"
                  width="22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                  />
                </svg>
                86
                 open
              </li>
            </ul>
          </div>
        </li>
      </ul>
    `);
    done();
  });
});
