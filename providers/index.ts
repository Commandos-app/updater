
import { Match } from "../deps.ts";

import { getCurrentVersion, sanitizeVersion } from "../util/checkversion.ts";
import { noUpdateAvailable } from "../util/response.ts";


export async function indexProvider(req: Request, match: Match): Promise<Response> {
    try {
        // Sanitize our version
        const release = await getCurrentVersion();

        // Sanitize our version
        const remoteVersion = sanitizeVersion(release.tag_name.toLowerCase());

        const version = remoteVersion;

        return new Response(
            `
                <!DOCTYPE html>
                <html lang="en">

                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Commandos updater</title>
                    <link rel="icon" href="data:image/svg+xml,%3Csvg version='1.1' viewBox='0 0 1280 1280' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cdefs%3E%3ClinearGradient id='linearGradient1638' x1='45936' x2='47630' y1='-46302' y2='-47891' gradientTransform='matrix(.48816 0 0 .48816 -22108 23681)' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%230093d1' offset='0'/%3E%3Cstop stop-color='%2305b4ff' offset='.40291'/%3E%3Cstop stop-color='%2338c3ff' offset='.65959'/%3E%3Cstop stop-color='%236bd2ff' offset='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg%3E%3Cpath d='m1090.4 891.49-426.14 246.03-426.14-246.03 1e-5 -492.06 426.14-246.03 426.14 246.03z' fill='%23fff' stroke-width='.48379'/%3E%3Cpath d='m640.2 20.408a84.552 84.552 0 0 0-42.473 11.328l-463.36 267.52a84.552 84.552 0 0 0-42.275 73.225v535.04a84.552 84.552 0 0 0 42.275 73.223l463.36 267.52a84.552 84.552 0 0 0 84.551 0l463.36-267.52a84.552 84.552 0 0 0 42.275-73.223v-535.04a84.552 84.552 0 0 0-42.275-73.225l-463.36-267.52a84.552 84.552 0 0 0-42.078-11.328zm-0.61719 220.92c14.121-0.1197 28.366 2.1092 41.49 7.4336 0.53601 0.27389 1.073 0.5522 1.4824-0.0664 71.571 41.324 143.14 82.651 214.71 123.98 9.3971 4.9454 17.671 12.081 23.713 20.832 9.9849 14.214 13.719 32.566 10.32 49.578-1.4714 7.9144-4.7595 15.378-8.875 22.258-6.5648 12.169-17.063 22.193-29.596 28.057-18.058 8.6498-40.183 8.1367-57.83-1.3164-50.532-29.082-101.02-58.236-151.51-87.4-3.9027-2.1762-7.6591-4.6347-11.727-6.502-9.8215-4.4338-20.701-6.1338-31.424-6.043-10.878 0.16348-21.939 2.0448-31.705 7.0195-50.412 28.978-100.73 58.121-151.12 87.143-4.4867 2.6718-9.2054 5.003-13.33 8.2383-8.5233 6.6001-15.188 15.356-20.262 24.811-4.8286 9.0714-8.2593 19.07-8.7617 29.395-0.0475 55.067-0.04106 110.14-0.03906 165.2 0.0176 6.0409-0.02243 12.082 0.01367 18.123-0.00518 6.0192 1.2016 11.975 3.0312 17.689 0.17252 0.5234 0.43304 1.2901 0.55078 1.6621 1.9596 5.6226 4.5489 11.018 7.6406 16.104 5.5132 8.9453 12.466 17.239 21.346 23 52.091 30.196 104.28 60.228 156.4 90.371 6.9507 4.3416 14.85 6.9972 22.912 8.3164 2.0805 0.34583 4.5722 0.65629 6.6973 0.82617 2.2775 0.1912 4.5452 0.29869 6.8828 0.30469 1.4418 0.0106 3.0608-0.02574 4.373-0.08594 9.9706-0.50467 20.052-2.4619 28.953-7.1367 52.018-29.92 103.97-59.952 155.96-89.938 7.8173-4.909 16.605-8.3228 25.75-9.6777 16.568-2.5865 34.032 1.7508 47.59 11.582 7.8996 5.6076 14.296 13.165 19.018 21.592 7.269 11.836 10.661 26.023 9.4082 39.865-1.6418 19.917-13.196 38.731-30.209 49.213-64.788 37.461-129.6 74.885-194.41 112.3-7.2027 4.0161-14.151 8.4953-21.564 12.125-14.193 6.6481-29.981 9.4612-45.596 9.332-16.363-0.1685-32.939-3.4242-47.459-11.18-85.42-49.27-170.82-98.574-256.22-147.88-8.4423-4.5921-16.51-9.9698-23.543-16.549-19.56-18.022-31.337-44.144-32.029-70.719-0.0437-94.579-0.04778-189.16-0.05078-283.74 0.13356-8.4237-0.28458-16.861 0.29102-25.273 1.3533-15.746 6.8992-30.939 14.922-44.484 8.3328-13.99 19.427-26.617 33.35-35.242 81.126-46.883 162.26-93.747 243.42-140.57 7.5116-4.2088 14.801-8.8194 22.477-12.73 13.801-6.7806 29.263-9.6397 44.562-9.8144z' fill='url(%23linearGradient1638)'/%3E%3C/g%3E%3C/svg%3E%0A" type="image/svg+xml" />
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap');
                        html,
                        body {
                            margin: 0;
                            padding: 0;
                            height: 100%;
                        }

                        .splash.full {
                            position: fixed;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            -webkit-user-select: none;
                            opacity: 1;
                            transition: opacity 1s;
                            z-index: 99999;
                            background-color: hsl(198, 100%, 32%);
                            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='540' height='450' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='.1'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/svg%3E");
                        }

                        .title {
                            color: #247bae;
                            text-align: center;
                            font-family: "lato", sans-serif;
                            font-weight: 300;
                            font-size: 50px;
                            letter-spacing: 10px;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            height: 100%;
                            align-content: center;
                            line-height: 60px;
                            color: #fff;
                        }

                        .title .brand {
                            display: flex;
                            justify-content: center;
                            align-items: center;

                        }

                        .title .brand span {
                            margin-bottom: 7px;
                        }

                        .title .small {
                            font-size: 20px;
                            font-weight: 400;
                            letter-spacing: 4.5px;
                        }

                        .comming-soon {
                            margin-top: 20px;
                            font-size: 20px;
                            font-weight: 300;
                            letter-spacing: 4.5px;
                            line-height: 25px;
                        }
                        .highlight-version{
                            font-weight: 400;
                        }
                    </style>
                </head>

                <body>
                    <div class="splash full">
                        <div class="title">
                            <div>
                                <div class="brand">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">
                                        <path fill="#fff" d="M 40.011719 1.277344 C 39.082031 1.273438 38.164062 1.515625 37.359375 1.984375 L 8.398438 18.703125 C 6.761719 19.648438 5.753906 
                                        21.390625 5.753906 23.28125 L 5.753906 56.71875 C 5.753906 58.609375 6.761719 60.351562 8.398438 61.296875 L 37.359375 78.015625 C 
                                        38.992188 78.960938 41.007812 78.960938 42.640625 78.015625 L 71.601562 61.296875 C 73.238281 60.351562 74.246094 58.609375 74.246094 
                                        56.71875 L 74.246094 23.28125 C 74.246094 21.390625 73.238281 19.648438 71.601562 18.703125 L 42.640625 1.984375 C 41.84375 1.523438 
                                        40.9375 1.277344 40.011719 1.277344 Z M 39.972656 15.082031 C 40.855469 15.074219 41.746094 15.214844 42.566406 15.546875 C 42.601562 
                                        15.566406 42.632812 15.582031 42.660156 15.542969 L 56.078125 23.292969 C 56.667969 23.601562 57.183594 24.046875 57.5625 24.59375 C 
                                        58.183594 25.484375 58.417969 26.628906 58.207031 27.691406 C 58.113281 28.1875 57.910156 28.652344 57.652344 29.082031 C 57.242188 
                                        29.84375 56.585938 30.472656 55.800781 30.835938 C 54.671875 31.378906 53.289062 31.347656 52.1875 30.753906 L 42.71875 25.292969 C 
                                        42.472656 25.15625 42.238281 25.003906 41.984375 24.886719 C 41.371094 24.609375 40.691406 24.503906 40.019531 24.507812 C 39.339844 
                                        24.519531 38.648438 24.636719 38.039062 24.949219 L 28.59375 30.394531 C 28.3125 30.5625 28.019531 30.707031 27.761719 30.910156 C 
                                        27.230469 31.320312 26.8125 31.867188 26.496094 32.460938 C 26.191406 33.027344 25.980469 33.652344 25.949219 34.296875 L 25.945312 
                                        44.621094 L 25.945312 45.753906 C 25.945312 46.128906 26.019531 46.503906 26.136719 46.859375 L 26.167969 46.964844 C 26.292969 
                                        47.316406 26.453125 47.652344 26.648438 47.96875 C 26.992188 48.53125 27.425781 49.046875 27.980469 49.40625 L 37.757812 55.054688 C 
                                        38.191406 55.328125 38.683594 55.492188 39.1875 55.574219 C 39.328125 55.597656 39.464844 55.617188 39.605469 55.628906 C 39.75 55.640625 
                                        39.890625 55.644531 40.039062 55.648438 C 40.128906 55.648438 40.226562 55.644531 40.308594 55.640625 C 40.933594 55.609375 41.5625 
                                        55.488281 42.121094 55.195312 L 51.867188 49.574219 C 52.355469 49.265625 52.90625 49.054688 53.476562 48.96875 C 54.511719 48.808594 
                                        55.605469 49.078125 56.449219 49.691406 C 56.945312 50.042969 57.34375 50.515625 57.640625 51.042969 C 58.09375 51.78125 58.304688
                                        52.667969 58.226562 53.535156 C 58.125 54.777344 57.402344 55.953125 56.339844 56.609375 L 44.1875 63.628906 C 43.738281 63.878906 
                                        43.304688 64.160156 42.839844 64.386719 C 41.953125 64.800781 40.96875 64.976562 39.992188 64.96875 C 38.96875 64.960938 37.933594 
                                        64.753906 37.023438 64.269531 L 21.011719 55.027344 C 20.484375 54.742188 19.980469 54.40625 19.539062 53.992188 C 18.316406 
                                        52.867188 17.582031 51.234375 17.539062 49.574219 L 17.535156 31.839844 C 17.542969 31.3125 17.515625 30.785156 17.554688 30.261719
                                        C 17.636719 29.277344 17.984375 28.328125 18.484375 27.480469 C 19.007812 26.605469 19.699219 25.816406 20.570312 25.277344 L 35.785156 
                                        16.492188 C 36.253906 16.230469 36.707031 15.941406 37.1875 15.695312 C 38.050781 15.273438 39.015625 15.09375 39.972656 15.082031 Z M 
                                        39.972656 15.082031 " />
                                    </svg>
                                    <span>ommandos</span>
                                </div>
                                <div class="small">
                                    GIT Experience but different
                                </div>
                                <div class="comming-soon">
                                <div>Nothing to see here :-)</div>
                                <div>Current version of Commandos is: <span class="highlight-version">${version}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
        `
            , { status: 200, headers: { "Content-Type": "text/html" } });


    }
    catch {
        return noUpdateAvailable();
    }

}
