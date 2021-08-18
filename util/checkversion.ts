
import { GITHUB_TOKEN, GITHUB_ACCOUNT, GITHUB_REPO, DEBUG_MODE } from "../util/constants.ts";

export async function getCurrentVersion(): Promise<any> {

    try {
        // Github api URL for latest version
        const reqUrl = new URL(
            `https://api.github.com/repos/${GITHUB_ACCOUNT}/${GITHUB_REPO}/releases/latest`
        );

        // Headers
        const headers: HeadersInit = { Accept: "application/vnd.github.preview" };
        // Add github token if provided
        if (GITHUB_TOKEN && GITHUB_TOKEN.length > 0) {
            headers.Authorization = `token ${GITHUB_TOKEN}`;
        }

        // Get JSON from github

        if (DEBUG_MODE) console.log(`TCL: ~ file: github.ts ~ line 41 ~ reqUrl.toString()`, reqUrl.toString());

        const respons = await fetch(reqUrl.toString(), { method: "GET", headers });
        const release = await respons.json();

        if (DEBUG_MODE) console.log(release);
        if (DEBUG_MODE) console.log(release.tag_name);
        if (DEBUG_MODE) console.log(`TCL: ~ file: github.ts ~ line 49 ~ release`, release);

        return release;
    }
    catch {
        return null;
    }

}

export function sanitizeVersion(version: string): string {
    // if it start with v1.0.0 remove the `v`
    if (version.charAt(0) === "v") {
        return version.substring(1);
    }

    return version;
}
