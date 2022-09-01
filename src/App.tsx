import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ApiContext } from "./index";
import ContributorList from "./components/ContributorList";

import "./App.css";

function App() {
  const octokit = useContext(ApiContext);
  //TODO: add form to make these editable
  const [owner] = useState("facebook");
  const [repo] = useState("react");
  const [resource] = useState("contributors");

  const { data, isLoading } = useQuery(
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
      {isLoading ? "Loading..." : <ContributorList data={data?.data} />}
    </div>
  );
}

export default App;
