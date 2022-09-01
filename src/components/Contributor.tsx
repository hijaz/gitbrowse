import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ApiContext } from "../index";

const Contributor = () => {
  const octokit = useContext(ApiContext);
  let { contributorLogin } = useParams();

  const { data } = useQuery(
    [contributorLogin],
    async () =>
      await octokit.request("GET /users/{contributorLogin}", {
        contributorLogin,
      })
  );

  return <>{JSON.stringify(data)}</>;
};

export default Contributor;
