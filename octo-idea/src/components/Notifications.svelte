<script lang="ts">
    import { onMount } from 'svelte';
    import { doc, getDocs, collection, query, where, writeBatch, updateDoc, deleteDoc } from "firebase/firestore";
    import { auth, db } from '../firebaseConfig';
    import { goto } from '$app/navigation';
    import { onSnapshot } from "firebase/firestore";

    let notifications: any[] = [];
    let showNotifications = false;

    onMount(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                fetchNotifications();
            }
        });
        return () => unsubscribe();
    });

    function fetchNotifications() {
    if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const notificationsQuery = query(
            collection(db, 'notifications'),
            where('userId', '==', userId),
            where('isRead', '==', false)
        );

        // Listen for real-time changes
        onSnapshot(notificationsQuery, (querySnapshot) => {
            notifications = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            notifications.forEach(notification => {
                sendNotification(notification.type, notification.message);
            });
        });
    }
}
function sendNotification(title: string, body: any) {
    // Check if the browser supports notifications
    if (!("Notification" in window)) {
        console.log("This browser does not support desktop notification");
        return;
    }

    // Check for permission
    else if (Notification.permission === "granted") {
        // If it's okay, create a notification
        var notification = new Notification(title, { body: body });
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification(title, { body: body });
            }
        });
    }
}

    function toggleNotifications() {
        fetchNotifications();
        showNotifications = !showNotifications;
    }

   
    async function markNotificationAsRead(notificationId: string) {
    const notifRef = doc(db, 'notifications', notificationId);
    try {
        // Prima contrassegna la notifica come letta
        await updateDoc(notifRef, { isRead: true });
        
        // Poi, elimina la notifica dal database
        await deleteDoc(notifRef);
        
        fetchNotifications();  // Refresh the notifications after deletion
    } catch (error) {
        console.error("Error processing notification:", error);
    }
}
async function handleNotificationClick(notificationId: string, postId: string) {
        await markNotificationAsRead(notificationId);
        goto(`/post/${postId}`);  // Reindirizza l'utente alla pagina del post
    }
    async function clearAllNotifications() {
        if (auth.currentUser) {
            const userId = auth.currentUser.uid;
            const batch = writeBatch(db);
            try {
                const querySnapshot = await getDocs(query(collection(db, "notifications"), where("userId", "==", userId), where("isRead", "==", false)));
                querySnapshot.docs.forEach(doc => {
                    // Set each notification as read
                    batch.update(doc.ref, { isRead: true });
                    // Then delete the notification
                    batch.delete(doc.ref);
                });
                await batch.commit();
                fetchNotifications();  // Refresh the notifications after the changes
            } catch (error) {
                console.error("Error processing all notifications:", error);
            }
        }
    }
</script>

<div class="notifications-section">
    <h3>Notifications</h3>
    <button on:mousedown|stopPropagation={toggleNotifications}>🔔 {notifications.length}</button>
    {#if showNotifications}
        <div class="notification-list">
            {#each notifications as notification (notification.id)}
                <div 
                    class="notification-item" 
                    on:mousedown={() => handleNotificationClick(notification.id, notification.postId)} 
                    role="button" 
                    tabindex="0" 
                >
                    {notification.message}
                </div>
            {/each}
            {#if notifications.length}
            <div class="clear-all-section">
                <button on:mousedown|stopPropagation={clearAllNotifications} tabindex="0">Clear All</button>
            </div>
        {/if}
        </div>
    {/if}
</div>
<style>
    .notification-item:hover {
        cursor: pointer;
    }
</style>