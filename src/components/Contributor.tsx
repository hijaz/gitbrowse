import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ApiContext } from "../index";

const Contributor = () => {
  const octokit = useContext(ApiContext);
  let { contributorLogin } = useParams();

  const {
    data,
    isLoading,
  }: UseQueryResult<{
    isLoading: boolean;
    data: {
      avatar_url: string;
      name: string;
      login: string;
      location: string;
      bio: string;
      following: number;
      followers: number;
    };
  }> = useQuery(
    [contributorLogin],
    async () =>
      await octokit.request("GET /users/{contributorLogin}", {
        contributorLogin,
      })
  );

  const { avatar_url, login, name, location, bio, following, followers } =
    data?.data || {};

  if (isLoading) return <>Loading...</>;

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img
          className="object-cover h-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={avatar_url}
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name || "N/A"}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <span>username: {login || "N/A"}</span>
            <br />
            <span>location: {location || "N/A"} </span>
            <br />
            <span>bio: {bio || "N/A"} </span>
            <br />
            <span>follower count: {followers} </span>
            <br />
            <span>following count: {following} </span>
            <br />
          </p>
          <Link to={`/`}>
            <button
              type="button"
              className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
            >
              Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contributor;
