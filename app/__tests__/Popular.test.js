import React from "react";
import { act, render, cleanup } from "@testing-library/react";
import { fetchPopularRepos } from "../utils/api";
import Popular from "../components/Popular";
import ReposGrid from "../components/ReposGrid";
import {ThemeProvider} from "../contexts/theme";
import { readFileSync } from "fs";
import path from "path";
jest.mock("node-fetch");

import fetch, { Response } from "node-fetch";
let populars;

const AllPopular = JSON.parse(
  readFileSync(path.join(__dirname, "allpopular.json")).toString()
);

fetch.mockReturnValue(
  Promise.resolve({
    json: () => Promise.resolve(AllPopular),
  })
);

global.fetch = fetch;

afterEach(cleanup);

// test ("fetch popular repos", ()=>{

// });

test("Test popular", (done) => {
  fetchPopularRepos("All").then((repos) => {
    const { getByTestId } = render(<ThemeProvider value={"light"}><ReposGrid repos={repos} /></ThemeProvider>);
    const reposeGrid = getByTestId("repos-grid");
    // console.log("populars", repos);
    // expect(reposeGrid.children.length).toEqual(repos.length)
    // expect(fetch).toHaveBeenCalledWith(
    //   "https://api.exchangeratesapi.io/latest?base=USD"
    // );
    expect(reposeGrid).toMatchInlineSnapshot();
    done();
  });
});
