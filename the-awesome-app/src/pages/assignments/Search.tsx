import axios from "axios";
import { useState } from "react";
import type { SubmitEvent } from "react";
import { useTitle } from "../../hooks/useTitle";

type WikiOpenSearchResponse = [string, string[], string[], string[]];

type SearchResult = {
    title: string;
    description: string;
    link: string;
};

const LIMIT_OPTIONS = [5, 10, 20, 30];

function Search() {
    useTitle("Wiki Search");

    const [searchText, setSearchText] = useState("react");
    const [limit, setLimit] = useState(20);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [hasSearched, setHasSearched] = useState(false);

    async function handleSearch(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const trimmedSearchText = searchText.trim();
        if (!trimmedSearchText) {
            setResults([]);
            setHasSearched(false);
            setErrorMessage("Enter a search term.");
            return;
        }

        setIsLoading(true);
        setErrorMessage("");
        setHasSearched(true);

        try {
            const endpoint = `https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&limit=${limit}&search=${encodeURIComponent(trimmedSearchText)}`;
            const response = await axios.get<WikiOpenSearchResponse>(endpoint);
            const data = response.data;
            const mappedResults = data[1].map((title, index) => ({
                title,
                description: data[2][index] || "No description available.",
                link: data[3][index],
            }));

            setResults(mappedResults);
        } catch (error) {
            console.log("search error", error);
            setResults([]);
            setErrorMessage("Unable to fetch search results right now.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                            <div className="mb-4">
                                <p className="text-uppercase text-primary fw-semibold mb-1">Assignment</p>
                                <h2 className="mb-2">Wikipedia Search</h2>
                                <p className="text-muted mb-0">
                                    Search Wikipedia articles and open the result links directly.
                                </p>
                            </div>

                            <form onSubmit={handleSearch}>
                                <div className="row g-3 align-items-end">
                                    <div className="col-md-8">
                                        <label htmlFor="searchText" className="form-label">
                                            Search
                                        </label>
                                        <input
                                            id="searchText"
                                            type="text"
                                            className="form-control"
                                            placeholder="Search Wikipedia"
                                            value={searchText}
                                            onChange={(event) => setSearchText(event.target.value)}
                                        />
                                    </div>

                                    <div className="col-md-2">
                                        <label htmlFor="limit" className="form-label">
                                            Limit
                                        </label>
                                        <select
                                            id="limit"
                                            className="form-select"
                                            value={limit}
                                            onChange={(event) => setLimit(Number(event.target.value))}
                                        >
                                            {LIMIT_OPTIONS.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-md-2 d-grid">
                                        <button type="submit" className="btn btn-primary">
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {errorMessage && (
                                <div className="alert alert-danger mt-4 mb-0" role="alert">
                                    {errorMessage}
                                </div>
                            )}

                            {isLoading && (
                                <div className="alert alert-info mt-4 mb-0" role="status">
                                    Loading results...
                                </div>
                            )}

                            <div className="mt-4">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="mb-0">Results</h4>
                                    {hasSearched && !isLoading && (
                                        <span className="badge text-bg-secondary">
                                            {results.length} items
                                        </span>
                                    )}
                                </div>

                                {hasSearched && !isLoading && results.length === 0 && !errorMessage && (
                                    <div className="alert alert-warning mb-0">No results found.</div>
                                )}

                                <div className="list-group">
                                    {results.map((result) => (
                                        <a
                                            key={result.link}
                                            href={result.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="list-group-item list-group-item-action"
                                        >
                                            <div className="d-flex w-100 justify-content-between align-items-start">
                                                <div>
                                                    <h6 className="mb-1">{result.title}</h6>
                                                    <small className="text-primary">{result.link}</small>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
