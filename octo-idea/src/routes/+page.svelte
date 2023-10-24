<script>
    import { onMount } from 'svelte';
    import { onAuthStateChanged } from "firebase/auth";
    import { getMessaging, getToken } from "firebase/messaging";
    import { doc, setDoc } from "firebase/firestore"; 
    import { db, auth } from '../components/firebaseInit';  // Importa da firebaseInit
    import SearchBar from '../components/SearchBar.svelte';
    import GlobalFeed from '../components/GlobalFeed.svelte';
    import Sidebars from '../components/Sidebars.svelte';
  
    let user = null;
  
    onMount(() => {
        const messaging = getMessaging();
        onAuthStateChanged(auth, async (currentUser) => {  // Usa auth da firebaseInit
            user = currentUser;
            if (user) {
                await subscribeUser(user.uid, messaging);
            }
        });
    });
    /**
	 * @param {string} userId
	 * @param {import("@firebase/messaging").Messaging} messaging
	 */
   async function subscribeUser(userId, messaging) {
    try {
      const currentToken = await getToken(messaging, { vapidKey: 'BN0gbkFUh8jGsysBV5HMvvvyg42pMb1Dqnv0wlJ0sytnm5SM8GRWrfHmeetc3IDeCrCXZa4NE5OGu05LWbLojv0' });
      if (currentToken) {
        console.log(`Current token: ${currentToken}`);
        // Aggiunge la sottoscrizione alla nuova collezione 'userSubscriptions'
        await setDoc(doc(db, "userSubscriptions", userId), {
          isSubscribed: true,
          subscription: currentToken
        }, { merge: true });  // Merge with existing data
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    } catch (err) {
      console.log('An error occurred while retrieving the token. ', err);
    }
}

</script>

<div class="home-container">
    <SearchBar />
    <GlobalFeed />
    <Sidebars />
</div>

<style>
    .home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}
</style>