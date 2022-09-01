import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ApiContext } from "./index";
import ContributorList from "./components/ContributorList";

import "./App.css";

function App() {
  const octokit = useContext(ApiContext);
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

  return (
    <div className="m-10">
      <ContributorList data={data?.data} />
    </div>
  );
}

export default App;
