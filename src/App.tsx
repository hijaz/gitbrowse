import { useState } from "react";
import { Octokit } from "octokit";
import { useQuery } from "@tanstack/react-query";

import Navbar from "./components/Navbar";
import ContributorList from "./components/ContributorList";

import "./App.css";

const octokit = new Octokit({
  auth: process.env.REACT_APP_GH_KEY,
});

function App() {
  //TODO: add form to make these editable
  const [owner, setOwner] = useState("facebook");
  const [repo, setRepo] = useState("react");
  const [resource, setResource] = useState("contributors");

  const { isLoading, isRefetching, isError, data, refetch } = useQuery(
    [`${owner}_${repo}_${resource}`],
    async () =>
      await octokit.request("GET /repos/{owner}/{repo}/{resource}", {
        owner,
        repo,
        resource,
      })
  );
  console.log(process.env.REACT_APP_GH_KEY);
  console.log({ isLoading, isRefetching, isError, data, refetch });

  return (
    <div className="m-10">
      <Navbar />
      <ContributorList data={data?.data} />
    </div>
  );
}

export default App;
