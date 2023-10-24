/// <reference lib="webworker" />

import { build, files, version } from '$service-worker';

const worker = (self as unknown) as ServiceWorkerGlobalScope;
const FILES = `cache${version}`;

const to_cache = build.concat(files);
const staticAssets = new Set(to_cache);

worker.addEventListener('activate', async () => {
    try {
        const applicationServerKey = 'BN0gbkFUh8jGsysBV5HMvvvyg42pMb1Dqnv0wlJ0sytnm5SM8GRWrfHmeetc3IDeCrCXZa4NE5OGu05LWbLojv0';
        const options = { applicationServerKey, userVisibleOnly: true };
        const subscription = await worker.registration.pushManager.subscribe(options);
        console.log(JSON.stringify(subscription));
    } catch (err) {
        console.log('Failed to subscribe the user: ', err);
    }
});

worker.addEventListener('push', function(event) {
    if (event.data) {
        console.log('This push event has data: ', event.data.text());
    } else {
        console.log('This push event has no data.');
    }
    const title = 'Simple Title';
    const options = {
        body: 'Simple piece of body text.\nSecond line of body text :)'
    };
    event.waitUntil(worker.registration.showNotification(title, options));
});

worker.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches
            .open(FILES)
            .then((cache) => {
                console.log('Service Worker: Caching files');
                return cache.addAll(to_cache);
            })
            .then(() => {
                console.log('Service Worker: Install completed');
                worker.skipWaiting();
            })
    );
});

worker.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys().then(async (keys) => {
            for (const key of keys) {
                if (key !== FILES) {
                    console.log(`Service Worker: Deleting old cache ${key}`);
                    await caches.delete(key);
                }
            }
            console.log('Service Worker: Activate completed');
            worker.clients.claim();
        })
    );
});

async function fetchAndCache(request: Request) {
    const cache = await caches.open(`offline${version}`);
    try {
        const response = await fetch(request);
        cache.put(request, response.clone());
        return response;
    } catch (err) {
        const response = await cache.match(request);
        if (response) {
            return response;
        }
        const offlineResponse = await caches.match('/offline.html');
        if (offlineResponse) {
            return offlineResponse;
        }
        return new Response('Something went wrong', { status: 500 });
    }
}

worker.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET' || event.request.headers.has('range')) return;
	const url = new URL(event.request.url);
	const isHttp = url.protocol.startsWith('http');
	const isDevServerRequest = url.hostname === self.location.hostname && url.port !== self.location.port;
	const isStaticAsset = url.host === self.location.host && staticAssets.has(url.pathname);
	const skipBecauseUncached = event.request.cache === 'only-if-cached' && !isStaticAsset;
	if (isHttp && !isDevServerRequest && !skipBecauseUncached) {
		event.respondWith(
			(async () => {
				const cachedAsset = isStaticAsset && (await caches.match(event.request));
				return cachedAsset || fetchAndCache(event.request);
			})()
		);
	}
});
