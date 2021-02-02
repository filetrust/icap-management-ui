import Routes from "../../../Routes";

const routes = new Routes().root;

export const getVersion = async (): Promise<string> => {
    const response = await fetch(routes.versionRoute, {
        method: "GET",
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw response.statusText;
    }

    return response.text();
}