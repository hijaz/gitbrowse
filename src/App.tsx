import { Octokit } from "octokit";
import { useQuery } from "@tanstack/react-query";

import "./App.css";

const octokit = new Octokit({
  auth: process.env.REACT_APP_GH_KEY,
});

function App() {
  const { isLoading, isRefetching, isError, data, refetch } = useQuery(
    ["joke"],
    async () =>
      await octokit.request("GET /repos/{owner}/{repo}", {
        owner: "facebook",
        repo: "react",
      })
  );
  console.log(process.env.REACT_APP_GH_KEY);
  console.log({ isLoading, isRefetching, isError, data, refetch });

  return <div className="App">{JSON.stringify(data)}</div>;
}

export default App;
