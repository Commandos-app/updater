
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
