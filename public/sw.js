const CACHE_NAME = 'realtor-smart-ai-v1';
const urlsToCache = [
  '/',
  '/style.css',
  '/chatbot.js',
  '/real-estate-bg.jpeg',
  '/property1.jpg',
  '/property2.jpg',
  '/property3.jpg',
  '/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Push notification event
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || '/icon-192.png',
      badge: '/icon-192.png',
      data: {
        url: data.url || '/',
        timestamp: data.timestamp
      },
      actions: [
        {
          action: 'view',
          title: 'View Property',
          icon: '/icon-192.png'
        },
        {
          action: 'dismiss',
          title: 'Dismiss'
        }
      ],
      requireInteraction: true,
      tag: 'realtor-notification'
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click event
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  } else if (event.action === 'dismiss') {
    // Just close the notification
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});

async function doBackgroundSync() {
  // Handle offline form submissions
  const offlineData = await getOfflineData();
  if (offlineData.length > 0) {
    for (const data of offlineData) {
      try {
        await fetch('/api/leads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
        // Remove from offline storage after successful sync
        removeOfflineData(data.id);
      } catch (error) {
        console.error('Background sync failed:', error);
      }
    }
  }
}

// Helper functions for offline data
async function getOfflineData() {
  const db = await openDB();
  return db.getAll('offline-leads');
}

async function saveOfflineData(data) {
  const db = await openDB();
  return db.add('offline-leads', data);
}

async function removeOfflineData(id) {
  const db = await openDB();
  return db.delete('offline-leads', id);
}

async function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('RealtorSmartAI', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('offline-leads')) {
        db.createObjectStore('offline-leads', { keyPath: 'id' });
      }
    };
  });
} 